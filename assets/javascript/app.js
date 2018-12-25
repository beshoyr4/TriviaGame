var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "What stadium did Toronto FC call home when they joined MLS in 2006?",
  answers: ["BMO Field", "Banc of California Stadium", "BC Place", "Children's Mercy Park"],
  correctAnswer: "BMO Field",
}, {
  question: "Which player was named the 2002 MLS Rookie of the Year?",
  answers: ["Kyle Martino", "Brad Davis", "Robin Fraser", "Donovan Ricketts"],
  correctAnswer: "Kyle Martino",
}, {
  question: "Which Seattle Sounders forward scored a hat trick in England's 1966 World Cup Final victory?",
  answers: ["Geoff Hurst", "Andy Rose", "Tyrone Mears", "Oniel Fisher"],
  correctAnswer: "Geoff Hurst",
}, {
  question: "Who was the goalkeeper named on the MLS All-Time Best XI list in 2005?",
  answers: ["Paul Bastock", "Scott Allison", "Tony Meola", "Jeff Cassar"],
  correctAnswer: "Tony Meola",
}, {
  question: "How many times has Sporting KC won MLS Cup?",
  answers: ["One", "Two", "Three", "Five"],
  correctAnswer: "Two",
}, {
  question: "Which French player captained the New York Red Bulls in the 2011 season?",
  answers: ["Juan Agudelo", "Zinedine Zidane", "Thierry Henry", "John Terry"],
  correctAnswer: "Thierry Henry",
}, {
  question: "How many canadian soccer teams played in the MLS in the 2011 season?",
  answers: ["Zero", "Two", "Five", "One"],
  correctAnswer: "Two",
}, {
  question: "How many teams were invited to the MLS Cup Playoffs in 2010?",
  answers: ["Eight", "Two", "Fourteen", "Six"],
  correctAnswer: "Eight",
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};