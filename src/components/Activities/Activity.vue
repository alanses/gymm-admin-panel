import Swal from "sweetalert2";
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
            <form @submit.prevent="updateActivity">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Activity Info</h4>
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
                    <md-button type="submit" class="md-raised md-success">Update Activity</md-button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    import {ActivitiesService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "Activity",
        data() {
            return {
                activity: {},
                file: null
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getActivityById(id).then((response) => {
                this.activity = response.data.data;
            })
        },
        methods: {
            getActivityById(id) {
                return ActivitiesService.getActivity(id);
            },
            getImage() {
                return  {
                    borderRadius: '20px',
                }
            },
            updateActivity() {
                ActivitiesService.updateActivity(this.getDataForCreateCity()).then((response) => {
                    this.activity = response.data.data;
                    this.showMessageWithSuccessCity();
                });
            },

            showMessageWithSuccessCity() {
                Swal.fire(
                    'Updated!',
                    'This activity been update',
                    'success'
                );
            },

            getDataForCreateCity() {
                let formData = new FormData();

                formData.append('displayed_name', this.activity.displayed_name);
                formData.append('name', this.activity.name);
                formData.append('id', this.activity.id);
                formData.append('ru_displayed_name', this.activity.ru_displayed_name);
                formData.append('kz_displayed_name', this.activity.kz_displayed_name);

                if(this.file) {
                    formData.append('image', this.file);
                }

                return formData;
            },

            uploadFile(event) {
                this.file = event.target.files[0];
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