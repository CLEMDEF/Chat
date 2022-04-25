<?php
  $username = $_POST['id'];
  $password = $_POST['pwd'];
  $file = fopen('r',"/users.json");
  $list = json_decode(fread($file, $filesize($file)),true);
  if(array_key_exists($username, $list))
  {
    echo "Ce nom d'utilisateur est déjà pris";
  }
  else
  {
    $list -> $username = password_hash($password);
  }
  fclose($file);
  $file = fopen("w","/users.json");
  fwrite($file, json_encode($list));
  fclose($file);
?>
<html>
  <script>
    window.onload=function(event){
      var id = "<?php echo $_POST['id'] ?>";
      var pseudo = "<?php echo $_POST['pseudo'] ?>"
      document.cookie = "id=" + id;
      document.cookie = "pseudo=" + pseudo;
      window.location.replace('/chat.html');
    }
  </script>
</html>