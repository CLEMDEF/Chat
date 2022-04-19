<?php
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');
  $log = file("chat.txt");
  $revlog = array_reverse($log, true);
  $revlog = array_reverse($revlog, true);
  $output = "data: ";
  foreach($revlog as $line) {
    $output .= trim($line)."&#10;";
  }
  $linecount = 0;
  $handle = fopen('chat.txt', "r");
  while(!feof($handle)){
    $line = fgets($handle);
    $linecount++;
  }
  fclose($handle);
  echo $output."\n\n";
  ob_flush();
  flush();
?>