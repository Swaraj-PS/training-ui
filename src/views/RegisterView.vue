<template>
  <div class="container-fluid h-100">
    <div class="row flex-column justify-content-center h-100 align-items-center">
      <div class="w-100"></div> 
      <h2 >Register</h2>

      <div class="col-2 p-5" style="background-color: #D6D6D6;">
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" v-model="form.username" type="text" id="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" v-model="form.password" type="password" id="password" required />
          </div>
          <div class="form-group text-center">
            <button class="btn btn-primary " type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';
import Store from '@/store/store'

export default {
  name: 'RegisterView',

  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },

  methods: {
    async handleRegister() {
      const response = await axios.post('https://intern2.uptrain.co/api/v1/user/register', this.form)
      console.log(response.data.status);
      if (response.data.status == 'success') {
        alert('user registered successfully');
        Store.commit('login');
        router.push({ path: 'home' });
      } else {
        alert('registration failed' + response.data.message)
      }

    },
  }
};
</script>