var times = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];
var tasks = {};

var createTable = function(taskTime, taskText) {
    // create elements for a row of the scheduler
    var taskRow = $("<div>").addClass("row");
    var cm1 = $("<span>")
        .text(taskTime);
    var cm2 = $("<p>")
        .addClass("m-1")
        .text(taskText);
    
    // append cm1 and cm2 to taskRow
    taskRow.append(cm1, cm2);

    // append to container on page
    $(".container").append(taskRow);
}
/* current date */
var loadDate = function(){
    var date = moment().format('dddd, MMMM Do');;
    $('#currentDay').append(date);

};

var taskGen = function(times){
    console.log(times.length);
    tasks = JSON.parse(localStorage.getItem("text"));
    
    // if there is nothing in the localStorage, create new text object
    if (!tasks) {
        tasks = {
            text: ["testing", "", "", "", "", "", "", "", ""]
        };
    }

    for (let i = 0; i < times.length; i++) {
        createTable(times[i], tasks["text"][i]);
    }


};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


loadDate();
taskGen(times);