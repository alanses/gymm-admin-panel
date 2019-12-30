<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div class="photos">
                <div>
                    <md-button
                            type="submit"
                            class="md-raised md-success"
                            v-show="!photos.length"
                            @click="createPhotosForSlider">
                            Create Photos for Slider
                    </md-button>
                </div>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Photos</h4>
                </md-card-header>
                <md-card-content>
                    <photos-slider :photos="photos"></photos-slider>
                </md-card-content>
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
            </md-card>
        </div>
    </div>
</template>

<script>
    import {SliderPhotosService} from "@/common/api.service";
    import PhotosSlider from "../components/PhotoSlider/PhotosSlider";

    export default {
        name: "PhotoSliderPage",
        components: {PhotosSlider},
        data() {
            return {
                photos: [],
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },
        created() {
            this.getListPhotos();
        },

        methods: {
            getListPhotos() {
                SliderPhotosService.getSliderImages({'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        this.photos = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListPhotos();
            },

            createPhotosForSlider() {
                this.$router.push({ name: "create_photos_for_slider" });
            }
        }
    }
</script>

<style scoped>
    .pagination {
        margin-top: 15px;
    }

    .photos {
        display: flex;
        justify-content: space-between;
    }
</style>