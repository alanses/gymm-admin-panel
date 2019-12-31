<template>
    <div>
        <form @submit.prevent="createPhotosForSlider">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Create list photos for slider</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label class="photo-label">First photo</label>
                                <md-input @change="uploadFirstPhoto" type="file"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>First photo description</label>
                                <md-input v-model="photos_slider.first_description" type="text"></md-input>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label class="photo-label">Second photo</label>
                                <md-input @change="uploadSecondPhoto" type="file"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Second photo description</label>
                                <md-input v-model="photos_slider.second_description" type="text"></md-input>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label class="photo-label">Third photo</label>
                                <md-input @change="uploadThirdPhoto" type="file"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Third photo description</label>
                                <md-input v-model="photos_slider.third_description" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Create photos for slider</md-button>
            </div>

        </form>

    </div>
</template>

<script>
    import {SliderPhotosService} from "@/common/api.service";
    import {ValidationService} from "@/common/validation.service";

    import Swal from 'sweetalert2'

    export default {
        name: "CreatePhotosForSlider",
        data() {
            return {
                photos_slider: {
                    'first_photo': null,
                    'first_description': null,
                    'second_photo': null,
                    'second_description': null,
                    'third_photo': null,
                    'third_description': null,
                    'file1': null,
                    'file2': null,
                    'file3': null,
                },
            };
        },
        methods: {
            createPhotosForSlider() {
                SliderPhotosService.createSliderPhotos(this.getDataForCreateSlider()).then((result) => {
                    this.showMessageWithSuccessPhotosForSlider();
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithErrorPhotosForSlider(listMessages);
                    }
                });
            },

            showMessageWithErrorPhotosForSlider(message) {
                Swal.fire(
                    'Error!',
                    message,
                    'error'
                );
            },

            getDataForCreateSlider() {
                let formData = new FormData();

                formData.append('photos[0][photo]', this.photos_slider.file1);
                formData.append('photos[1][photo]', this.photos_slider.file2);
                formData.append('photos[2][photo]', this.photos_slider.file3);

                formData.append('photos[0][description]', this.photos_slider.first_description);
                formData.append('photos[1][description]', this.photos_slider.second_description);
                formData.append('photos[2][description]', this.photos_slider.third_description);

                return formData;
            },

            uploadFirstPhoto(event) {
                this.photos_slider.file1 = event.target.files[0];
            },

            uploadSecondPhoto(event) {
                this.photos_slider.file2 = event.target.files[0];
            },

            uploadThirdPhoto(event) {
                this.photos_slider.file3 = event.target.files[0];
            },

            showMessageWithSuccessPhotosForSlider() {
                Swal.fire(
                    'Created!',
                    'This photos for slider been created',
                    'success'
                );
            },

        }
    }
</script>

<style scoped>
    .photo-label {
        top: 0;
        font-size: 11px;
    }
</style>