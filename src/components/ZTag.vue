<template>
  <router-link class="z-tag" :to="to.path">
    <span class="router-text" :style="{'margin-right':(to.name == 'home'||!active)?'0':'10px'}">
      <slot></slot>
    </span>
    <span class="icon-close" @click="closeTag" v-if="to.name!='home'">
      <i class="el-icon-close"></i>
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    },
    fullPath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    dividerVisibility() {
      this.active = this.$route.fullPath == this.to.fullPath ? true : false;
      var prev = this.$el.previousElementSibling;
      var next = this.$el.nextElementSibling;
      if (this.$route.fullPath == this.to.fullPath) {
        this.$nextTick(() => {
          prev && (prev.style.visibility = "hidden");
          next && (next.style.visibility = "hidden");
        });
      } else {
        prev && (prev.style.visibility = "visible");
        next && (next.style.visibility = "visible");
      }
    },
    closeTag() {
      this.$parent.$emit("closeTag", this.to);
    }
  },
  mounted() {
    this.dividerVisibility();
  },
  watch: {
    $route(to, from) {
      this.dividerVisibility();
    }
  }
};
</script>

<style>
.z-tag {
  display: inline-block;
  padding: 8px 22px;
  cursor: pointer;
  color: #666;
  transition: all 0.4s;
  position: relative;
}
.z-tag.router-link-active {
  background: #fff;
  color: #666;
}
.z-tag .icon-close {
  width: 0;
  overflow: hidden;
  position: absolute;
  top: 8px;
  right: 10px;
  transition: width 0.3s;
}
.z-tag.router-link-active .icon-close {
  width: 14px;
}

.z-tag .router-text {
  margin: 0;
  transition: all 0.3s;
}
.z-tag.router-link-active .router-text {
  margin: 0 10px 0 0;
}
.z-tag .el-icon-close {
  color: #666;
}
.z-tag .el-icon-close::before {
  content: "X";
}
.z-tag .el-icon-close:hover {
  color: #ccc;
}
</style>
