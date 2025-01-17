<template>
    <div>
        <NavBar></NavBar>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">Title</label>
                <input id="title" v-model="form.title" type="text" class="form-control" placeholder="Enter the title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="form.description" class="form-control" id="description" rows="5"></textarea>
            </div>
            <button type="button" class="btn btn-light">
                <RouterLink :to="{ name: 'my-blogs' }">Cancel</RouterLink>
            </button>
            <button type="submit" class="btn btn-primary">Edit</button>

        </form>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
    name: 'EditBlogView',
    data() {
        return {
            form: {
                title: this.$store.getters.getSelectedBlog(this.$route.params.blogId).title,
                description: this.$store.getters.getSelectedBlog(this.$route.params.blogId).description,
            },
            blogParam: this.$route.params
        }

    },
    components: {
        NavBar
    },
    created() {
        console.log(this.blogParam);

    },
    methods: {
        async handleSubmit() {
            const response = await axios.patch(`https://intern2.uptrain.co/api/v1/blog/` + this.blogParam.blogId, this.form);
            if (response.data.status == 'success') {
                alert('Blog edited successfully');
                this.$store.dispatch('editBlog', {
                    blogId: this.blogParam.blogId,
                    blog: this.form
                })
                this.$router.go(-1);
            } else {
                alert(response.data.message)
            }

        }
    }

}



</script>