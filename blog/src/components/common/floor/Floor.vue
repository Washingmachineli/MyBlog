<template>
  <div class="floor">
    <div class="floor-title"><i>Ela's Blog</i></div>
    <div class="floor-content">Copyright © 2021 | All right reserved</div>
  </div>
</template>

<script>
  export default {
    name: "Floor"
  }
</script>

<style scoped>
  .floor {
    width: 100%;
    height: 70px;
    background-color: #2c7c58;
    color: white;
    text-align: center;
  }

  .floor-title {
    padding: 10px 0;
    line-height: 20px;
  }

  .floor-content {
    line-height: 20px;
  }
</style>
