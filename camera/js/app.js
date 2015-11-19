
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia || 
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mouseIsDown;

    function snapshot() {
        if (videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
        }
    }

    video.addEventListener('click', snapshot, false);

    canvas.addEventListener('mousedown', function(evt) {
        ctx.beginPath();
        ctx.moveTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        mouseIsDown = true;
    });

    canvas.addEventListener('mousemove', function(evt) {
        if (mouseIsDown) {
            ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop);
        ctx.stroke();
        mouseIsDown = false;
    });

    navigator.getUserMedia({video: true}, function(stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);

    }, function(err) {
        console.error(err);
    });
});

