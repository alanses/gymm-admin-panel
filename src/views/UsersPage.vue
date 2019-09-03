<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-field class="search-user">
                <label>Search</label>
                <md-input v-model="search" @input="searchUser"></md-input>
            </md-field>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Users: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <users :users="this.users"></users>
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
    import Users from "@/components/Users/Users";
    import {UsersService} from "@/common/api.service";

    export default {
        name: "UsersPage",
        components: {Users},

        data() {
            return {
                users: [],
                search: null,
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },
        created() {
            this.getListUsers();
        },
        methods: {
            getListUsers() {
                UsersService.getListUsers('admin/users', {'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        this.users = result.data.data;
                        this.total = result.data.meta.total;
                    })
            },
            updatePagination(page) {
                this.currentPage = page;
                this.getListUsers();
            },
            searchUser(query) {
                this.search = query;
                this.getListUsers();
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