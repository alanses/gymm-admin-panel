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
                            <md-field>
                                <label>Address</label>
                                <md-input v-model="gym.address" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100">
                            <md-field>
                                <label>Description</label>
                                <md-input v-model="gym.description" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Available From</label>
                                <md-input v-model="gym.available_from" type="text"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-50">
                            <md-field>
                                <label>Available to</label>
                                <md-input v-model="gym.available_to" type="text"></md-input>
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
    import {GymsService} from "@/common/api.service";

    export default {
        name: "Gym",
        data() {
            return {
                gym: {},
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getGymById(id).then((response) => {
                this.gym = response.data.data;
            })
        },

        methods: {
            getGymById (id) {
                return GymsService.getGym(id);
            },
            updateGym() {
                // let id = this.gym.id;

                // GymsService.updateGym(id, this.getDateForUpdate()).then((result) => {
                //     this.updateGymData(result);
                // });
            },

            updateGymData(result) {
                this.gym = result.data.data;
            },

            getDateForUpdate() {
                return {
                  'name': this.gym.name,
                  'email': this.gym.email,
                  'address': this.gym.address,
                  'description': this.gym.description,
                  'available_from': this.gym.available_from,
                  'available_to': this.gym.available_to
                };
            }
        }
    }
</script>

<style scoped>

</style>