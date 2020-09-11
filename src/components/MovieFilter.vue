<template>
    <div id="movie-filter">
        <h2>Movie filter</h2>
        <div class="filter-group">
            <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"> </check-filter> 
        </div>
    </div>
</template>

<script>
    // Import genres object & Component CheckFilter.vue
    import genres from '../util/genres';
    import CheckFilter from './CheckFilter.vue'

    // Export an object
    export default {
        data(){
            return {
                genres
            }
        },
        methods: { 
            checkFilter(category, title, checked) {
                this.$emit('check-filter', category, title, checked);
            }
        },
        components: {
            CheckFilter // Use Single File Component CheckFilter.vue
        }
    }
</script>

<style>
</style>