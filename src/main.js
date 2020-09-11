import Vue from 'vue';
import './style.scss';

//import { relativeTimeThreshold } from 'moment';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone'; // root instance ... normaal
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } }); // to componente instance



new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [], // Api Call vult deze array
        moment,
        day: moment() // Get current day time
    },
    methods: {
        checkFilter(category, title, checked) {
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
    },

    // Lifecycle Hook: Created
    created() {
        // Using Vue Resource here (this is the Vue object)
        console.log(this.$http);

        this.$http.get('/api').then(response => {
            console.log(response);
            console.log(response.data);
            this.movies = response.data; // Fill the movies array
        });

    }
});