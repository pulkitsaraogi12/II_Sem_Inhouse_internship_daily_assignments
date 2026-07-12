const userContainer = document.getElementById("userContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const count = document.getElementById("count");
const search = document.getElementById("search");
const refreshBtn = document.getElementById("refreshBtn");

let users = [];

// Fetch Users
async function fetchUsers(){

loading.style.display = "block";
error.style.display = "none";
userContainer.innerHTML = "";

try{

const response = await fetch("https://randomuser.me/api/?results=12");

if(!response.ok){
throw new Error("Network Error");
}

const data = await response.json();

users = data.results;

displayUsers(users);
animateCards();

}

catch(err){

error.style.display = "block";

}

finally{

loading.style.display = "none";

}

}

// Display Users

function displayUsers(data){

userContainer.innerHTML = "";

count.innerText = data.length;

data.forEach(user=>{

userContainer.innerHTML += `

<div class="col-md-4 col-lg-3">

<div class="card shadow user-card h-100">

<div class="card-body text-center">

<img src="${user.picture.large}"
class="user-img mb-3">

<h5>${user.name.first} ${user.name.last}</h5>

<p class="text-muted">
${user.email}
</p>

<p>
<i class="fa-solid fa-phone"></i>
${user.phone}
</p>

<p>
<i class="fa-solid fa-location-dot"></i>
${user.location.country}
</p>

<span class="badge bg-primary">
${user.gender}
</span>

<hr>

<button class="btn btn-success btn-sm detailsBtn">

Show Details

</button>

<div class="details mt-3" style="display:none;">

<p><strong>City:</strong> ${user.location.city}</p>

<p><strong>State:</strong> ${user.location.state}</p>

<p><strong>Age:</strong> ${user.dob.age}</p>

<p><strong>Username:</strong> ${user.login.username}</p>

</div>

</div>

</div>

</div>

`;

});

detailsFunction();

}

function detailsFunction(){

const buttons=document.querySelectorAll(".detailsBtn");

buttons.forEach(btn=>{

btn.addEventListener("click",function(){

const details=this.nextElementSibling;

if(details.style.display==="none"){

details.style.display="block";

this.innerText="Hide Details";

this.classList.remove("btn-success");

this.classList.add("btn-danger");

}

else{

details.style.display="none";

this.innerText="Show Details";

this.classList.remove("btn-danger");

this.classList.add("btn-success");

}

});

});

}

fetchUsers();
// =========================
// Search Functionality
// =========================

search.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let filteredUsers = users.filter(user => {

        let fullName = (user.name.first + " " + user.name.last).toLowerCase();

        return fullName.includes(value);

    });

    displayUsers(filteredUsers);

});


// =========================
// Refresh Button
// =========================

refreshBtn.addEventListener("click", function () {

    fetchUsers();

});


// =========================
// Fade Animation
// =========================

function animateCards() {

    const cards = document.querySelectorAll(".user-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {

            card.style.transition = "0.5s";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 150);

    });

}




document.addEventListener("mouseover", function(e){

    if(e.target.closest(".user-card")){

        e.target.closest(".user-card").style.boxShadow =
        "0px 10px 25px rgba(0,0,0,0.25)";

    }

});

document.addEventListener("mouseout", function(e){

    if(e.target.closest(".user-card")){

        e.target.closest(".user-card").style.boxShadow =
        "";

    }

});


