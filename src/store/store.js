import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    isLoggedIn: localStorage.getItem("userId") ? true : false,
    BlogList: [],
    level: 0,
    // selectedBlog:{},
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




    incrementLevel(state) {
      state.level++;
    },



    initBlogList: (state, data) => {
      state.BlogList = data;
    },
    addNewBlog:(state,blog)=>{      
      state.BlogList.push(blog)
    },
    editBlog:(state,blog)=>{      
      const id = blog.blogId;
      let index = state.BlogList.findIndex(blog => blog.id === id);
      state.BlogList[index].title=blog.blog.title;
      state.BlogList[index].description=blog.blog.description
    },
    deleteBlog:(state,id)=>{
      const index =state.BlogList.findIndex(blog=>blog.id===id)
      console.log(index);
      if (index > -1) {
        state.BlogList.splice(index, 1);
      }
      
    },
  },



  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },



    incrementLevel(context) {
      context.commit("incrementLevel");
    },
    initBlogList(context,data) {
      context.commit("initBlogList",data);
    },
    addNewBlog:(context,blog)=>{   
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      blog.username = Store.getters.getUserData.username;
      blog.creation_date = `${day}-${month}-${year}`;     
      context.commit('addNewBlog',blog);
    },
    editBlog:(context,blog)=>{        
      context.commit("editBlog",blog);
    },
    deleteBlog:(context,id)=>{
      context.commit("deleteBlog",id);
      
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
    // getSelectedBlog(state) {
    //   return state.selectedBlog;
    // },

    getBlogList(state) {
       return state.BlogList;
    },
    getSelectedBlog: (state)=>(id)=>{
      
      let index = state.BlogList.findIndex(blog => blog.id === id);
      console.log(index);

      return state.BlogList[index]            
    },
    getLevel(state) {
      return state.level;
    },
  },
});

export default Store;
