var express = require('express')
  , router = express.Router()
  , Exam = require('../models/exam')
  , Student = require('../models/student')

router.get('/', isLoggedInAsStudent, function(req, res) {

    res.render('exams/take_exam_code_entry', {title: "Enter Exam Code", username: req.user.username});

});

router.post('/exam', isLoggedInAsStudent, function(req, res) {
	var exam_code = req.body.exam_code;
	var username = req.body.username;
    console.log(exam_code);
    console.log(username);
    Exam.getByExamCode(exam_code, function(err,doc1) 
    {
        if(err)
            res.send("Some error occured");
        else if(doc1)
        {
            Student.getBycourseid(username, doc1.course_code, function(err,doc)
            {
                if(err)
                    res.send("Some error occured");
                else if(doc)
                {
                    Exam.checkResponse(username, exam_code, function(err, doc) 
                    {
                        if(err)
                            res.send("Some error occured");
                        else if(doc)
                            res.redirect('/take_exam');
                        else
                        {
                            res.render('exams/take_exam', { title: 'Take Exam', exam_code: exam_code, username: username}); 
                        }                       
                    })
                }
                else
                    res.redirect('/take_exam');
                    
            })
        }
        else
            res.redirect('/take_exam');

        
    })
});

router.get('/list', isLoggedInAsStudent, function(req, res) {

    Exam.getByExamCode(req.query.exam_code, function(err,docs){
        if(err)
        res.send("some error occured");
        else
        res.json(docs);
    });
});


router.post('/submit', isLoggedInAsStudent, function(req, res) {
    
    var username=req.body.username;
    var exam_code=req.body.exam_code;

    var object=req.body
    var response = [];

    for(var key in object) {
    response.push(object[key]);
	}
	response.pop();
	response.pop();

    Exam.addResponses(username, exam_code, response, function(err,docs){
        if(err)
        res.send("some error occured");
        else
        res.render('exams/exam_submit', { title: 'Response Submitted Successfully', response: response, username: username, exam_code: exam_code});
    });

});

router.get('/performance', isLoggedInAsStudent, function(req, res) {

    res.render('exams/view_performance_code_entry', {title: "Enter Exam Code", username: req.user.username});

});

router.post('/performance_view', isLoggedInAsStudent, function(req, res) {

    var username=req.body.username;
    var exam_code=req.body.exam_code;

    Exam.checkResponse(username, exam_code, function(err, doc) 
                    {
                        if(err)
                            res.send("Some error occured");
                        else if(doc)
                            {
                        

    Exam.getByExamCode(exam_code, function(err,docs){
        if(err)
        res.send("some error occured");
        else
        {
           var exam_obj = docs.question_list;

            Exam.getResponseByExamCode(exam_code, username, function(err, docs){
                if(err)
                    res.send("some error occured");
                else
                {
                    var response_obj = docs.response;
                    var total_questions = 0;
                    var attempted = 0;
                    var correct = 0;

                    for(var temp in exam_obj) {

                        if(response_obj[total_questions] != ' ')
                            attempted++;
                        if(exam_obj[total_questions].key == response_obj[total_questions])
                            correct++;
                        total_questions++;
                    }

                    res.render('exams/performance',{title: 'Result', total_questions: total_questions, attempted: attempted, correct: correct});
                }
            });
        }
    })}
    else
    {
        res.render('exams/view_performance_code_entry', {title: "Enter Exam Code", username: req.user.username});
    }                       
    })
});

module.exports = router;


function isLoggedInAsStudent(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='student')
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}