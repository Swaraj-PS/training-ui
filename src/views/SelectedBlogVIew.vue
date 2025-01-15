<template>
    <div>
        <NavBar></NavBar>
        <SelectedBlog :blog="blog"></SelectedBlog>
        <CommentSection :blogId="blog.id"></CommentSection>
        <div v-if="username===this.blog.username">
            <button class="btn btn-light">
                <RouterLink :to="{ path: `${this.blog.id}/edit-blog`}">Edit</RouterLink>
            </button>
            <button @click="handleDelete" class="btn btn-danger">Delete</button>
        </div>
    </div>

</template>

<script>
import CommentSection from '@/components/CommentSection.vue';
import NavBar from '@/components/NavBar.vue';
import SelectedBlog from '@/components/SelectedBlog.vue';
import axios from 'axios';


export default {
    name: 'SelectedBlogView',

    data() {
        return {
            username: this.$store.getters.getUserData.username,
            blog: this.$store.getters.getSelectedBlog(this.$route.params.blogId),
        }
    },
    created() {       
         console.log('blooooog',this.blog);         
         
    },
    components: {
        SelectedBlog,
        CommentSection,
        NavBar
    },
    methods: {
        async handleDelete() {
            await axios.delete('https://intern2.uptrain.co/api/v1/blog/' + this.blog.id)
                .then(() => {
                    alert("Blog deleted Successully");
                    this.$router.go(-2);
                    this.$store.dispatch('deleteBlog',this.blog.id)
                }).catch(() => {
                    alert("Something went Wrong")
                });
        }
    }
};
</script>


























<!-- <template>
    <div>
        <NavBar></NavBar>
        <SelectedBlog></SelectedBlog>
        <CommentSection></CommentSection>
        <div v-if="username===this.blog.username">
            <button class="btn btn-light">
                <RouterLink :to="{ path: `${this.blog.id}/edit-blog`}">Edit</RouterLink>
            </button>
            <button @click="handleDelete" class="btn btn-danger">Delete</button>
        </div>
    </div>

</template>

<script>
import CommentSection from '@/components/CommentSection.vue';
import NavBar from '@/components/NavBar.vue';
import SelectedBlog from '@/components/SelectedBlog.vue';
import Store from '@/store/store';
import axios from 'axios';


export default {
    name: 'SelectedBlogView',

    data() {
        return {
            username: Store.getters.getUserData.username,
            blog: Store.getters.getSelectedBlog.blog,
            index:Store.getters.getSelectedBlog.index
        }
    },
    created() {       
         
    },
    components: {
        SelectedBlog,
        CommentSection,
        NavBar
    },
    methods: {
        async handleDelete() {
            await axios.delete('https://intern2.uptrain.co/api/v1/blog/' + this.blog.id)
                .then(() => {
                    alert("Blog deleted Successully");
                    this.$router.back();
                }).catch(() => {
                    alert("Something went Wrong")
                });
        }
    }
};
</script> -->