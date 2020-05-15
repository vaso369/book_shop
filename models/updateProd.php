<?php
require "../config/connection.php";
header("Content-type:application/json");
$code=404;
$data=null;
if(isset($_POST['send'])){

    $prodID = $_POST['prodIDBR'];
    $naslov=$_POST['naslov'];
    $slika=$_POST['slika'];
    $autor=$_POST['autor'];
    $godina=$_POST['godina'];
    $opis=$_POST['opis'];
    $ocena=$_POST['ocena'];
    
    $upit = "UPDATE proizvodi SET naslov= '$naslov',slika = '$slika',autor= '$autor',godina = '$godina',opis = '$opis',ocena = '$ocena' WHERE id = :prodID";
    $stat=$konekcija->prepare($upit);
    $stat->bindParam(":prodID",$prodID);

    try{
        $code=$stat->execute()?201:500;

    }
    catch(PDOException $e){
      echo $e->getMessage();
        $code=409;
    }
    http_response_code($code);
    echo json_encode($data);
}
?>