// let res = fetch("https://jsonplaceholder.typicode.com/posts");
// res.then((status)=>{
//           console.log(status);
//           return status.json();
// }).then((data)=>{
//           console.log(data);
// })

// code for API integration
// --------------------------------------------------------
checkLocal();
const planetImages = {
  Mercury: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
  Venus: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
  Earth: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
  Mars: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
  Jupiter: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
  Saturn: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
  Uranus: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
  Neptune: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
  Pluto: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Nh-pluto-in-true-color_2x_JPEG-edit-frame.jpg"
};

const planetDescriptions = {
  Mercury: "Mercury is the smallest planet in our solar system and closest to the Sun.",
  Venus: "Venus is the second planet from the Sun and has a thick, toxic atmosphere.",
  Earth: "Earth is the third planet from the Sun and the only known planet to support life.",
  Mars: "Mars is the fourth planet from the Sun, known as the Red Planet due to its reddish appearance.",
  Jupiter: "Jupiter is the fifth planet from the Sun and the largest in our solar system.",
  Saturn: "Saturn is the sixth planet from the Sun, famous for its prominent ring system.",
  Uranus: "Uranus is the seventh planet from the Sun, known for its blue-green color and tilted axis.",
  Neptune: "Neptune is the eighth planet from the Sun, characterized by its deep blue color and strong winds.",
  Pluto: "Pluto, once considered the ninth planet, is now classified as a dwarf planet in the Kuiper belt."
};
// --------------------------------------------------------

let planetArray=[];
let api_key1 = "5i4LEThadoLYxugkhcMI7iD6WADyAZa6TiplcfCn";
let fetchSpaceSnap = fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key1}`);
fetchSpaceSnap.then((response) => {
  return response.json()
}).then((data) => {
  console.log(data);
  let sect1 = document.getElementById("spaceSnape");
  sect1.innerHTML= `
          <h1>${data.title}</h1>
          <h3>${data.date}</h3>
          <img src="${data.hdurl}">
          <div>${data.explanation}</div>
          `;
});
function fetchPlanetData(name) {
  let url = `https://api.api-ninjas.com/v1/planets?name=${name}`;
  let planetData={}; 
  let res = fetch(url, {
    method: "GET",
    headers: {
      'X-Api-Key': "Q6ozB/2Ga+AZVGcJgoLe7g==AoTAxr6Qifwv4QyY"
    }
  })
  res.then((val) => {
    return val.json()
  }).then((data) => {
    // console.log(data);
    let alterData={
      ...data,
      imageUrl: planetImages[name],
      description: planetDescriptions[name]
    }
    planetArray.push(alterData);
  })
}
fetchPlanetData();
let planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto"];
async function showCardData(){
   await Promise.all (planets.map((planet)=>{
    fetchPlanetData(planet);
    console.log(planetArray);
  }));
  let card2=document.getElementById("card2");
  setTimeout(()=>{
  planetArray.map((planet,ind)=>{
    let cards=document.createElement("div");
    cards.setAttribute("style",`--position : ${ind}`)
    cards.className="cards"
    cards.innerHTML=`
    <img src=${planet.imageUrl} height="50px" width="50px">
    <h1>${planet[0].name}</h1>
    <p>${planet.description}</p>
    <button onclick="expand(${ind})" >View More</button>
    `;
    card2.append(cards);
  });
},4000);
 }
 showCardData();

 function submitForm(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let cpass = document.getElementById("cpass").value;

  if (pass != cpass) {
    alert("passwords dont match");
    return;
  }
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("loggedIn", 1);
  checkLocal();
}

function checkLocal() {
  if (localStorage.getItem("loggedIn") == 1) {
    let btn = document.getElementById("signUpBtn");
    let name = localStorage.getItem("name");
    btn.innerHTML =` Hello ${name}`;
    document.getElementsByClassName("abc")[0].style.display = "none";
  }
}




function expand(ind) {
  let data = planetArray[ind][0];
  console.log(data);

  let popUp = document.getElementById("popUp");
  popUp.style.display = "flex";
  let expandDiv = document.getElementById("expand");
  expandDiv.style.display = "flex";
  expandDiv.innerHTML = `
    temp : ${data.temperature}
    <br>
    distance_light_year : ${data.distance_light_year}
    <br>
     host_star_mass : ${data.host_star_mass}
    `;
}

function close1() {
  let popUp = document.getElementById("popUp");
  popUp.style.display = "none";
  let expandDiv = document.getElementById("expand");
  expandDiv.style.display = "none";
}

setTimeout(() => {
  if (localStorage.getItem("loggedIn") != 1) {
    let popUp = document.getElementById("popUp");
    popUp.style.display = "flex";
    let signUpDiv = document.getElementById("signUp");
    signUpDiv.style.display = "flex";
  }
}, 10000);