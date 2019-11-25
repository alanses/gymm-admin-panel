<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <city />
            </div>
        </div>
    </div>
</template>

<script>
    import City from "../components/Cities/City";
    export default {
        name: "CityPage",
        components: {City}
    }
</script>

<style scoped>

</style>