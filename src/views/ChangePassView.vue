<template>
    <div>
        <NavBar></NavBar>
        
   <h3>Change password</h3>
    <form @submit.prevent="ChangePassword">
      <div>
        <label for="password">{{username}}</label>
      </div>
      <div>
        <input v-model="form.password" type="password" id="password" placeholder="Enter new password" required />
      </div>
      <button type="submit">Login</button> 
    </form>
</div>
</template>

<script>
import axios from 'axios';
import router from '@/routes'; 
import Store from '@/store/store';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'ChangePass',

  data(){
    return{
      form:{
        password:""
      },
      id : Store.getters.getUserData.id,

      username : Store.getters.getUserData.username,

      
    }
  },
  components :{
    NavBar
  },
  created() {

  },
  methods:{
    async ChangePassword(){
        const response = await axios.patch(`https://intern2.uptrain.co/api/v1/user/${this.id}`,this.form)
        if (response.data.status=='success') {
            alert('Password Changed successfull');
            router.back();            

      }else{
            alert(response.data.message)
      }
    }
              
    }          
  }
</script>

