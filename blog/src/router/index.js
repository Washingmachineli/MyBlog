import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Blog = () => import('views/blog/Blog')
const Message = () => import('views/message/Message')
const About = () => import('views/about/About')
const Hobby = () => import('views/about/Hobby')
const Movie = () => import('views/about/Movie')


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
    path: '/message',
    component: Message
  },
  {
    path: '/about',
    redirect: '/hobby'
  },
  {
    path: '/hobby',
    component: Hobby
  },
  {
    path: '/movie',
    component: Movie
  },
]


const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
