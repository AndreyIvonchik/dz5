"use strict";

var script = document.createElement('SCRIPT');
var content = document.getElementById("content");
var loader = document.getElementById("loader");
var sliderLoader = document.getElementById("slider-loader");
var modal = document.getElementById("modal");
var slide = document.getElementById("slide");
var position =  document.getElementById("position");
var response = {};

script.src = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);
script.onerror = function(){
  alert("Ошибка запроса");
};

function callbackFunc(result) {
  response = result.response;
  loader.style.display = "none";
  for (var i = 0; i < result.response.items.length; i++){ 
    content.insertAdjacentHTML( "beforeEnd", `<div class="box"><img id="img-${i}" class="image" src="${result.response.items[i].sizes["3"].url}"></div>`);
  }
}

function sliderPlay(id) {
  if(id < 0) id = response.items.length - 1;
  if(id >= response.items.length) id = 0;
  var src = response.items[id].sizes["8"].url;
  var img = document.createElement("img");
  img.src = src;
  sliderLoader.style.display = "block";
  slide.style.display = "none";
  img.onload = function(){
    sliderLoader.style.display = "none";
    slide.style.display = "block";
    slide.style.backgroundImage = `url("${src}") `;
    position.innerHTML = `${id + 1} из ${response.items.length}`
  };
 
}

document.addEventListener("click", function(element) {
  if(element.target && element.target.className == "image"){
    var id = +element.target.id.split("-")[1];

    modal.style.display = "block";
    sliderPlay(id);
  }
  if(element.target && element.target.id == "next"){
    var id = +position.innerHTML.split("из")[0] - 1;

    sliderPlay(id + 1);
  }
  if(element.target && element.target.id == "prev"){
    var id = +position.innerHTML.split("из")[0] - 1;

    sliderPlay(id - 1);
  }
  if(element.target.id == "close" || element.target.id == "modal"){
    modal.style.display = "none";
  }
});
