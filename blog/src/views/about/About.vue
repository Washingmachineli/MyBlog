<template>
  <div class="about">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div>
        关于
      </div>

      <floor class="floor"/>
    </scroll>
  </div>
</template>

<script>

import {scrollSet} from "@/common/mixin";

export default {
  name: "About",
  components: {
  },
  mixins: [scrollSet],
}
</script>

<style scoped>
  .about {
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
