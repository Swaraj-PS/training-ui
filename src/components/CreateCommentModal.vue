<template>
    <div>
        <button type="button" id="modal" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add Comment</button>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Add Comment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input v-model="commentCreate.content" required type="text" class="form-control"
                                placeholder="Add Comment">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
                        <button @click="createComment" type="button" data-dismiss="modal" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import axios from 'axios';



export default {
    name: 'CreateCommentModal',

    data() { 
        return {
            commentCreate: {
                blogId: this.$route.params.blogId,
                content: '',
                userId: this.$store.getters.getUserData.id,
                commentId: ''
            }

        }
    },
    mounted() {

        this.$root.$on('addReply',data => {
            console.log(data);            
            document.getElementById('modal').click();
            this.commentCreate.commentId=data;
            this.createComment()
        });
    },
    created() {
        console.log(this.$route.params);
        
    },
    // mounted() {
    //     this.$root.$on('addReply', data => {
    //         console.log(data);

    //     });
    // },
    methods: {
        async createComment() {
            const response = await axios.post(`https://intern2.uptrain.co/api/v1/comment/${this.blogId}/comment`, this.commentCreate)
            console.log('res 1',response.data);
            if (response.data.status == 'success') {
                response.data.data.username=this.$store.getters.getUserData.username;                
                if(!this.commentCreate.commentId){
                    alert('comment added');
                    this.$store.dispatch('addComment',{commentList:response.data.data})
                }else{
                    alert('reply added');
                    // this.commentCreate.
                    this.$store.dispatch('addReply',{commentList:response.data.data})
                }                
                alert('comment added');
            }else{
                alert(response.data.message)
            }
        },
        
    }
};
</script> 