<template>
  <div class="hobby">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div>
        hobby
      </div>

      <floor class="floor"/>
    </scroll>
  </div>
</template>

<script>

import {scrollSet} from "@/common/mixin";

export default {
  name: "Hobby",
  components: {
  },
  mixins: [scrollSet],
}
</script>

<style scoped>
  .hobby {
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
