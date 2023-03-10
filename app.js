// идэвхитэй байгаа тоглогчийг хадгалах хувьсагч
var activePlayer = 0;


var scores = [0, 0];

var roundScore = 0;

document.querySelector('#score-0').textContent = 0;

document.querySelector('#score-1').textContent = 0;

document.getElementById('current-0').textContent = 0;

document.getElementById('current-1').textContent = 0;

var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

//Шоог шидэх эвент лиснер
document.querySelector(".btn-roll").addEventListener("click", function() {
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

});

// HOLD товчны эвент лиснер
document.querySelector('.btn-hold').addEventListener('click', function(){
    // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө
      
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // Дэлгэц дээр тоог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг (оноо нь 100-аас их эсэх) шалгах
    if(scores[activePlayer] >= 20){
        // Ялагч гэсэн текстийг нэрнийх нь оронд гаргана
        document.getElementById("name-" + activePlayer).textContent = 'WINNER!!!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player' + activePlayer + '-panel').classList.remove("active");
    } else{
        switchToNextPlayer();
    }

    switchToNextPlayer();
    
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
