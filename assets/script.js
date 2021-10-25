var times = ["9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm"];
var tasks = {};

var createTable = function(taskTime, taskText, id) {
    // create elements for a row of the scheduler
    var taskRow = $("<div>")
        .addClass("row")
        .attr('id', id);
    var cm1 = $("<span>")
        .addClass("col border")
        .text(taskTime);
    var cm2 = $("<p>")
        .addClass("m-1")
        .attr('id', id)
        .addClass("col-8 border")
        .text(taskText);
    var cm3 = $("<button>")
        .addClass("col btn btn-primary border");


    // function to color rows depending on time.
    var shading = function(taskTime){
        //var currentTime = moment("1:00 pm", "h:mm a");
        var currentTime = moment();
        var timeAdj = moment(taskTime, 'h:mm a');

        var currentHour = currentTime.hour();
        var adjHour = timeAdj.hour();

        if (currentHour > adjHour){
            cm2.addClass("table-secondary");
        }
        else if (currentHour === adjHour){
            cm2.addClass("table-danger");
        }
        else {
            cm2.addClass("table-primary");
        }
    };

    shading(taskTime);

    // append cm1 and cm2 to taskRow
    taskRow.append(cm1, cm2, cm3);

    // append to container on page
    $(".table").append(taskRow);
}

/* compare current time to schedule */
var cm2 = function(){

}

/* current date */
var loadDate = function(){
    var date = moment().format('dddd, MMMM Do');;
    $('#currentDay').append(date);

};

var taskGen = function(times){
    tasks = JSON.parse(localStorage.getItem("tasks"));

    var table = $("<table>")
        .addClass("table");
    $(".container").append(table);
    
    // if there is nothing in the localStorage, create new text object
    if (!tasks) {
        tasks = {
            text: ["", "", "", "", "", "", "", "", ""]
        };
    }

    for (let i = 0; i < times.length; i++) {
        createTable(times[i], tasks.text[i], i);
    }


};

$(".container").on("click", "p", function(){
    var content = $(this)
        .text()
        .trim();

    var idSelect = $(this).attr("id");
    
    var contentInput = $("<textarea>")
        .addClass("form-control")
        .addClass("m-1")
        .attr('id', idSelect)
        .addClass("col-8 border")
        .val(content);
    
    $(this).replaceWith(contentInput);
    contentInput.trigger("focus");
});

$(".container").on("click", "button", function(){
    var status = $(this)
        .closest(".row")
        .attr("id");
    
    if ($("textarea[id=" + status +"]").length){
        var textVal = $("textarea[id=" + status +"]")
            .val()
            .trim();
        
        tasks["text"][status] = textVal;
        saveTasks();
    }

})

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



loadDate();
taskGen(times);