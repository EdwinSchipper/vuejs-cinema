import Vue from 'vue';
import './style.scss';
import Overview from './components/Overview.vue';
//import { relativeTimeThreshold } from 'moment';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone'; // root instance ... normaal
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } }); // to componente instance

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus} } );


import VueRouter from 'vue-router';
Vue.use(VueRouter);




// VUE Router Config
import routes from './util/routes';
const router = new VueRouter({ routes });


import Tooltip from './util/tooltip';
Vue.use(Tooltip);

// VUE Instance
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
    },

    // Lifecycle Hook: Created
    created() {
        // Using Vue Resource here (this is the Vue object)
        this.$http.get('/api').then(response => {
            this.movies = response.data; // Fill the movies array
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    },
    router
});

