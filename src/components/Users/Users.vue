<template>
    <div>
        <md-table v-model="users"
                  :table-header-color="tableHeaderColor"
        >
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
                    <md-button class="btn-view">View</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
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
            total: 0
        };
    },
    created() {
        this.getListUsers();
    },
    methods: {
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
            UsersService.getListUsers('admin/users')
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
</style>