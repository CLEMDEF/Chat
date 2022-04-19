<?php
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');
  $caracteres = "/[\'^£$%&*()}?!{@.#~?><>,|=_+¬-]/1234567890";
  $myfile = fopen("chat.txt", "r") or die("Unable to open file!");
  $truc = fread($myfile,filesize("chat.txt"));
  $truc = explode(' ', $truc);
  $dico = array();
  $liste_mots = array();
  foreach ($truc as $i){
    if (strpos($i,"\n")){
      $liste = explode("\n", $i);
      foreach($liste as $j){
        array_push($liste_mots, $j);
      }
    }
    else{
      array_push($liste_mots, $i);
    }
  }
  
  foreach ($liste_mots as $i){
    $lettres = str_split($i);
    $mot = "";
    $supr = False;
    if (strpos($i,"<h3>")){
      $supr = True;
    }
    elseif (strpos($i,"<\h3>")){
      $supr = False;
    }
    if ($supr == False){
      foreach($lettres as $lettre){
        if (!strpos($caracteres, $lettre)){
          $mot .= $lettre;
        }
      }
      if (array_key_exists($mot,$dico)){
        $dico[$mot] = 1 + $dico[$mot];
      }
      elseif ($mot !== "hvoici"){
        $dico[$mot] = 1;
      }
    } 
  $msg = "data:";
  }
  fclose($myfile);
  arsort($dico);
  if ((count($dico)-1) >= 8){
    $msg .= "<h3>voici les 8 mots les plus tapés :<br>";
  }
  else{
    $msg .= "<h3>voici les ".(count($dico)-1)." mots les plus tapés :<br>";
  }
  
  $nb = 0;
  foreach($dico as $mot => $value){
    if ($mot !== "" && $mot !== " "){
      if ($nb<8){
        $msg .=" - ".strtolower($mot)." : $value <br>"; 
        $nb++;
      }   
    }
  }
  $msg .= "</h3>";
  echo $msg."\n\n";
  ob_flush();
  flush();
?>