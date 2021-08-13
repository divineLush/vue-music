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
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <div class="font-bold text-sm" :class="upload.textClass">
          <i :class="upload.icon"></i>
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.currentProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'AppUpload',

  data() {
    return {
      isDragover: false,
      uploads: [],
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
        // if (file.type !== 'audio/mpeg' || file.type !== 'audio/flac') {
        //    return;
        //  }

        // storage.ref() represents the path in our storage aka the bucket url
        // returns 'vue-music-53198.appspot.com' which is our root reference
        const storageRef = storage.ref();
        // .child() will create another reference, path relative to the parent reference
        // returns `vue-music-53198.appspot.com/songs/${file.name}`
        const songsRef = storageRef.child(`/songs/${file.name}`);
        // initialize upload process
        const task = songsRef.put(file);
        const newUpload = {
          task,
          currentProgress: 0,
          name: file.name,
          // progress bar color
          variant: 'bg-blue-400',
          // icon to indicate the upload was a failure
          icon: 'fas fa-spinner fa-spin',
          // text color
          textClass: '',
        };
        const uploadIndex = this.uploads.push(newUpload) - 1;
        console.log(uploadIndex);

        // listen to state_changed event
        // state_changed lets us know the progress of the upload
        // if the upload failed or if it succeded
        task.on('state_changed', (snapshot) => {
          // handle upload progress
          // snapshot contains data about current upload
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploads[uploadIndex].currentProgress = progress;
        }, (error) => {
          // handle error
          this.uploads[uploadIndex].variant = 'bg-red-400';
          this.uploads[uploadIndex].icon = 'fas fa-times';
          this.uploads[uploadIndex].textClass = 'text-red-400';
          console.log(error);
        }, async (success) => {
          // handle success
          // auth.currentUser is a user how is logged
          const { uid, displayName } = auth.currentUser;
          const snapshotRef = task.snapshot.ref;
          const url = await snapshotRef.getDownloadURL();
          const song = {
            uid,
            url,
            displayName,
            // gotta store two names in case user wants to change name
            originalName: snapshotRef.name,
            // name displayed on frontend
            modifiedName: snapshotRef.name,
            genre: '',
            commentCount: 0,
          };

          await songsCollection.add(song);

          this.uploads[uploadIndex].variant = 'bg-green-400';
          this.uploads[uploadIndex].icon = 'fas fa-check';
          this.uploads[uploadIndex].textClass = 'text-green-400';
          console.log(success);
        });
      });
    },
  },
};
</script>
