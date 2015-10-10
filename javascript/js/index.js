/**
 * application script for index.html
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function forEachElement(collection, fn) {
        var idx;
        for (idx = 0; idx < collection.length; ++idx) {
            fn(collection[idx]);
        }
    }

    var clickMeButton = document.querySelector('#click-me');
    clickMeButton.addEventListener('click', function() {
        //alert('you clicked me!');
        var alerts = document.querySelectorAll('.alert');
        forEachElement(alerts, function(alert) {
            alert.style.display = 'block';
        });
    });

    var closeButtons = document.querySelectorAll('.alert .close');
    forEachElement(closeButtons, function(btn) {
        btn.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });

    var esHeadings = document.querySelectorAll('.expandable-section h2 a');
    forEachElement(esHeadings, function(esh) {
        esh.addEventListener('click', function(evt) {
            evt.preventDefault();
            this.parentElement.parentElement.classList.toggle('expanded');
            return false;
        });

    });

});
