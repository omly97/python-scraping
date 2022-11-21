Vue.use(VueRouter)

import WelcomePage from '../pages/WelcomePage.js';

const router = new VueRouter({
    routes: [
        {
            path: '/welcome',
            alias: '/',
            name:'welcome',
            component: WelcomePage
        }
    ]
})

export default router;
