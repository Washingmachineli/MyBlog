<template>
  <div class="login">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3">
      <div class="login-content">
        <div class="login-content-item">

          <div class="login-img">
            <img src="~assets/img/login/cat.jpg"/>
          </div>
          <div class="title">Sign in to Blog</div>
          <div class="login-table">
            <label class="login-label">Username</label>
            <input class="username" id="username" placeholder="用户名" autocomplete="off" type="text"  value="">
            <label class="login-label">Password</label>
            <input class="password" id="password" placeholder="密码" autocomplete="off" type="password"  value="">
            <div :class="{loginButton: !isActive, isActive: isActive}"
                 @click="login">{{activeWord}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>

  import Toast from "@/components/common/toast/Toast";

  import {scrollSet} from "@/common/mixin";
  import {login, checkToken} from "@/network/login";
  import { mapGetters } from 'vuex'

  export default {
    name: "Login",
    components: {
      Toast
    },
    mixins: [scrollSet],
    data() {
      return {
        isActive: false,
        activeWord: 'sign in'
      }
    },
    created() {
    },
    computed: {
      ...mapGetters(['token']),
    },
    methods: {
      login() {

        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        if(username === '')
        {
          this.$toast.show('用户名不能为空！', 3000)
        }
        else if(password === '')
        {
          this.$toast.show('密码不能为空！', 3000)
        }
        else {

          this.activeWord = 'sign in ...'
          this.isActive = true
          login(username, password).then( res => {
            if(res.state == '-3') {
              this.activeWord = 'sign in'
              this.isActive = false
              this.$toast.show('服务器错误！', 3000)
            }
            else if( res.state == '-1') {
              this.activeWord = 'sign in'
              this.isActive = false
              this.$toast.show('用户名或密码错误！', 3000)
            }
            else {
              this.$emit('loginSuccess')
              this.$store.dispatch('addToken', res.token)
              window.sessionStorage.setItem("token", res.token);
              this.$router.replace('/adminHome').catch(err=>err);
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

  @font-face
  {
    font-family: loginTitleFont;
    src: url('~assets/font/上首简黑中细体粗.ttf'); /* IE9+ */
  }

  @font-face
  {
    font-family: otherFont;
    src: url('~assets/font/小熊冻冻奶.ttf'); /* IE9+ */
  }

  .login {
    position: relative;
    height: 100vh;
    background-image: none;
    font-family: loginTitleFont;
  }

  .login:before{
    position: absolute;
    background-image: url('~assets/img/home/浅绿.jpg');
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    opacity: .4;
    z-index: -1;
  }

  .scroll {
    position: absolute;
    overflow: hidden;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  /*.login-content {
    width: 100%;
    height: 100%;
    display: table;
    padding: 20px 0;
  }*/

  .login-content {
    position: relative;
    width: 100%;
    height: calc(100vh - 65px);
    display: table;
    padding: 20px 0;
  }


  .login-content-item {
    display: table-cell;
    vertical-align: middle;
  }

  .login-img, .title {
    text-align: center;
  }

  .login-img img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }

  .title {
    font-size: 25px;
  }

  .login-table {
    padding-top: 20px;
    position:relative;
    margin-top: 20px;
    margin-left: 33%;
    width: 35%;
    height: 50%;
    background-color: rgba(246, 248, 250, .8);
    border-radius: 30px;
    box-shadow: 0 1px 2px #ccc, 0 0 1px #ccc, 0 0 1px #ccc;
  }


  .login-label {
    padding-top: 20px;
    display: block;
    text-align: left;
    margin-left: 15%;
    padding-bottom: 10px;
  }

  .username, .password{
    width: 70%;
    margin-left: 15%;
    margin-right: 22%;
    line-height: 40px;
    border: 0;
    outline:none;
    border-radius: 8px;
    text-indent: 1em;
  }

  .loginButton {
    width: 70%;
    margin-left: 15%;
    color: white;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 30px;
    background-color: #48AA71;
  }

  .loginButton:hover{
    background-color: #458F64;
    -webkit-transform:translateY(1px);
    -moz-transform:translateY(1px);
    -ms-transform:translateY(1px);
    -o-transform:translateY(1px);
    transform:translateY(1px);
  }

  .isActive {
    width: 70%;
    margin-left: 15%;
    color: white;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 30px;
    background-color: #458F64;
  }
</style>
