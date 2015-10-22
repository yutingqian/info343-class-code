/*
    script for the index.html file
*/

Parse.initialize("PGVINDiLvSholkcbuOAX7IMeXo7oWaKhjxMKV5f4", "Wy9BFElpQf1BKGdcMStgVQfS4KUdaX5vOoqCNsye");
//Parse.initialize("qm1KczXR4qC7IlX14bllMXCekkAut09KfvrfaCZH", "XgXrhuV0fNzeVadjDkwNZW5XzJoCV9aKxxEpwJ81");

$(function() {
    "use strict";

    //new task class for parse
    var Task = Parse.Object.extend('Task');
    //new query that will return all tasks ordered by createdAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    //reference to the task list element
    var taskList = $('#tasks-list');

    //reference to rating element
    var ratingElem  = $('#rating');

    //reference to the error message alert
    var errorMessage = $('#error-message');

    //current set of tasks
    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        taskList.empty();
        tasks.forEach(function (task) {
            var li = $(document.createElement('li'))
                .text(task.get('title'))
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(taskList)
                .click(function() {
                    task.set('done', !task.get('done'));
                    task.save().then(renderTasks, displayError);
            });

            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0),
                    hints: ['crap', 'awful', 'okay', 'nice', 'awesome']})
                .appendTo(li);
        })
    }

  /*  function showMessage(message) {
        message = message || 'hello';
        alert(message);
    }

    showMessage('hello world'); */

    //when the user submits the new task form...
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name = "title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));

        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            ratingElem.raty('set', {});
        });

        return false;
    });

    //enable the rating user interface element
    ratingElem.raty();

    //go and fetch tasks from Parse
    fetchTasks();

    // window.setInterval(fetchTasks, 3000);
});