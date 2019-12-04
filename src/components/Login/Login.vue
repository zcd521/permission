<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="item" :rules="rules" ref="item" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="item.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="item.password"
            @keyup.enter.native="submitForm('item')"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary"  @click.prevent="submitForm('item')" >登录</el-button>
        </div>
        <div style="color:red;">提示：admin 和 user 权限不一样， 密码都是1</div>
      </el-form>
    </div>
    <!-- <a class="bottom_info" href="" target="_blank"></a> -->
  </div>
</template>          

<script>
import { onLog } from '@/api/api';
export default {
  name: "login",
  data: function() {
    return {
      //账号
      item: {
        username: "admin",
        password: "1",
      },
      //账号为空
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        vrifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
    };
  },
  created() {
  },
  watch: {
  },
  methods: {
    //登录
    async submitForm(formName) {
       const self = this;
       if(self.item.password === '' || self.item.username === ''){
          this.$refs[formName].validate(valid => {return false;});
      }else{
        await onLog(self.item.username,self.item.password)
        .then(res => {   
            console.log(res)
            const token = res.data.token
            const userInfo = res.data.userInfo
            //存储es
            sessionStorage.setItem('NxToken',token);
            //应该解析
            sessionStorage.setItem('userInfo',JSON.stringify(userInfo))


            //存储vuex
            this.$store.dispatch('setUserInfo',userInfo);
            this.$store.dispatch('setAuthenticated', !this.isEmpty(token));

            this.$router.push({ path: "/index" });
           
            })
            .catch(error => {
              console.log("error", error);
            });
      }
    },
    //判断
    isEmpty(value){
      return (
        value === undefined || 
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
    }
  },

};
</script>
        
<style scoped>
.login-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  /* background: url(../../assets/img/menhu.jpg) no-repeat; */
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
  
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  /* background: orange; */
  border: 0;
}
</style>