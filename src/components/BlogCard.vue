<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ blog.title }}</h5>
            <p class="card-text">{{ blog.description }}.</p>
            <!-- <a href="#" class="btn btn-primary">Read</a> -->
            <div v-if="isMyBlog">
                <button  class="btn btn-light">Edit</button>
                <button @click="handleDelete" class="btn btn-danger">Delete</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';



export default {
    name: 'BlogCard',
    data() {
        return {
            isEmpty: false,
            isMyBlog:(this.$router.currentRoute.name=='my-blogs')
        }
    },
    props :{
        blog:{},
    },
    created() {
        
  },
  methods:{
    async handleDelete(){
        await axios.delete('https://intern2.uptrain.co/api/v1/blog/'+this.blog.id)
        .then(() => {
            alert("Blog deleted Successully");
            this.$router.go();
        }).catch(() => {
            alert("Something went Wrong")
        });
    }
  }
};
</script>