<template>
  <div class="time" v-if="!isClose">
    <div class="clock">
      <div class="button">
        <span class="close" @click="closeClock"></span>
      </div>
      <canvas class="canvas" id="canvas" width="100" height="100"></canvas>
    </div>
  </div>
</template>

<script>

  export default {
    name: "TimeClock",
    data() {
      return {
        canvas: null,
        ctx: null,
        clockRadius: 100,
        clockImage: null,
        isClose: false
      }
    },
    mounted() {

      this.initCanvas()
      this.clockImage = new Image();
      this.clockImage.src = 'https://static.runoob.com/images/mix/125855_nnla_89964.png';

      setInterval(this.drawScene, 100); // loop drawScene

      /*const canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');

      // var width = canvas.width;
      // var height = canvas.height;

      const clockImage = new Image();
      clockImage.src = 'https://static.runoob.com/images/mix/125855_nnla_89964.png';

      setInterval(this.drawScene, 100); // loop drawScene
    */},
    methods: {
      initCanvas() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
      },
      clear() { // clear canvas function
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      },
      drawScene() { // main drawScene function
        this.clear(); // clear canvas

        // get current time
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        hours = hours > 12 ? hours - 12 : hours;
        let hour = hours + minutes / 60;
        let minute = minutes + seconds / 60;

        // save current context
        this.ctx.save();

        //绘制表盘背景图
        this.ctx.drawImage(this.clockImage, 0, 0, 100, 100);

        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.beginPath();

       /* // 绘制数字
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#000';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        for (let n = 1; n <= 12; n++) {
          let theta = (n - 3) * (Math.PI * 2) / 12;
          let x = this.clockRadius * 0.7 * Math.cos(theta);
          let y = this.clockRadius * 0.7 * Math.sin(theta);
          this.ctx.fillText(n.toString(), x, y);
        }
*/
        // 绘制时间
        this.ctx.save();
        let theta = (hour - 3) * 2 * Math.PI / 12;
        this.ctx.rotate(theta);
        this.ctx.beginPath();
        this.ctx.moveTo(-15, -5);
        this.ctx.lineTo(-15, 5);
        this.ctx.lineTo(this.clockRadius * 0.3, 1);
        this.ctx.lineTo(this.clockRadius * 0.3, -1);
        this.ctx.fill();
        this.ctx.restore();

        // 绘制分钟
        this.ctx.save();
        theta = (minute - 15) * 2 * Math.PI / 60;
        this.ctx.rotate(theta);
        this.ctx.beginPath();
        this.ctx.moveTo(-15, -4);
        this.ctx.lineTo(-15, 4);
        this.ctx.lineTo(this.clockRadius * 0.5, 1);
        this.ctx.lineTo(this.clockRadius * 0.5, -1);
        this.ctx.fill();
        this.ctx.restore();

        // 绘制秒
        this.ctx.save();
        theta = (seconds - 15) * 2 * Math.PI / 60;
        this.ctx.rotate(theta);
        this.ctx.beginPath();
        this.ctx.moveTo(-15, -3);
        this.ctx.lineTo(-15, 3);
        this.ctx.lineTo(this.clockRadius * 0.7, 1);
        this.ctx.lineTo(this.clockRadius * 0.7, -1);
        this.ctx.fillStyle = 'grey';
        this.ctx.fill();
        this.ctx.restore();

        this.ctx.restore();
      },
      closeClock() {
        this.isClose = true;
      }
    }
  }
</script>

<style scoped>
  .time {
    width: 200px;
    height: 200px;
    text-align: center;
  }

  .button {
    height: 20px;
    position: absolute;
    top: 10px;
    right: 15px;
  }

  .close {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-image: url("~assets/img/timeClock/关闭.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .clock {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('~assets/img/timeClock/13.gif');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .canvas {
    position: absolute;
    top: 51px;
    left: 51px;
    height: 100px;
    margin: auto;
  }


</style>
