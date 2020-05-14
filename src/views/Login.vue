<template>
  <div class="login">
      <div class="login-box">
          <div class="login-header">
              <img class="header-logo" src="../assets/login-decorate.png" alt="logo" >
              <p class="header-text">账号{{currentModeText}}</p>
          </div>

          <div class="prompt-tips" :style="{visibility: isPromptVisable}">
              <img class="prompt-logo" src="../assets/prompt-logo.png" alt="感叹号">
              <p class="prompt-text" >{{promptMessg}}</p>
          </div>
          
          <form :action="formAction" target="rfFrame">
               <div class="login-input">
                    <div class="username input-area">
                        <img class="login-logo" src="../assets/login-logo.png" alt="">
                        <input class="username-input" v-model="username" placeholder="请输入手机号/邮箱" name="username" type="text">
                    </div>
                    <div class="passwd input-area" v-if="loginOrSignup=='signup'">
                        <img class="login-logo" src="../assets/login-logo.png" alt="">
                        <input class="passwd-input" v-model="nickName" placeholder="请输入用户昵称" name="nickName" type="password" autocomplete="off" id="">
                    </div>
                    <div class="passwd input-area">
                        <img class="login-logo" src="../assets/login-logo.png" alt="">
                        <input class="passwd-input" @keyup.enter="login()" v-model="passwd" placeholder="请输入密码" name="passwd" type="password" autocomplete="off" id="">
                    </div>
                    
                    <input class="btn-login" type="submit" :value="currentModeText" @click="login()">
                </div>
          </form>
          <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
         

          <div class="login-options">
              <a class="options-help" href="sdfa">帮助手册</a>
              <a class="options-forget" href="sdfa">找回密码</a>
              <a class="options-signup" href="#" @click="switchSignPage()">{{switchModeText}}</a>
          </div>
      </div>
  </div>
</template>
<script>
// import func from '../../vue-temp/vue-editor-bridge'
import common from "../common/common.js";
export default {
  name: "",
  data(){
      return {
            isPromptVisable:"hidden",     // 是否显示信息提示栏
            promptMessg:"",     // 提示信息内容

            // 用户注册或登陆信息
            username:"",          
            passwd:"",
            nickName:"",

            
            loginOrSignup:"login",      // 当前操作为注册还是登陆
            formAction:"",              // form表单地址，分别包含登陆地址和注册地址
            switchModeText:"立即注册",  // 右下方切换操作按钮
            currentModeText:"登陆",     // 当前操作类型

      }
  },
  methods:{
      login:function(){
            if(this.loginOrSignup == "login"){
                console.log("login")
                // if((/^1[3456789]\d{9}$/.test(this.username)) || /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.username) && this.passwd!=""){ 
                if(this.username.length>=5 && this.passwd!=""){ 
                    this.promptMessg = "名称或密码未填写！";
                    this.isPromptVisable = "hidden";
                    // 向数据库查询是否存在用户密码对应关系，存在则返回cookie值
                    this.$http({
                        url: "/login?name="+this.username+"&pwd="+this.passwd,
                        // url: "/login?name=爱人二位"+"&pwd="+this.passwd,
                        method: "get",
                        crossdomain: true,
                        }).then(res => {
                            console.log("res : ",res.data); 
                            this.showToast(res.data,this.$message);

                            // 服务器生成cookie并加密返回给客户端
                            // ?????????????????????????????????????
                            if(res.data==102){
                                setTimeout(() => {
                                    this.$router.push("Extract");
                                }, 600);
                            }
                            
                    });
                        
                }else{
                    this.promptMessg = "名称或密码输入有误！";
                    this.isPromptVisable = "visible";
                }

            }else{
                console.log(this.username)
                console.log(this.nickName)
                console.log(this.passwd)
                if(this.username.length >=5 && this.passwd.length>=6){
                    this.isPromptVisable = "hidden";
                    this.$http({
                        url: "/register?name="+this.username+"&pwd="+this.passwd,
                        // url: "/register?name=爱人"+"&pwd="+this.passwd,
                        method: "get",
                        crossdomain: true,
                        }).then(res => {
                            console.log("res : ",res.data);
                            this.showToast(res.data,this.$message);
                            if(res.data==202){
                                // 注册成功后跳转登陆
                                // this.loginOrSignup = "login";
                                setTimeout(() => {
                                    this.switchSignPage();         
                                }, 600);
                            }
                        });
                        
                    
                    
                }else{
                    this.promptMessg = "名称或密码输入有误！";
                    this.isPromptVisable = "visible";
                }
            }    
            
        },
      showToast:function(code,msg){
       
              switch (code) {
                case 100:
                    msg({
                            message: '用户不存在！',
                            type: 'error'
                    });  
                    break;
                case 101:
                    msg({
                            message: '密码错误！',
                            type: 'error'
                    });  
                    break;
                case 102:
                    msg({
                            message: '登陆成功呢！',
                            type: 'success'
                    });  
                    break;
                // case 200:
                //     msg({
                //             message: '注册成功呢！',
                //             type: 'success'
                //     });  
                //     break;
                case 201:
                    msg({
                            message: '用户名已存在！',
                            type: 'error'
                    });  
                    break;
                case 202:
                    msg({
                            message: '注册成功呢！',
                            type: 'success'
                    });  
                    break;
                
                default:
                    break;
          }
      },
      switchSignPage:function(){
          this.username="";
          this.passwd="";
          this.loginOrSignup = this.loginOrSignup=="signup"?"login":"signup";
          this.switchModeText = this.loginOrSignup=="signup"?"立即登录":"立即注册";
          this.currentModeText = this.loginOrSignup=="signup"?"注册":"登陆";
          this.isPromptVisable = "hidden";
          this.formAction = this.loginOrSignup=="signup"?"actionAddressAAAAAAAAAAAA":"actionAddressBBBBBBBBBBBB";
          
      }

  },
  created:function(){
      console.log("created")
      this.isPromptVisable = "hidden";

      console.log(common.util.getCookie("name"))
    // 若存在cookie，则直接进入登陆页面
    // 此处需要增加页面访问控制权限？
    // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
      if(common.util.getCookie("name")){
          this.$router.replace("Extract");
      }
  }

};
</script>
<style scoped>
    .login{
        height: 700px;
        padding-top: 50px;
        background-color: #fc5563;
        
    }
    .login-box{
        background-color: #fcfefe;
        width: 450px;
        height:auto;
        margin: 0 auto;
        padding-bottom: 20px;
    }

    .login-header{
        /* background-color: beige; */
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .header-logo{
        margin-left: 30px;
        width: 100px;
        height: auto;
        display: inline-block;
    }

    .header-text{
        margin-left: 10px;
        font-size: 17px;
        font-weight: 600;
        display: inline-block;
        /* font: 14px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYiMicro Hei",sans-serif; */
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    .prompt-tips{
        height: 40px;
        /* line-height: 40px; */
        width: 370px;
        /* background-color: burlywood; */
        padding-left: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .prompt-logo{
        width: 10px;
        height: auto;
        display: inline-block;
    }
    .prompt-text{
        margin-left: 10px;
        display: inline-block;
        color: #fd5563;
    }
    .login-input{
        height: auto;
        /* background-color: blueviolet; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-bottom: 90px;
    }
    .input-area{
        margin: 10px auto;
        width: 330px;
        height: 40px;
        /* background-color: aqua;   */
        border: 1px solid #ddd;
        border-radius: 5px;
        background: #fff;
        -khtml-opacity: .95;
        -moz-opacity: .95;
        opacity: .95;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .login-logo{
        margin-left: 5px;
        width: 30px;
        height: auto;
    }

    .username-input,.passwd-input{
        margin-left: 10px;
        width: 300px;
        outline: none;
        border-width: 0;
    }

    .btn-login{

        outline: none;
        margin: 20px auto 0 auto;
        width: 330px;
        height: 40px;
        border: none;
        /* background-color: aqua;   */
        border-radius: 5px;
        background: #fc5563;
        line-height: 40px;
        font-size: 20px;
        color: white;
        letter-spacing: 15px;
    }

    .login-options{
        height: 30px;
        /* background-color: rgb(234, 245, 87); */
        line-height: 30px;
        
    }

    .options-help{
        display: inline-block;
        text-align: start;
        padding-left: 20px;
        width: 200px;
        color: #969d9f;
        /* background-color: rgb(26, 167, 84); */
    }
    .options-forget{
        display: inline-block;
        margin: 0 5px;
        width: 100px;
        color: #969d9f;
        /* background-color: rgb(52, 97, 182); */

    }
    .options-signup{
        display: inline-block;
        margin: 0 5px;
        width: 100px;
        color: #969d9f;
        /* background-color: rgb(12, 87, 199); */
    }

    /*包含以下五种的链接*/
    a {
        text-decoration: none;
    }
    /*正常的未被访问过的链接*/
    a:link {
        text-decoration: none;
    }
    /*已经访问过的链接*/
    a:visited {
        text-decoration: none;
    }
    /*鼠标划过(停留)的链接*/
    a:hover {
        text-decoration: none;
    }
    /* 正在点击的链接，鼠标在元素上按下还没有松开*/
    a:active {
        text-decoration: none;
    }
    /* 获得焦点的时候 鼠标松开时显示的颜色*/
    a:focus {
        text-decoration: none;
    }








    

</style>
