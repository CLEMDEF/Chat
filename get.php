<?php
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');  
  $log = file("chat.txt");
  $revlog = array_reverse($log, true);
  $revlog = array_slice($revlog, 0, 20);
  $output = "data: ";
  foreach($revlog as $line) {
    $output .= trim($line)."<br>";
  }
  echo $output."\n\n";
  ob_flush();
  flush();
  fclose($log);
?>