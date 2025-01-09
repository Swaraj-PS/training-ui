import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/LoginView.vue";
import Homeview from "@/views/HomeView.vue";
import ChangePassView from "@/views/ChangePassView.vue";
import RegisterView from "@/views/RegisterView.vue";
import MyBlogsView from '@/views/MyBlogsView.vue';
import AddBlogView from '@/views/AddBlogView.vue'
import Store from "@/store/store";
Vue.use(VueRouter);

// const user_id=localStorage.getItem('id');


const routes = [
  { path: "/", name: "login", component: LoginView },
  { path: "/home", name: "home", component: Homeview },
  { path: `/:username/change-password`, name: "ChangePass", component: ChangePassView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/:userId/add-new-blog", name: "add-new-blogs", component: AddBlogView},
  { path: `/:userId/my-blogs/`, name: "my-blogs", component: MyBlogsView}
  // { path: `/my-blogs/`, name: "my-blogs", component: MyBlogsView}
  
];
const router = new VueRouter({
  mode: "history",
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.path == "/" || to.path == "/register") next();
  else if (!Store.getters.isAuthenticated) {
    next({ path: "/" });
  } else {
    // var userData={
    //   id:localStorage.getItem('userId'),
    //   username:localStorage.getItem('username')
    // }
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.path == "/" || to.path == "/register") next();
//   else if (Store.getters.isAuthenticated || localStorage.getItem("userId")!==null)
//     next();
//   else {
//     localStorage.clear();
//     next({ path: "/" });
//   }
// });

export default router;
