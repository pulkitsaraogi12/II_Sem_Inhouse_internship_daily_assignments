// Counter Variable

let count = 0;

// Selecting Elements

const countText = document.getElementById("count");

const increaseBtn = document.getElementById("increase");

const decreaseBtn = document.getElementById("decrease");

const resetBtn = document.getElementById("reset");

const darkBtn = document.getElementById("darkBtn");

// Increase Counter

increaseBtn.addEventListener("click",function(){

    count++;

    countText.innerHTML = count;

});
// decrease Counter

decreaseBtn.addEventListener("click",function(){

    count--;
    countText.innerHTML = count;
});

// Reset Counter

resetBtn.addEventListener("click",function(){

    count = 0;

    countText.innerHTML = count;

});

// Dark Mode

darkBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        darkBtn.innerHTML="☀️ Light Mode";

    }

    else{

        darkBtn.innerHTML="🌙 Dark Mode";

    }

});