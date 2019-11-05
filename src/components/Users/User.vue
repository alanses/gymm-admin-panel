<template>
    <div class="user">
        <div class="user-photo" v-if="this.user.photo">
            <md-card>
                <md-card-content
                        class="image-form"
                        :style="{'backgroundImage': this.user.photo}"
                >
                    <div class="md-layout">
                    </div>
                </md-card-content>
            </md-card>
        </div>
        <div class="user-info">
            <form>
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">User Profile</h4>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <md-field>
                                    <label>Name</label>
                                    <md-input v-model="user.name" type="text"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Email</label>
                                    <md-input v-model="user.email" type="text"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Registered at date</label>
                                    <md-input v-model="user.registered_at_date" type="text" disabled></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>Registered at time</label>
                                    <md-input v-model="user.registered_at_time" type="text" disabled></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label>User type</label>
                                    <md-input v-model="user.user_type" type="text" disabled></md-input>
                                </md-field>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </form>
        </div>
    </div>
</template>

<script>
    import {UsersService} from "@/common/api.service";

    export default {
        name: "User",
        data() {
            return {
                user: {},
            };
        },
        created() {
            const id = this.$route.params.id;
            this.getUserById(id).then((response) => {
                this.user = response.data.data;
            })
        },

        methods: {
            getUserById(id) {
                return UsersService.getUserById(id);
            },
            getImage() {
                return  {
                    borderRadius: '20px',
                }
            }
        }
    }
</script>

<style scoped>
    .user {
        display: flex;
    }

    .user .user-photo {
        flex: 1 1 15%;
        margin-right: 15px;
    }

    .user .user-info {
        flex: 1 1 85%;
    }

    .image-form {
        min-height: 313px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

</style>