<template>
  <div class="label-show">
    <div class="title">
      热门标签
    </div>
    <div>
      <span class="label"
            :style="{'color': labelInfo[x].color,'background-color': labelInfo[x].backgroundColor}"
            v-for="x in Object.keys(labelInfo)">{{x}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LabelShow",
    props: {
      labelInfo: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>

  .label-show {
    margin-top: 20px;
    height: 300px;
    text-align: center;
    border: 1px solid #888888;
    border-radius: 10px;
    box-shadow: 3px 3px 3px #888888;
  }

  .title {
    padding: 25px 0;
    font-size: 25px;
    font-weight: bold;
    color: black;
  }

  .label {
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;/*
    background-color: red;
    color: white;*/
  }
</style>
