<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100">
                <user />
            </div>
        </div>
    </div>
</template>

<script>
    import User from "@/components/Users/User";

    export default {
        name: "UserPage",
        components: {User},
    }
</script>

<style scoped>

</style>