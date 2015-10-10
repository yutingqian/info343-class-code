/**
 * application script for the states.html
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function addStates(states, listElem) {
        listElem.innerHTML = '';

        states.forEach(function(state) {
            var li = document.createElement('li');
            li.textContent = state.name + ' (' + state.abbreviation + ')';
            listElem.appendChild(li);
        });
    }

    var statesListElem = document.getElementById('states-list');
    addStates(usaStates, statesListElem);

    var statesFilter = document.getElementById('state-filter-field');
    statesFilter.addEventListener('keyup', function() {
        var filter = this.value.toLowerCase();
        var filteredStates = usaStates.filter(function(state) {
            return filter.length === 0 || state.name.toLowerCase().indexOf(filter) >= 0;
        });

        addStates(filteredStates, statesListElem);
    });

});
