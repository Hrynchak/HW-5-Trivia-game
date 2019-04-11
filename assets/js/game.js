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
  timer: 25,
  timerOn: false,
  timerId : '',
  // questions options and answers
  questions: {
    q1: 'Who was the youngest World Chess Champion?',
    q2: 'Wladimir Klitschko is a champion boxer from which country?',
    q3: 'Which is the only country to have played in each and every World Cup?',
    q4: 'In which country was golf invented?',
    q5: 'How many rings are there on the Olympic flag?',
    q6: 'What is the fastest sanctioned car racing sport in the world?',
    q7: 'Who was the first NBA player to win five season MVP awards?',
    q8: 'How many NBA championships did Michael Jordan win with the Chicago Bulls?',
    q9: 'Which NFL player has won the most playoff games in history?',
    q10: 'How many teams are there in the American National Football League?'
  },
  options: {
    q1: ['Garry Kasparov', 'Bobby Fischer', 'Max Euwe', 'Jose Raul Capablanca'],
    q2: ['USA', 'England', 'Ukraine', 'Poland'],
    q3: ['Germany', 'Brazil', 'France', 'Argentina'],
    q4: ['India', 'England', 'USA', 'Scotland'],
    q5: ['4','5','6','3'],
    q6: ['Moto GP','Top Fuel Drag','Formula 1','Nascar'],
    q7: ['Bill Russell', 'LeBron James', 'Charles Barkley','Vlade Divac'],
    q8: ['2', '6', '3','7'],
    q9: ['Joe Montana', 'John Elway', 'Drew Brees','Tom Brady'],
    q10: ['16', '32', '8','64']
  },
  answers: {
    q1: 'Garry Kasparov',
    q2: 'Ukraine',
    q3: 'Brazil',
    q4: 'Scotland',
    q5: '5',
    q6: 'Formula 1',
    q7: 'Bill Russell',
    q8: '6',
    q9: 'Tom Brady',
    q10: '32'
  },

  startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // show game section
    $('#game').show();
    
    //  empty last results
    $('#results').html('');
    
    // show timer
    $('#timer').text(trivia.timer);
    
    // remove start button
    $('#start').hide();

    $('#remaining-time').show();
    
    // ask first question
    trivia.nextQuestion();
    
  },
  // display questions and options 
  nextQuestion : function(){
    
    
    trivia.timer = 25;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    // user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
     
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  
  guessChecker : function() {
    
    
    var resultId;
    
    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
   
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  
  guessResult : function(){
    
    
    trivia.currentSet++;
  
    $('.option').remove();
    $('#results h3').remove();
    
    trivia.nextQuestion();
     
  }

}