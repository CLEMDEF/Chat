<?php
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');
  //$linecount = 0;
  //$handle = fopen('chat.txt', "r");
  //while(!feof($handle)){
  //  $line = fgets($handle);
  //  $linecount++;
  //}
  //fclose($handle);
  $size = $_POST['action'];
  $log = file("chat.txt");
  $revlog = array_reverse($log, true);
  $revlog = array_reverse($revlog, true);
  $revlog = array_slice($revlog, $size);
  //print_r($revlog);
  $output = "data: ";
  foreach($revlog as $line) {
    $output .= trim($line)."&#10;";
  }
  echo $output."\n\n";
  ob_flush();
  flush();
  //$message = fopen("message.txt","w");
  //fwrite($message,'');
  //fclose($message);
?>