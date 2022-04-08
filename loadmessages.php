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
  echo $output."\n\n";
  ob_flush();
  flush();
?>