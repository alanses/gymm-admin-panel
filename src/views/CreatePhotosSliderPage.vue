<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <create-photos-for-slider />
            </div>
        </div>
    </div>
</template>

<script>
    import CreatePhotosForSlider from "../components/PhotoSlider/CreatePhotosForSlider";
    export default {
        name: "CreatePhotosSliderPage",
        components: {CreatePhotosForSlider}
    }
</script>

<style scoped>

</style>