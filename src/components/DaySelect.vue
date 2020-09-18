<template>
    <div id="day-select">
        <ul class="days">
            <li v-bind:class="{ day: true, active: isActive(day) }" v-for="day in days" v-on:click="selectDay(day)">
                {{ formatDay(day) }}
            </li>
            <li class="day-selector">
                <span class="dec" v-on:click="changeDay(-1)"></span>
                <span class="inc" v-on:click="changeDay(+2)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
    props: [ 'selected'],
    data() {
        return {
            // selected: this.$moment(),
            days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days'))
        };
    },
    methods: {
        formatDay(raw) {
            if(raw.isSame(this.$moment(), 'day')) {
                return 'Today';
            } else {
                return raw.format('ddd DD/MM');
            }
        },
        isActive(day) {
            console.log('Active day: ');
            console.log(this.selected)
            console.log(day)
            console.log(day.isSame(this.selected, 'day'));
            console.log('--//--')
            return day.isSame(this.selected, 'day');
        },
        selectDay(day) {
            console.log('emit event: Clicked day');
            console.log(day._d);
            console.log(day);
            this.$bus.$emit('set-day', day);
        },
        changeDay(change) {
            console.log(change);
            let newDay = this.$moment(this.selected).add(change, 'days');
            if(this.days.find(day => newDay.isSame(day, 'day'))) {
                this.selectDay(newDay);
            }
            
        }
    }
}
</script>