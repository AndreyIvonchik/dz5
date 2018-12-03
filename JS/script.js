"use strict";

var script = document.createElement('SCRIPT');
var content = document.getElementById("content");
var loader = document.getElementById("loader");
var response = {};

script.src = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92https://api.vk.com/method/users.get?user_ids=210700286&fields=bdate&v=5.92&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);

function callbackFunc(result) {
  response = result.response;
  for (var i = 0; i < result.response.items.length; i++){ 
    content.insertAdjacentHTML( "beforeEnd", `<div class="box"><img id="img" class="image" src="${result.response.items[i].sizes["3"].url}"></div>`);
  }
  loader.style.display = "none";
}



document.addEventListener("click", function(element) {
  if(element.target && element.target.id == "img"){
    console.log(response);
  }
})
