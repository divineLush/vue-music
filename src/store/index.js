import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';
import { Howl } from 'howler';
import formatTime from '@/includes/formatTime';

export default createStore({
  state: {
    isAuthModalVisible: false,
    isUserLoggedIn: false,
    currentSong: {},
    sound: {},
    // seek is a current position in Howler
    seek: '00:00',
    duration: '00:00',
  },
  mutations: {
    toggleAuthModal(state) {
      state.isAuthModalVisible = !state.isAuthModalVisible;
    },
    toggleAuth(state) {
      state.isUserLoggedIn = !state.isUserLoggedIn;
    },
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        // switch to html5 audio api to retrieve audio files
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = formatTime(state.sound.seek());
      state.duration = formatTime(state.sound.duration());
    },
  },
  getters: {
    isPlaying: (state) => (state.sound.playing
      ? state.sound.playing() : false),
  },
  actions: {
    // context, payload
    async register({ commit }, {
      email,
      password,
      name,
      age,
      country,
    }) {
      const userCredentials = await auth.createUserWithEmailAndPassword(email, password);

      await usersCollection
        // .doc() adds document to the database and returns a document
        .doc(userCredentials.user.uid)
        // .set() adds/modifies properties in a document
        .set({
          name,
          email,
          age,
          country,
        });

      // every registered user comes with a profile
      await userCredentials.user.updateProfile({ displayName: name });

      commit('toggleAuth');
    },
    initLogin({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async login({ commit }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);

      commit('toggleAuth');
    },
    async signOut({ commit }) {
      await auth.signOut();

      commit('toggleAuth');
    },
    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);

      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          // dispatch progress function
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      // check if playing function exists
      if (!state.sound.playing) {
        return;
      }

      // check if the audio is playing
      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      // commit a mutation & dispatch progress function again
      // recursion!
      // position is stored in a store so we won't commit it as a payload
      commit('updatePosition');

      if (state.sound.playing) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
  },
});
