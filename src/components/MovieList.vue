<template>
    <div id="movie-list">
        
        <!-- Check if filteredMovies has value -->
        <div v-if="filteredMovies.length">
            <!-- Select template element (MovieItem from component) -->
            <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie">
            <div class="movie-sessions">
                <div 
                    v-for="session in filteredSessions(movie.sessions)" 
                    class="session-time-wrapper tooltip-wrapper"
                    v-tooltip="{ seats: session.seats }"
                    v-bind:key="session.id"
                    >
                    <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                </div>
            </div>
            </movie-item>    
        </div>

        <!-- Check no results -->
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>

        <!-- Fallback message, loading document before calculate above conditions etc. -->
        <div v-else class="no-results">
            Loading ...
        </div>
    </div>
</template>


<script>
    // Import genres object
    import genres from '../util/genres'; 
    import times from '../util/times';
    import MovieItem from './MovieItem.vue';

    // Export an object
    export default {
        props: ['genre', 'time', 'movies', 'day'],
        methods: {
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
              console.log('Filtering sessions: ');
            //   console.log(sessions);
              console.log(sessions.filter(this.sessionPassesTimeFilter));
              return sessions.filter(this.sessionPassesTimeFilter);
            },
            moviePassesGenreFilter(movie) {
                if(!this.genre.length){
                    return true;
                } else {
                    let movieGenres = movie.movie.Genre.split(", ");
                    let matched = true;

                    this.genre.forEach(genre => {
                        if(movieGenres.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            sessionPassesTimeFilter(session) {
                if(!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                } else if(this.time.length === 0 || this.time.length === 2) {
                    return true;
                } else if(this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18
                } else {
                    return this.$moment(session.time).hour() < 18
                }
            }
        },
        computed: {
            filteredMovies() {
                return this.movies
                .filter(this.moviePassesGenreFilter)
                .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
            },
            noResults() {
                let times = this.time.join(', ');
                let genres = this.genre.join(', ');
                return `No Results for ${times}${ times.length && genres.length ? ', ' : ''} ${genres}.`
            }
        },
        components: {
            MovieItem // Use Single File Component MovieItem.vue
        }
    }
</script>

<style>
</style>