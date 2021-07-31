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
  },
});
