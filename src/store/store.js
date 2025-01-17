import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    isLoggedIn: localStorage.getItem("userId") ? true : false,
    BlogList: [],
  },


  mutations: {
    login(state) {
      state.isLoggedIn = true;
      state.id = localStorage.getItem("userId");
      state.username = localStorage.getItem("username");
    },
    logout(state) {
      state.id = null;
      state.username = null;
      state.selectedBlog = null;
      state.isLoggedIn = false;
    },





    initBlogList: (state, data) => {
      state.BlogList = data;
      console.log(state.BlogList);
      
    },
    addNewBlog:(state,blog)=>{      
      state.BlogList.push(blog)
    },

    editBlog:(state,blog)=>{            
      state.BlogList[blog.index].title=blog.blog.title;
      state.BlogList[blog.index].description=blog.blog.description
    },
 
    deleteBlog:(state,index)=>{
      console.log(index);
      if (index > -1) {
        state.BlogList.splice(index, 1);
      }
    
    },
    deleteBLogList:(state)=>{
      console.log('action');
      state.BlogList=[]
    },

    addComment:(state,commentData)=>{            
      state.BlogList[commentData.index].comments.push(commentData.commentList);
    },

    deleteComment:(state,indexes)=>{
      if (indexes.commentIndex > -1) {
        state.BlogList[indexes.blogIndex].comments.splice(indexes.commentIndex, 1);
      }
    },
    editComment:(state,data)=>{
      state.BlogList[data.indexes.blogIndex].comments[data.indexes.commentIndex].content=data.comment.content;
    }
  },



  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },




    initBlogList(context,data) {
      context.commit("initBlogList",data);
    },

    deleteBLogList(context) {
      console.log('action');
      
      context.commit("deleteBLogList");
    },
    addNewBlog:(context,blog)=>{   
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      console.log(blog);
      
      blog.username = Store.getters.getUserData.username;
      blog.creation_date = `${day}-${month}-${year}`;     
      context.commit('addNewBlog',blog);
    },
    editBlog:(context,blog)=>{   
      console.log(blog);
      const id = blog.blogId;
      let index = context.state.BlogList.findIndex(blog => blog.id === id);
      console.log(index);
      const payload={index:index,blog:blog.blog}
      context.commit("editBlog",payload);
    },
    deleteBlog:(context,id)=>{
      const index =context.state.BlogList.findIndex(blog=>blog.id===id)
      context.commit("deleteBlog",index);
      
    },

    // page refresh for now
    addComment:(context,commentData)=>{   
      const id = commentData.commentList.blogId;
      let index = context.state.BlogList.findIndex(blog => blog.id === id);
      const commentPayload={index:index,commentList:commentData.commentList}
      context.commit("addComment",commentPayload);
    },

    deleteComment:(context,data)=>{
      const blogIndex=context.state.BlogList.findIndex(blog=>blog.id===data.blogId);
      const commentIndex=context.state.BlogList[blogIndex].comments.findIndex(comment=>comment.id===data.commentId);
      const indexes = {blogIndex:blogIndex,commentIndex:commentIndex}
      context.commit("deleteComment",indexes);
      
    },

    editComment:(context,data)=>{      
        const blogIndex=context.state.BlogList.findIndex(blog=>blog.id===data.ids.blogId);
        const commentIndex=context.state.BlogList[blogIndex].comments.findIndex(comment=>comment.id===data.ids.commentId);
        const indexes = {blogIndex:blogIndex,commentIndex:commentIndex}
        console.log(indexes);
        context.commit("editComment",{indexes,comment:data.comment});
        
      }
    },

  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
    getUserData(state) {
      const userData = {
        id: state.id,
        username: state.username,
      };
      return userData;
    },

    getBlogList(state) {
      console.log('bloglist gettere',state.BlogList);
      
       return state.BlogList||[];
    },
    getSelectedBlog: (state)=>(id)=>{
      
      let index = state.BlogList.findIndex(blog => blog.id === id);
      console.log(index);

      return state.BlogList[index]            
    },

  },
});

export default Store;
