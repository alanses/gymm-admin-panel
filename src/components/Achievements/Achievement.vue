<template>
    <div class="achievement">
        <div class="achievement-photo" v-if="this.achievement.image">
            <md-card>
                <md-card-content
                        class="image-form"
                        :style="{
                            'background-image': 'url(' + this.achievement.image + ')'
                            }"
                >
                    <div class="md-layout">
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="achievement-info">
            <form @submit.prevent="updateAchievement">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Achievement Info</h4>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Achievement name</label>
                                    <md-input v-model="achievement.displayed_name" type="text" required></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Achievement ru name</label>
                                    <md-input v-model="achievement.ru_displayed_name" type="text" required></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Achievement kz name</label>
                                    <md-input v-model="achievement.kz_displayed_name" type="text" required></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Activity</label>
                                    <md-select v-model="achievement.activity_id">
                                        <md-option
                                                v-for="activity in list_activities"
                                                :value="activity.id"
                                        >{{activity.displayed_name}}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Achievement count classes</label>
                                    <md-input v-model="achievement.count_classes" type="text" required></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <md-input @change="uploadFile" type="file"></md-input>
                                </md-field>
                            </div>
                        </div>

                    </md-card-content>
                </md-card>

                <div class="md-layout-item md-size-100 text-left">
                    <md-button type="submit" class="md-raised md-success">Update Achievement</md-button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    import {AchievementsService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "Achievement",
        data() {
            return {
                achievement: {
                    'displayed_name': null,
                    'ru_displayed_name': null,
                    'kz_displayed_name': null,
                    'activity_id': null,
                    'image': null,
                    'count_classes': null,
                    'file': null,
                },
                list_activities: []
            };
        },
        created() {
            this.getListActivities();
            this.getAchievement();
        },

        methods: {
            getListActivities() {
                AchievementsService.getListActivitiesForSelect().then((result) => {
                    this.list_activities = result.data.data;
                });
            },

            getAchievement() {
                const id = this.$route.params.id;

                AchievementsService.getAchievement(id).then((response) => {
                    this.achievement = response.data.data;
                });
            },

            updateAchievement() {
                AchievementsService.updateAchievement(this.getDataForUpdateActivity()).then((response) => {
                    this.achievement = response.data.data;
                    this.showMessageWithSuccessAchievement();
                });
            },

            showMessageWithSuccessAchievement() {
                Swal.fire(
                    'Updated!',
                    'This achievement been update',
                    'success'
                );
            },

            getDataForUpdateActivity() {
                let formData = new FormData();

                if(this.achievement.file) {
                    formData.append('image', this.achievement.file);
                }
                formData.append('displayed_name', this.achievement.displayed_name);
                formData.append('kz_displayed_name', this.achievement.kz_displayed_name);
                formData.append('ru_displayed_name', this.achievement.ru_displayed_name);
                formData.append('activity_id', this.achievement.activity_id);
                formData.append('count_classes', this.achievement.count_classes);
                formData.append('id', this.achievement.id);

                return formData;
            },

            uploadFile(event) {
                this.achievement.file = event.target.files[0];
            },
        }
    }
</script>

<style scoped>
    .achievement {
        display: flex;
    }

    .achievement .achievement-photo {
        flex: 1 1 15%;
        margin-right: 15px;
    }

    .achievement .achievement-info {
        flex: 1 1 85%;
    }

    .image-form {
        min-height: 313px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>