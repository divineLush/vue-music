<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
          border-gray-400 text-gray-400 transition duration-500 hover:text-white
          hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': isDragover }"
        @drag.prevent.stop="drag"
        @dragstart.prevent.stop="dragStart"
        @dragend.prevent.stop="setDragOverFalse"
        @dragover.prevent.stop="setDragOverTrue"
        @dragenter.prevent.stop="setDragOverTrue"
        @dragleave.prevent.stop="setDragOverFalse"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <div class="mb-4">
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div class="transition-all progress-bar bg-blue-400" style="width: 75%"></div>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div class="transition-all progress-bar bg-blue-400" style="width: 35%"></div>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div class="transition-all progress-bar bg-blue-400" style="width: 55%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/includes/firebase';

export default {
  name: 'AppUpload',

  data() {
    return {
      isDragover: false,
    };
  },

  methods: {
    setDragOverTrue() {
      this.isDragover = true;
    },
    setDragOverFalse() {
      this.isDragover = false;
    },
    upload($event) {
      this.setDragOverFalse();

      const { files } = $event.dataTransfer;
      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          return;
        }

        // storage.ref() represents the path in our storage aka the bucket url
        // returns 'vue-music-53198.appspot.com' which is our root reference
        const storageRef = storage.ref();
        // .child() will create another reference, path relative to the parent reference
        // returns `vue-music-53198.appspot.com/songs/${file.name}`
        const songsRef = storageRef.child(`/songs/${file.name}`);
        // initialize upload process
        songsRef.put(file);
      });
    },
  },
};
</script>
