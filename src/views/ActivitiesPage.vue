<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div class="activities">
                <md-field class="search-user">
                    <label>Search</label>
                    <md-input v-model="search" @input="searchActivity"></md-input>
                </md-field>
                <div>
                    <md-button type="submit" class="md-raised md-success" @click="createActivity">Create Activity</md-button>
                </div>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Activities: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <activities :activities="activities"></activities>
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
    import {ActivitiesService} from "@/common/api.service";
    import Activities from "../components/Activities/Activities";

    export default {
        name: "ActivitiesPage",
        components: {Activities},
        mixins: [debouncer],

        data() {
            return {
                activities: [],
                search: null,
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },
        created() {
            this.getListActivities();
        },

        methods: {
            getListActivities() {
                ActivitiesService.getListActivities({'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        this.activities = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListActivities();
            },

            searchActivity(query) {
                this.search = query;
                this.$debounce('search', this.getListActivities, 500)
            },

            createActivity() {
                this.$router.push({ name: "create_activity" });
            }
        }

    }
</script>

<style scoped>
    .pagination {
        margin-top: 15px;
    }

    .search-user {
        width: 300px;
    }

    .activities {
        display: flex;
        justify-content: space-between;
    }
</style>