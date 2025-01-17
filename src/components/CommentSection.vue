<template>
    <div
        style="height: 500px;width: 800px;background-color: beige;display: flex;justify-content:flex-start;justify-items:center; flex-direction: column;">
        <h3> Comment Section</h3>
        <CreateCommentModal ></CreateCommentModal>
        <div v-for="comment in commentList" v-bind:key="comment.id">
            <CommentComp    :comment="comment"></CommentComp>

        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import CommentComp from './CommentComp.vue';
import CreateCommentModal from './CreateCommentModal.vue';



export default {
    name: 'CommentSection',
    props: {
        commentList:Array,
    },
    components: {
        CommentComp,
        CreateCommentModal
        
    },

    data() {
        return {
            // commentList: {},
            // commentCreate: {
            //     blogId: Store.getters.getSelectedBlog.id,
            //     content: '',
            //     userId: Store.getters.getUserData.id,
            //     commentId: ''
            // }
            blogId:this.$route.params.blogId

        }
    },
    created() {
        // this.getComment();
    },
    mounted() {
        this.$root.$on('deleteComment',this.getComment);
        // this.$root.$on('editComment',this.getComment);

    },
    methods: {
        async getComment() {
        //     const response = await axios.get(`https://intern2.uptrain.co/api/v1/comment/${this.blogId}/comment`)
        //     // this.commentList = response.data.data;
        //     console.log('getting cmmt',response);
        //     if(response.data.status=='error')alert(response.data.message);
        //     else this.$store.dispatch('updateCommentList',{commentList:response.data,blogId:this.blogId})
            
            // console.log(this.commentList);
            // this.commentList['blogId']=this.blogId;
            // console.log(this.commentList);

        },
        // async createComment() {
            // const response = await axios.post(`https://intern2.uptrain.co/api/v1/comment/${this.blogId}/comment`, this.commentCreate)
            // // console.log(response.data.status);

            // if (response.data.status == 'success') {

            //     this.getComment();
            // }
        // }
    }
};
</script>