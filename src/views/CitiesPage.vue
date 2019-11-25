<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-field class="search-user">
                <label>Search</label>
                <md-input v-model="search" @input="searchCity"></md-input>
            </md-field>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Cities: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <cities :cities="cities"></cities>
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
    import {CitiesService} from "@/common/api.service";
    import Cities from "../components/Cities/Cities";

    export default {
        name: "CitiesPage",
        components: {Cities},
        mixins: [debouncer],

        data() {
            return {
                cities: [],
                search: null,
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },
        created() {
            this.getListCities();
        },

        methods: {
            getListCities() {
                CitiesService.getListCities({'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        this.cities = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListCities();
            },

            searchCity(query) {
                this.search = query;
                this.$debounce('search', this.getListCities, 500)
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
</style>