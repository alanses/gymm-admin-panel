<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-activity />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateActivity from "../components/Activities/CreateActivity";
    export default {
        name: "CreateActivityPage",
        components: {CreateActivity}
    }
</script>

<style scoped>

</style>