<template>
    <div>
        <md-table v-model="gyms" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Address">{{ item.address }}</md-table-cell>
                <md-table-cell md-label="Available from">{{ item.available_from }}</md-table-cell>
                <md-table-cell md-label="Available to">{{ item.available_to }}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button class="btn-view" @click="viewGym(item.id)">View</md-button>
                </md-table-cell>
                <md-table-cell md-label="Available">
                    <b-form-checkbox
                            @change="makeCheck"
                            @input="makeAvailable(item.id)"
                            :checked="item.is_available"
                            switch
                            size="lg"
                    >
                    </b-form-checkbox>
                </md-table-cell>
            </md-table-row>
        </md-table>

    </div>
</template>

<script>
    import {GymsService} from "@/common/api.service";
    import Swal from 'sweetalert2'

    export default {
        name: "Gyms",
        data() {
            return {
                tableHeaderColor: "",
                checked: null,
            };
        },
        props: {
            gyms: Array,
            default: []
        },
        methods: {
            viewGym(userId) {
                this.$router.push({
                    path: `/gyms/${userId}`
                });
            },

            makeCheck(checked) {
                this.checked = checked;
            },

            makeAvailable(id) {
                GymsService.confirmGym(id, {'available': this.checked});
            }
        }
    }
</script>

<style scoped>
    .btn-delete {
        background: #c51162 !important;
        margin-right: 10px;
    }

    .btn-view {
        background: #3d5afe !important;
        min-width: 100px;
    }

    .table-image {
        min-width: 50px;
        min-height: 50px;
        border-radius: 25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: #ebebeb;
        width: 50px;
        height: 50px;
    }

</style>