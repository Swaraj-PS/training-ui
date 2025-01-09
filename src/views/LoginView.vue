<template>
  <div class="login-con">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input v-model="form.username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="form.password" type="password" id="password"  required />
      </div>
      <button type="submit">Login</button>
      <div>
        <h3>New Here ? <RouterLink to='register'>Register Now</RouterLink></h3>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';
import Store from '@/store/store'
// import { RouterLink } from 'vue-router';

export default {
  name: 'LoginView',

  data(){
    return{
      form:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    async handleLogin(){
      console.log(this.form.username);
      const response = await axios.post('https://intern2.uptrain.co/api/v1/user/login',this.form)
      console.log(response.data.status);
      if (response.data.status=='success') {
            alert('Login successfull');
            Store.commit('login');
            localStorage.setItem('userId',response.data.data.id);
            localStorage.setItem('username',response.data.data.username);            
            router.push({path:'home'});
      }else{
            alert(response.data.message)
      }
              
    }          
  }
};
</script>
