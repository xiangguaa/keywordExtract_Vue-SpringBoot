<template>
    <div class="extract">
        <div class="input">
            <form class="input-form" action="" target="rfFrame">
                <div class="title input-cell">
                    <label class="label-part" for="title">标题</label>
                    <input class="input-part" v-model="title" placeholder="请输入标题内容(可选)" type="text" name="title" id="title">
                </div>
                <div class="lead input-cell">
                    <label class="label-part" for="lead">导语</label>
                    <input class="input-part" v-model="lead" placeholder="请输入导语内容(可选)" type="text" name="lead" id="lead">
                </div>
                <div class="main input-cell">
                    <label class="label-part" for="main">正文</label>
                    <!-- <input class="input-part" placeholder="请输入" type="text" name="main" id="main"> -->
                    <textarea class="input-part" v-model="main" required placeholder="请输入正文内容(必填)"  name="main" id="main"></textarea>
                </div>
                <div class="conclusion input-cell">
                    <label class="label-part" for="conclusion">结论</label>
                    <input class="input-part" v-model="conclusion" placeholder="请输入结论内容(可选)" type="text" name="conclusion" id="title">
                </div>
                <div class="others input-cell">
                    <label class="label-part" for="others">其他</label>
                    <textarea class="input-part" v-model="others"  placeholder="请输入其他部分(可选)" type="text" name="others" id="others"></textarea>
                </div>
                <div class="submit">
                    <input @click="submit()" class="btn-submit" type="submit" value="提交">
                </div>
                <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
            </form>
        </div>
        <div class="output">
            <!-- <div class="output-title">输出结果</div> -->
            <div class="keyworld-label" :style="{backgroundColor:'#'+(40+idx*5).toString(16)+(100+idx*5).toString(16)+(60+idx*5).toString(16)}" v-for="(item,idx) in keywords" :key="idx">
                {{item}}  - {{(idx+1)*10}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name:'Extract',
  data(){
      return {
          // 文章结构
          title:"",
          lead:"",
          main:"",
          conclusion:"",
          others:"",

          // keywords
          keywords:[],

          color:""

      }
  },
  methods:{
      submit(){
        //   提交内容
          console.log(this.title)
          console.log(this.lead)
          console.log(this.main)
          console.log(this.conclusion)
          console.log(this.others)
        // 接收返回结果，并传递给keywords
        this.keywords = [['疫情', 7.54729319353285], ['中俄', 5.97738375145], ['政治化', 5.53373215395], ['论调', 4.994327323275], ['驳斥', 4.67340038019], ['齐声', 4.27204568865], ['抗疫', 2.8766217539259413], ['俄罗斯', 2.2395114189143657], ['俄方', 2.1307139973873976], ['俄中', 1.5593175003782607], ['中国', 1.5434895539495055], ['团结合作', 1.4785732558043478], ['相互支持', 1.451489860395652], ['普京', 1.3895768411076794], ['克里姆林宫', 1.3570656639782608], ['连贯', 1.2399428474739131], ['交流', 1.1055882127037597], ['赞赏', 1.080509550562174], ['并称', 1.0595250428804348], ['经验', 0.9842762482003293], ['合作', 0.9618232171483657], ['表示', 0.8722119455169952], ['习近平', 0.5930073097253846], ['16', 0.40871000009914527], ['通电话', 0.3517866577538462], ['报道', 0.32668928773111106], ['新冠', 0.2554437500619658], ['莫斯科', 0.24713315235931624]]

      }

  }

}
</script>
<style scoped>
    .extract{
        width: 1200px;
        height: 600px;
        margin: 8px auto;
        /* background-color: blue; */
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px rgb(150, 150, 150) solid;
    }
    .input{
        width:80%;
        height: 100%;
        /* background-color: aqua; */

    }
    
    .input-form{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        /* padding: 10px 0; */
    }
    .input-cell{
        width: 90%;
        height: 5%;
        margin-top: 10px;
        background-color: #c8d6d6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 2px;
    }
    .label-part{
        width: 8%;
        /* background-color: brown; */
        font-weight: 600;
    }
    .input-part{
        width: 88%;
        height: 85%;
        outline: none;
        border: none;
    }
    textarea{
        resize: none;
    }
    .main{
        height: 40%;
    }
    
    .others{
        height: 20%;
    }
    .submit{
        height: 5%;
        width: 100%;
        /* background-color: pink; */
        position: relative;
    }
    .btn-submit{
        position: absolute;
        height: 40px;
        width: 40px;
        right: 20px;
        bottom: 5px;
        padding: 2px;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: #566d97;
        box-shadow: 0 0 10px 5px #566d97;
    }
    .btn-submit:hover{
        filter: grayscale(50%);
    }



    .output{
        width:20%;
        height: 100%;
        overflow: auto;
        border-left: 1px rgb(150, 150, 150) solid;

    }
    .output-title{
        font-weight: 25px;
        font-weight: 600;
        position: fixed;
    }

    .keyworld-label{
        margin: 5px;
        color: rgb(63, 25, 0);
        font-weight: 700px;
    }
    
    


</style>
