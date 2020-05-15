<?php
require "../config/connection.php";
header("Content-type:application/json");
if(isset($_POST['send'])){
    $vrednost=$_POST['vrednost'];
$upit ="SELECT *,k.id AS kategorijaId,k.naziv AS kategorijaNaziv,p.id AS proizvodId FROM proizvodi p INNER JOIN kategorije k ON p.idKat=k.id WHERE (p.naslov LIKE '%$vrednost%') OR (p.opis LIKE '%$vrednost%') OR (p.autor LIKE '%$vrednost%') LIMIT 4";
$rezultat=executeQuery($upit);
http_response_code(200);
echo json_encode($rezultat);
}