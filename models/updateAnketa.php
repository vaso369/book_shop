<?php
require "../config/connection.php";
header("Content-type:application/json");
if(isset($_POST['send'])){
    $odgovor1=$_POST['pitanje1'];
    $odgovor2=$_POST['pitanje2'];
$upit ="UPDATE rezultat SET rezultat=rezultat+1 WHERE idOdg=$odgovor1 OR idOdg=$odgovor2 ";
$pripremaUpita=$konekcija->prepare($upit);
$rezultat=$pripremaUpita->execute();
if($rezultat){
    
}
http_response_code(200);
echo json_encode($rezultat);
}