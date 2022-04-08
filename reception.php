<?php
  $msg = $_POST['msg'];
  $write = False;
  if ($msg !== ""){
    $chat = fopen("chat.txt","a+");
    fwrite($chat,$msg."\n");
    fclose($chat);
    $message = fopen("message.txt","w");
    fwrite($message,$msg."\n");
    fclose($message);
  }
?>