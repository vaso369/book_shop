<?php
include "config/connection.php";
    session_start();

    if(isset($_SESSION['user'])){
        if($_SESSION['user']->idUloga != 1){
            header("Location: index.php");
        }
    } else {
        header("Location: index.php");
    }
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="description" content="booking store shop">
<meta name="keywords" content="book, store, books, product">
<meta name="author" content="Vasilije Vasilijević">
<meta name="copyright" content="Copyright © 2019 Vasilije Vasilijević, All Rights Reserved">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>admin-panel</title>
<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

<link rel="stylesheet" href="css/styleAdmin.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
</head>
<body>
<div id="meni">
<?php
	if(isset($_SESSION["user"])){
        if($_SESSION["user"]->idUloga==1){
	$ime=$_SESSION["user_name"];
	echo "<div id='wlcm'><h1 id='welcome'>Welcome,</h1><i class='fas fa-user-circle userFa'></i><h1 id='imeUsr'>  ".$ime."</h1></div>";
        }
	}
    ?>
    <div id="listaDiv">
    <ul id="listaMeni">
        <li><a class="insert" href="#">INSERT</a></li>
    </ul>
</div>
</div>
<div id="prikaz">
    <div id="monView">

    </div>
    <div id="prikazInsert">
    <div id="insertprod">
			<form id="forma">
				<input type="text" id="tbNaslov"  placeholder="heading..."/><br>
		
            <input type="text" id="tbSlika" placeholder="picture..."/><br>
            
			<input type="text" id="tbAutor" placeholder="author..."/><br>
			
			<input type="text" id="tbGodina"  placeholder="year..."/><br>
                <input type="text" id="tbOpis"  placeholder="description..."/>
                <input type="text" id="tbOcena"  placeholder="rate..."/>
				<input type="button" id="btnInsert" value="Insert" ></button>
				<div id="feedback">
				</div>


			</form>
        </div>
       
        
    </div>
    <div id="updateForma">
			<form id="formaUp">
				<input type="text" id="tbNaslovUp"  placeholder="heading..."/><br>
		
            <input type="text" id="tbSlikaUp" placeholder="picture..."/><br>
            
			<input type="text" id="tbAutorUp" placeholder="author..."/><br>
			
			<input type="text" id="tbGodinaUp"  placeholder="year..."/><br>
                <input type="text" id="tbOpisUp"  placeholder="description..."/>
                <input type="text" id="tbOcenaUp"  placeholder="rate..."/>
				<input type="button" id="btnInsertUp" value="update" ></button>
				<div id="feedback2">
				</div>


			</form>
		</div>
</div>
<div class="cleaner"></div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>

<script type="text/javascript" src="js/mainAdmin.js"></script>
</html>