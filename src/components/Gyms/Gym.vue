<template>
    <div class="gym-info">
        <form @submit.prevent="updateGym">
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Gym Info</h4>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout">
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Email</label>
                                <md-input v-model="gym.email" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Gym name</label>
                                <md-input v-model="gym.name" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <div class="google-map">
                                <label class="map-label">Address</label>
                                <md-field>
                                    <AutocompleteGoogleMap
                                            ref="google-address"
                                            :country="['ua', 'kz']"
                                            :address="gym.address"
                                            id="map"
                                            placeholder="Address"
                                            @change="getInputAddress"
                                            @placechanged="getCoordinates"
                                    >
                                    </AutocompleteGoogleMap>
                                </md-field>
                            </div>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Description</label>
                                <md-input v-model="gym.description" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label class="time-label">Available From</label>
                                <vue-timepicker format="HH:mm" v-model="gym.available_from"></vue-timepicker>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label class="time-label">Available to</label>
                                <vue-timepicker format="HH:mm" v-model="gym.available_to"></vue-timepicker>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>City</label>
                                <md-select v-model="gym.city_id" :required="checkIfCityChecked()">
                                    <md-option
                                            v-for="city in list_cities"
                                            :value="city.id"
                                    >{{city.displayed_name}}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Public Email</label>
                                <md-input v-model="gym.public_email" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Phone</label>
                                <md-input v-model="gym.phone" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Web site</label>
                                <md-input v-model="gym.web_site" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>

                </md-card-content>
            </md-card>

            <div class="md-layout-item md-size-100 text-left">
                <md-button type="submit" class="md-raised md-success">Update Gym</md-button>
            </div>

        </form>

    </div>
</template>

<script>
    import {GymsService, CitiesService} from "@/common/api.service";
    import {ValidationService} from "@/common/validation.service";
    import AutocompleteGoogleMap from "../Maps/AutocompleteGoogleMap";
    import VueTimepicker from "@/components/TimePicker/TimePicker";
    import Swal from 'sweetalert2'

    export default {
        name: "Gym",
        components: {AutocompleteGoogleMap, VueTimepicker},
        data() {
            return {
                gym: {
                    'name': null,
                    'email': null,
                    'address': null,
                    'description': null,
                    'available_from': '',
                    'available_to': '',
                    'city_id': null,
                    'web_site': null,
                    'phone': null,
                    'public_email': null
                },
                search: null,
                list_cities: null
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getGymById(id).then((response) => {
                this.gym = response.data.data;
            })

            this.getListCities();
        },

        methods: {
            getGymById (id) {
                return GymsService.getGym(id);
            },
            updateGym() {
                let id = this.gym.id;

                GymsService.updateGym(id, this.getDateForUpdate()).then((result) => {
                    this.updateGymData(result);
                    this.showMessageWithSuccessGym();
                }).catch((error) => {
                    if(error.response) {
                        let listMessages = ValidationService.getListErrors(error.response.data.errors);
                        this.showMessageWithErrorGym(listMessages);
                    }
                });
            },

            updateGymData(result) {
                this.gym = result.data.data;
            },

            getCoordinates(place) {
                this.setLng(place);
                this.setLat(place);
            },

            getInputAddress(address) {
                this.gym.address = address;
            },

            getDateForUpdate() {
                return {
                  'name': this.gym.name,
                  'email': this.gym.email,
                  'address': this.gym.address,
                  'description': this.gym.description,
                  'available_from': this.gym.available_from,
                  'available_to': this.gym.available_to,
                  'city_id': this.gym.city_id,
                  'web_site': this.gym.web_site,
                  'phone': this.gym.phone,
                  'public_email': this.gym.public_email
                };
            },

            setLng(place) {
                this.gym.lng = place.latitude;
            },

            setLat(place) {
                this.gym.lat = place.longitude
            },

            showMessageWithSuccessGym() {
                Swal.fire(
                    'Updated!',
                    'This gym been updated',
                    'success'
                );
            },

            showMessageWithErrorGym(message) {
                Swal.fire(
                    'Error!',
                    message,
                    'error'
                );
            },

            getListCities() {
                CitiesService.getListCities().then((res) => {
                    this.list_cities = res.data.data;
                });
            },

            checkIfCityChecked() {
                return this.gym.city_id ? false : true;
            }
        }
    }
</script>

<style scoped>
    #map {
        width: 100%;
        height: 50px;
        border: none;
    }

    .time-label {
        top: 0;
        font-size: 11px;
    }

    .map-label {
        top: 0;
        font-size: 11px;
        position: absolute;
        left: 0;
        color: #AAAAAA !important;
    }

    .google-map {
        position: relative;
    }
</style>