<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload></app-upload>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <app-composition-item
              v-for="song in songs"
              :key="song.docID"
            ></app-composition-item>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from '@/components/AppUpload.vue';
import AppCompositionItem from '@/components/AppCompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';
// import store from '@/store/index';

export default {
  name: 'manage',

  components: {
    AppUpload,
    AppCompositionItem,
  },

  data() {
    return {
      songs: [],
    };
  },

  // Vue wont wait for the async lifecycle hook to be executed
  async created() {
    // the earliest moment we can request the data
    // .where() generates a query instructing firebase
    // to search through the documents in the songs collection
    // .get() returns a snapshot
    const snapshot = await songsCollection
      .where('uid', '==', auth.currentUser.uid)
      .get();

    snapshot.forEach((document) => {
      this.songs.push({
        ...document.data(),
        docID: document.ID,
      });
    });
  },

  // router runs this method before rendering the component
  // has access to to, from, next as other guards
  // doesn't have access to the methods and properties of a component
  // beforeRouteEnter(to, from, next) {
  // console.log('Manage component guard', to, from, store.state);

  // if (store.state.isUserLoggedIn) {
  // next();
  // } else {
  // next({ name: 'home' });
  // }
  // },
};
</script>
