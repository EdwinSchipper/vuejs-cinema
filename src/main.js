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
                                <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"> </check-filter> 
                            </div>
                        </div>`,
            methods: { 
                checkFilter() {
                    console.log('CheckFilter');
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
                            this.$emit('check-filter');
                        }
                    }
                }
            }
        },
    }
});