<template>
    <div class="photo-for-slider">
        <div class="photo" v-if="this.photos_slider.path">
            <md-card>
                <md-card-content
                        class="image-form"
                        :style="{
                            'background-image': 'url(' + this.photos_slider.path + ')'
                            }"
                >
                    <div class="md-layout">
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="photo-info">
            <form @submit.prevent="updatePhoto">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Slider photo Info</h4>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Photo description</label>
                                    <md-input v-model="photos_slider.description" type="text" required></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label class="label">Photo origin name</label>
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
    import Swal from 'sweetalert2'
    import {SliderPhotosService} from "@/common/api.service";
    import {ValidationService} from "@/common/validation.service";

    export default {
        name: "PhotoForSlider",

        data() {
            return {
                photos_slider: {
                    'id': null,
                    'description': null,
                    'origin_name': null,
                    'path': null
                },
                file: null
            };
        },

        created() {
            const id = this.$route.params.id;
            this.getSliderPhotoById(id).then((response) => {
                this.photos_slider = response.data.data;
            });
        },


        methods: {
            getSliderPhotoById(id) {
                return SliderPhotosService.getImageForSlider(id);
            },

            updatePhoto() {
                SliderPhotosService.updateImage(this.getDataForUpdatePhoto()).then((result) => {
                    this.updateSliderPhotoData(result);
                    this.showMessageWithSuccessReview()
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithErrorPhotosForSlider(listMessages);
                    }
                });
            },

            uploadFile(event) {
                this.file = event.target.files[0];
            },

            updateSliderPhotoData(result) {
                this.photos_slider = result.data.data;
            },

            showMessageWithErrorPhotosForSlider(message) {
                Swal.fire(
                    'Error!',
                    message,
                    'error'
                );
            },

            getDataForUpdatePhoto() {
                let formData = new FormData();

                if(this.file) {
                    formData.append('image', this.file);
                }

                formData.append('description', this.photos_slider.description);
                formData.append('id', this.photos_slider.id);

                return formData;
            },

            showMessageWithSuccessReview() {
                Swal.fire(
                    'Updated!',
                    'This photo for slider been updated',
                    'success'
                );
            }
        }
    }
</script>

<style scoped>
    .photo-for-slider {
        display: flex;
    }

    .photo-for-slider .photo {
        flex: 1 1 15%;
        margin-right: 15px;
    }

    .photo-for-slider .photo-info {
        flex: 1 1 85%;
    }

    .image-form {
        min-height: 313px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .label {
        top: 0;
        font-size: 11px;
    }
</style>