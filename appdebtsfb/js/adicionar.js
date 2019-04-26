
document.getElementById("formulario").addEventListener('submit', cadastraDivida);
var firebaseRef = firebase.database().ref();

function cadastraDivida(e){
    var queDivida = document.getElementById('queDivida').value;
    var quantoDivida = document.getElementById('quantoDivida').value;
    var quandoDivida = document.getElementById('quandoDivida').value;

    divida = {
        que: queDivida,
        quanto: quantoDivida,
        quando: quandoDivida

    }

    firebaseRef.once("value", function(snapshot){
         if(!snapshot.child("patio").exists()){
            console.log("patio nao existe, criando");
            var dividas = [];
            dividas.push(divida);
            //localStorage.setItem('patio', JSON.stringify(dividas));
            firebaseRef.child("patio").set(JSON.stringify(dividas));
            
        }
        else{
            console.log("patio já existe, acrescentando");
            var dividas = JSON.parse(snapshot.val().patio);
            dividas.push(divida);
            //console.log(JSON.stringify(dividas));
            firebaseRef.child("patio").set(JSON.stringify(dividas));
        }
        
        //mostraPatio();
        document.getElementById("formulario").reset();
        
    });
    
    e.preventDefault();


    
    //total();
    
    
    
    
}



