<template>
    <div style="display: flex;justify-content:space-between;">
        <div>
            <div>{{ comment.username }}</div>
            <div v-if="isEdit" class="input-group">
                <input v-model="commentData.content" type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
                <div class="input-group-append" id="button-addon4">
                    <button @click="isEdit=false;commentData.content=''" class="btn btn-outline-secondary" type="button">cancel</button>
                    <button @click="handleEdit" class="btn btn-outline-primary" type="button">edit</button>
                </div>
            </div>
            <div v-else class="comment">{{ comment.content }}</div>
            <button @click="getReplies">Replies</button>
        </div>
        <div style="align-self: flex-end;" v-if="isCommentAuthor && !isEdit" class="">
            <button class="btn btn-secondary "
                style="background-color: transparent;color: black;margin:0;border-color: transparent;" type="button"
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-three-dots-vertdropdownical" viewBox="0 0 16 16">
                    <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a v-on:click="isEdit=true" class="dropdown-item" href="#">edit</a>
                <a @click="handleDelete" class="dropdown-item">delete</a>
            </div>
        </div>
    </div>
</template>

<script>
import Store from '@/store/store';
import axios from 'axios';



export default {
    name: 'ReplyComp',
    data() {
        return {
            isCommentAuthor: (this.comment.username == Store.getters.getUserData.username),
            isEdit: false,
            commentData:{
                id:this.comment.id,
                content:''
            },
            replyList:[],
            getReplies:false
        }
    },
    props: {
        comment: Object
    },
    created() {
        console.log(this.comment);
        

    },
    methods: {
        async handleEdit() {
            await axios.patch(`https://intern2.uptrain.co/api/v1/comment/${this.comment.id}`,this.commentData)
                .then(() => {
                    alert("Comment Edited!!");
                    this.$router.go();
                });
        },
        async getReplies(){
            const response = await axios.get(`https://intern2.uptrain.co/api/v1/comment/${this.blogId}/comment`,this.commentData.id)
            this.replyList = response.data.data;
        }, 
        async handleDelete() {
            console.log(this.comment.id);
            await axios.delete(`https://intern2.uptrain.co/api/v1/comment/${this.comment.id}`)
                .then(() => {
                    alert("Comment Deleted!!");
                    this.$router.go();
                });

        }

    }
};

</script>