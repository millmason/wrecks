$(document).ready(function(){

    $("#endscreen").hide();
    $("#quizblock").hide();
    $("#nav").hide();

    $("#close").click(function(){
      $("#endscreen").fadeOut(1000);
      $("#anglerfish").delay(1500).css({"-webkit-transform":"translateX(2000px)"});
    })

    $(".go").click(function(){
      $(".overlay").fadeOut(1000);
      $("#quizblock").fadeIn(3000);
      $("#nav").fadeIn(1500);
    });

    $("#shipwreck").click(function(){
      $("#jellyfish").css({"-webkit-transform":"translate(2000px, -1000px)"});
    });


    $(".notready").hide();

    $("#what").click(function(){
      $("#quizblock").fadeOut(500);
      $("#nav").fadeOut(500);
    	$(".overlay").fadeIn(1000);
  	});


    $("#no").click(function(){
      $("#ready").hide();
      $(".notready").show();
    });

    $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

    /*--quiz js--*/
var currentQuestion = null;
var questionNumber = 0;
var scoreNumber = 0;
var TitanicScore = 0;
var VikingScore = 0;
var PirateScore = 0;
var MaconScore = 0;

/*
for each question -
when you click submit, if answer equals a, TitanticScore++, if answer equals b, VikingScore++,
if answer equals c, PirateScore++, if answer equals d, MaconScore++
*/
var questionList = [
      {
        'question': 'What is your greatest flaw?',
        options: ['Arrogance', 'An inability to adapt to the changing times', 'Dreaming the impossible dream', 'Bloodlust']
      },
      {
        'question':'Where do you want to spend most of your life?',
        options: ['Under blazing stars in cold seas', 'Clear blue waters and white sand', 'Cutting the gray waves with long oars', 'Among the high clouds']
      },
      {
        'question':'Which do you consider to be the greatest treasure you could possess?',
        options: ['A grand staircase and smoking room', '40 bushels of cotton and 3 kegs of rum', 'A sun stone', 'far-sightedness and silent mobility']
      },
      {
        'question':'Which of the following inspires the deepest fear in you?',
        options: ['Unregulated manufacturing practices driven by irresponsible capitalism', 'The hypocrisy of empires prosecuting the criminals whom they created and used', 'The inevitable, murderous rage of Mother Nature', 'Cigarettes and stray sparks']
      },
      {
        'question':'How do you view your coworkers?',
        options: ['Milling airplanes that rely upon you to never have to leave their true home - the sky', 'Useful scallywags, who do their duty in between wild parties', 'Your sole friend is a small frigate who ignores your desperate texts, having truly taken to heart your own belief in your invulnerability.', 'Kinsman, sworn in blood and honor']
      },
      {
        'question':'Which of the following is closest to your views on cooperation?',
        options: ['Luring well-funded amateurs into joining your criminal enterprises, and then stealing their equipment', 'Convincing passengers to sacrifice themselves in accordance with societal expectations in spite of causing not providing enough life-saving devices due to classism', 'You are the mighty caretaker, always ready to shelter your more nimble counterparts.','Gender equality means everyone participating in slaughter.']
      },
      {
        'question':'How do you think you will be seen after your death?',
        options: ['Just when you thought you would be left in peace, in one of the darkest and most inhospitable places there are, the camera crews show up', 'Treasure hunters and adventure-seekers alike will seek you out - the only thing saving them from disappointment will be poor research skills.', 'You will be left mostly in peace, disturbed only by esoteric historians and people who read Buzzfeed.', 'You will be treated with great honor, and your feats will be recreated by your admirers.']
      },
      {
        'question':'How do you picture your eventual downfall?',
        options: ['A single mistake, made long before, will reveal itself to have slowly wrought havoc, and irrevocably doomed you', 'You will run aground on an ocean bar - potentially so as to break up a group grown too large.', 'An unexpected storm and a chain of poor decisions leads to a spiral into the sea', 'When your beloved leader dies, you too will perish in flame and honor.']
      },
      {
        'question':'What is your most deeply-felt calling?',
        options: ['To defy expectations, and smite the face of God.', 'Freedom and hedonism at any cost.', 'Bloody triumph and a less dismal place to live.', 'Swift danger falling from the heavens.']
      },
      {
        'question':'Where did you begin your life?',
        options: ['Belfast, Ireland', 'Agder, Norway', 'Nantes, France', 'California, USA']
      }

]

//when page loads, load first question.//

function questionLoad(){
  var currentQuestion = questionList[questionNumber];
  //set question in quizblock//
  $(".qheader").text(currentQuestion['question']);
  $("#a").text(currentQuestion.options[0]);
  $("#b").text(currentQuestion.options[1]);
  $("#c").text(currentQuestion.options[2]);
  $("#d").text(currentQuestion.options[3]);
  $('html, body').animate({
      'scrollTop': (300*questionNumber)
  }, 900, 'swing');
  if (questionNumber == 4){
    $("#littlefish").css({"-webkit-transform":"translateX(2000px)"});
  }
  if (questionNumber == 6){
  $("#coelacanth").css({"-webkit-transform":"translateX(2675px)"});
};
  questionNumber++;
  console.log("the question number is: " + questionNumber);
}

  questionLoad()

  $(".answeropt").click(function(){
    $('.checkbox').removeClass('clicked');
    $(this).children('.checkbox').addClass('clicked');
  });


  $("#submit").click(function(){
    submitAnswer()
  });
var wreckArray = [
  {name: "the Titanic", score: 0, hist:"The <a href='http://www.encyclopedia-titanica.org/'>RMS Titanic</a> was a luxury oceanliner which sank in the early 20th century."},
  {name: "the longship", score: 0, hist:"The <a href='http://www.khm.uio.no/english/visit-us/viking-ship-museum/exhibitions/oseberg/'>Oseburg ship</a> was a viking ship buried near Tønsberg, Norway in 834 AD."},
  {name: "the Queen Anne's Revenge", score: 0, hist:"The <a href='http://www.qaronline.org/History'>Queen Anne's Revenge</a> was the flagship of the pirate Blackbeard."},
  {name: "the USS Macon", score: 0, hist:"The <a href='http://news.usni.org/2015/08/19/exploring-the-wreck-of-uss-macon-the-navys-last-flying-aircraft-carrier'>USS Macon</a> was the last flying aircraft carrier in the US Navy."}

];


function submitAnswer(){
    var currentQuestion = questionList[questionNumber];
    var givenAnswer = ($(".clicked").next('span').attr('id')).toString();
    if (givenAnswer == "a"){
      wreckArray[0].score++;
    }else if(givenAnswer == "b"){
      wreckArray[1].score++;
    }else if(givenAnswer == "c"){
      wreckArray[2].score++;
    }else if(givenAnswer == "d"){
      wreckArray[3].score++;
    }else{
      alert("error");
    };
    $('#questionno').html(questionNumber+1);
    $(".clicked").removeClass("clicked");
    if (questionNumber<9){
      questionLoad();
    }else{
      $('html, body').animate({
          'scrollTop': (3600)
      }, 3000, 'swing')
      $("#quizblock").fadeOut(2000);
      //check for delay- trigger at end of body animate function
     var topWreck = calculateScore();
     $("#endtext").html("You most closely resemble " + topWreck.name + ". " + topWreck.hist + " Please feel free to rest here on the ocean floor and contemplate the futility of life while browsing these links about your future demise, or battle the inevitable by hitting 'restart.'");
     $("#endscreen").delay(1500).fadeIn(4000);
    };
  };
/*
function conclusionLoad(){
  calculateScore();
  var finalWreck = "";
  $("#quizblock").fadeOut(500);
  $("#conclusiontext").html(wreckArray(finalWreck.info));
  $("#conclusion").fadeIn(1000);
}
*/
function calculateScore(){
  var highScoreSoFar = 0;
  var result;
  for (var i = 0; i < wreckArray.length; i++) {
      if (wreckArray[i].score > highScoreSoFar) {
          result = wreckArray[i];
          highScoreSoFar = wreckArray[i].score;
      }
  }
  return result;
}


function newGame(){
  questionNumber = 0;
  $("#questionno").html(questionNumber+1);
  $("#quizblock").fadeIn(2000);
  $("#endscreen").fadeOut(1000);
  $("#coelacanth").css("left", "-1650px");
  questionLoad();
}

$("#newgame").click(function(){
  newGame()
});

});
document.addEventListener("DOMContentLoaded",function(){
  var fill=document.querySelector(".water-fill");
  TweenMax.fromTo(fill,0.8,{
    attr:{
      x:-400
    }
  },
  {
    attr:{
      x:0,
    },
    repeat:-1,
    ease:Linear.easeNone
  });

  TweenMax.fromTo(fill,10,{
    attr:{
      y:120,
      height:0
    },
  },{
    attr:{
      y:-20,
      height:140
    },
    repeat:-1,
    yoyo:true,
    ease:Linear.easeNone
  });

});
