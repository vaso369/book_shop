<?php
require "../config/connection.php";
header("Content-type:application/json");
$upit ="SELECT *,k.id AS kategorijaId,k.naziv AS kategorijaNaziv,p.id AS proizvodId FROM proizvodi p INNER JOIN kategorije k ON p.idKat=k.id";
$rezultat=executeQuery($upit);
http_response_code(200);
echo json_encode($rezultat);