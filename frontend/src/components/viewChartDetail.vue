<template>
    <div id="charts">
        {{ id }}
  
    </div>
</template>

<style>

</style>

<script>
export default {
    created() {

    },
    data() {
        return {
            id:this.$route.params.chart_id,

        }
    },
    methods: {

    },
}
</script>