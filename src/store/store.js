import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

const Store = new Vuex.Store({
    state: {
      id: localStorage.getItem('userId'),
      username:localStorage.getItem('username'),
      isLoggedIn:localStorage.getItem('userId')? true:false,
    },
    mutations: {
      login (state) {
        state.isLoggedIn=true;
      },
      logout (state){
        state.isLoggedIn=false;
        localStorage.clear();
      }
    },
    actions:{
        login(context){
            context.commit('login');
        },
        logout(context){
          
            context.commit('logout');            
        }
    },
    getters:{
        isAuthenticated(state){
            return state.isLoggedIn;
        },
        getUserData(state){
          const userData={
            id:state.id,
            username:state.username
          }
          return userData;
        }
    }
  })
  

  export default Store;