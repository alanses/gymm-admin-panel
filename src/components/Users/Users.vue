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

    </div>
</template>

<script>
    import {UsersService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "Users",
        data() {
            return {
                tableHeaderColor: "",
            };
        },
        props: {
            users: Array,
            default: []
        },
        methods: {
            deleteUser(id) {
                this.showMessageAboutConfirmDeleting().then((result) => {
                    let confirmDeleting = result.value;

                    if(confirmDeleting) {
                        this.deleteUserFromDatabase(id)
                            .then(() => this.deleteUserFromPage(id))
                            .then(() => this.showMessageAboutDeleted())
                            .catch(() => this.showMessageAboutError())
                    }
                });
            },

            deleteUserFromPage(id) {
                const index = this.users.findIndex(user => user.id === id);
                this.users.splice(index, 1);
            },

            showMessageAboutConfirmDeleting() {
                return Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });
            },

            showMessageAboutDeleted() {
                return Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            },

            showMessageAboutError() {
                return Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            },

            deleteUserFromDatabase(id) {
                return UsersService.deleteUser(id);
            },

            getImage(item) {
                let photo = item.photo;
                if (photo) {
                    return {
                        backgroundImage: 'url(' + item.photo + ')'
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

</style>