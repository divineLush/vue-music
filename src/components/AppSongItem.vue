<template>
  <li class="flex justify-between items-center p-3 pl-6 cursor-pointer
    transition duration-300 hover:bg-gray-50">
    <div>
      <router-link
        :to="songLink"
        class="font-bold block text-gray-600"
      >
        {{ song.modifiedName }}
      </router-link>
      <span class="text-gray-500 text-sm">{{ song.displayName }}</span>
    </div>
    <div class="text-gray-600 text-lg">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
      </span>
      {{ song.commentCount }}
    </div>
  </li>
</template>

<script>
export default {
  name: 'AppSongItem',

  props: {
    song: {
      type: Object,
      required: true,
    },
  },

  computed: {
    songLink() {
      return {
        name: 'song',
        params: {
          id: this.song.docID,
        },
      };
    },
  },
};
</script>
