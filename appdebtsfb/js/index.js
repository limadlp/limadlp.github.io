var firebaseRef = firebase.database().ref();
function mostraPatio(){
    //var dividas = JSON.parse(localStorage.getItem('patio'));
    //var dividas = firebaseRef.child('patio');
    //console.log("hey", dividas);
    
    firebaseRef.on("value", function(snapshot){
        if(snapshot.child("patio").exists()){
        
            //var dividas = JSON.parse(snapshot.val());
            var dividas = JSON.parse(snapshot.val().patio);
            //console.log("hey", JSON.stringify(dividas));
            
            var dividasResultado = document.getElementById('resultados');
            dividasResultado.innerHTML = '';
            for(var i = 0; i < dividas.length; i++){
                var que = dividas[i].que;
                var quanto = parseFloat(dividas[i].quanto);
                var quando = dividas[i].quando;

                dividasResultado.innerHTML += '<tr><td>' + quando + '</td><td>'
                                                        + que + '</td><td>' 
                                                        + quanto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td><td>'
                                                        + '<button class="btn btn-danger purple lighten-1" onclick="apagarDivida(\''+ que +'\')">X</button>' 
                                            +'</td></tr>';  
            }
        }
    });

    
}

function total(){
    
    //var dividas = JSON.parse(localStorage.getItem('patio'));
    
    firebaseRef.once("value", function(snapshot){
        var dividas = JSON.parse(snapshot.val().patio);
    
        var dividasResultado = document.getElementById('resultados');
        var totalDevido = document.getElementById('totaldevido');
        var soma = 0;
        for(var i = 0; i < dividas.length; i++){
            soma += parseFloat(dividas[i].quanto);
        }
        totalDevido.innerHTML =  soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});//CurrencyFormatted(soma);
    });
}

function apagarDivida(que){
    firebaseRef.once("value", function(snapshot){   
        var dividas = JSON.parse(snapshot.val().patio);
        for(var i = 0; i < dividas.length; i++){
            if(dividas[i].que === que){
                dividas.splice(i,1);
            }
            //localStorage.setItem('patio', JSON.stringify(dividas));
            firebaseRef.child("patio").set(JSON.stringify(dividas));
        }
        mostraPatio();
        total();
    });
}

function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += ',00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
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


  
  

