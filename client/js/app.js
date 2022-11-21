import router from "./router/index.js"

import ArticleCardItem from "./components/ArticleCardItem.js"
import ArticleDetail from "./components/ArticleDetail.js"
import ArticleListItem from "./components/ArticleListItem.js"
import BlocColumnLayout from "./components/BlocColumnLayout.js"
import BlocLRLayout from "./components/BlocLRLayout.js"
import BlocGridLayout from "./components/BlocGridLayout.js"

Vue.component("article-card-item", ArticleCardItem)
Vue.component("article-detail", ArticleDetail)
Vue.component("article-list-item", ArticleListItem)
Vue.component("bloc-COLUMN-layout", BlocColumnLayout)
Vue.component("bloc-LR-layout", BlocLRLayout)
Vue.component("bloc-GRID-layout", BlocGridLayout)

new Vue({
    el: "#app",
    router,
    vuetify: new Vuetify({
        theme: { dark: false },
    }),
})
