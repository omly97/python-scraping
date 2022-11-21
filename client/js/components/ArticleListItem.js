export default {
    name: 'ArticleListItem',
    template: `
        <v-list-item three-line>
            <v-list-item-avatar rounded size="90">
                <v-img
                    lazy-src="https://picsum.photos/10/6?image=30"
                    :src="image()"
                ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-if="article.tag != null">
                    <v-chip
                        small
                        label
                        dark
                        color="blue"
                    >
                        {{ article.tag }}
                    </v-chip>
                </v-list-item-title>

                <v-list-item-subtitle
                    :class="dark ? 'white--text' : 'text--primary'"
                    class="font-weight-bold text-title-1"
                >
                    {{ article.title }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    `,
    props: {
        article: {
            type: Object,
            required: true
        },
        dark: {
            type: Boolean,
            default: false
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
