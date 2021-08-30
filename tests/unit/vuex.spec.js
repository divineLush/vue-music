import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import player from '@/store/modules/player';
import { cloneDeep } from 'lodash';

describe('Vuex store', () => {
  test('toggleAuth mutation sets isUserLoggedIn to true', () => {
    const cloneAuth = cloneDeep(auth);

    const store = createStore({
      modules: {
        auth: cloneAuth,
      },
    });

    expect(store.state.auth.isUserLoggedIn).toBe(false);
    store.commit('toggleAuth');
    expect(store.state.auth.isUserLoggedIn).toBe(true);
  });

  test('login action sets isUserLoggedIn to true', async () => {
    // expect.assertions(2);

    const cloneAuth = cloneDeep(auth);

    const store = createStore({
      modules: {
        auth: cloneAuth,
      },
    });

    expect(store.state.auth.isUserLoggedIn).toBe(false);
    await store.dispatch('login', { email: 'ko@mail.com', password: 'qwertyuiop' });
    expect(store.state.auth.isUserLoggedIn).toBe(true);
  });

  test('isPlaying returns true if audio is playing', () => {
    const state = {
      sound: {
        playing: () => true,
      },
    };

    const result = player.getters.isPlaying(state);
    expect(result).toEqual(true);
  });
});
