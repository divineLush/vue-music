import { Howl } from 'howler';
import formatTime from '@/includes/formatTime';

export default {
  state: {
    currentSong: {},
    sound: {},
    // seek is a current position in Howler
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  mutations: {
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

      const progress = (state.sound.seek() / state.sound.duration()) * 100;
      state.playerProgress = `${progress}%`;
    },
  },
  getters: {
    isPlaying: (state) => (state.sound.playing
      ? state.sound.playing() : false),
  },
  actions: {
    async newSong({ commit, state, dispatch }, payload) {
      if (state.sound instanceof Howl) {
        // destroy previous audio source
        state.sound.unload();
      }

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
    updateSeek({ state, dispatch }, { currentTarget, clientX }) {
      if (!state.sound.playing) {
        return;
      }

      // x is a distance from the left side of the document to the left side of the player
      const { x, width } = currentTarget.getBoundingClientRect();
      const percentage = (clientX - x) / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);
      // listen to seek event emitted when the audio has changed position
      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
};
