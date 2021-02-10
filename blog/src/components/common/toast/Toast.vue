<template>
  <div class="toast" v-show="isShow">
    <div>&nbsp;{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false,
    }
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 15px 15px;
    border-radius: 15px;
    z-index: 9;
  }
</style>
