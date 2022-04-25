function AjaxRequest(target, msg) //sert à envoyer des requetes 
{
  var $message = msg;
  var message = $message.serialize();
  message = message.replaceAll(/(%0D%0A)+$/g,"");
  $.ajax({
    url: target,
    type: "post",
    data: message,
    dataType: "html",
    cache: false,
    processData: false,
  });
}

document.addEventListener("keyup", function(event) { // envoyer message en appuyant sur enter 
  if (event.key === 'Enter' && !event.shiftKey) {
    AjaxRequest('reception.php',$('#msg'));
    document.getElementById('msg').value = "";
    document.getElementById('msg').style.height = "";
    document.getElementById('msg').style.height = $('#msg').scrollHeight + "px";
  }
});

var Envoyer = document.getElementById('submit');
Envoyer.addEventListener('click', function() { // envoyer message quand clique sur envoyer
  AjaxRequest('reception.php',$('#msg'));
  document.getElementById("msg").value = "";
  document.getElementById("msg").style.height = "";
  document.getElementById("msg").style.height = document.getElementById("msg").scrollHeight + "px";
});

var el = document.getElementById("chatLog");
var start = true;
var scroll;
if(typeof(EventSource) !== "undefined") {
  var source = new EventSource("loadmessages.php"); //afficher les messages enregistrés sur le serveur
  source.onmessage = function(event) {
    let text = event.data.replaceAll(/&#10;/igm,"\n")
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

function countLines() { // compter le nombre de lignes de messages que l'utilisateur voit
  let total = document.getElementById("chatLog").textContent;
  let tableau = total.split("\n");
  return tableau.length - 1;
}

function change() { //sert a ce que l'on reçoit uniquement les derniers messages 
  window.source.close();
  setInterval(function () {
    var nb_lignes = countLines();
    $.ajax({
      type: "POST",
      url: "get.php",
      data: {action : nb_lignes},
      dataType:'html',
      success: function (response) {
        var message = response;
        var start = true;
        scroll = el.scrollHeight-el.scrollTop;
        message = message.replaceAll("data: ","");
        message = message.replaceAll("\n\n","");
        if (message !== ""){
          let regex = /&#10;/igm;
          let text = message.replaceAll(regex,"\n")
          document.getElementById("chatLog").textContent += text;
        }
        if (scroll <= 410 && start == true)
        {
          el.scrollTop = el.scrollHeight;
          start = false;
        }
      },
      error: function(data) {
         document.getElementById("chatLog").textContent += "error\n";
      },
    });
  },2000);
}

function stats() { //recevoir les stats (mots les plus tapés)
  $.ajax({
    type: "POST",
    url: "stat.php",
    dataType:'html',
    success: function(response) {
      document.getElementById("stat").innerHTML = '<br>' + response + "<br>";
    }
  });
}

setInterval(function () { //recevoir stats que quand on les affiches
  var x = document.getElementById("truc_a_cacher");
  if (x.style.display === "block") {
    stats();
  }
},6000);
      

window.onload = function() { // ce qui s'execute quand chat.html se load
  if(document.cookie == '')
  {
    document.cookie = 'id=anonyme';
  }
  document.getElementById("truc_a_cacher").style.display = "none";
  let largeur1 = $(document).width();
  let hauteur = $(document).height();
  document.getElementById("chatLog").style.width = (largeur1-(largeur1/50)).toString()+"px";
  document.getElementById("chatLog").style.height = (hauteur*0.65).toString()+"px";
  document.getElementById("stat").style.height = (hauteur*0.71).toString()+"px";
  $.ajax({
    type: "POST",
    url: "stat.php",
    dataType:'html',
    success: function(response) {
      document.getElementById("stat").innerHTML = '<br>' + response + "<br>";
    }
  });
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

function montrer() {  // cacher/montrer stats
  var x = document.getElementById("truc_a_cacher");
  let largeur1 = $(document).width();
  let largeur2 = largeur1/2;
  if (x.style.display === "none") {
    stats();
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

function resizeWindow() { //redimentionner la taille de la zone avec les messages et stats 
  var x = document.getElementById("truc_a_cacher"); //en fonction de la taille de la fenetre
  let largeur1 = $(document).width();
  let hauteur = $(document).height();
  let largeur2 = largeur1/2;
  if (x.style.display === "none") {
    document.getElementById("chatLog").style.width = (largeur1-(largeur1/50)).toString()+"px";
  } 
  else 
  {
    document.getElementById("chatLog").style.width = (largeur2-13).toString()+"px";
    document.getElementById("stat").style.width = (largeur2-13).toString()+"px";
    document.getElementById("stat").style.height = (hauteur*0.71).toString()+"px";
  }
  document.getElementById("chatLog").style.height = (hauteur*0.65).toString()+"px";
}

window.addEventListener("resize", resizeWindow); //execute la fonction recizeWindow quand on modifie la taille de la fenetre 

