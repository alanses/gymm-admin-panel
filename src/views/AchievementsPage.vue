<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div class="achievements">
                <md-field class="search-achievements">
                    <label>Search</label>
                    <md-input v-model="search" @input="searchAchievement"></md-input>
                </md-field>
                <div>
                    <md-button type="submit" class="md-raised md-success" @click="createAchievement">Create Achievement</md-button>
                </div>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Achievements: {{total}}</h4>
                </md-card-header>
                <md-card-content>
                    <achievements :achievements="achievements"></achievements>
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
    import debouncer from "@/util/debouncer";
    import {AchievementsService} from "@/common/api.service";
    import Achievements from "../components/Achievements/Achievements";

    export default {
        name: "AchievementsPage",
        components: {Achievements},
        mixins: [debouncer],

        data() {
            return {
                achievements: [],
                search: null,
                total: 0,
                currentPage: 1,
                perPage: 10,
            }
        },
        created() {
            this.getListAchievements();
        },

        methods: {
            getListAchievements() {
                AchievementsService.getListAchievements({'page': this.currentPage, 'search': this.search})
                    .then((result) => {
                        console.log(result.data.meta);
                        this.achievements = result.data.data;
                        this.total = result.data.meta.total;
                    });
            },

            updatePagination(page) {
                this.currentPage = page;
                this.getListAchievements();
            },

            searchAchievement(query) {
                this.search = query;
                this.$debounce('search', this.getListAchievements, 500)
            },

            createAchievement() {
                this.$router.push({ name: "create_achievement" });
            }
        }
    }
</script>

<style scoped>
    .pagination {
        margin-top: 15px;
    }

    .search-achievements {
        width: 300px;
    }

    .achievements {
        display: flex;
        justify-content: space-between;
    }
</style>