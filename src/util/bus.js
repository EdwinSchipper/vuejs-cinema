// Create functions
function checkFilter(category, title, checked) {
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

function setDay(day) {
    this.day = day;
}


// Export this object 
export { checkFilter, setDay };