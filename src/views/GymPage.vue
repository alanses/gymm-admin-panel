<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <gym />
            </div>
        </div>
    </div>
</template>

<script>
    import Gym from "../components/Gyms/Gym";

    export default {
        name: "GymPage",
        components: {Gym}
    }
</script>

<style scoped>

</style>