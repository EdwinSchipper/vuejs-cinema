import './style.scss';
import Vue from 'vue';

import { relativeTimeThreshold } from 'moment';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

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
        MovieList,  // Use Single File Component MovieList.vue
        MovieFilter // Use Single File Component MovieFilter.vue
    }

});