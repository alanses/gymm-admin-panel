<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-achievement />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateAchievement from "../components/Achievements/CreateAchievement";
    export default {
        name: "CreateAchiemenentPage",
        components: {CreateAchievement}
    }
</script>

<style scoped>

</style>