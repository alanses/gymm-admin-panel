<template>
    <div>
        <md-table v-model="photos" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Number in slider">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Origin name">{{ item.origin_name}}</md-table-cell>
                <md-table-cell md-label="Description">{{ item.description}}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button class="btn-view" @click="viewPhoto(item.id)">View</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: "PhotosSlider",
        data() {
            return {
                tableHeaderColor: "",
            };
        },

        props: {
            photos: Array,
            default: []
        },
        methods: {
            viewPhoto(id) {
                this.$router.push({
                    path: `/gyms/${userId}`
                });
            },
        }
    }
</script>

<style scoped>
    .btn-view {
        background: #3d5afe !important;
        min-width: 100px;
    }
</style>