$(document).ready(function(){
    setTimeout(function(){
$("#welcome").hide(1500);
},1500);
setTimeout(function(){
    $("#listaMeni").slideDown();
    },1500);
setTimeout(function(){
	$(".userFa").show(1500);

	
},1500);
setTimeout(function(){
	
    $("#tabelaP").show();
	
},1500);
});
window.addEventListener("load",ucitavanje);
function ucitavanje() {
  dohvatiSveProd();
  $("#btnInsert").click(insertProd);


    
}
function dohvatiSveProd() {
    $.ajax({
        url:"models/getAllProdcs.php",
        method:"POST",
        dataType:"json",
        success:function(data){
            popuniMonitor(data);
        },
        error:function(xhr){
            console.log(xhr);
        }
    });
  
}
function popuniMonitor(proizvodi) {
    let ispis="<table id='tabelaP'>";
    for(let p of proizvodi){
        ispis+=`
        <tr>
        <td>${p.proizvodId}</td>
        <td>${p.naslov}</td>
        <td>${p.autor}</td>
        <td>${p.godina}</td>
        <td>${p.ocena}</td>
        <td><a class="deleteCl" href="#" data-id="${p.proizvodId}">delete</a>&nbsp;&nbsp;&nbsp;<a class="updateCl" href="#" data-id="${p.proizvodId}">update</a></td>
        
        
        </tr>
        `;
    }
    ispis+="</table>";
    document.getElementById("monView").innerHTML=ispis;
    $(".deleteCl").click(function(){
        var prodID = $(this).attr("data-id");
        var prodIDBR = Number(prodID);
        console.log(prodIDBR);

        $.ajax({
            url:"models/deleteProd.php",
            method:"POST",
            dataType:"json",
            data:{
                prodID : prodIDBR,
                send: true
            },
            success:function(data){
                window.location.href = 'admin.php';
            },
            error:function(xhr){
                console.log(xhr);
            }
        });
    })
    $(".updateCl").click(function(){
        $("#monView").hide();
        $("#prikazInsert").hide();
        $("#updateForma").show();
        var prodIDU = $(this).attr("data-id");
        var prodIDBRU = Number(prodIDU);
        console.log(prodIDBRU);

        $("#btnInsertUp").click(updateProd);
        function updateProd(){
            let naslov=$("#tbNaslovUp").val();
            let slika=$("#tbSlikaUp").val();
        
            let autor=$("#tbAutorUp").val();
            let godina=$("#tbGodinaUp").val();
            let godinaBr=Number(godina);
            let opis=$("#tbOpisUp").val();
            let ocena=$("#tbOcenaUp").val();
            let ocenaBr=Number(ocena);
            let proizvod={
                naslov:naslov,
                slika:slika,
                autor:autor,
                godina:godinaBr,
                opis:opis,
                ocena:ocenaBr,
                send:true,
                prodIDBR : prodIDBRU
            }
            $.ajax({
                url:"models/updateProd.php",
                method:"POST",
                dataType:"json",
                data:proizvod,
                success:function(data){
                    $("#feedback2").html("<h3>Update successful!</h3>")
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
    })
  
  
}
       
$(".insert").click(insertF);
function insertF(){
    $("#monView").hide();
    $("#updateForma").hide();
    $("#prikazInsert").show();
   
}

function insertProd(){
    let naslov=$("#tbNaslov").val();
    let slika=$("#tbSlika").val();

    let autor=$("#tbAutor").val();
    let godina=$("#tbGodina").val();
    let godinaBr=Number(godina);
    let opis=$("#tbOpis").val();
    let ocena=$("#tbOcena").val();
    let ocenaBr=Number(ocena);
    let proizvod={
        naslov:naslov,
        slika:slika,
        autor:autor,
        godina:godinaBr,
        opis:opis,
        ocena:ocenaBr,
        send:true
    }
    $.ajax({
        url:"models/insertProd.php",
        method:"POST",
        dataType:"json",
        data:proizvod,
        success:function(data){
            $("#feedback").html("<h3>Insert successful!</h3>")
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
