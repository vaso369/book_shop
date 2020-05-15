<?php
require "../config/connection.php";
header("Content-type:application/json");
$code=404;
$data=null;
if(isset($_POST['send'])){
    $ime=$_POST['ime'];
    $prezime=$_POST['prezime'];
    $grad=$_POST['grad'];
    $email=$_POST['email'];
    $username=$_POST['username'];
    $pass=md5($_POST['pass']);
    $uloga=$_POST['uloga'];

    $errors=[];
    $reFirstLastName="/^[A-Z][a-z]{2,15}$/";
    $rePass="/^[A-z0-9]{6,20}$/";
    $reUsername="/^[a-z0-9\_]{4,15}$/";

    if(!$ime){
        array_push($errors,"Polje za ime je obavezno.");

    }
    elseif(!preg_match($reFirstLastName,$ime)){
        array_push($errors,"Polje za ime nije u dobrom formatu.");
    }
    if(!$prezime){
        array_push($errors,"Polje za prezime je obavezno.");

    }
    elseif(!preg_match($reFirstLastName,$prezime)){
        array_push($errors,"Polje za prezime nije u dobrom formatu.");
    }
    if(!$username){
        array_push($errors,"Polje za username je obavezno.");

    }
    elseif(!preg_match($reUsername,$username)){
        array_push($errors,"Polje za username nije u dobrom formatu.");
    }
    if(!$_POST['pass']){
        array_push($errors,"Polje za lozinku je obavezno.");
    }
    elseif(!preg_match($rePass,$_POST["pass"])){
        array_push($errors,"Polje za password nije u dobrom formatu.");
    }
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        array_push($errors,"Polje za email nije u dobrom formatu.");
    }
    if(count($errors)){
        $code=422;
        $data=$errors;

    }
    else{
        $upit="INSERT INTO korisnici VALUES (NULL,:ime,:prezime,:username,:pass,:email,$grad,2)";
        $stat=$konekcija->prepare($upit);
        $stat->bindParam(":ime",$ime);
        $stat->bindParam(":prezime",$prezime);
        $stat->bindParam(":username",$username);
        $stat->bindParam(":pass",$pass);
        $stat->bindParam(":email",$email);
        try{
            $code=$stat->execute()?201:500;
        }
        catch(PDOException $e){
          echo $e->getMessage();
            $code=409;
        }
    }

}
http_response_code($code);
echo json_encode($data);
?>