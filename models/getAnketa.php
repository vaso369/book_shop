<?php
require "../config/connection.php";
header("Content-type:application/json");
if(isset($_POST['send'])){
$upit ="SELECT *,p.naziv AS pitanjeNaziv,p.id AS pitanjeId, o.id AS odgovorId FROM odgovori o INNER JOIN pitanja p ON o.idPit=p.id";
$rezultat=executeQuery($upit);
http_response_code(200);
echo json_encode($rezultat);
}