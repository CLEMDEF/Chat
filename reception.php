<?php
  $msg = $_POST['msg'];
  if ($msg !== ""){
    $chat = fopen("chat.txt","a+");
    fwrite($chat,$msg."\n");
    fclose($chat);
  }
?>