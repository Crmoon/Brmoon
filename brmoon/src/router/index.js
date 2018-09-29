import Vue from 'vue'
import Router from 'vue-router'
import Lizi from '@/components/Lizi'
import main from '../components/main'
import Li_index from '../components/Li_index'
import Li_images from '../components/Li_images'
import Li_imagesList from '../components/Li_imagesList'
import Li_videoList from '../components/Li_videoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },{
      path:'/Lizi',
      name:'Lizi',
      redirect: '/Lizi/Li_index',
      component: Lizi,
      children:[{
        path:'Li_index',
        name:'Li_index',
        component:Li_index
      },{
        path:'Li_images',
        name:'Li_images',
        redirect: '/Lizi/Li_images/images',
        component:Li_images,
        children:[{
          path:'images',
          name:'images',
          component:Li_imagesList
        },{
          path:'videos',
          name:'videos',
          component:Li_videoList
        }]
      }]
    }
  ]
})
