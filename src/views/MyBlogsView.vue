<template>
  <div>
    <NavBar @search="fetchBlog"></NavBar>
    <div v-if="loading"> Loading </div>
    <div v-else>
      <button type="button" class="btn btn-light btn-lg btn-block">
        <RouterLink :to="`/${this.userId}/add-new-blog`">Add new Blog</RouterLink>
      </button>
      <div v-if="isEmpty">No blogs Found</div>
      <div v-else>
        <div v-for="blog in blogList" v-bind:key="blog.id">
          <BlogCard :blog="blog"></BlogCard>
        </div>
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
      isEmpty: false,
      userId: this.$route.params.userId,
      loading:true

    }
  },

  components: {
    NavBar,
    BlogCard
  },
  mounted() {
    console.log('eeg', this.blogList.length === 0);

    if (this.blogList.length === 0) {
      this.isEmpty = true
      this.fetchBlog()
      console.log('yyyyyyy', this.blogList);
    }else{
      this.loading=false;
    }
  },
  computed: {
    blogList() {
      const blogList = this.$store.getters.getBlogList;
      console.log('computed', blogList);
      return blogList || [{ id: 'test', comment: [] }];
    }
  },
  watch: {
    blogList(newBlogList, oldBlogList) {
      console.log('Blog list changed:');
      console.log('Old blog list:', oldBlogList);
      console.log('New blog list:', newBlogList);
      this.loading=false;
    }
  },
  methods: {
    async fetchBlog(searchParams = {}) {

      let url = `https://intern2.uptrain.co/api/v1/blog/` + this.userId;
      console.log('database is being hittt');
      const response = await axios.get(url, { params: searchParams });
      if (response.data.code === "BLOG_DOES_NOT_EXIST") {
        this.isEmpty = true;
      } else {
        console.log('logging', response.data.data.blogList);

        this.isEmpty = false;
        this.$store.dispatch('initBlogList', response.data.data.blogList);

      }
    }

  }
};
</script>
