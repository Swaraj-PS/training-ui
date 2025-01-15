<!-- <template>
  <nav class="navbar navbar-light bg-light" style="width: 100%;height: 100%;">
    <div class="navbar-brand" href="#"><i
        style="color: dodgerblue;font-size: xx-large;font-family:cinzel-decorative, sans-serif;">BLOG</i></div>
    <ul class="nav justify-content-center">
      <li v-if="!isHome" class="nav-item active">
        <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
      </li>
      <li v-if="!isMyBlogs" class="nav-item active">
        <RouterLink class="nav-link" :to="`/${userId}/my-blogs`">My Blogs</RouterLink>
      </li>


    </ul>
    <SearchBlog></SearchBlog>
    <div class="dropdown show" style="padding-right: 4rem;">
      <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        {{ username }}
      </a>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <RouterLink class="dropdown-item" :to="`/${userId}/change-password`"> Change Password</RouterLink>
        <RouterLink class="dropdown-item" to="/"><span @click="DeleteAccount"> Delete Account </span></RouterLink>
        <RouterLink class="dropdown-item" to="/"><span @click="Logout"> Logout </span></RouterLink>
      </div>
    </div>
  </nav>
</template> -->

<template>
  <div class="container-fluid">
    <div class="row flex-column ">
      <nav class="navbar navbar-dark bg-primary">
        <div class="col-4">
          <div class="navbar-brand"><i
              style="color: white;font-size: xx-large;font-family:cinzel-decorative, sans-serif;">BLOG</i></div>
        </div>
        <div class="col-2">
          <ul class="nav">
            <li v-if="!isHome" class="nav-item active">
              <RouterLink class="nav-link text-light"  :to="{ name: 'home' }">Home</RouterLink>
            </li>
            <li v-if="!isMyBlogs" class="nav-item active">
              <RouterLink class="nav-link text-light" :to="`/${userId}/my-blogs`">My Blogs</RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-auto ">
          <SearchBlog></SearchBlog>
        </div>
        <div class="col-1">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          {{ username }}
        </a>
        <div class="dropdown-menu " aria-labelledby="dropdownMenuLink">
          <RouterLink class="dropdown-item" :to="`/${userId}/change-password`"> Change Password</RouterLink>
          <RouterLink class="dropdown-item" to="/"><span @click="DeleteAccount"> Delete Account </span></RouterLink>
          <RouterLink class="dropdown-item" to="/"><span @click="Logout"> Logout </span></RouterLink>
        </div>
    </div>
    </nav>
  </div>
  </div>
</template>





<script>
import router from '@/routes';
import SearchBlog from './SearchBlog.vue';
import Store from '@/store/store';
import axios from 'axios';
export default {
  name: 'NavBar',
  components: {
    SearchBlog
  },
  data() {
    return {
      isMyBlogs: (this.$router.currentRoute.name == 'my-blogs'),
      isHome: (this.$router.currentRoute.name == 'home'),
      username: Store.getters.getUserData.username,
      userId: Store.getters.getUserData.id,
      selected: 'title',
      SearchQuery: ' '
    }
  },

  methods: {
    Logout() {
      Store.commit('logout');
      localStorage.clear();

    },
    DeleteAccount() {
      if (confirm('Are you sure you want to delete this account')) {
        axios.delete('https://intern2.uptrain.co/api/v1/user/')
          .then(() => {
            this.Logout();
          })
      } else {
        router.back();
      }

    }
  }

};
</script>