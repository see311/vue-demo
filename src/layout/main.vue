<template>
  <div>
    main
    <div style="height:32px;background:#e1e1e1;">
      <ZTabs :pageTagsList="$store.state.tagList"/>
    </div>
    <div id="nav">
      <router-link :to="{name:'home'}">Home</router-link>|
      <router-link :to="{name:'about'}">About</router-link>|
      <router-link :to="{name:'test'}">test</router-link>
    </div>
    <a @click.prevent="toTest">toTest</a>
    <router-view/>
  </div>
</template>

<script>
import ZTabs from "@/components/ZTabs.vue";
import Store from '@/store'
import Router from '@/router'
export default {
  components: {
    ZTabs
  },
  methods: {
    addTag(route) {
      var matched = route.matched,
        length = matched.length;
      if (!route.meta.menuName) {
        return;
      }
      this.$store.commit("setTagList", route);
    },
    toTest(){
      this.$router.push('/zeratul/test')
    }
  },
  beforeRouteEnter(to,from,next){
    Store.commit('setTagList',Router.match({ name: "home" }))
    !Store.state.tagList.find(e => e.name === to.name) && Store.commit('setTagList',to)
    next()
  },
  beforeRouteUpdate(to, from, next) {
    !this.$store.state.tagList.find(e => e.name === to.name) && this.addTag(to);
    next();
  },
  created() {
    this.$store.commit("setTagList", this.$router.match({ name: "test" }));
    // this.$store.commit("setTagList", this.$router.match({ name: "about" }));
  }
};
</script>

<style>
</style>
