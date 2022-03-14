<?php
  $msg = $_POST['msg'];
  $chat = fopen("chat.txt","a+");
  fwrite($chat,$msg."\n");
  fclose($chat);
  echo shell_exec("py scriptpython.py");;
?>