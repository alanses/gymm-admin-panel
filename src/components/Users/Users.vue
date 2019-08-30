<template>
    <div>
        <md-table v-model="users" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
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
</style>