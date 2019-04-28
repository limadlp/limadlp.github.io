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
            var tipo = dividas.tipo;
            if(tipo === "deb"){
                //dividasResultado.style.color = "red";
                dividasResultado.innerHTML += '<tr><td>' + quando + '</td><td>'
                                                        + que + '</td><td>' 
                                                        + '<span style=\'color:red;\'>'
                                                         + quanto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) 
                                                         + '</span></td><td>'
                                                        + '<button class="btn btn-danger red lighten-1" onclick="apagarDivida(\''+ doc.id +'\')">X</button>'
                                                        
                                            +'</td></tr>';
                        
            }
            else if (tipo == "pag"){
                //dividasResultado.style.color = "green";
                dividasResultado.innerHTML += '<tr><td>' + quando + '</td><td>'
                                                        + que + '</td><td>' 
                                                        + '<span style=\'color:green;\'>'
                                                        + quanto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                         + '</span></td><td>'
                                                        + '<button class="btn btn-danger green lighten-1" onclick="apagarDivida(\''+ doc.id +'\')">X</button>'    
                                            +'</td></tr>'; 
            }  
        });
    });
}

function total(){
    firebaseRef.get().then(function (snap) {

        var totalDevido = document.getElementById('totaldevido');
        var devemVoce = document.getElementById('devemvoce');
        var soma = 0;
        snap.forEach(function(doc){
            if (doc.data().divida.tipo === "deb"){ 
                soma += parseFloat(doc.data().divida.quanto);
            }
            else if (doc.data().divida.tipo == "pag"){
                soma -= parseFloat(doc.data().divida.quanto);
            }
        });
        
        if (soma >= 0){
            totalDevido.innerHTML =   "Total devido: "+ '<span style=\'color:red;\'>' + soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</span>';
            
        }
        else if (soma < 0){
            soma = -soma;
            totalDevido.innerHTML =  "Devem a você: " + '<span style=\'color:green;\'>' + soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</span>';
        }

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