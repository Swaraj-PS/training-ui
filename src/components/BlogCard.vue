<template>
    <div class="card">
        <div class="media-body">
            <h5 class="mt-0">{{blog.title }}</h5>
            <p>{{ blog.username }}</p>
            <p>{{ blog.createdAt }}</p>
            <a @click="handleClick" class="stretched-link">Read More</a>
        </div>

    </div> 

</template>

<script>
import Store from '@/store/store';
// import axios from 'axios';



export default {
    name: 'BlogCard',

    data() {
        return {
            isEmpty: false,
            isMyBlog: (this.$router.currentRoute.name == 'my-blogs'),
            userId: Store.getters.getUserData.id,
            // blog:{}
        }
    },
    props: {
        blog: Object,
    },
    created() {
    },
    methods: {
        async handleClick(){   
            console.log(this.blog);
            
            this.$router.push(`/${this.userId}/${this.blog.id}`);            
        }

}
};
</script>