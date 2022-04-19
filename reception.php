<?php
  $msg = $_POST['msg'];
  $write = False;
  if ($msg !== ""){
    $chat = fopen("chat.txt","a+");
    fwrite($chat,$msg."\n");
    fclose($chat);
  }
?>