export default {
    name: 'ArticleCardItem',
    template: `
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

            <div
                :class="titleStyle()"
                class="font-weight-bold mt-3"
            >
                {{ article.title }}
            </div>
        </v-card>
    `,
    props: {
        article: {
            type: Object,
            required: true
        },
        mega: {
            type: Boolean,
            default: false
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
        },
        titleStyle() {
            let size = this.mega ? 'text-h4' : 'text-title-1'
            let color = this.dark ? 'white--text' : 'text--primary'
            return size + ' ' + color
        }
    }
}
