<template>
    <div>
        <form @submit.prevent="updateCity">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Gym Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>City slag</label>
                                <md-input v-model="city.name" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>City name</label>
                                <md-input v-model="city.displayed_name" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Update City</md-button>
            </div>

        </form>

    </div>
</template>

<script>
    import {CitiesService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "City",
        data() {
            return {
                city: {
                    'id': null,
                    'country_id': null,
                    'name': null,
                    'displayed_name': null,
                    'created_at': null
                },
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getCityById(id).then((response) => {
                this.city = response.data.data;
            })
        },

        methods: {
            getCityById(id) {
                return CitiesService.getCity(id);
            },
            updateCity() {
                let id = this.city.id;

                CitiesService.updateCity(id, this.getDateForUpdate()).then((result) => {
                    this.updateCityData(result);
                    this.showMessageWithSuccessCity();
                });
            },

            showMessageWithSuccessCity() {
                Swal.fire(
                    'Updated!',
                    'This city been updated',
                    'success'
                );
            },

            updateCityData(result) {
                this.city = result.data.data;
            },

            getDateForUpdate() {
                return {
                    'name': this.city.name,
                    'displayed_name': this.city.displayed_name,
                };
            },
        }
    }
</script>

<style scoped>

</style>