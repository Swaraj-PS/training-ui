<template>
  <div>
    <NavBar></NavBar>
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
// import { param } from 'jquery';

export default {
  name: 'HomeView',
  data() {
    return {
      blogList: [],
      isEmpty: false,

    }
  },
  props: {
    blog: Object,
  },
  components: {
    NavBar,
    BlogCard
  },
  mounted() {
    this.$root.$on('search', (searchParams) => {
      this.fetchBlog(searchParams);
    });  },
  created() {
    this.fetchBlog();
  },
  methods: {
    async fetchBlog(searchParams = {}) {
      let url = `https://intern2.uptrain.co/api/v1/blog/`
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