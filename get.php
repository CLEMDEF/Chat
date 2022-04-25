<?php
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');
  $size = $_POST['action'];
  $log = file("chat.txt");
  $revlog = array_reverse($log, true);
  $revlog = array_reverse($revlog, true);
  $revlog = array_slice($revlog, $size);
  $output = "data: ";
  foreach($revlog as $line) {
    $output .= trim($line)."&#10;";
  }
  echo $output."\n\n";
  ob_flush();
  flush();
?>