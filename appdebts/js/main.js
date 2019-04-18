document.getElementById("formulario").addEventListener('submit', cadastraDivida);

function cadastraDivida(e){
    var queDivida = document.getElementById('queDivida').value;
    var quantoDivida = document.getElementById('quantoDivida').value;
    var quandoDivida = document.getElementById('quandoDivida').value;

    divida = {
        que: queDivida,
        quanto: quantoDivida,
        quando: quandoDivida

    }


    if(localStorage.getItem('patio') === null){
        var dividas = [];
        dividas.push(divida);
        localStorage.setItem('patio', JSON.stringify(dividas));
    } else {

        var dividas = JSON.parse(localStorage.getItem('patio'));
        dividas.push(divida);
        localStorage.setItem('patio', JSON.stringify(dividas));

    }


    mostraPatio();
    total();
    document.getElementById("formulario").reset();
    //console.log(carro);
    
    e.preventDefault();
}

function apagarDivida(que){
    var dividas = JSON.parse(localStorage.getItem('patio'));
    for(var i = 0; i < dividas.length; i++){
        if(dividas[i].que === que){
            dividas.splice(i,1);
        }
        localStorage.setItem('patio', JSON.stringify(dividas));
    }
    mostraPatio();
    total();
}

function mostraPatio(){
    var dividas = JSON.parse(localStorage.getItem('patio'));
    var dividasResultado = document.getElementById('resultados');
    
    dividasResultado.innerHTML = '';
    for(var i = 0; i < dividas.length; i++){
        var que = dividas[i].que;
        var quanto = parseFloat(dividas[i].quanto);
        var quando = dividas[i].quando;

        dividasResultado.innerHTML += '<tr><td>' + quando + '</td><td>'
                                                + que + '</td><td>' 
                                                + quanto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td><td>'
                                                + '<button class="btn btn-danger" onclick="apagarDivida(\''+ que +'\')">X</button>' 
                                       +'</td></tr>';  
    }
}

function total(){
    var dividas = JSON.parse(localStorage.getItem('patio'));
    var totalDevido = document.getElementById('totaldevido');
    var soma = 0;
    for(var i = 0; i < dividas.length; i++){
        soma += parseFloat(dividas[i].quanto);
    }
    totalDevido.innerHTML =  soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});//CurrencyFormatted(soma);

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
}