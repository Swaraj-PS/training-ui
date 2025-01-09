<template>
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
            <RouterLink to="/home">Cancel</RouterLink>
        </button>
        <button type="submit" class="btn btn-primary">Edit</button>

    </form>
</template>

<script>

import Store from '@/store/store';
import axios from 'axios';

export default {
    name: 'EditBlogView',
    data() {
        return {
            form: {
                title: "",
                description: "",
                user_id: Store.getters.getUserData.id
            }
        }
    },
    methods: {
        async handleSubmit() {
                const response = await axios.patch(`https://intern2.uptrain.co/api/v1/blog/'+this.blog.id`,this.form);
                if (response.data.status == 'success') {
                    alert('Blog edited successfully');
                    this.$router.go();
                } else {
                    alert(response.data.message)
                }

        }
    }

}



</script>