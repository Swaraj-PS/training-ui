<template>
  <div>
    <NavBar @search="fetchBlog"></NavBar>

    <button type="button" class="btn btn-light btn-lg btn-block">
      <RouterLink :to="`/${this.userId}/add-new-blog`">Add new Blog</RouterLink>
    </button>
    <div v-if="isEmpty">No blogs Found</div>
    <div v-else>
      <!-- <div v-for="(blog,index) in blogList" v-bind:key="blog.index"> -->
      <!-- <BlogCard   :blog="{index,blog}"></BlogCard> -->
      <!-- </div> -->
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
      blogList: this.$store.getters.getBlogList,
      isEmpty: false,
      userId: this.$route.params.userId

    }
  },

  components: {
    NavBar,
    BlogCard
  },
  created() {
  if (this.blogList.length==0) {
      this.fetchBlog();
    }
  },
  mounted() {
    console.log(this.blogList);
    
  },
  methods: {
    async fetchBlog(searchParams = {}) {

      let url = `https://intern2.uptrain.co/api/v1/blog/` + this.userId;
      console.log('database is being hittt');
      const response = await axios.get(url, { params: searchParams });
      if (response.data.code === "BLOG_DOES_NOT_EXIST") {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
        this.blogList = response.data.data.blogList;
        this.$store.dispatch('initBlogList', this.blogList);

      }
    }

  }
};
</script>