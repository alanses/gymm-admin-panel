<template>
    <div class="activity">
        <div class="activity-photo" v-if="this.activity.image">
            <md-card>
                <md-card-content
                        class="image-form"
                        :style="{
                            'background-image': 'url(' + this.activity.image + ')'
                            }"
                >
                    <div class="md-layout">
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="activity-info">
            <form @submit.prevent="createActivity">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Gym Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Activity slag</label>
                                <md-input v-model="activity.name" type="text" required></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Activity name</label>
                                <md-input v-model="activity.displayed_name" type="text" required></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Activity ru name</label>
                                <md-input v-model="activity.ru_displayed_name" type="text" required></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Activity kz name</label>
                                <md-input v-model="activity.kz_displayed_name" type="text" required></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <md-input @change="uploadFile" type="file" required></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Create Activity</md-button>
            </div>

        </form>
        </div>
    </div>
</template>

<script>
    import {ActivitiesService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "CreateActivity",
        data() {
            return {
                activity: {
                    'displayed_name': null,
                    'name': null,
                    'file': null,
                    'image': null,
                    'kz_displayed_name': null,
                    'ru_displayed_name': null
                },
            };
        },
        methods: {
            createActivity() {
                ActivitiesService.createActivity(this.getDataForCreateCity()).then((result) => {
                    this.activity = result.data.data;
                    this.showMessageWithSuccessCity();
                });
            },

            getDataForCreateCity() {
                let formData = new FormData();

                    formData.append('image', this.activity.file);
                    formData.append('displayed_name', this.activity.displayed_name);
                    formData.append('name', this.activity.name);
                    formData.append('kz_displayed_name', this.activity.kz_displayed_name);
                    formData.append('ru_displayed_name', this.activity.ru_displayed_name);

                return formData;
            },

            uploadFile(event) {
                this.activity.file = event.target.files[0];
            },

            showMessageWithSuccessCity() {
                Swal.fire(
                    'Created!',
                    'This city been created',
                    'success'
                );
            },

        }
    }
</script>

<style scoped>
    .activity {
        display: flex;
    }

    .activity .activity-photo {
        flex: 1 1 15%;
        margin-right: 15px;
    }

    .activity .activity-info {
        flex: 1 1 85%;
    }

    .image-form {
        min-height: 313px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

</style>