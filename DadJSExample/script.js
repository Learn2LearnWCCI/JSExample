
// when document is ready, call the initialize function of our quiz object
$(document).ready(function () {
    quiz.initialize();
});

// create a javascript quiz object to house our data and functionality
// it will have a property called scores which is an array
// and a property called currentQuestion which is an integer
var quiz = {
    'scores': [],
    'currentQuestion': 0
};

// create a function to show/hide questions
quiz.toggleQuestion = function (questionNumber, displayState) {
    $('#q' + questionNumber).css('display', displayState);
};

// add the initialize function to our quiz object
quiz.initialize = function () {
    // Determine how many questions we have.
    // This will add the lastQuestion property to our quiz object along with properties scores and currentQuestion
    quiz.lastQuestion = $('.question').length;

    // show first question
    $('#q0').css('display', 'block');

    // use jQuery class selector to hook up click event handler to next/prev buttons
    $(".btnNav").on('click', function () {

        // figure out id of the current radio group
        var radioId = 'radio' + quiz.currentQuestion;

        // store the user's selected radio value
        quiz.scores[quiz.currentQuestion] = $("input[name='" + radioId + "']:checked").val();

        // log to console what we've got so far
        console.log(quiz.scores.join());

        // navigate either foreward or backward. The $(this) will be a jQuery reference to the clicked button
        var direction = $(this).attr('value');
        quiz.toggleQuestion(quiz.currentQuestion, 'none'); // hide showing div
        if (direction === 'Next') {
            quiz.currentQuestion++;
        }
        else {
            quiz.currentQuestion--;
        }
        quiz.toggleQuestion(quiz.currentQuestion, 'block'); // show new div

        // test if can go next
        $('#btnNext').prop('disabled', quiz.canGoNext());

        // can go prev if haven't asked first question--reverse the logic because test is for disabled not enabled
        $('#btnPrev').prop('disabled', !(quiz.currentQuestion > 0));
    });

    // hook up event handler for radio button selections
    $('input[type=radio]').change(function () {

        // enable next button based on test if can go next
        $('#btnNext').prop('disabled', quiz.canGoNext());

        // enable submit button if last question has value
        var canSubmit = quiz.currentQuestion == (quiz.lastQuestion - 1);
        if (canSubmit) {
            quiz.enableSubmit();
        }
    });
};

quiz.enableSubmit = function () {
    // enable submit button
    $("#btnSubmit").prop('disabled', false);
    // change font style from gray to black text to show submit is enabled
    $(".done").css("color", "#000000");
    // load values into form's hidden fields
    var A = 0, K = 0, V = 0;
    for (var i = 0; i < quiz.lastQuestion; ++i) {
        if (quiz.scores[i] === 'a') {
            A++;
        }
        if (quiz.scores[i] === 'k') {
            K++;
        }
        if (quiz.scores[i] === 'v') {
            V++;
        }
    }
    $("#Auditory").val(A);
    $("#Kinetic").val(K);
    $("#Visual").val(V);
};

quiz.canGoNext = function () {
    var radioId = 'radio' + quiz.currentQuestion;

    // can go next if user has both 
    // selected a radio button value 
    var canGo = $("input[name='" + radioId + "']:checked").val()

    // and
    &&

    // haven't asked last question
    quiz.currentQuestion < (quiz.lastQuestion - 1);

    // reverse the logic here because test is for disabled not enabled
    return !canGo;
};
