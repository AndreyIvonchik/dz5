"use strict";

var script = document.createElement('SCRIPT');
var content = document.getElementById("content");
var loader = document.getElementById("loader");
var sliderLoader = document.getElementById("slider-loader");
var modal =  document.getElementById("modal");
var foto =  document.getElementById("foto");
var position =  document.getElementById("position");
var response = {};

script.src = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);

function callbackFunc(result) {
  response = result.response;
  for (var i = 0; i < result.response.items.length; i++){ 
    content.insertAdjacentHTML( "beforeEnd", `<div class="box"><img id="img-${i}" class="image" src="${result.response.items[i].sizes["3"].url}"></div>`);
  }
  loader.style.display = "none";
}

function sliderPlay(element) {
  modal.style.display = "block";
  var id = +element.target.id.split("-")[1];
  foto.src = `${response.items[id].sizes["7"].url}`;
  position.innerHTML = `${id + 1} из ${response.items.length}`
  sliderLoader.style.display = "none";
}


document.addEventListener("click", function(element) {
  if(element.target && element.target.className == "image"){
    sliderPlay(element);
  }
  if(element.target && element.target.id == "close"){
    modal.style.display = "none";
    sliderLoader.style.display = "";
  }
});
