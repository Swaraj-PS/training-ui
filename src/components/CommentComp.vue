<template>
    <div                    >
        <div>
            <div>{{ comment.username }}</div>
            <div v-if="isEdit" class="input-group">
                <input v-model="commentData.content" type="text" class="form-control">
                <div class="input-group-append" id="button-addon4">
                    <button @click="isEdit = false; commentData.content = ''" class="btn btn-outline-secondary"
                        type="button">cancel</button>
                    <button @click="handleEdit" class="btn btn-outline-primary" type="button">edit</button>
                </div>
            </div>
            <div class="d-flex flex-row comment" v-else>{{ comment.content }}</div>
            <!-- <div v-if="Replies && RepliesClicked">
                <div v-if="!Replies && RepliesClicked">No replies</div> -->
                <!-- <div v-if="isCommentAuthor && !isEdit" > -->
                <button v-on:click="getReplies">Replies</button>
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
                    <a v-on:click="addReply" class="dropdown-item" href="#">add reply</a>
                    <a v-on:click="isEdit = true" class="dropdown-item" href="#">edit</a>
                    <a @click="handleDelete" class="dropdown-item">delete</a>
                </div>
            </div>
                <div v-for="reply in replyList" v-bind:key="reply.index">
                    <CommentComp :comment="reply"
                        v-bind:style="level < 2 ? { 'padding-left': '2.5vw' } : { 'padding-left': '0vw' }">
                    </CommentComp>
                </div>
            </div>

        <!-- </div> -->
    <!-- </div> -->
</template>

<script>
import axios from 'axios';
import CommentComp from '@/components/CommentComp.vue';


export default {
    name: 'CommentComp',
    data() {
        return {
            isCommentAuthor: (this.comment.username == this.$store.getters.getUserData.username),
            isEdit: false,
            level: this.$store.getters.getLevel,
            blogId: this.$route.params.blogId,
            RepliesClicked: false,
            Replies: false,
            commentData: {
                id: this.comment.id,
                content: '',
                createdAt: this.comment.created_at,
                commentId: this.comment.comment_id ? this.comment.comment_id : null
            },

            replyList: []
        }
    },
    components: {
        CommentComp
    },
    props: {
        comment: Object,
        reply: Object
    },
    created() {
    
    },
    mounted() {
        this.Replies = false
    },
    methods: {
        async handleEdit() {
            await axios.patch(`https://intern2.uptrain.co/api/v1/comment/${this.comment.id}`, this.commentData)
                .then(() => {
                    alert("Comment Edited!!");
                    this.$router.go();
                });
        },


        async getReplies() {            
            this.RepliesClicked = true;
            console.log(this.blogId);
            
            const response = await axios.get(`https://intern2.uptrain.co/api/v1/comment/${this.blogId}/comment`, {
                params: {
                    'comment-id': this.commentData.id
                }
            })
            console.log(response.data);
            
            if (response.data.data) {
                console.log(response.data);
                
                this.Replies = true;
                this.replyList = response.data.data;
                this.$store.dispatch('incrementLevel');
            }
            // console.log(this.replyList);
            // console.log(Store.getters.getLevel);

        },



        async handleDelete() {
            console.log(this.comment.id);
            await axios.delete(`https://intern2.uptrain.co/api/v1/comment/${this.comment.id}`)
                .then(() => {
                    alert("Comment Deleted!!");
                    this.$root.$emit('deleteComment')
                });

        },


        async addReply() {
            this.$root.$emit('addReply', this.comment.id)
        }

    }
};

</script>