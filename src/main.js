import './style.scss';
import Vue from 'vue';
import genres from './util/genres';
import { relativeTimeThreshold } from 'moment';


new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: {
        checkFilter(category, title, checked) {
        // console.log(category, title, checked);
        console.log(checked);
        if(checked) {
                console.log(title);
                console.log(this[category]);
                this[category].push(title);
            } else {
             let index = this[category].indexOf(title);
             if(index > -1 ) {
                 this[category].splice(index, 1);
             }
            }


        }
    },
    
    // Custom Vue Components
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                            <div v-for="movie in filteredMovies" class="movie"> {{ movie.title }} </div>
                        </div>`,
            data() {
                return {
                    movies: [
                        { title: 'Pulp Fiction', genre: genres.CRIME },
                        { title: 'Home Alone', genre: genres.COMEDY },
                        { title: 'Asutin Powers', genre: genres.COMEDY }
                    ]
                }
            },
            props: ['genre', 'time'],
            methods: {
                moviePassesGenreFilter(movie) {
                    console.log('..............movie........................................');
                    console.log(movie.genre);
                    console.log(movie.title);
                    if(!this.genre.length){
                        return true;
                    } else {
                        console.log('movie.genre:');
                        console.log(movie.genre);
                        console.log(this.genre);
                        return this.genre.find(genre => movie.genre === genre );
                    }
                    
                }
            },
            computed: {
                filteredMovies() {
                    return this.movies.filter(this.moviePassesGenreFilter);
                }
            }
        },

        'movie-filter': {
            template: `<div id="movie-filter">
                            <h2>Movie filter</h2>
                            <div class="filter-group">
                                <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"> </check-filter> 
                            </div>
                        </div>`,
            methods: { 
                checkFilter(category, title, checked) {
                    console.log('CheckFilter');
                    this.$emit('check-filter', category, title, checked);
                }
            },
            data(){
                return {
                    genres
                }
            },
            components: {
                'check-filter': {
                    data(){ 
                        return {
                            checked: false
                        }
                    },
                    props: [ 'title'],
                    template: `<div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                                </div>`,
                    methods: {
                        checkFilter() {
                            this.checked = !this.checked;
                            this.$emit('check-filter',  'genre', this.title, this.checked);
                        }
                    }
                }
            }
        },
    }
});