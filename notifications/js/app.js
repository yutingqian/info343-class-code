/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermision() {
        Notification.requestPermission(function(result) {
            if('granted' === result) {
                showNotification('Thanks!', "You are an idiot!");
            }
        });
    }



    function showNotification(title, body) {
        var note = new Notification(title, {body: body, icon: 'img/notification.png'});
        window.setTimeout(note.close.bind(note), 3000);
    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function() {
       switch (Notification.permission) {
           case 'granted':
               showNotification('Hello', 'triggered at ' + new Date().toLocaleTimeString());
               break;
           case 'denied':
               alter('Please enable notifications! Idiot...');
               break;

           default:
               askPermision();
       }
    });
});
