<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-field class="search-user">
                <label>Search</label>
                <md-input v-model="search" @input="searchReview"></md-input>
            </md-field>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Reviews total:
                        {{total}}
                    </h4>
                </md-card-header>
                <md-card-content>
                    <reviews :reviews="reviews"></reviews>
                </md-card-content>
                <div class="pagination">
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="total"
                            aria-controls="my-table"
                            :per-page="perPage"
                            first-text="First"
                            prev-text="Prev"
                            next-text="Next"
                            last-text="Last"
                            @change="updatePagination"
                    ></b-pagination>
                </div>
            </md-card>
        </div>
    </div>
</template>

<script>
    import debouncer from "@/util/debouncer";
    import {ReviewsService} from "@/common/api.service";
    import Reviews from "@/components/Reviews/Reviews";

    export default {
        name: "ReviewsPage",
        components: {Reviews},
        mixins: [debouncer],

        data() {
            return {
                reviews: [],
                search: null,
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },

        created() {
            this.getListReviews();
        },

        methods: {
            getListReviews() {
                ReviewsService.getListReviews({'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        this.reviews = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListReviews();
            },

            searchReview(query) {
                this.search = query;
                this.$debounce('search', this.getListReviews, 500)
            }
        }
    }
</script>

<style scoped>

</style>