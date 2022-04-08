function AjaxRequest(target, msg)
  {
    var $message = $(msg);
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
    AjaxRequest('reception.php','#msg');
    document.getElementById("msg").value = "";
    document.getElementById("msg").style.height = "";
    document.getElementById("msg").style.height = document.getElementById("msg").scrollHeight + "px";
  }
});
var Envoyer = document.getElementById('submit');
Envoyer.addEventListener('click', function() {
  AjaxRequest('reception.php','#msg');
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
   var el = document.getElementById('content');
   var divHeight = el.offsetHeight
   var lineHeight = parseInt(el.style.lineHeight);
   var lines = divHeight / lineHeight;
}

function change() {
  window.source.close();
  window.source = new EventSource("get.php");
  source.onmessage = function(event) {
    /*let regex = /&#10;/igm;
    let text = event.data.replaceAll(regex,"\n")
    scroll = el.scrollHeight-el.scrollTop;
    document.getElementById("chatLog").textContent += text;
    if (scroll <= 410 || start == true)
    {
      el.scrollTop = el.scrollHeight;
      start = false;
    }*/
    
    var test = countLines();
    $.ajax({
      type: "POST",
      url: "get.php",
      data: {action : test},
      dataType:'html',
      success: function (response) {
        var message = JSON.parse(response).content;
        alert(message);
        scroll = el.scrollHeight-el.scrollTop;
        document.getElementById("chatLog").textContent += message;
        if (scroll <= 410 || start == true)
        {
          el.scrollTop = el.scrollHeight;
          start = false;
        }    
      }
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
  /*
  setTimeout(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("loadmessages.php");
    xhr.onload = function () {
      console.log(this.response);
    };
    xhr.send(data);
  }
}, 2000);*/
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

