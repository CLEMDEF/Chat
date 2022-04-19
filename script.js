function AjaxRequest(target, msg) //sert à envoyer des requetes 
{
  var $message = msg;
  var message = $message.serialize();
  $.ajax({
    url: target,
    type: "post",
    data: message,
    dataType: "html",
    cache: false,
    processData: false,
  });
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13 && !event.shiftKey) {
    AjaxRequest('reception.php',($('#msg').val().replace(/\n+$/)));
    document.getElementById('msg').value = "";
    document.getElementById('msg').style.height = "";
    document.getElementById('msg').style.height = $('#msg').scrollHeight + "px";
  }
});

var Envoyer = document.getElementById('submit');
Envoyer.addEventListener('click', function() {
  AjaxRequest('reception.php',$('#msg'));
  document.getElementById("msg").value = "";
  document.getElementById("msg").style.height = "";
  document.getElementById("msg").style.height = document.getElementById("msg").scrollHeight + "px";
});

var el = document.getElementById("chatLog");
var start = true;
var scroll;
if(typeof(EventSource) !== "undefined") {
  var source = new EventSource("loadmessages.php");
  source.onmessage = function(event) {
    let regex = /&#10;/igm;
    let text = event.data.replaceAll(regex,"\n")
    scroll = el.scrollHeight-el.scrollTop;
    document.getElementById("chatLog").textContent += text;
    if (scroll <= 410 || start == true)
    {
      el.scrollTop = el.scrollHeight;
      start = false;
    }
    change();
  };
} 
else{  
  document.getElementById("chatLog").innerHTML = "Sorry, your browser does not support server-sent events...";
}

function countLines() {
  let total = document.getElementById("chatLog").textContent;
  let tableau = total.split("\n");
  return tableau.length - 1;
}

function change() {
  window.source.close();
  window.source = new EventSource("get.php");
  source.onmessage = function(event) {
    var nb_lignes = countLines();
    $.ajax({
      type: "POST",
      url: "get.php",
      data: {action : nb_lignes},
      dataType:'html',
      success: function (response) {
        var message = response;
        scroll = el.scrollHeight-el.scrollTop;
        message = message.replaceAll("data: ","");
        message = message.replaceAll("\n\n","");
        if (message !== ""){
          let regex = /&#10;/igm;
          let text = message.replaceAll(regex,"\n")
          document.getElementById("chatLog").textContent += text;
        }
        if (scroll <= 410 || start == true)
        {
          el.scrollTop = el.scrollHeight;
          start = false;
        }    
      },
      error: function(data) {
         document.getElementById("chatLog").textContent += "error";
      },
    });
  };
}


if(typeof(EventSource) !== "undefined") {
  var source1 = new EventSource("stat.php");
  source1.onmessage = function(event) {
    document.getElementById("stat").innerHTML = event.data + "<br>";
  };
} else { document.getElementById("stat").innerHTML = "Sorry, u r bad";
}


window.onload = function() {
  if(document.cookie == '')
  {
    document.cookie = 'id=anonyme';
  }
  document.getElementById("truc_a_cacher").style.display = "none";
  let largeur1 = $(document).width();
  document.getElementById("chatLog").style.width = (largeur1-(largeur1/50)).toString()+"px";
}


function getUsername()
{
  let username = document.getElementById("tamere").value;
  if(document.cookie == 'id=anonyme' || document.cookie == ''){
    document.cookie = "id=" + encodeURIComponent(username);
    let pwd = " : " + prompt("mot de passe");
    document.cookie = "pwd=" + encodeURIComponent(pwd);
    cookies = document.cookie;
    document.getElementById("tamere").value += pwd;
    alert(document.getElementById("tamere").value);
    AjaxRequest("username.php","#tamere");
    document.getElementById("tamere").value = "";
  }/*
  if(condition){
    AjaxRequest("username.php","#tamere");
  }
  */
}

function montrer() {
  var x = document.getElementById("truc_a_cacher");
  let largeur1 = $(document).width();
  let largeur2 = largeur1/2;
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("chatLog").style.width = (largeur2-13).toString()+"px";
    document.getElementById("stat").style.width = (largeur2-13).toString()+"px";
    document.getElementById("button_stats").textContent = "cacher stats";
  } else {
    x.style.display = "none";
    document.getElementById("chatLog").style.width = (largeur1-(largeur1/50)).toString()+"px";
    document.getElementById("button_stats").textContent = "afficher stats";
  }
}

function resizeWindow() {
  var x = document.getElementById("truc_a_cacher");
  let largeur1 = $(document).width();
  let largeur2 = largeur1/2;
  if (x.style.display === "none") {
    document.getElementById("chatLog").style.width = (largeur1-(largeur1/50)).toString()+"px";
  } 
  else 
  {
    document.getElementById("chatLog").style.width = (largeur2-13).toString()+"px";
    document.getElementById("stat").style.width = (largeur2-13).toString()+"px";
  }
}

window.addEventListener("resize", resizeWindow);

