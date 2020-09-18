<template>
    <div id="overview">
        
        <!-- Day Select Vue Components -->
        <day-select v-bind:selected="day"></day-select>
        <!-- // Day Select Vue Components -->

        <div class="main">
            <!-- Custom Vue Components -->
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies" v-bind:day="day"></movie-list>
            <movie-filter></movie-filter>
            <!-- // Custom Vue Components -->
        </div>

    </div>
</template>

<script>
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    import DaySelect from './DaySelect.vue';

    export default {

        // Properties
        props: ['genre', 'time', 'movies', 'day'],

        // Custom Vue Components
        components: {
            MovieList,  // Use Single File Component MovieList.vue
            MovieFilter, // Use Single File Component MovieFilter.vue
            DaySelect// Use Single File Component DaySelect.vue
        }
    }
</script>