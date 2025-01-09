<template>
    <div class="register-con">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="username">Username</label>
          <input v-model="form.username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="form.password" type="password" id="password"  required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '@/routes';
import Store from '@/store/store'

  export default {
    name: 'RegisterView',
  
    data(){
      return{
        form:{
          username:"",
          password:""
        }
      }
    },

    methods:{
      async handleRegister(){
        const response = await axios.post('https://intern2.uptrain.co/api/v1/user/register',this.form)
        console.log(response.data.status);
        if (response.data.status=='success') {
            alert('user registered successfully');
            Store.commit('login');
            router.push({path:'home'});
      }else{
            alert('registration failed'+response.data.message)
      }
                      
    },
 }
};
  </script>
  