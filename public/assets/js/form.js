$(document).ready(function() {
  // call our Cats
  populateCats();

  // Function to query categories for Quiz Cat select dropdown
  function populateCats() {
    $.get("/quizzes/api/new", function(categories) {
      for (var i = 0; i < categories.length; i++) {
        var category = $('<option>').attr('category-id', categories[i].id).html(categories[i].name);
        $('.quiz-categories').append(category);
      }
    });
  }

  // Function to Add Choice
  function newChoice() {
    var choiceContainer = $(this).parent().find('.choice-container');
    var newChoice = $(this).parent().find('.copy-choice').clone();
    newChoice.removeClass('copy-choice');
    newChoice.find('input').val('');
    var newChoiceRemove = $('<button>').addClass('btn btn-danger remove-choice').text('X');
    newChoice.append(newChoiceRemove);
    choiceContainer.append(newChoice);
  }

  // Make Quiz
  function createQuiz() {
    var newQuiz = {};
    newQuiz.category = []
    newQuiz.name = $("[name=name]").val();
    $('.quiz-categories option:selected').each(function() {
      newQuiz.category.push(parseInt($(this).attr('category-id')));
    });
    newQuiz.description = $('.quiz-description').val();
    newQuiz.category = JSON.stringify(newQuiz.category);
    $.ajax({
      method: 'POST',
      url: '/quizzes/create',
      data: newQuiz
    }).then(function(result) {
      // Passes Quiz Id to Questions
      createQuestions(result);
    });
  }

  // Make Questions 
  function createQuestions(r) {
    var fullQuestionList = {};
    var questionList = [];
    $('.question').each(function() {
      var questionItem = {};
      questionItem.quiz_id = r.id;
      questionItem.question = $(this).find('[name=question]').val();
      questionItem.correct_answer = $(this).find('[name=answer]').val();
      questionItem.explanation = $(this).find('[name=explanation]').val();
      var questionChoices = [];
      $(this).find('.choice-container').find('input').each(function() {
        questionChoices.push($(this).val());
      })
      questionItem.choice = JSON.stringify(questionChoices);
      questionList.push(questionItem);
    });
    fullQuestionList.questionList = questionList;

    $.ajax({
      method: 'POST',
      url: '/quizzes/questions',
      data: JSON.stringify(fullQuestionList),
      contentType: "application/json",
    }).then(function(result) {});
  }

  // Prevent New Quiz from submitting form unless through AJAX
  $('.new-quiz').on('click', 'button', function(e) {
    e.preventDefault();
  });

  // Add choice to question
  $(document).on('click', '.add-choice', newChoice);
  // Remove Question
  $(document).on('click', '.remove-choice', function() {
    $(this).parent().remove();
  });

  // Add Question
  $(document).on('click', '.add-question', function() {
    var newQuestion = $('.q1').clone();
    newQuestion.removeClass('q1').addClass('question');
    newQuestion.find('input').val('');
    newQuestion.find('textarea').val('');
    var newQuestionRemove = $('<button>').addClass('btn btn-danger remove-question').text('Remove Question');
    newQuestion.append(newQuestionRemove);
    $('.additional-questions').append(newQuestion);
  });

  // Remove Question
  $(document).on('click', '.remove-question', function() {
    $(this).parent().remove();
  });


  // Create Quiz
  $('body').on('click', '.submit-quiz', function() {
    // createQuiz();
    // var quiz = getQuizData();
    // var categories = getCategoryData();
    // var questions = getQuestionData();
    var data = {
      quiz: JSON.stringify(getQuizData()),
      categories: JSON.stringify(getCategoryData()),
      questions: JSON.stringify(getQuestionData()),
    };
    // console.dir(data);
    var data_snapshot = JSON.stringify(data);
    console.dir(data_snapshot);

    $.ajax({
      url: '/api/quiz/new',
      method: 'POST',
      data: data,
    }).then(function(response){
      console.log(response)
    });



  }); // closes .submit-quiz event

// ------------ Alan's Helper functions ----------------
function getQuizData(){
    var newQuiz = {};
    newQuiz.name = $("[name=name]").val();
    newQuiz.description = $('.quiz-description').val();
    return newQuiz;
};

function getCategoryData() {
    categories_array = [];
    $('.quiz-categories option:selected').each(function() {
      categories_array.push(parseInt($(this).attr('category-id')));
    });
    return categories_array;
};

function getQuestionData() {
    var questionList = [];
    $('.question').each(function() {
      var questionItem = {};
      questionItem.quiz_id;
      questionItem.question = $(this).find('[name=question]').val();
      questionItem.correct_answer = $(this).find('[name=answer]').val();
      questionItem.explanation = $(this).find('[name=explanation]').val();
      var questionChoices = [];
      $(this).find('.choice-container').find('input').each(function() {
        questionChoices.push($(this).val());
      })
      questionItem.choice = JSON.stringify(questionChoices);
      questionList.push(questionItem);
    });
    return questionList;
};


});