$(document).ready(function(){
  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
})
  var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // data for questions stored in array.
    questions: {
      q1: 'What is the third sign of the Zodiac?',
      q2: 'What is the largest bone in the human body?',
      q3: 'What is the largest two digit prime number?',
      q4: 'Who was the first baseball player to have his number retired?',
      q5: "Who was the Greek god of dreams?",
      q6: 'Which is the largest island in the Mediterranean Sea?',
      q7: "What album is the best selling of all time?"
    },
    // data for options stored in array.
    options: {
      q1: ['Gemini', 'Virgo', 'Leo', 'Capricorn'],
      q2: ['Tibia ', 'Fibula', 'Femur', 'Humerus'],
      q3: ['37', '97', '69', '3'],
      q4: ['Lou Gehrig', 'Babe Ruth', 'Billy Meyer', 'Willie Mays'],
      q5: ['Posiden','Aries','Morpheus','Hera'],
      q6: ['Mykonos','Ibiza','Sicily','Australia'],
      q7: ['Thriller', 'Hotel California', 'Led Zeppelin IV','The Wall']
    },
    // data for answers stored in array.
    answers: {
      q1: 'Gemini',
      q2: 'Femur',
      q3: '97',
      q4: 'Lou Gehrig',
      q5: 'Morpheus',
      q6: 'Sicily',
      q7: 'Thriller'
    },
    // method to start-up game.
    startGame: function(){
      // restarts the game results with clearInterval.
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // shows game section/instructions
      $('#game').show();
      
      //  clear's previous results
      $('#results').html('');
      
      // shows display timer
      $('#timer').text(trivia.timer);
      
      // removes/hides start button
      $('#start').hide();
  
      // displays time remaining
      $('#remaining-time').show();
      
      // function that asks the first question to user.
      trivia.nextQuestion();
    },

    // method to loop through and display questions/options.
    nextQuestion : function(){
      
      // sets timer for each question to 15 seconds.
      trivia.timer = 15;
      $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // sets timer intervals at 1sec
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions, then indexes the current questions in the array.
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // array of all the user options for the current question.
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates the trivia answer options in the html script.
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement the counter and counts as unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask...
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, print the result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h4>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h4>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds final result data of game to the page. (correct, incorrect, unanswered)
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unanswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hides game sction
        $('#game').hide();
        
        // shows the start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate which option is clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // sets answer id for the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the user guess picked, matches the correct answer for the CURRENT question, increment correct.
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong answer, increment incorrect.
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h4> Better luck next time! <br> </br>  Correct Answer: '+ currentAnswer +'</h4>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increments to next question
      trivia.currentSet++;
      
      // removes the options and results from page
      $('.option').remove();
      $('#results h3').remove();
      $('#results h4').remove();
      
      // function to populate next question
      trivia.nextQuestion();
    }
  }
  