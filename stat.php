<?php
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');
  $caracteres = "/[\^£$%&*()}?!{@.#~?<>,|=_+¬-]/1234567890";
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
        if (!empty($lettre)) {
          if (!strpos($caracteres, $lettre)){
            $mot .= $lettre;
          }
          else{
            $mot .= " ";
          }
        }
      }
      if (array_key_exists($mot,$dico)){
        $dico[$mot] = 1 + $dico[$mot];
      }
      elseif ($mot !== "hvoici"){
        $dico[$mot] = 1;
      }
    }
  }
  foreach(array_keys($dico) as $word)
  {
    $url = "https://od-api.oxforddictionaries.com/api/v2/words/fr?q=".$word."&fields=definitions";
    $curl = curl_init();
    $fields = array(
    "Accept"  => "application/json",
    "app_id"  => "525b91c5",
    "app_key" => getenv("app_key")
    );
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPGET, TRUE);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $fields);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($curl);
    if (($data != false ) and ( curl_getinfo($curl,CURLINFO_HTTP_CODE) == 404))
    {
      unset($dico[$word]);
    }
  }
  $msg = "";
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