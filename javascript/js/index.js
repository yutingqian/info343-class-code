/**
 * application script for index.html
 */
<<<<<<< HEAD

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function forEachElement(collection, fn) {
        var idx;
        for (idx = 0; idx < collection.length; idx++) {
            fn(collection[idx]);
        }
    }

    var clickMeButton = document.getElementById("click-me");
    clickMeButton.addEventListener('click', function() {
        var alerts = document.querySelectorAll('.alert');
        forEachElement(alerts, function(alert) {
            alert.style.display = 'block';
        });
    });

    var closeButtons = document.querySelectorAll( '.alert .close');
    forEachElement(closeButtons, function(button) {
        button.addEventListener('click', function(){
            button.parentElement.style.display = 'none';
        });
    });

});
=======
>>>>>>> 42ac3daf88f8ba057fb7a658bf6a5beac54e65bc
