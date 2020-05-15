$(document).ready(function(){
setTimeout(function(){
    $("#doors").fadeOut(1500);
},3000);
setTimeout(function(){
	$("#logo").show();
},2000);
setTimeout(function(){
	$("#meni").show();
},2000);
setTimeout(function(){
	$("#login").show();
},2000);
setTimeout(function(){
	$("#wlcm").show();
},2000);
setTimeout(function(){
	$("#welcome").show(2000);
},2000);
setTimeout(function(){
	$("#imeUsr").show(1500);
},3000);
setTimeout(function(){
	$(".userFa").show(1500);
	$("#imeUsr").css({"text-decoration":"underline"});
	
},6000);
setTimeout(function(){
	$("#welcome").hide(1500);
	
},6000);
setTimeout(function(){
$("#wlcm").animate({"width":"7%"},3000);
},8000);
setTimeout(function(){
	$("#dugmeLgo").show();
},2000);
});
var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
window.addEventListener("load",init);
function init() {
	document.getElementById("btnRgstr").addEventListener("click",provera);
	document.getElementById("tbSearch").addEventListener("keyup",pretraga);
	document.getElementById("glasaj").addEventListener("click",glasanje);
	popuniAnketu();
	$.ajax({
		url:"models/get4Prod.php",
		method:"GET",
		dataType:"json",
		success:function(data){
			ispisiProizvode(data);
		},
		error:function(xhr){
			console.log(xhr);
		}
	});
	$.ajax({
		url:"models/getCategories.php",
		method:"GET",
		dataType:"json",
		success:function(kategorije){
			let ispis2="";
			for(let kat of kategorije){
				ispis2+=`<a href="#"><button class="dugmeCat" value="${kat.id}">${kat.naziv}</button></a>`;
			}
			document.getElementById("kategorijeDiv").innerHTML=ispis2;
			$(".dugmeCat").click(filtrirajPoKategoriji);
		
		},
		error:function(xhr){
			console.log(xhr);
		}
	});
	canvas = document.getElementById("canvas");
	edgeID=document.getElementById("EdgeID");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	function resizeCanvas() {	
	var respmenu 		= $('#respmenu');
	var	menu 			= $('#meni #listaMeni');
	$(respmenu).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});
	$(window).resize(function(){
		var sirina = $(window).width();
		if(sirina > 768 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}	
	});
	var divProizvodi=document.getElementById("proizvodi");
	var divAbout=document.getElementById("divAbout");
	var divBooked=document.getElementById("divBooked");
	setTimeout(function() {
  canvas.style.width = window.innerWidth + "px";
	edgeID.style.width=window.innerWidth + "px";
  anim_container.style.width = window.innerWidth + "px";
	dom_overlay_container.style.width = window.innerWidth + "px";
	divProizvodi.style.width=window.innerWidth + "px";
	divAbout.style.width=window.innerWidth + "px";
	divBooked.style.width=window.innerWidth + "px";
}, 0);
  setTimeout(function() {
    canvas.style.height = window.innerHeight + "px";
		edgeID.style.height=window.innerHeight + "px";
	anim_container.style.height = window.innerHeight + "px";
	dom_overlay_container.style.height = window.innerHeight + "px";
	divProizvodi.style.height=window.innerHeight + "px";
	divAbout.style.height=window.innerHeight + "px";
	divBooked.style.height=window.innerHeight + "px";
	}, 0);
	new fullpage('#fullPage', {
		
	});

};
window.onresize = resizeCanvas;
resizeCanvas();
	var comp=AdobeAn.getComposition("367947DEA4593C4E9D5412BCB370F3C1");
	var lib=comp.getLibrary();
		handleComplete({},comp);
	
		$(".dugmeKat").click(filtrirajKategorije);
		$(".prviLink").click(function(){
			$("#up").show();
			$("html, body").animate({
				scrollTop:window.innerHeight
			},800);
		});
		$(".drugiLink").click(function(){
			$("#up2").show();
			$("html, body").animate({
				scrollTop:window.innerHeight*2
			},1600);
		});
		$(".treciLink").click(function(){
			$("#up3").show();
			$("html, body").animate({
				scrollTop:window.innerHeight*3
			},2400);
		});
		$(".registerLink").click(function(){
			$("#up3").show();
			$("html, body").animate({
				scrollTop:window.innerHeight*3
			},2400);
		
			$("#tbName").focus();
		});
$("#up").click(function(){

	$("html, body").animate({
		scrollTop:0
	},800);
	$("#up").hide();

});
$("#up2").click(function(){

	$("html, body").animate({
		scrollTop:0
	},1600);
	$("#up2").hide();
	

});
$("#up3").click(function(){

	$("html, body").animate({
		scrollTop:0
	},2400);
	$("#up3").hide();

});
}
function handleComplete(evt,comp) {
	var lib=comp.getLibrary();
	canvas.style.display = 'block';
	exportRoot = new lib.animated2();
	stage = new lib.Stage(canvas);	
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage)
		stage.addEventListener("tick", handleTick)
		function handleTick(event) {
			var cameraInstance = exportRoot.___camera___instance;
			if(cameraInstance)
			{
				var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
				if(cameraInstance._off != null && cameraInstance._off == true)
					exportRoot.transformMatrix = new createjs.Matrix2D();
				else
				{
					if(cameraInstance.pinToObject !== undefined)
					{
						cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
						cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
					}
					var mat = cameraInstance.getMatrix();
					mat.tx -= stageCenter.x;
					mat.ty -= stageCenter.y;
					var inverseMat = mat.invert();
					inverseMat.prependTransform(stageCenter.x, stageCenter.y, 1, 1, 0, 0, 0, 0, 0);
					inverseMat.appendTransform(-stageCenter.x, -stageCenter.y, 1, 1, 0, 0, 0, 0, 0);
					exportRoot.transformMatrix = inverseMat;
				}
			}
		}
	}	    
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}
function filtrirajKategorije() {
	$(".policaSve").hide();
	$(".policaTravel").show();
}
//---------VALIDACIJA REGISTRACIJE-----------//
function provera(e) {
	e.preventDefault();
	console.log("radi");
	var nizGreske=[];
	var nizOk=[];
	var ime=document.getElementById("tbName");
	var vrednostIme=ime.value;
	var reIme=/[A-Z][a-z]{2,13}$/;
	if(reIme.test(vrednostIme)){
		nizOk.push(vrednostIme);
		document.getElementsByClassName("nevidljiv")[0].style.display="none";
	}
	else {
		document.getElementsByClassName("nevidljiv")[0].style.display="block";
	}
	var prezime=document.getElementById("tbLName");
	var vrednostPrezime=prezime.value;
	var rePrezime=/[A-Z][a-z]{2,13}$/;
	if(rePrezime.test(vrednostPrezime)){
		nizOk.push(vrednostPrezime);
		document.getElementsByClassName("nevidljiv")[1].style.display="none";
	}
	else {
		document.getElementsByClassName("nevidljiv")[1].style.display="block";
	}
	var grad=document.getElementById("ddlGrad");
	var vrednostGrad=Number(grad.value);
	
	
	if(vrednostGrad==0){
	
		document.getElementsByClassName("nevidljiv")[2].style.display="block";
	}
	else {
		nizOk.push(vrednostGrad);
		document.getElementsByClassName("nevidljiv")[2].style.display="none";
	}
	var email=document.getElementById("tbEmail");
	var vrednostEmail=email.value;
	var reEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	if(reEmail.test(vrednostEmail)){
		nizOk.push(vrednostEmail);
		document.getElementsByClassName("nevidljiv")[4].style.display="none";
	}
	else {
		document.getElementsByClassName("nevidljiv")[4].style.display="block";
	}
	var userName=document.getElementById("tbUsername");
	var vrednostUserName=userName.value;
	var reUserName=/^[a-z]{4,15}[0-9]+$/;
	if(reUserName.test(vrednostUserName)){
		nizOk.push(vrednostUserName);
		document.getElementsByClassName("nevidljiv")[3].style.display="none";
	}
	else {
		document.getElementsByClassName("nevidljiv")[3].style.display="block";
	}
	var password=document.getElementById("tbPass");
	var vrednostPass=password.value;
	var rePass=/^[A-z0-9]{6,20}$/;
	if(rePass.test(vrednostPass)){
		nizOk.push(vrednostPass);
		document.getElementsByClassName("nevidljiv")[5].style.display="none";
	}
	else {
		document.getElementsByClassName("nevidljiv")[5].style.display="block";
	}
	if((nizGreske.length==0)&&(nizOk.length==6)){
		var korisnik={
			ime:nizOk[0],
			prezime:nizOk[1],
			grad:nizOk[2],
			email:nizOk[3],
			username:nizOk[4],
			pass:nizOk[5],
			uloga:2,
			send:true
		}
		console.log(korisnik);
		$.ajax({
			url:"models/register.php",
			dataType:"json",
			data:korisnik,
			method:"POST",
			success:function(data,xhr){
				$("#member").html("<p class='zeleno'>Succesfull registration!</p>");
				$("#feedback").html("<p class='zeleno'>Succesfull registration!</p>");

					$("html, body").animate({
						scrollTop:0
					},1600);
		

				$("#tbNameLogin").focus();

			},
			error:function(xhr,status,error){
				var poruka="Ooops, something missing!";
				switch(xhr.status){
					case 404:
					poruka="Page not found";
					break;
					case 409:
					poruka="Username or email already exist";
					break;
					case 422:
					poruka="Data not valid";
					console.log(xhr.responseText);
					break;
					case 500:
					poruka="Error";
					break;
				}
				$("#feedback").html(poruka);
				}
			

			
		});
	}
}
function ispisiProizvode(proizvodi) {
	let ispis="";
	for(let book of proizvodi){
		ispis+=`<div class="proizvod">
					<h2>${book.naslov}</h2>
					<img src="${book.slika}"/>
					<p class="autor">${book.autor} (${book.godina})</p>
					<p class="opisBook">${book.opis}</p>
					<p class="tags">Tags: <a class="catLink" href="#" data-id="${book.kategorijaId}">${book.kategorijaNaziv}</a></p>
					<p class="zvezdice">${obradaZvezdice(book.ocena)}</p>
					<button class=" add-to-cart" value="${book.proizvodId}">book</button>
				</div>`;
	}
	document.getElementById("productsDiv").innerHTML=ispis;
	function obradaZvezdice(book) {
		let brojZvezdica=book;
		let ispis="";
		for(let i=0;i<5;i++){
			if(i<brojZvezdica){
				ispis+=`<i class="fa fa-star" aria-hidden="true"></i>`;
			}
			else{
				ispis+=`<i class="far fa-star"></i>`;
			}
		}
	return ispis;
	
	}
	$(".add-to-cart").click(dodajUkorpu);
}
function filtrirajPoKategoriji(e){
	e.preventDefault();
	let id=this.value;
	promeniSliku(id);
	function promeniSliku(idKat){
		if(idKat==1){
			$(".policaSve").hide();
			$(".policaKids").hide();
			$(".policaRoman").hide();
			$(".policaHistory").hide();
			$(".policaComics").hide();
			$(".policaHorror").hide();
			$(".policaTravel").show();
		}
		if(idKat==2){
			$(".policaSve").hide();
			$(".policaKids").show();
			$(".policaRoman").hide();
			$(".policaHistory").hide();
			$(".policaComics").hide();
			$(".policaHorror").hide();
			$(".policaTravel").hide();
		}
		if(idKat==3){
			$(".policaSve").hide();
			$(".policaKids").hide();
			$(".policaRoman").show();
			$(".policaHistory").hide();
			$(".policaComics").hide();
			$(".policaHorror").hide();
			$(".policaTravel").hide();

		}
		if(idKat==4){
			$(".policaSve").hide();
			$(".policaKids").hide();
			$(".policaRoman").hide();
			$(".policaHistory").show();
			$(".policaComics").hide();
			$(".policaHorror").hide();
			$(".policaTravel").hide();
		}
		if(idKat==5){
			$(".policaSve").hide();
			$(".policaKids").hide();
			$(".policaRoman").hide();
			$(".policaHistory").hide();
			$(".policaComics").show();
			$(".policaHorror").hide();
			$(".policaTravel").hide();
		}
		if(idKat==6){
			$(".policaSve").hide();
			$(".policaKids").hide();
			$(".policaRoman").hide();
			$(".policaHistory").hide();
			$(".policaComics").hide();
			$(".policaHorror").show();
			$(".policaTravel").hide();
		}
	}
	let kategorija={
		id:id,
		send:true
	}
	$.ajax({
		url:"models/getProdByCat.php",
		method:"POST",
		dataType:"json",
		data:kategorija,
		success:function(data){
			ispisiProizvode(data);
		},
		error:function(xhr){
			console.log(xhr);
		}
	});
}
function dodajUkorpu(e) {
	e.preventDefault();
	let quantity=1;
	let idPro=this.value;
	console.log(idPro);
	let proizvod={
		id:idPro,
		send:true
	}
	$.ajax({
		url:"models/getProdById.php",
		method:"POST",
		dataType:"json",
		data:proizvod,
		success:function(proizvod){
			let ispis="";
			for(let p of proizvod){
				ispis+=`<div id="slikaP"><img src="${p.slika}"/></div>
				<div class="divCart"><p class="naslovP">${p.naslov}</p></div>
				<div class="divCart"><p class="autorP">${p.autor}</p></div>
				<div class="divCart"><p class="quan">Quantity:${quantity}</p></div>
				<div class="divCart"><button id="remove" value="${p.id}">remove</button></div>`;
			}
			document.getElementById("bookedProd").innerHTML=ispis;
		},
		error:function(xhr){
			console.log(xhr);
		}
	});
	$("html, body").animate({
		scrollTop:window.innerHeight*2
	},800)
	document.getElementById("up2").style.display="block";
}
function pretraga() {
	let vrednost=this.value;
	let vrednostSrch= {
		vrednost:vrednost,
		send:true
	}
	console.log(vrednost);
	$.ajax({
		url:"models/getProdBySearch.php",
		method:"POST",
		dataType:"json",
		data:vrednostSrch,
		success:function(data){
			ispisiProizvode(data);
		},
		error:function(xhr){
			console.log(xhr);
				}
	})
}
function popuniAnketu() {
	$.ajax({
		url:"models/getAnketa.php",
		method:"POST",
		data:{send:true},
		dataType:"json",
		success:function(data){
			let pitanje1=data.filter(p=> p.pitanjeId==1);
			let ispis1="<h3>HOW MANY BOOKS DID YOU READ IN 2017?<h3><br>";
			
			for(let p of pitanje1){
				ispis1+=`
				<input type="radio" name="anketa" value="${p.odgovorId}"> ${p.odgovori}<br><br>
				`;
			}
			document.getElementById("pitanje1").innerHTML=ispis1;
			let pitanje2=data.filter(p=> p.pitanjeId==2);
			let ispis2="<h3>HOW MANY BOOKS DO YOU READ AT THE SAME TIME?<h3><br>";
	
			for(let p of pitanje2){
				ispis2+=`
				<input type="radio" name="anketa2" value="${p.odgovorId}"> ${p.odgovori}<br><br>
				`;
			}
			document.getElementById("pitanje2").innerHTML=ispis2;
		},
		error:function(xhr){
			console.log(xhr);
			console.log("greska");
		}
	})
}
function glasanje() {
	let vredPitanje1=$('input[name=anketa]:checked').val();
	let vredPitanje2=$('input[name=anketa2]:checked').val();
	let rezultat={
		pitanje1:vredPitanje1,
		pitanje2:vredPitanje2,
		send:true
	}
	$.ajax({
		url:"models/updateAnketa.php",
		method:"POST",
		dataType:"json",
		data:rezultat,
		success:function(data){
			$("#feedbackAnketa").html("<h4>Thanks for vote!</h4>")
		},
		error:function(xhr){
			console.log(xhr);
		}
	})
}

