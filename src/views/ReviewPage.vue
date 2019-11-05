<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <review />
            </div>
        </div>
    </div>
</template>

<script>
    import Review from "../components/Reviews/Review";

    export default {
        name: "ReviewPage",
        components: {Review}
    }
</script>

<style scoped>

</style>