<template>
  <div>
    main
    <div style="height:32px;background:#e1e1e1;">
      <ZTabs :pageTagsList="$store.state.tagList"/>
    </div>
    <div id="nav">
      <router-link :to="{name:'home'}">Home</router-link>|
      <router-link :to="{name:'about'}">About</router-link>|
      <router-link :to="{name:'test1'}">test1</router-link>|
      <router-link :to="{name:'test2'}">test2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import ZTabs from "@/components/ZTabs.vue";
import Store from "@/store";
import Router from "@/router";
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
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // console.log('enter',to.name);
    
  //   // Store.commit("setTagList", Router.match({ name: "home" }));
  //   // !Store.state.tagList.find(e => e.name === to.name) &&
  //   //   Store.commit("setTagList", to);
  //   next();
  // },
  beforeRouteUpdate(to, from, next) {
    console.log("toname", to.name);
    console.log("fromname", from.name);
    console.log("-------------------------");

    next();
    !this.$store.state.tagList.find(e => e.name === to.name) && this.addTag(to);
  },
  created() {
    this.$store.commit("setTagList", this.$router.match({ name: "home" }));
    this.addTag(this.$route);
    
    // this.$store.commit("setTagList", this.$router.match({ name: "about" }));
  }
};
</script>

<style>
</style>
