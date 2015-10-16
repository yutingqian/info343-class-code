/**
 * application script for the states.html
 */
<<<<<<< HEAD

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function addStates(states, listElem) {
        listElem.innerHTML = '';
        states.forEach(function(state) {
            //console.log(states);
            var li = document.createElement('li');
            li.textContent = state.name;
            listElem.appendChild(li);
        });
    }

    var statesFilter = document.getElementById('state-filter-field');
    statesFilter.addEventListener('keyup', function() {
       var filter = this.value.toLowerCase();
       // console.log(filter);
       var filteredStates = usaStates.filter(function(state) {
          return state.name.toLowerCase().indexOf(filter) >= 0;
       });
        addStates(filteredStates, statesUl);
    });

    var statesUl = document.getElementById('states-list');
    addStates(usaStates, statesUl);
});
=======
>>>>>>> 42ac3daf88f8ba057fb7a658bf6a5beac54e65bc
