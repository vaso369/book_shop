<?php
	include "config/connection.php";
	session_start();
	if(isset($_POST['btnLogins'])){
		
		$username=$_POST["nameLogin"];
		$pass=md5($_POST["passLogin"]);
		$upit="SELECT k.id,k.email,k.username,k.ime,k.prezime,u.naziv,k.idUloga FROM korisnici k INNER JOIN uloge u ON k.idUloga=u.id WHERE k.username=:username AND k.pass=:pass";
		$stmt=$konekcija->prepare($upit);
		$stmt->bindParam(":username",$username);
		$stmt->bindParam(":pass",$pass);
		$stmt->execute();
		$user=$stmt->fetch();
		
		if($user){
			$_SESSION["user_name"] = $user->ime;
			$_SESSION['user']=$user;
			if($user->idUloga == 1){
				header("Location: admin.php");
			} else {
				header("Location: index.php");
			}
		}
		
	
	}
	if(isset($_POST['logout'])){
		session_start();
		unset($_SESSION['user']);
		header("Location:index.php");
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
<meta name="authoring-tool" content="Adobe_Animate_CC">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>booking-store</title>
<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>
<link rel="stylesheet" href="css/style.css"/>
<link rel="stylesheet" href="css/fullPage.css"/>
</head>
<body>
	<div id="fullPage">
	<div id="animation_container" class="section" >
		<canvas id="canvas" width="1920" height="969" ></canvas>
		<div id="dom_overlay_container">
		</div>
	</div>
	<a class="doc" href="dokumentacija.pdf">Dokumentacija</a>
	<div id="logo">
		<img src="images/logo.svg" alt="Logo"/>
	</div>
	
	<div id="meni">
		<ul>

			<?php
                        $meni = executeQuery("SELECT * FROM meni");
                        foreach($meni as $link):
                    ?>

                        <li><a href="#" class="<?= $link->klasa?>"><?= $link->naziv?></a></li>
                      <?php endforeach; ?>
		</ul>
	</div>
	<?php
	if(!isset($_SESSION['user'])):
	?>
	<div id="login">
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
	<input type="password" placeholder="password..." id="tbPassLogin" name="passLogin"/>
		<input type="text" placeholder="username..." id="tbNameLogin" name="nameLogin"/>
		<br>
		<div id="member"><p>Not our member? <a class="registerLink" href="#">Register</a> now!</p></div>
		<div id="divLogin">
		<input type="submit" value="login" id="loginBtn" name="btnLogins"/>
	</div>
	</form>
	</div>
	<?php endif;?>
	<?php
	if(isset($_SESSION["user"])){
	$ime=$_SESSION["user_name"];
	echo "<div id='wlcm'><h1 id='welcome'>Welcome,</h1><i class='fas fa-user-circle userFa'></i><h1 id='imeUsr'>  ".$ime."</h1></div>";

	}
	?>

	<?php
	if(isset($_SESSION['user'])):
	?>
	
	<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
			<input type="submit" value="logout" id="dugmeLgo" name="logout"/>
			</form>
	
	<?php endif;?>
	<div id="proizvodi" class="section">
		
		<div id="policeKnjige">
				<img class="policaSve" src="images/policeKnjige.svg" alt="Logo"/>
				<img class="policaTravel" src="images/policeKnjigeTravel.svg" alt="Travel"/>
				<img class="policaKids" src="images/policeKnjigeKids.svg" alt="Kids"/>
				<img class="policaRoman" src="images/policeKnjigeRoman.svg" alt="Roman"/>
				<img class="policaHistory" src="images/policeKnjigeHistory.svg" alt="History"/>
				<img class="policaComics" src="images/policeKnjigeComics.svg" alt="Comics"/>
				<img class="policaHorror" src="images/policeKnjigeHorror.svg" alt="Horror"/>
				
		</div>
		<div id="proizvodiDiv">
		<input type="text" id="tbSearch" placeholder="search...">
			<div id="kategorijeDiv"></div>
			<div id="productsDiv"></div>
		
		</div>
		<div id="up">
				<a><i class="fas fa-arrow-up"></i></a>
		</div>
	</div>
	<div id="divBooked" class="section">
		<div id="bookedSlika">
			<?php
		if(isset($_SESSION["user"])):
			?>
			<div id="bookedProd"></div>
			<?php endif;?>
				<img src="images/booked2134.svg" alt="booked"/>
		</div>
		<div id="anketa">
			<div id="pitanje1"></div>
			<div id="pitanje2"></div>
			<div id="feedbackAnketa"></div>
			<div id="glasanje">
				
				<button id="glasaj">vote</button>
			</div>
		</div>
			<div id="up2">
					<a><i class="fas fa-arrow-up"></i></a>
				</div>
	</div>
	<div id="divAbout" class="section">

		<div id="mapa">
				
		</div>
		<div id="aboutus" class="aboutUs">
			<h1>our mission</h1>
			<p>BOOKING-STORE is a design-minded, multi-disciplinary brand offering booking products,see events, and experiences related to city library. We are based in the San Francisco Bay Area.</p>
			<p>
					We regularly host author events and book signings, weekly story times, and four monthly book clubs. Booking-store provides complimentary gift wrap and gift cards are available for that hard to select for reader. Booking-store a bookfair provides over 20 bookfairs annually working with each school to create the perfect celebration of books and literature while supporting school fundraising goals.</p>
			<h2>adress</h2>
			<p>Bond Street [lower level, inside C'H'C'M']</p>
			<i class="fas fa-clock"></i>
			<p>Mon.-Fri., 11 am – 7 pm</p>
			<p>Sat. & Sun. 12-7 pm</p>
		</div>
		<div id="aboutDes" class="aboutUs">
				<h1>about designer</h1>
				<p>My name is Vasilije Vasilijevic and I'm coming from Serbia. I'm a web developer and also a student of Internet technologies at High ICT Belgrade. My goal when it's about business is to present fullfilled project based on deep analyze and abstract solutions which give me a picture of designing user interface and user experience properly for users and connecting all backend stuffs needed for business existence.</p>
				<h2>project mission</h2>
				<p>Idea of this project was to improve faster solution for using offers of city library and to ensure easier managing and storing data needed for bussiness. Also, the main goal was to save up client's time to book online which gives more time to librarian to organize and prepare product for client. This is ongoing project and it's present view is not the finnaly. Client can become a member by registrating online and pay online for year membership or can become a member at our store and librarian will give him login credentials. Librarian will have a desktop application written in C# to track data and events by users and based on that to execute business requirements. Also, it might have a possibility for API, to join delivery company for clients that dont't want to go to store to take their books.</p>
		</div>
		<div id="register">
			<form id="forma">
				<input type="text" id="tbName"  placeholder="first name..."/><br>
				<div class="nevidljiv">Your name has to be in a regular format!</div>
			<input type="text" id="tbLName" placeholder="last name..."/><br>
			<div class="nevidljiv">Your last name has to be in a regular format!!</div>
			<select id="ddlGrad">
				<option value="0">Choose city</option>
			<?php
                        $gradovi = executeQuery("SELECT * FROM gradovi");
                        foreach($gradovi as $grad):
                    ?>

						<li><a href="#" class="<?= $link->klasa?>"><?= $link->naziv?></a></li>
						<option value="<?= $grad->id?>"><?= $grad->naziv?></option>
                      <?php endforeach; ?>
			</select>
			<div class="nevidljiv">You have to choose city!</div>
			<input type="text" id="tbUsername" placeholder="username..."/><br>
			<div class="nevidljiv">Please choose properly username with all lowercase!</div>
			
			<input type="text" id="tbEmail"  placeholder="email..."/><br>
			<div class="nevidljiv">You have to enter a valid email format!</div>
				<input type="password" id="tbPass"  placeholder="password..."/>
				<div class="nevidljiv">Password must be at least 8 charachters long!</div>
				<input type="button" id="btnRgstr" value="Register" ></button>
				<div id="feedback">
				</div>


			</form>
		</div>
		<div id="up3">
				<a><i class="fas fa-arrow-up"></i></a>
			</div>
	</div>
	
</div>
	<div id="doors">
		<object id="EdgeID" type="text/html" width="1920" height="1080" data-dw-widget="Edge" data="vrata/vrata.html">
		</object>
	</div>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="js/fullPage.js"></script>
	<script src="js/animated.js"></script>
	<script src="js/main.js"></script>

</body>
</html>