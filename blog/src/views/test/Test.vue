<template>
  <div class="test">
     <scroll-view style="width: 50%; height: 400px;"  :comment-info="lastComment"/>
  </div>
</template>

<script>
  import ScrollView from "@/components/common/scrollView/ScrollView";
  import {getComment} from "@/network/blog";
  export default {
    name: "Test",
    components: {ScrollView},
    data() {
      return {
        page: 0,
        lastComment: {}
      }
    },
    created() {
      getComment(null, this.page).then( res => {
        this.lastComment = res.data
      })
    }
  }
</script>

<style scoped>

.test{
  position: relative;
  top: 65px;
}
</style>
