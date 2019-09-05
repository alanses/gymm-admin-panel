<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-field class="search-user">
                <label>Search</label>
                <md-input v-model="search" @input="searchGym"></md-input>
            </md-field>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Gyms: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <gyms :gyms="gyms"></gyms>
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
    import {GymsService} from "@/common/api.service";
    import Gyms from "@/components/Gyms/Gyms";

    export default {
        name: "GymsPage",
        components: {Gyms},
        mixins: [debouncer],

        data() {
            return {
                gyms: [],
                search: null,
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },
        created() {
            this.getListGyms();
        },

        methods: {
            getListGyms() {
                GymsService.getListGyms({'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        this.gyms = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListGyms();
            },

            searchGym(query) {
                this.search = query;
                this.$debounce('search', this.getListGyms, 500)
            }
        }
    }
</script>

<style scoped>

</style>