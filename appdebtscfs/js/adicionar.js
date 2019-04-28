
document.getElementById("formulario").addEventListener('submit', cadastraDivida);
//var firebaseRef = firebase.firestore().doc("samples/patio");
var firebaseRef = firebase.firestore().collection("patio");

function cadastraDivida(e){
    var queDivida = document.getElementById('queDivida').value;
    var quantoDivida = document.getElementById('quantoDivida').value;
    var quandoDivida = document.getElementById('quandoDivida').value;

    divida = {
        que: queDivida,
        quanto: quantoDivida,
        quando: quandoDivida

    }

    firebaseRef.get().then(function (doc){
        firebaseRef.add({
            divida
        }).then(function (){
            var botao = document.getElementById("voltar");
            botao.click();
        });
        document.getElementById("formulario").reset();
    });
        
    e.preventDefault();
    
    
}