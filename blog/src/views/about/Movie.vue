<template>
  <div class="movie">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div>
        movie
      </div>

      <floor class="floor"/>
    </scroll>
  </div>
</template>

<script>

import {scrollSet} from "@/common/mixin";

export default {
  name: "Movie",
  components: {
  },
  mixins: [scrollSet],
}
</script>

<style scoped>
  .movie {
    position: relative;
    height: 100vh;
  }

  .scroll {
    position: absolute;
    overflow: hidden;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
