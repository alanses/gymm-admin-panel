<template>
    <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <div>
                <p>Count of Users: {{total}}</p>
            </div>
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">Users List</h4>
                </md-card-header>
                <md-card-content>
                    <users @getCountUsers="getCountUsers"></users>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
    import Users from "@/components/Users/Users";

    export default {
        name: "UsersPage",
        components: {Users},

        data() {
            return {
                total: 0
            }
        },
        methods: {
            getCountUsers(count) {
                this.total = count;
            }
        }
    }
</script>

<style scoped>

</style>