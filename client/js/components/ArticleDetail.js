export default {
    name: 'ArticleDetail',
    template: `
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" xl="10" lg="10" md="10">
                    <v-card flat color="transparent">
                        <v-img
                            lazy-src="https://picsum.photos/10/6?image=30"
                            :src="image()"
                        ></v-img>

                        <v-chip
                            v-if="article.tag != null"
                            label
                            dark
                            color="blue"
                            class="mt-3"
                        >
                            {{ article.tag }}
                        </v-chip>

                        <div class="text-h4 font-weight-bold mt-3">
                            {{ article.title }}
                        </div>

                        <div class="text-title-1 font-weight-bold mt-3" v-html="article.excerpt"></div>

                        <div class="text-body-1 mt-3" v-html="article.content"></div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    `,
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    methods: {
        image() {
            let image = null
            Object.entries(this.article.images).forEach(([key, value]) => {
                image = value
            });
            return image
        }
    }
}
