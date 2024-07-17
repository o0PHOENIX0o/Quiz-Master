let capitalAns;
let flagAns;
let Cscore=0;
let Fscore=0;

let capitalScoreSpan = $('#Cscore');
let capitalScoreDiv = $('#worldContainer .score');

let flagScoreSpan = $('#Fscore');
let flagScoreDiv = $('#FlagContainer .score');

const url = 'http://127.0.0.1:3000';
// const url = 'https://8976-103-99-196-248.ngrok-free.app';

async function getCountry(){
  $('#worldContainer input[name="Capital"]').val('');
  updateScore('capital');
  try{
    const response = await axios.get(`/country`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    const result = response.data;
    console.log(result, typeof(result));
    capitalAns = result.capital;
    $(".country h2").text(result.country);

  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
}

async function getFlag(){
  $('#FlagContainer input[name="Country"]').val('');
  updateScore('flag');
  try{
    const response = await axios.get(`/flag`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    const result = response.data;
    flagAns = result.name;
    console.log(result, result.flag);
    $('#flag').text(result.flag);
  

  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
}



function checkCapital(event){
  event.preventDefault();
  $('.err').empty();
  const capital = $('#worldContainer input[name="Capital"]').val();
  if(!capital){
    $('.err').html("please enter the capital");
    return;
  }

  if(capital.toLowerCase() === capitalAns.toLowerCase()){
    updateScore('capital');
    capitalScoreDiv.css({'color': 'green'});
    Cscore++ 
    
  }else{
    updateScore('capital');
    capitalScoreDiv.css({'color': 'red'});
    Cscore--;
  }
  getCountry();
}

function CheckCountry(event){
  event.preventDefault();
  $('#FlagContainer .err').empty();
  const country = $('#FlagContainer input[name="Country"]').val();
  if(!country){
    $('#FlagContainer .err').html("please enter the country name");
    return;
  }

  if(country.toLowerCase() === flagAns.toLowerCase()){
    updateScore('flag');
    flagScoreDiv.css({'color': 'green'});
    Fscore++
    
  }else{
    updateScore('flag');
    flagScoreDiv.css({'color': 'red'});
    Fscore--;
  }
  getFlag();
}


function updateScore(quiz){

  let scoreDiv = (quiz === 'capital') ? capitalScoreDiv : flagScoreDiv;
  let scoreSpan = (quiz === 'capital') ? capitalScoreSpan : flagScoreSpan;
  let score = (quiz === 'capital') ? Cscore : Fscore;


  
  score = (score < 0) ? 0 : score; 
  console.log(scoreDiv,scoreSpan,score);
  
  scoreSpan.text(score);
  
  scoreDiv.addClass('scale-up-center');
  setTimeout(function() {
    scoreDiv.removeClass('scale-up-center');
    scoreDiv.css({'color': 'black'});
  }, 600);
}


$(".links ul li").click((event) => {
  let element = event.target;
  $(".links ul li").removeClass('active');
  element.classList.add('active'); // Use classList.add to add 'active' class

  if (element.innerText == "World Quiz") {
    getCountry();
    $('#worldContainer').show(1000, function() {
      $(this).css('display', 'flex');
    });
    $('#FlagContainer').hide(1000);
  } else if (element.innerText == "Flag Quiz") {
    getFlag();
    $('#worldContainer').hide(1000);
    $('#FlagContainer').show(1000, function() {
      $(this).css('display', 'flex');
    });
  }
});


function enterEvent(event){ 
  if (event.which === 13) {
    if ($('#worldQuiz').hasClass('active')) {
    
        checkCapital(event);
    } else if ($('#flagQuiz').hasClass('active')) {
        CheckCountry(event);
    }
  }
}