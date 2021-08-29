<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/assets/img/song-header.png)">
    </div>
    <div class="container mx-auto flex items-center">
      <button
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        @click.prevent="newSong(song)"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">{{ commentCount }}</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          :class="alertVariant"
          v-if="isAlertVisible"
        >
          {{ alertMessage }}
        </div>
        <vee-form
          v-if="isUserLoggedIn"
          :validation-schema="schema"
          @submit="submitComment"
        >
          <vee-field
            as="textarea"
            name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          ></vee-field>
          <ErrorMessage class="text-red-600" name="comment" />
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="isCommentInSubmission"
          >
            Submit
          </button>
        </vee-form>
        <select
          v-model="sortOrder"
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
          <option value="0">Latest</option>
          <option value="1">Oldest</option>
        </select>
      </div>
    </div>
  </section>

  <ul class="container mx-auto" id="comments">
    <li
      class="p-6 bg-gray-50 border border-gray-200"
      v-for="comment in sortedComments"
      :key="comment.docID"
    >
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>
      <p>{{ comment.content }}</p>
    </li>
  </ul>
</template>

<script>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Song',

  data() {
    return {
      isCommentInSubmission: false,
      isAlertVisible: false,
      sortOrder: 0,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Please wait! Your comment is being submitted.',
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      comments: [],
    };
  },

  computed: {
    ...mapState({
      isUserLoggedIn: (state) => state.auth.isUserLoggedIn,
    }),
    routeID() {
      return this.$route.params.id;
    },
    sortedComments() {
      return this.comments
        .slice()
        .sort((a, b) => {
          const aDate = new Date(a.datePosted);
          const bDate = new Date(b.datePosted);

          return this.sortOrder === '0' ? bDate - aDate : aDate - bDate;
        });
    },
    commentCount() {
      const count = typeof this.song.commentCount !== 'undefined'
        ? this.song.commentCount : '';
      return `Comments (${count})`;
    },
  },

  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection
      .doc(to.params.id)
      .get();

    next((vm) => {
      if (!docSnapshot.exists) {
        vm.$router.push({ name: 'home' });
        return;
      }

      const { sort } = vm.$route.query;
      const isParamValid = sort === '0' || sort === '1';

      // eslint-disable-next-line no-param-reassign
      vm.sortOrder = isParamValid ? sort : '0';

      // eslint-disable-next-line no-param-reassign
      vm.song = docSnapshot.data();
      vm.getComments();
    });
  },

  methods: {
    ...mapActions(['newSong']),
    // (values, context)
    async submitComment({ comment }, { resetForm }) {
      if (!this.isUserLoggedIn) {
        return;
      }

      this.isCommentInSubmission = true;
      this.isAlertVisible = true;
      this.alertVariant = 'bg-500-blue';
      this.alertMessage = 'Please wait! Your comment is being submitted.';

      const { displayName, uid } = auth.currentUser;

      const commentToUpload = {
        uid,
        name: displayName,
        content: comment,
        datePosted: new Date().toString(),
        songID: this.routeID,
      };

      await commentsCollection.add(commentToUpload);

      this.song.commentCount += 1;
      await songsCollection
        .doc(this.routeID)
        .update({
          commentCount: this.song.commentCount,
        });

      this.getComments();

      this.isCommentInSubmission = false;
      this.alertVariant = 'bg-green-500';
      this.alertMessage = 'Comment added!';

      // reset the values in the form to their original values
      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where('songID', '==', this.routeID)
        .get();

      this.comments = [];
      snapshots.forEach((document) => {
        this.comments.push({
          docID: document.id,
          ...document.data(),
        });
      });
    },
  },

  watch: {
    sortOrder(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
