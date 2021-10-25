var times = ["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"];
var tasks = {};

var createTable = function(taskTime, taskText) {
    // create elements for a row of the scheduler
    var taskRow = $("<div>").addClass("row");
    var cm1 = $("<span>")
        .addClass("col border")
        .text(taskTime);
    var cm2 = $("<p>")
        .addClass("m-1")
        .addClass("col-8 border")
        .text(taskText);
    var cm3 = $("<button>")
        .addClass("col btn btn-primary border");
    // append cm1 and cm2 to taskRow
    taskRow.append(cm1, cm2, cm3);

    // append to container on page
    $(".table").append(taskRow);
}
/* current date */
var loadDate = function(){
    var date = moment().format('dddd, MMMM Do');;
    $('#currentDay').append(date);

};

var taskGen = function(times){
    console.log(times.length);
    tasks = JSON.parse(localStorage.getItem("text"));

    var table = $("<table>")
        .addClass("table");
    $(".container").append(table);
    
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