export default {
    name: 'BlocColumnLayout',
    template: `
        <v-container class="py-10">
            <v-row justify="space-around" align="center">
                <v-col cols="12" xl="8" lg="8" md="8">
                    <v-row>
                        <v-col
                            cols="12" xl="6" lg="6" md="6"
                            v-for="(article, i) in posts" :key="i"
                        >
                            <article-list-item :article="article"></article-list-item>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" xl="3" lg="3" md="3">
                    <v-skeleton-loader
                        type="card-avatar"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-container>
    `,
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
