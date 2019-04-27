
document.getElementById("formulario").addEventListener('submit', cadastraDivida);
var firebaseRef = firebase.firestore().doc("samples/patio");

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
        if (!doc.exists){
            //console.log("patio nao existe, criando");
            var dividas = [];
            dividas.push(divida);
            dividas = JSON.stringify(dividas);
            //localStorage.setItem('patio', JSON.stringify(dividas));
            firebaseRef.set({
                patio: dividas
            }).then(function (){
                var botao = document.getElementById("voltar");
                botao.click();
            });
        }
        else{
            //console.log("patio já existe, acrescentando");
            var dividas = JSON.parse(doc.data().patio);
            dividas.push(divida);
            dividas = JSON.stringify(dividas);
            //console.log(dividas);
            firebaseRef.set({
                patio: dividas
            }).then(function(){
                var botao = document.getElementById("voltar");
                botao.click();
            });

        }
        document.getElementById("formulario").reset();
        //var botao = document.getElementById("voltar");
        //botao.click();
    });
        
    e.preventDefault();
    
    
}



