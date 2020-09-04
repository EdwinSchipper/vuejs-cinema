import './style.scss';
import Vue from 'vue';
import genres from './util/genres';


new Vue({
    el: '#app',
    
    // Custom Vue Components
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                            <div v-for="movie in movies" class="movie"> {{ movie.title }} </div>
                        </div>`,
            data() {
                return {
                    movies: [
                        { title: 'Pulp Fiction' },
                        { title: 'Home Alone' },
                        { title: 'Asutin Powers' }
                    ]
                }
            }
        },
        'movie-filter': {
            template: `<div id="movie-filter">
                            <h2>Movie filter</h2>
                            <div class="filter-group">
                                <check-filter v-for="genre in genres"> </check-filter>
                            </div>
                        </div>`,
            data(){
                return {
                    genres
                }
            },
            components: {
                'check-filter': {
                    template: `<div>Filter</div>`
                }
                }
        },
    }
});