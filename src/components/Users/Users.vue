<template>
    <div>
        <md-table v-model="users" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Image">
                    <div class="table-image" :style="getImage(item)"></div>
                </md-table-cell>
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="User type">{{ item.user_type }}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button @click="deleteUser(item.id)" class="btn-delete">Delete</md-button>
                    <md-button class="btn-view" @click="viewUser(item.id)">View</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>

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
    </div>
</template>

<script>
import {UsersService} from "@/common/api.service";

export default {
    name: "Users",
    data() {
        return {
            users: [],
            tableHeaderColor: "",
            total: 0,
            currentPage: 1,
            perPage: 10,
        };
    },
    created() {
        this.getListUsers();
    },
    methods: {
        updatePagination(page){
            this.currentPage = page;
            this.getListUsers();
        },

        deleteUser(id) {
            this.deleteUserFromDatabase(id).then(() => {
                const index = this.users.findIndex(user => user.id === id);
                this.users.splice(index, 1);
            });
        },

        deleteUserFromDatabase(id) {
            return UsersService.deleteUser(id);
        },

        getListUsers() {
            UsersService.getListUsers('admin/users', {'page': this.currentPage})
                .then((result) => {
                    this.users = result.data.data;
                    this.total = result.data.meta.total;
                    this.$emit('getCountUsers', this.total)
                })
        },

        getImage(item) {
            let photo = item.photo;
            if(photo) {
                return  {
                    backgroundImage: 'url(' +item.photo +')'
                }
            }
        },

        viewUser(userId) {
            this.$router.push({
                path: `/users/${userId}`
            });
        }
    }
}
</script>

<style scoped>
    .btn-delete {
        background: #c51162 !important;
        margin-right: 10px;
    }

    .btn-view {
        background: #3d5afe !important;
        min-width: 100px;
    }

    .table-image {
        min-width: 50px;
        min-height: 50px;
        border-radius: 25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: #ebebeb;
        width: 50px;
        height: 50px;
    }

    .pagination {
        margin-top: 15px;
    }
</style>