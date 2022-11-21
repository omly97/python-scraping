import axios from '../plugins/axios.js'

export default {
    template: `
        <div>
            <template v-if="!loading">
                <v-container>
                    <v-row>
                        <v-col cols="12" xl="8" lg="8" md="8">
                            <article-card-item :article="articles.section_1.main_post" mega></article-card-item>
                            <v-divider class="my-5"></v-divider>
                            <v-row>
                                <v-col
                                    cols="12" xl="6" lg="6" md="6"
                                    v-for="(article, i) in articles.section_1.list_post" :key="i"
                                >
                                    <article-card-item :article="article"></article-card-item>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" xl="4" lg="4" md="4">
                        </v-col>
                    </v-row>
                </v-container>

                <bloc-LR-layout
                    dark
                    color="#373B4D"
                    :title="articles.section_2.title"
                    :mainPost="articles.section_2.main_post"
                    :listPost="articles.section_2.list_post"
                ></bloc-LR-layout>

                <bloc-GRID-layout
                    :posts="articles.section_3"
                ></bloc-GRID-layout>

                <bloc-LR-layout
                    color="#F0F0F0"
                    :title="articles.section_4.title"
                    :mainPost="articles.section_4.main_post"
                    :listPost="articles.section_4.list_post"
                ></bloc-LR-layout>

                <v-container>
                    <v-row justify="space-around" align="center">
                        <v-col cols="12" xl="9" lg="9" md="9">
                            <bloc-COLUMN-layout
                                :posts="articles.section_5"
                            ></bloc-COLUMN-layout>
                        </v-col>

                        <v-col cols="12" xl="3" lg="3" md="3">
                            <v-skeleton-loader
                                type="card-avatar"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-container>

                <bloc-LR-layout
                    color="#F0F0F0"
                    :title="articles.section_6.title"
                    :mainPost="articles.section_6.main_post"
                    :listPost="articles.section_6.list_post"
                ></bloc-LR-layout>

                <bloc-COLUMN-layout
                    :posts="articles.section_7"
                ></bloc-COLUMN-layout>

                <bloc-LR-layout
                    color="#F0F0F0"
                    :title="articles.section_8.title"
                    :mainPost="articles.section_8.main_post"
                    :listPost="articles.section_8.list_post"
                ></bloc-LR-layout>

                <bloc-GRID-layout
                    :title="articles.section_10.title"
                    :posts="articles.section_10.list_post"
                ></bloc-GRID-layout>

                <bloc-GRID-layout
                    :title="articles.section_11.title"
                    :posts="articles.section_11.list_post"
                ></bloc-GRID-layout>

                <bloc-GRID-layout
                    :title="articles.section_12.title"
                    :posts="articles.section_12.list_post"
                ></bloc-GRID-layout>

                <bloc-GRID-layout
                    :title="articles.section_13.title"
                    :posts="articles.section_13.list_post"
                ></bloc-GRID-layout>

                <bloc-GRID-layout
                    color="#F0F0F0"
                    :title="articles.section_14.title"
                    :posts="articles.section_14.list_post"
                ></bloc-GRID-layout>

                <div class="my-5"></div>

                <bloc-GRID-layout
                    color="#F0F0F0"
                    :title="articles.section_15.title"
                    :posts="articles.section_15.list_post"
                ></bloc-GRID-layout>
            </template>
        </div>
    `,
    data() {
        return {
            loading: false,
            articles: []
        }
    },
    created() {
        this.fetchArticles()
    },
    methods: {
        fetchArticles() {
            this.loading = true;
            axios.get('france24')
                .then(response => {
                    this.articles = response.response_data;
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
