<?php
  $log = file("usernames.txt");
  $revlog = array_reverse($log, true);
  $revlog = array_reverse($revlog, true);
  if (isset($_POST['pseudo'])){
    $line = 0;
    foreach($revlog as $line1) {
      $line += 1;
    }
    $id = $_POST['id'];
    $pwd = $_POST['pwd'];
    $pseudo = $_POST['pseudo'];
    $id = password_hash($id, PASSWORD_DEFAULT, array('cost'=>13));
    $pwd = password_hash($pwd, PASSWORD_DEFAULT, array('cost'=>13));
    $msg = strval($line)." ".$id.",".$pwd." : ".$pseudo;
    $file = fopen("usernames.txt","a+");
    fwrite($file,$msg."\n");
    fclose($file);
  }
  else {
    
  }
  
  
?>
<html>
  <script>
    window.onload=function(event){
      var id = "<?php echo $_POST['id'] ?>";
      var pseudo = "<?php echo $_POST['pseudo'] ?>"
      document.cookie = "id=" + id;
      document.cookie = "pseudo=" + pseudo;
      window.location.replace('/chat.html');
    }
  </script>
</html>