import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    isAuthModalVisible: false,
    isUserLoggedIn: false,
  },
  mutations: {
    toggleAuthModal(state) {
      state.isAuthModalVisible = !state.isAuthModalVisible;
    },
    toggleAuth(state) {
      state.isUserLoggedIn = !state.isUserLoggedIn;
    },
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
      await auth.createUserWithEmailAndPassword(email, password);
      await usersCollection.add({
        name,
        email,
        age,
        country,
      });

      commit('toggleAuth');
    },
  },
});
