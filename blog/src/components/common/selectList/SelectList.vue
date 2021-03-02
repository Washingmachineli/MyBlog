<template>
  <div class="select-list">
    <select id="selectKind" v-model="chooseItem">
      <option v-for="x in articleKind" :value="x" >{{x}}</option>
    </select>
  </div>

</template>
<script>
  export default {
    name: "SelectList",
    inject:['reload'],
    props: {
      articleKind: {
        type: Array,
        default: []
      },
      choose: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        chooseItem: ''
      }
    },
    created() {
      this.chooseItem = this.choose
    },
    methods: {
      getValue() {
        return document.getElementById('selectKind').value
      },
    }
  }
</script>

<style scoped>
  .select-list select{
    padding: 5px 5px;
    margin: 0 10px;
    width: 100px;
    height: 30px;
    border-radius: 10px;
  }

  .select-list select{
    background-color: #fff;
    border: 1px solid black;
    outline: none;
  }
</style>

