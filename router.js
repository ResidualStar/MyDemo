import Vue from 'vue'
import Router from 'vue-router'
import User from './components/user.vue'
import category from './components/category.vue'
import categoryAdd from './components/categoryAdd.vue'
import updataCategory from './components/updataCategory.vue'
import content from './components/content.vue'
import contentAdd from './components/contentAdd.vue'
import updataContent from './components/updataContent.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/category',
            name: 'category',
            component: category
        },
        {
            path: '/categoryAdd',
            name: 'categoryAdd',
            component: categoryAdd
        },
        {
            path: '/updataCategory/:id',
            name: 'updataCategory',
            component: updataCategory
        },
        {
            path: '/content',
            name: 'content',
            component: content
        },
        {
            path: '/contentAdd',
            name: 'contentAdd',
            component: contentAdd
        },
        {
            path: '/updataContent/:id',
            name: 'updataContent',
            component: updataContent
        }
    ]
})