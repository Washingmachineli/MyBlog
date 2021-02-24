import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Blog = () => import('views/blog/Blog')
const BlogDetail = () => import('views/blogDetail/BlogDetail')
const Message = () => import('views/message/Message')
const Other = () => import('views/other/Other')
const Login = () => import('views/login/Login')


const AdminHome = () => import('views/home/AdminHome')
const AdminBlog = () => import('views/blog/AdminBlog')
const AdminBlogDetail = () => import('views/blogDetail/AdminBlogDetail')
const AdminMessage = () => import('views/message/AdminMessage')
const AdminOther = () => import('views/other/AdminOther')



/*const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}*/

// 1.安装插件
Vue.use(VueRouter)



const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/blog',
    component: Blog
  },
  {
    path: '/blogDetail',
    component: BlogDetail
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/other',
    component: Other
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/adminHome',
    component: AdminHome
  },
  {
    path: '/adminBlog',
    component: AdminBlog
  },
  {
    path: '/adminBlogDetail',
    component: AdminBlogDetail
  },
  {
    path: '/adminMessage',
    component: AdminMessage
  },
  {
    path: '/adminOther',
    component: AdminOther
  },
]


const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/blog' || to.path === '/home' || to.path === '/message' || to.path === '/other') {
    next();
  } else {

    let token = sessionStorage.getItem('token');

    if (token === null || token === '') {

      next('/login');
    } else {
      next();
    }
  }
});

export default router
