<template>
  <div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div @click="dialogOpen">open</div>
    <dialog-message :is-show="dialogShow"
                    :wid-num="50"
                    :left-site="25"
                    :dialog-kind="2"
                    @dialogClose="dialogClose"
                    @chooseNo="dialogClose"
                    @chooseYes="dialogClose"/>
  </div>
</template>

<script>
  import DialogMessage from "@/components/common/dialogMessage/DialogMessage";
  export default {
    name: "Test",
    data() {
      return {
        dialogShow: false
      }
    },
    components: {
      DialogMessage

    },
    methods: {
      dialogClose() {
        this.dialogShow = false
      },
      dialogOpen() {
        this.dialogShow = true
      },
    }
  }
</script>

<style scoped>

</style>
