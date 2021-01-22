<template>
  <div>
    {{newWord}}
  </div>
</template>

<script>
  export default {
    name: "BeatText",
    props: {
      message: {
        type: String,
        default: ''
      },
      setTime: {
        type: Number,
        default: 100
      }
    },
    data(){
      return {
        newWord: '',
        index: 0,
        isAdd: true,
        stopTime: 5000
      }
    },
    created(){
      this.showWords()
    },
    methods: {
      showWords() {
        let time = this.setTime
        if(this.index < this.message.length && this.isAdd) {
          this.newWord += this.message[this.index]
          this.index = this.index + 1
          if(this.index === this.message.length){
            time = this.stopTime
          }
        }
        else if(this.index > 0){
          this.isAdd = false
          this.newWord = this.newWord.slice(0, this.index--)
        }
        else {
          this.index = 0
          this.newWord = ''
          this.isAdd = true
        }
        setTimeout( () => {
          this.showWords()
        }, time)
      }
    }
  }
</script>

<style scoped>

</style>
