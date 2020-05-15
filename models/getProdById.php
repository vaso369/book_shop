<?php
require "../config/connection.php";
header("Content-type:application/json");
if(isset($_POST['send'])){
    $id=$_POST['id'];
$upit ="SELECT * FROM proizvodi WHERE id=$id";
$rezultat=executeQuery($upit);
http_response_code(200);
echo json_encode($rezultat);
}