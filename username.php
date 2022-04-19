<?php
  $file = file_get_contents('usernames.json');
  $data = json_decode($file, true);
  $answer = $_POST['id'];
  $pwd = $_POST['pwd'];
  $pseudo = $_POST['pseudo'];
  $answer = password_hash($answer, PASSWORD_DEFAULT, array('cost'=>13));
  $pwd = password_hash($pwd, PASSWORD_DEFAULT, array('cost'=>13));
  $response = array($answer=>$pwd);
  $data[$answer] = $pwd;

  /*$linecount = 0;
  while(!feof($file)){
    $line = fgets($file);
    $linecount++;
  }
  $answer_f = strval($linecount - 1);
  $answer_f .= $answer;*/
  $newJsonString = json_encode($data);
  file_put_contents('usernames.json', $newJsonString);


?>
<html>
  <script>
    window.onload=function(event){
      window.location.replace('/chat.html');
    }
  </script>
</html>