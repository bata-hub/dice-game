var isGameOver;
var activePlayer;
var scores;
var roundScore;
var diceDom = document.querySelector(".dice");
initGame();
function initGame(){
    //Тоглоом эхэллээ төлөвт оруулна
    isGameOver = false;
    // идэвхитэй байгаа тоглогчийг хадгалах хувьсагч
activePlayer = 0;


scores = [0, 0];

roundScore = 0;

document.querySelector('#score-0').textContent = 0;

document.querySelector('#score-1').textContent = 0;

document.getElementById('current-0').textContent = 0;

document.getElementById('current-1').textContent = 0;

// Тоглогчдын нэрийг буцааж гаргах
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-0-panel').classList.add('active');

diceDom.style.display = "none";

}

//Шоог шидэх эвент лиснер
document.querySelector(".btn-roll").addEventListener("click", function() {

    if(isGameOver !== true){
        // 1-6 доторх санамсаргүй нэг тоо гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    // Шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.style.display = "block";

    // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1-ээс ялгаатай бол идэвхитэй Тоглогчийн ээлжийн оноог өөрчилнө.
    if(diceNumber !== 1 ){
        // 1-ээс ялгаатай тоо буулаа.
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    }else{
        // 1 буусан бол тоглогчийн ээлжийг энэ хэсэгт 
        // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно
        switchToNextPlayer();
    }
    }else {
        alert('Тоглоом дууссан байна. ')
    }

});

// HOLD товчны эвент лиснер
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(isGameOver !== true){
        // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө
      
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // Дэлгэц дээр тоог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг (оноо нь 100-аас их эсэх) шалгах
    if(scores[activePlayer] >= 20){
        // Тоглоомыг дууссан төлөвт оруулна
        isGameOver =true;
        // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
        document.getElementById("name-" + activePlayer).textContent = 'WINNER!!!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove("active");
    } else{
        switchToNextPlayer();
    }

    }else {
        alert('Тоглоом дууссан байна');
    }
    
    
});

// Энэ функц нь тоглох ээлжийг дараагийн тоглогч руу шилжүүлдэг
function switchToNextPlayer(){
    // Ээлжийн оноог нь 0 болгоно
    roundScore = 0;
        document.getElementById("current-" + activePlayer).textContent = 0;
        // Хэрэв идэвхитэй тоглогч нь 0 байвал идэвхитэй тоглогчийг 1 болго. Үгүй бол идэвхитэй тоглогчийг 0 болго.
        activePlayer === 0 ? (activePlayer = 1): (activePlayer = 0)
        
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        // Шоог түр алга болгох
        diceDom.style.display = "none";
}

// Шинэ тоглоом эхлүүлэх товчны эвент лиснер
document.querySelector('.btn-new').addEventListener('click', initGame);
