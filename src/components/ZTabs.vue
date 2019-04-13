<template>
  <div
    ref="scrollCon"
    @DOMMouseScroll="handlescroll"
    @mousewheel="handlescroll"
    class="tags-outer-scroll-con"
  >
    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
      <div>
        <template v-for="(page,index) in pageTagsList">
          <span :key="index" v-if="index!==0">|</span>
          <z-tag
            :to="page"
            :fullPath="page.fullPath"
            ref="tagsPageOpened"
            :key="-index-1"
          >{{`${page.meta.menuName}${page.meta.dynamic?`_${page.params[Object.keys(page.params)[0]]}`:''}`}}</z-tag>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ZTag from "./ZTag";
export default {
  name: "tagsPageOpened",
  components: {
    ZTag
  },
  data() {
    return {
      tagBodyLeft: 0,
      outerPadding: 0,
      refsTag: [],
      tagsCount: 1
    };
  },
  props: {
    pageTagsList: Array
  },
  methods: {
    handlescroll(e) {
      e.preventDefault();
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      let left = 0;
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              280
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                280
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }

      this.tagBodyLeft = left;
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollCon.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0;
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        );
      }
    },
    getTagElementByFullPath(fullPath) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;

        this.refsTag.forEach((item, index) => {
          if (fullPath === item.to.fullPath) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.getTagElementByFullPath(this.$route.fullPath);
    }, 200);
    this.$on("closeTag", to => {
      this.$emit("close", to);
      var i = -1;
      this.pageTagsList.forEach((item, index) => {
        if (item.fullPath == to.fullPath) {
          i = index;
          return;
        }
      });
      this.$store.commit("ejectTag", i);
      console.log(i);
      
      this.$nextTick(() => {
        console.log(this.pageTagsList);
        
        if (this.pageTagsList[i]) {
          // 如果有下一个标签，就激活下一个标签
          this.getTagElementByFullPath(this.pageTagsList[i].fullPath);
          this.$router.push(this.pageTagsList[i].path);
        } else {
          // 否则激活前一个标签
          this.getTagElementByFullPath(this.pageTagsList[i - 1].fullPath);
          console.log(this.pageTagsList[i - 1].fullPath);
          
          this.$router.push(this.pageTagsList[i - 1].fullPath);
        }
      });
    });
  },
  watch: {
    $route(to) {
      this.getTagElementByFullPath(to.fullPath);
    }
  }
};
</script>

<style>
.tags-outer-scroll-con {
  position: relative;
  box-sizing: border-box;
  width: calc(100% - 390px);
  height: 100%;
  overflow: hidden;
}
.tags-inner-scroll-body {
  height: 100%;
  position: absolute;
  overflow: visible;
  white-space: nowrap;
  transition: left 0.3s ease;
}
</style>
