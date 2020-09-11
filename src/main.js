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


import { checkFilter } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus} } );

new Vue({
    el: '#app',
    
    // Data 
    data: {
        genre: [],
        time: [],
        movies: [], // Api Call vult deze array
        moment,
        day: moment(), // Get current day time
        bus
    },
   
    // Custom Vue Components
    components: {
        MovieList,  // Use Single File Component MovieList.vue
        MovieFilter // Use Single File Component MovieFilter.vue
    },

    // Lifecycle Hook: Created
    created() {
        // Using Vue Resource here (this is the Vue object)
        this.$http.get('/api').then(response => {
            this.movies = response.data; // Fill the movies array
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
    }
});