<template>
    <div>
        <md-table v-model="achievements" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Displayed name">{{ item.displayed_name }}</md-table-cell>
                <md-table-cell md-label="Count classes">{{ item.count_classes }}</md-table-cell>
                <md-table-cell md-label="Activity name">{{ item.activity_name }}</md-table-cell>
                <md-table-cell md-label="Created At">{{ item.created_at }}</md-table-cell>

                <md-table-cell md-label="Actions">
                    <md-button class="btn-view" @click="viewAchievement(item.id)">View</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import Swal from 'sweetalert2'
    import {AchievementsService} from "@/common/api.service";

    export default {
        name: "Achievements",
        data() {
            return {
                tableHeaderColor: "",
            };
        },
        props: {
            achievements: Array,
            default: []
        },
        methods: {
            viewAchievement(id) {
                this.$router.push({
                    path: `/achievement/${id}`
                });
            },
            deleteAchievement(id) {
                this.showMessageAboutConfirmDeleting().then((result) => {
                    let confirmDeleting = result.value;

                    if(confirmDeleting) {
                        this.deleteAchievementFromDatabase(id)
                            .then(() => this.deleteAchievementFromPage(id))
                            .then(() => this.showMessageAboutDeleted())
                            .catch(() => this.showMessageAboutError())
                    }
                });
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

            deleteAchievementFromDatabase(id) {
                return AchievementsService.deleteAchievement(id);
            },

            deleteAchievementFromPage(id) {
                const index = this.achievements.findIndex(achievement => achievement.id === id);
                this.achievements.splice(index, 1);
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
</style>