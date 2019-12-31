<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <photo-for-slider />
            </div>
        </div>
    </div>
</template>

<script>
    import PhotoForSlider from "../components/PhotoSlider/PhotoForSlider";
    export default {
        name: "PhotoForSliderPage",
        components: {PhotoForSlider}
    }
</script>

<style scoped>

</style>