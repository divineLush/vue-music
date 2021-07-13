import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthModalVisible: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.isAuthModalVisible = !state.isAuthModalVisible;
    },
  },
});
