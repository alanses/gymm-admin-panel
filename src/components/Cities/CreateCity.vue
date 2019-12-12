<template>
    <div>
        <form @submit.prevent="createCity">
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
                <md-button type="submit" class="md-raised md-success">Create City</md-button>
            </div>

        </form>

    </div>
</template>

<script>
    import {CitiesService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "CreateCity",
        data() {
            return {
                city: {
                    'country_id': 228,
                    'name': null,
                    'displayed_name': null,
                },
            };
        },
        methods: {
            createCity() {
                CitiesService.createCity(this.getDataForCreateCity()).then((result) => {
                    this.city = result.data.data;
                    this.showMessageWithSuccessCity();
                });
            },

            getDataForCreateCity() {
              return {
                  'displayed_name': this.city.displayed_name,
                  'name': this.city.name
              }
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

</style>