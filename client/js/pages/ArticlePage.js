import router from '../router/index.js'
import axios from '../plugins/axios.js'

export default {
    name: "ArticlePage",
    template: `
        <div>
            <template v-if="!loading">
                <article-detail
                    :article="article"
                ></article-detail>

                <bloc-COLUMN-layout
                    :title="articlesSuggest.title"
                    color="#F0F0F0"
                    :posts="articlesSuggest.posts"
                ></bloc-COLUMN-layout>
            </template>
        </div>
    `,
    data() {
        return {
            loading: false,
            article: {},
            articlesSuggest: []
        }
    },
    created() {
        this.fetchArticle()
    },
    computed: {
        link() {
            return router.history.current.query.p
        }
    },
    watch: {
        'router.history.current.query.p': {
            handler: function() {
                this.fetchArticle()
                console.log("change");
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        fetchArticle() {
            this.loading = true;
            axios.get('france24', { params: { q: decodeURI(this.link) } })
                .then(response => {
                    this.article = response.response_data.main_post;
                    this.articlesSuggest = response.response_data.suggest_post;
                })
                .catch(error => {
                    // this.$swal({ icon: 'error', title: 'Oops...', text: error.message, })
                    alert(error)
                })
                .finally(() => {
                    this.loading = false
                })
        }
    }
}
