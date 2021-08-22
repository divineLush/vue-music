<template>
  <app-header></app-header>

  <router-view></router-view>

  <app-player></app-player>

  <app-auth></app-auth>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppAuth from './components/AppAuth.vue';
import AppPlayer from './components/AppPlayer.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppAuth,
    AppPlayer,
  },

  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>
