<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-city />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateCity from "../components/Cities/CreateCity";
    export default {
        name: "CreateCityPage",
        components: {CreateCity}
    }
</script>

<style scoped>

</style>