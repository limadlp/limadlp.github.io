var firebaseRef = firebase.firestore().collection("patio");
function mostraPatio(){

    firebaseRef.onSnapshot(function (snap) {
            
        var dividasResultado = document.getElementById('resultados');
        dividasResultado.innerHTML = '';
        snap.forEach(function(doc){
            
            var dividas = doc.data().divida;   
            
            var que = dividas.que;
            var quanto = parseFloat(dividas.quanto);
            var quando = dividas.quando; 

            dividasResultado.innerHTML += '<tr><td>' + quando + '</td><td>'
                                                    + que + '</td><td>' 
                                                    + quanto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td><td>'
                                                    + '<button class="btn btn-danger purple lighten-1" onclick="apagarDivida(\''+ doc.id +'\')">X</button>'
                                                    
                                        +'</td></tr>';  
        });
    });
}

function total(){
    firebaseRef.get().then(function (snap) {

        var totalDevido = document.getElementById('totaldevido');
        var soma = 0;
        snap.forEach(function(doc){
            soma += parseFloat(doc.data().divida.quanto);
        });
        
        totalDevido.innerHTML =  soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});//CurrencyFormatted(soma);
    });
}

function apagarDivida(id){
 
    firebaseRef.doc(id).delete().then(function(){
        mostraPatio();
        total();
    });

}



function start(){
    mostraPatio();
    total();
    buttonadd();

}

function buttonadd(){
    $(document).ready(function(){
        $('.fixed-action-btn').floatingActionButton();
      });
}