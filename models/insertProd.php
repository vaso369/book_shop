<?php
require "../config/connection.php";
header("Content-type:application/json");
$code=404;
$data=null;
if(isset($_POST['send'])){
    $naslov=$_POST['naslov'];
    $slika=$_POST['slika'];
    $autor=$_POST['autor'];
    $godina=$_POST['godina'];
    $opis=$_POST['opis'];
    $ocena=$_POST['ocena'];


$upit="INSERT INTO proizvodi VALUES (NULL,'$naslov','$slika','$autor','$godina','$opis','$ocena',2)";
        $stat=$konekcija->prepare($upit);
        $stat->bindParam(":naslov",$naslov);
        $stat->bindParam(":slika",$slika);
        $stat->bindParam(":autor",$autor);
        $stat->bindParam(":godina",$godina);
        $stat->bindParam(":opis",$opis);
        $stat->bindParam(":ocena",$ocena);

        try{
            $code=$stat->execute()?201:500;
        }
        catch(PDOException $e){
          echo $e->getMessage();
            $code=409;
        }
    }
    http_response_code($code);
echo json_encode($data);
?>