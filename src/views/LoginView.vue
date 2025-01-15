<template>
  <div class="container-fluid h-100">
    <div class="row flex-column justify-content-center h-100 align-items-center">
      <h2 class="">Login</h2>
      <div class="col-2 p-5" style="background-color:#D6D6D6">
        <form class="" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input v-model="form.username" class="form-control" type="text" id="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="form.password" class="form-control" type="password" id="password" required />
          </div>
          <div class="form-group d-flex flex-column align-items-center mb-0">
            <button class="btn btn-primary form-control" type="submit">Login</button>
            <p class="my-2">New Here ? <RouterLink to='register'>Register Now</RouterLink>
            </p>
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
  name: 'LoginView',

  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    async handleLogin() {
      console.log(this.form.username);
      const response = await axios.post('https://intern2.uptrain.co/api/v1/user/login', this.form)
      if (response.data.status == 'success') {
        alert('Login successfull');
        localStorage.setItem('userId', response.data.data.id);
        localStorage.setItem('username', response.data.data.username);
        Store.dispatch('login');
        router.push({ path: 'home' });
      } else {
        alert(response.data.message)
      }

    }
  }
};
</script>
