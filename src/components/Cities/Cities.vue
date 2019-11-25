<template>
    <div>
        <md-table v-model="cities" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Slag">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Name">{{ item.displayed_name }}</md-table-cell>
                <md-table-cell md-label="Created At">{{ item.created_at }}</md-table-cell>

                <md-table-cell md-label="Actions">
                    <md-button class="btn-view" @click="viewCity(item.id)">View</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: "Cities",
        data() {
            return {
                tableHeaderColor: "",
            };
        },
        props: {
            cities: Array,
            default: []
        },
        methods: {
            viewCity(id) {
                this.$router.push({
                    path: `/city/${id}`
                });
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