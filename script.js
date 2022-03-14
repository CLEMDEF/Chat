function AjaxRequest(target)
  {
    var $message = $('#msg');
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
var Envoyer = document.getElementById('submit');
Envoyer.addEventListener('click', function() {
  AjaxRequest('reception.php');
});
if(typeof(EventSource) !== "undefined") {
  var source = new EventSource("get.php");
  source.onmessage = function(event) {
    document.getElementById("chatLog").innerHTML = event.data + "<br>";
  };
} else { document.getElementById("chatLog").innerHTML = "Sorry, your browser does not support server-sent events...";
}
