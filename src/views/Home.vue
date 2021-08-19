<template>
  <section class="mb-8 py-20 text-white text-center relative">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus et dolor mollis, congue augue non, venenatis elit.
          Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
          sapien. Duis sed magna pulvinar, fringilla lorem eget,
          ullamcorper urna.
        </p>
      </div>
    </div>

    <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="assets/img/introduction-music.png" />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <app-song-item
          v-for="song in songs"
          :key="song.docID"
          :song="song"
        ></app-song-item>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import AppSongItem from '@/components/AppSongItem.vue';

export default {
  name: 'Home',

  components: {
    AppSongItem,
  },

  data() {
    return {
      songs: [],
      isPendingRequest: false,
    };
  },

  async created() {
    await this.getSongs();

    window.addEventListener('scroll', this.handleScroll);
  },

  beforeUnmount() {
    // cleanup the event
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    async getSongs() {
      if (this.isPendingRequest) {
        return;
      }

      this.isPendingRequest = true;
      const maxSongsPerPage = 10;
      let snapshots;

      if (this.songs.length) {
        // docID of the last object in the songs array
        const lastDocID = this.songs[this.songs.length - 1].docID;
        // snapshot of the last doc in the array
        const lastDoc = await songsCollection
          .doc(lastDocID)
          .get();
        // retrieve all the documents in the collection
        // get last 3 docs in the array
        snapshots = await songsCollection
          .orderBy('modifiedName')
          .startAfter(lastDoc)
          .limit(maxSongsPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy('modifiedName')
          .limit(maxSongsPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.isPendingRequest = false;
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const isBottomOfWindow = (Math.round(scrollTop) + innerHeight) === offsetHeight;

      if (isBottomOfWindow) {
        this.getSongs();
      }
    },
  },
};
</script>
