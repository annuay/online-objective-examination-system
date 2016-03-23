var questionData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    var time = { hours: "", minutes: ""};
    var seconds = 0;

    // Populate the question table on intial load
    fillQuestions(time);    
    
    //Timer
    var timer = setInterval(function() { 
       
        document.getElementById("time").innerHTML = time.hours + " hrs " + time.minutes + " mins " + (seconds) + " secs" ;

        //Trigger submit on completion of time
        if(time.hours == 0 && time.minutes == 0 && seconds == 0 )
        {
            clearInterval(timer);
            document.getElementById("formResponse").submit();
        }

        seconds--;

        if(seconds == -1)
        {
            seconds = 59;
            time.minutes-=1;

            if(time.minutes == -1)
            {
                time.minutes = 59;
                time.hours-=1;
            }
        }
     }, 1000);

    // Question link click
    $('#questionList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

});

// Functions =============================================================

// Fill Question List
function fillQuestions(time) {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/take_exam/list', {exam_code: exam_code}, function( data ) {

        // Question Content
        questionData = data.question_list;

        //Exam time data
        time.hours = data.duration_hours;
        time.minutes = data.duration_minutes;

        $qno=1;

        // For each item in our JSON, add a question link and answer select box
        $.each(data.question_list, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + $qno + '">' + $qno + '</a></td>';

            tableContent +=  '<td><select name="response'+$qno+'"><option value=" "> </option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option></select></td>';
            tableContent += '</tr>';
            $qno+=1;
        });

        // Inject the whole content string into our existing HTML table
        $('#questionList table tbody').html(tableContent); 
    });
};

// Show Question
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve question number from link rel attribute
    var qno = $(this).attr('rel')-1;

    // Get corresponding Question
    var questionObject = questionData[qno];

    //Populate Question Box
    $('#question').text(questionObject.question);
    $('#optionA').text(questionObject.optionA);
    $('#optionB').text(questionObject.optionB);
    $('#optionC').text(questionObject.optionC);
    $('#optionD').text(questionObject.optionD);
    $('#number').html('Question ' + (qno+1) + ' : '); 
};
