<template>
    <div>
        <NavBar></NavBar>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="form.title" type="text" class="form-control" id="title" placeholder="Enter the title">
            </div>
            <div class="form-group">
                <label for="descrition">Description</label>
                <textarea v-model="form.description" class="form-control" id="description" rows="5"></textarea>
            </div>
            <button type="button" class="btn btn-light">
                <RouterLink :to="{ name: 'my-blogs' }">Cancel</RouterLink>
            </button>
            <button type="submit" class="btn btn-primary">Add</button>

        </form>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
    name: 'AddBlogView',
    data() {
        return {
            form: {
                title: "",
                description: "",
                user_id: this.$store.getters.getUserData.id
            }
        }
    },
    components: {
        NavBar
    },
    created() {
        console.log(this.$store.getters.getUserData.id);
        console.log(this.form.user_id);


    },
    methods: {
        async handleSubmit() {
            const response = await axios.post(`https://intern2.uptrain.co/api/v1/blog/`, this.form);
            if (response.data.status == 'success') {
                alert('Blog added successfully');
                delete this.form.user_id;
                //not working when id is num
                this.form.id=response.data.data.toString();                
                this.$store.dispatch('addNewBlog', this.form);
                this.$router.go(-1)
            } else {
                alert(response.data.message)
            }

        }
    }

}



</script>