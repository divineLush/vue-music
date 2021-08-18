<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-if="!isFormVisible">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="toggleFormVisibility"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-else>
      <div
        class="text-white text-center font-bold p-4 mb-4"
        :class="alertVariant"
        v-if="isAlertVisible"
      >
        {{ alertMessage }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="editedSong"
        @submit="submit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            type="text"
            name="modifiedName"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
              transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage
            class="text-red-600"
            name="modifiedName"
          />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
              transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage
            class="text-red-600"
            name="genre"
          />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="isFormInSubmission"
        >
          Submit
        </button>
        <button
          class="ml-1 py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="isFormInSubmission"
          @click.prevent="toggleFormVisibility"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'AppCompositionItem',

  props: {
    song: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      isFormVisible: false,
      isFormInSubmission: false,
      isAlertVisible: false,
      alertVariant: 'bg-blue-500',
      alertMessage: 'Please wait! Updating song info.',
      schema: {
        modifiedName: 'required',
        genre: 'alpha_spaces',
      },
      editedSong: {
        modifiedName: '',
        genre: '',
      },
    };
  },

  methods: {
    toggleFormVisibility() {
      this.isFormVisible = !this.isFormVisible;
    },
    async submit(values) {
      console.log(this.song);
      console.log(this.song.docID);
      console.log(values);
      this.isFormInSubmission = true;
      this.isAlertVisible = true;
      this.alertVariant = 'bg-blue-500';
      this.alertMessage = 'Please wait! Updating song info.';

      try {
        // query for song document and update data
        await songsCollection
          .doc(this.song.docID)
          .update(values);
      } catch (err) {
        console.log(err);
        this.isFormInSubmission = false;
        this.alertVariant = 'bg-red-500';
        this.alertMessage = 'Something went wrong! Try again later.';
        return;
      }

      this.isFormInSubmission = false;
      this.alertVariant = 'bg-green-500';
      this.alertMessage = 'Success!';

      this.updateSong(this.index, values);
    },

    async deleteSong() {
      // gotta delete the song from the storage & from the database
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.originalName}`);
      await songRef.delete();

      await songsCollection
        .doc(this.song.docID)
        .delete();

      this.deleteSong(this.index);
    },
  },
};
</script>
