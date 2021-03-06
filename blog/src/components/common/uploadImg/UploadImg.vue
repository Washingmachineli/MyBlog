<template>
  <div class="upload-img">
    <div class="choose-img" v-if="!isReady">
      上传图片
      <input type="file" @change="loadImg" id="img">
    </div>
    <div v-if="isReady" class="show-img">
      <div><img :src="imgSrc"/></div>
      <div class="cancelButton" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UploadImg",
    props: {
      img: {
        type: String,
        default: ''
      },
      imgShow: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        imgSrc: this.img,
        isReady: this.imgShow
      }
    },
    methods:{
      loadImg() {
        let _this = this;
        let reader = new FileReader();
        let file = document.getElementById("img").files[0];
        let objType = file.type
        let Max_size= file.size;
        let beat64Url;
        if(!(objType == 'image/jpg'||objType == 'image/jpeg'||objType == 'image/png'))
        {
          this.$toast.show('请上传jpg、jpeg、png类型图片！', 3000)
          document.getElementById('img').value = ''
        }
        else {
          if (Max_size > 1024 * 1024 * 2) {

            this.$toast.show('图片超过2兆，请压缩后上传！', 3000)
            document.getElementById('img').value = ''
          } else {
            reader.readAsDataURL(file);
            reader.onload = function (e) {
              beat64Url = this.result;
              _this.imgLoad(beat64Url)
            }
          }
        }
      },
      imgLoad(beat64Url){

        this.imgSrc = beat64Url
        this.isReady = true
      },
      cancel() {
        this.isReady = false
      },
      getValue(){
        return this.imgSrc
      }
    }
  }
</script>

<style scoped>

  .choose-img {
    width: 80px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    position: relative;
    left: 10px;
    top: 50%;
    display: inline-block;
    text-align: center;
    color: white;
    background-color: #48AA71;
    border-radius: 5px;
  }

  .choose-img [type=file] {
    width: 80px;
    height: 40px;
    position: absolute;
    left: 0px;
    top: 50%;
    opacity: 0;
    -ms-filter: 'alpha(opacity=0)';


    cursor: pointer;

  }

  .show-img{
    width: 100%;
    margin-left: 10%;
    display: inline-block;
    vertical-align: middle;
  }

  .show-img div{
    display: inline-block;
    vertical-align: middle;
  }

  .show-img div img {
    width: 300px;
    height: 150px;
    border: 1px solid black;
    border-radius: 10px;
  }

  .cancelButton {
    margin-left: 40px;
    text-align: center;
    width: 60px;
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: #48AA71;
    border-radius: 5px;
  }

</style>
