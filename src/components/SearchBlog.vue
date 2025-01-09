<template>
  <form @submit.prevent="handleSearch" class="form-inline my-2 my-lg-0">
    <select class="btn btn-primary " name="searchUsing" id="searchUsing" v-model="selected">
      <option value="title">Title</option>
      <option v-if="isHome" value="username">Author</option>
      <option value="created-at">Upload Date</option>

    </select>
    <input v-model="SearchQuery" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-primary" type="submit">Search</button>
  </form>
</template>
<script>

export default {
  name: 'SearchBlog',

  data() {
    return {
      isHome: (this.$router.currentRoute.name == 'home'),
      selected: 'title',
      SearchQuery: ' '
    }
  },
  methods: {
    handleSearch() {
      const searchParams = {};
      searchParams[this.selected] = this.SearchQuery;
      // console.log(searchParams);
      this.$root.$emit('search', searchParams);
      // this.$emit('search', searchParams);

    }
  },
};

</script>
