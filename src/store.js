import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tagList: []
  },
  mutations: {
    setTagList(state, payload) {
      if (!state.tagList.find(e => e.fullPath == payload.fullPath))
        state.tagList.push(payload);
    },
    ejectTag(state, i) {
      state.tagList.splice(i, 1);
    }
  },
  actions: {}
});
