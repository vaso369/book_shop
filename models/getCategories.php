<?php
require "../config/connection.php";
header("Content-type:application/json");
$upit ="SELECT * FROM kategorije";
$rezultat=executeQuery($upit);
http_response_code(200);
echo json_encode($rezultat);