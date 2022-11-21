Vue.use(VueRouter)

import WelcomePage from '../pages/WelcomePage.js';
import ArticlePage from '../pages/ArticlePage.js';

const router = new VueRouter({
    routes: [
        {
            path: '/welcome',
            alias: '/',
            name:'welcome',
            component: WelcomePage
        },
        {
            path: '/post',
            name:'post',
            component: ArticlePage
        }
    ]
})

export default router;
