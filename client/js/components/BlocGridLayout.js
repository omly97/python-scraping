export default {
    name: 'BlockGridLayout',
    template: `
        <v-sheet flat :color="color">
            <v-container class="py-10">
                <v-card-title v-if="title" class="d-flex justify-center">
                    <v-chip dark label color="black">{{ title }}</v-chip>
                </v-card-title>

                <v-row>
                    <v-col
                        cols="12" xl="4" lg="4" md="4"
                        v-for="(article, i) in posts" :key="i"
                    >
                        <article-card-item :article="article"></article-card-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    `,
    props: {
        title: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: null
        },
        posts: {
            type: Array,
            required: true
        }
    }
}
