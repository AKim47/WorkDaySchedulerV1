var loadDate = function(){
    var date = moment().format('dddd, MMMM Do');;
    $('#currentDay').append(date);

};

loadDate();