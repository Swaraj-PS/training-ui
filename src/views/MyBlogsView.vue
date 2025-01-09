<template>
    <div>
      <NavBar @search="fetchBlog"></NavBar>

      <button type="button" class="btn btn-light btn-lg btn-block"><RouterLink to="/add-new-blog">Add new Blog</RouterLink> </button>
      <div v-if="isEmpty">No blogs Found</div>
      <div v-else>
        <div v-for="blog in blogList" v-bind:key="blog.index">
          <BlogCard :blog="blog"></BlogCard>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import BlogCard from '@/components/BlogCard.vue';

export default {
    name: 'MyBlogsView',
    data() {
      return {
        blogList: [],
        isEmpty: false,
        // userId:localStorage.getItem('userId')
  
      }
    },
    props: {
      blog: Object
    },
    components: {
      NavBar,
      BlogCard
    },
    created() {
      this.fetchBlog();
    },
    methods: {
      async fetchBlog(searchParams = {}) {
        let url = `https://intern2.uptrain.co/api/v1/blog/`+this.$route.params.userId;
        const response = await axios.get(url, { params: searchParams });
        if (response.data.code === "BLOG_DOES_NOT_EXIST") {
          this.isEmpty = true;
        } else {  
          this.blogList = response.data.data.blogList;
          this.isEmpty = false;
          
        }
      }
  
    }
  };
  </script>