export default {
    name: 'BlocLRLayout',
    template: `
        <v-card flat :color="color" class="py-3">
            <v-container>
                <v-card-title class="d-flex justify-center">
                    <v-chip dark label color="black">{{ title }}</v-chip>
                </v-card-title>

                <v-row>
                    <v-col cols="12" xl="6" lg="6" md="6">
                        <article-card-item :article="mainPost" mega :dark="dark"></article-card-item>
                    </v-col>

                    <v-col cols="12" xl="6" lg="6" md="6">
                        <v-list color="transparent">
                            <v-list-item v-for="(article, i) in listPost" :key="i">
                                <article-list-item :article="article" :dark="dark"></article-list-item>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    `,
    props: {
        color: {
            type: String,
            default: "white"
        },
        title: {
            type: String,
            required: true
        },
        mainPost: {
            type: Object,
            required: true
        },
        listPost: {
            type: Array,
            required: true
        },
        dark: {
            type: Boolean,
            default: false
        }
    }
}
