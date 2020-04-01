var numAtacantes;
var metalCadaUno;
var cristalCadaUno;
var deuterioCadaUno;

window.addEventListener("load", init);

function init(){
    numAtacantes = document.getElementById("numAtacantes");
    numAtacantes.addEventListener("change", mostrarFomulario);
}

function mostrarFomulario(){
    participantes = numAtacantes.value;

    var formulario = document.getElementById("formulario");
    formulario.innerHTML = "";
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    var totales = document.getElementById("totales");
    totales.innerHTML = "";

    for(var i = 0; i < participantes; i++){
        var calculadoAtacante = document.createElement("div");
        calculadoAtacante.id = "calculado" + i;
        var formularioAtacante = document.createElement("div");
        formularioAtacante.id = i;

        var nombreAtacante = document.createElement("h4");
        nombreAtacante.innerHTML = "<i class='fas fa-fighter-jet'></i> Atacante " + (i+1);
        var nombrePersonal = document.createElement("input");
        nombrePersonal.setAttribute("type", "text");
        nombrePersonal.id = "nombrePersonal" + i;
        nombrePersonal.setAttribute("placeholder", "Nombre");

        nombreAtacante.appendChild(nombrePersonal);

        var inputCristalCapturado = document.createElement("input");
        inputCristalCapturado.setAttribute("type", "number");
        inputCristalCapturado.id = "inputCristalCapturado" + i;
        var labelCristalCapturado = document.createElement("label");
        labelCristalCapturado.setAttribute("for", "inputCristalCapturado");
        labelCristalCapturado.textContent = "Cristal Capturado";

        var inputMetalCapturado = document.createElement("input");
        inputMetalCapturado.setAttribute("type", "number");
        inputMetalCapturado.id = "inputMetalCapturado" + i;
        var labelMetalCapturado = document.createElement("label");
        labelMetalCapturado.setAttribute("for", "inputMetalCapturado");
        labelMetalCapturado.textContent = "Metal Capturado";

        var inputDeuterioCapturado = document.createElement("input");
        inputDeuterioCapturado.setAttribute("type", "number");
        inputDeuterioCapturado.id = "inputDeuterioCapturado" + i;
        var labelDeuterioCapturado = document.createElement("label");
        labelDeuterioCapturado.setAttribute("for", "inputDeuterioCapturado");
        labelDeuterioCapturado.textContent = "Deuterio Capturado";

        var inputCristalRecolectado = document.createElement("input");
        inputCristalRecolectado.setAttribute("type", "number");
        inputCristalRecolectado.id = "inputCristalRecolectado" + i;
        var labelCristalRecolectado = document.createElement("label");
        labelCristalRecolectado.setAttribute("for", "inputCristalRecolectado");
        labelCristalRecolectado.textContent = "Cristal Recolectado";

        var inputMetalRecolectado = document.createElement("input");
        inputMetalRecolectado.setAttribute("type", "number");
        inputMetalRecolectado.id = "inputMetalRecolectado" + i;
        var labelMetalRecolectado = document.createElement("label");
        labelMetalRecolectado.setAttribute("for", "inputMetalRecolectado");
        labelMetalRecolectado.textContent = "Metal Recolectado"

        // Perdidas
        var inputMetalPerdido = document.createElement("input");
        inputMetalPerdido.setAttribute("type", "number");
        inputMetalPerdido.id = "inputMetalPerdido" + i;
        var labelMetalPerdido = document.createElement("label");
        labelMetalPerdido.setAttribute("for", "inputMetalPerdido");
        labelMetalPerdido.textContent = "Pérdidas Metal"
        labelMetalPerdido.className = "text-danger";

        var inputCristalPerdido = document.createElement("input");
        inputCristalPerdido.setAttribute("type", "number");
        inputCristalPerdido.id = "inputCristalPerdido" + i;
        var labelCristalPerdido = document.createElement("label");
        labelCristalPerdido.setAttribute("for", "inputCristalPerdido");
        labelCristalPerdido.textContent = "Pérdidas Cristal"
        labelCristalPerdido.className = "text-danger";

        formularioAtacante.appendChild(nombreAtacante);

        formularioAtacante.appendChild(labelMetalCapturado);
        formularioAtacante.appendChild(inputMetalCapturado);

        formularioAtacante.appendChild(labelCristalCapturado);
        formularioAtacante.appendChild(inputCristalCapturado);

        formularioAtacante.appendChild(labelDeuterioCapturado);
        formularioAtacante.appendChild(inputDeuterioCapturado);

        formularioAtacante.appendChild(labelMetalRecolectado);
        formularioAtacante.appendChild(inputMetalRecolectado);

        formularioAtacante.appendChild(labelCristalRecolectado);
        formularioAtacante.appendChild(inputCristalRecolectado);

        formularioAtacante.appendChild(labelMetalPerdido);
        formularioAtacante.appendChild(inputMetalPerdido);

        formularioAtacante.appendChild(labelCristalPerdido);
        formularioAtacante.appendChild(inputCristalPerdido);

        formulario.appendChild(formularioAtacante);
        
        var resultados = document.getElementById("resultado");
        resultados.appendChild(calculadoAtacante);
    }

    var btnCalcular = document.createElement("button");
    btnCalcular.textContent = "Calcular";
    btnCalcular.className = "btn btn-warning";
    btnCalcular.addEventListener("click", calcular);
    formulario.appendChild(btnCalcular);
}

function calcular(){
    var divTotales = document.getElementById("totales");
    divTotales.innerHTML = "";

    for(var i = 0; i<numAtacantes.value; i++){
        var resultado = document.getElementById("calculado" + i);
        resultado.innerHTML = "";
    }

    calcularTotales();

    for(var i = 0; i<numAtacantes.value; i++){
        var metalCapturado = document.getElementById(("inputMetalCapturado" + i)).value;
        var cristalCapturado = document.getElementById(("inputCristalCapturado" + i)).value;
        var metalRecolectado = document.getElementById(("inputMetalRecolectado" + i)).value;
        var cristalRecolectado = document.getElementById(("inputCristalRecolectado" + i)).value;

        var metalPerdido = parseInt(document.getElementById("inputMetalPerdido" + i).value);
        var cristalPerdido = parseInt(document.getElementById("inputCristalPerdido" + i).value);

        var deuterio = parseInt(document.getElementById(("inputDeuterioCapturado" + i)).value);
        var metal = (parseInt(metalCapturado) + parseInt(metalRecolectado)) - metalPerdido;
        var cristal = (parseInt(cristalCapturado) + parseInt(cristalRecolectado)) - cristalPerdido;

        var diferenciaMetal = 0;
        var sobraMetal = false;
        var diferenciaCristal = 0;
        var sobraCristal = false;
        var diferenciaDeuterio = 0;
        var sobraDeuterio = false;

        if(metal < metalCadaUno){
            diferenciaMetal = metalCadaUno - metal;
        }
        else if(metal > metalCadaUno){
            diferenciaMetal = metal - metalCadaUno;
            sobraMetal = true;
        }
        if(cristal < cristalCadaUno){
            diferenciaCristal = cristalCadaUno - cristal;
        }
        else if(cristal > cristalCadaUno){
            diferenciaCristal = cristal - cristalCadaUno;
            sobraCristal = true;
        }
        if(deuterio < deuterioCadaUno){
            diferenciaDeuterio = deuterioCadaUno - deuterio;
        }
        else if(deuterio > deuterioCadaUno){
            diferenciaDeuterio = deuterio - deuterioCadaUno;
            sobraDeuterio = true;
        }

        var tabla = document.createElement("table");
        var trMetal = document.createElement("tr");
        tabla.appendChild(trMetal);

        var nombre = document.createElement("h4");
        var nombrePersonal = document.getElementById("nombrePersonal"+i)
        nombre.textContent = "Atacante " + (i+1) + " ( " + nombrePersonal.value + " )";
        nombre.className = "mt-2";

        var mostrarMetal = document.createElement("td");
        if(sobraMetal){
            mostrarMetal.className = "text-primary";
            mostrarMetal.textContent = "Metal: " + redondear(metal) + "  ( +" + redondear(diferenciaMetal) + " ) ";
        }
        else{
            if(redondear(diferenciaMetal) == 0){
                mostrarMetal.className = "text-success";
                mostrarMetal.textContent = "Metal: " + redondear(metal) + "  (OK) ";
            }
            else{
                mostrarMetal.className = "text-danger";
                mostrarMetal.textContent = "Metal: " + redondear(metal) + "  ( -" + redondear(diferenciaMetal) + " ) ";
            }
        }
        trMetal.appendChild(mostrarMetal);
        
        var trCristal = document.createElement("tr");
        tabla.appendChild(trCristal);
        var mostrarCristal = document.createElement("td");
        if(sobraCristal){
            mostrarCristal.className = "text-primary";
            mostrarCristal.textContent = "Cristal: " + redondear(cristal) + "  ( +" + redondear(diferenciaCristal) + " ) ";
        }
        else{
            if(redondear(diferenciaCristal) == 0){
                mostrarCristal.className = "text-success";
                mostrarCristal.textContent = "Cristal: " + redondear(cristal) + "  (OK) ";
            }
            else{
                mostrarCristal.className = "text-danger";
                mostrarCristal.textContent = "Cristal: " + redondear(cristal) + "  ( -" + redondear(diferenciaCristal) + " ) ";
            }
        }
        trCristal.appendChild(mostrarCristal);

        var trDeuterio = document.createElement("tr");
        var mostrarDeuterio = document.createElement("td");
        if(sobraDeuterio){
            mostrarDeuterio.className = "text-primary";
            mostrarDeuterio.textContent = "Deuterio: " + redondear(deuterio) + "  ( +" + redondear(diferenciaDeuterio) + " ) ";
        }
        else{
            if(redondear(diferenciaDeuterio) == 0){
                mostrarDeuterio.className = "text-success";
                mostrarDeuterio.textContent = "Deuterio: " + redondear(deuterio) + "  (OK) ";
            }
            else{
                mostrarDeuterio.className = "text-danger";
                mostrarDeuterio.textContent = "Deuterio: " + redondear(deuterio) + "  ( -" + redondear(diferenciaDeuterio) + " ) ";
            }
        }
        trDeuterio.appendChild(mostrarDeuterio);
        tabla.appendChild(trDeuterio);

        var resultado = document.getElementById("calculado" + i);
        
        resultado.appendChild(nombre);
        resultado.appendChild(tabla);
    }
}

function calcularTotales(){

    var totalMetal = 0;
    var totalCristal = 0;
    var totalDeuterio = 0;

    for(var i = 0; i<numAtacantes.value; i++){
        var metalCapturado = document.getElementById(("inputMetalCapturado" + i)).value;
        var cristalCapturado = document.getElementById(("inputCristalCapturado" + i)).value;
        var metalRecolectado = document.getElementById(("inputMetalRecolectado" + i)).value;
        var cristalRecolectado = document.getElementById(("inputCristalRecolectado" + i)).value;

        var metalPerdido = parseInt(document.getElementById("inputMetalPerdido" + i).value);
        var cristalPerdido = parseInt(document.getElementById("inputCristalPerdido" + i).value);

        var metal = (parseInt(metalCapturado) + parseInt(metalRecolectado)) - metalPerdido;
        var cristal = (parseInt(cristalCapturado) + parseInt(cristalRecolectado)) - cristalPerdido;
        var deuterio = parseInt(document.getElementById("inputDeuterioCapturado"+i).value);

        totalMetal += metal;
        totalCristal += cristal;
        totalDeuterio += deuterio;
    }

    var mostrarMetal = document.createElement("h3");
    mostrarMetal.innerHTML = "<i class='fas fa-globe'></i> Total Metal: " + redondear(totalMetal);

    var mostrarCristal = document.createElement("h3");
    mostrarCristal.innerHTML = "<i class='fas fa-globe'></i> Total Cristal: " + redondear(totalCristal);

    var mostrarDeuterio = document.createElement("h3");
    mostrarDeuterio.innerHTML = "<i class='fas fa-globe'></i> Total Deuterio: " + redondear(totalDeuterio);

    metalCadaUno = totalMetal/(parseInt(numAtacantes.value));
    cristalCadaUno = totalCristal/(parseInt(numAtacantes.value));
    deuterioCadaUno = totalDeuterio/(parseInt(numAtacantes.value));

    var mostrarMetalCadaUno = document.createElement("h3");
    mostrarMetalCadaUno.innerHTML = "<i class='fas fa-user-astronaut'></i> Metal x Atacante: " + redondear(metalCadaUno);

    var mostrarCristalCadaUno = document.createElement("h3");
    mostrarCristalCadaUno.innerHTML = "<i class='fas fa-user-astronaut'></i> Cristal x Atacante: " + redondear(cristalCadaUno);

    var mostrarDeuterioCadaUno = document.createElement("h3");
    mostrarDeuterioCadaUno.innerHTML = "<i class='fas fa-user-astronaut'></i> Deuterio x Atacante: " + redondear(deuterioCadaUno);

    var totales = document.getElementById("totales");

    totales.appendChild(mostrarMetal);
    totales.appendChild(mostrarCristal);
    totales.appendChild(mostrarDeuterio);
    totales.appendChild(mostrarMetalCadaUno);
    totales.appendChild(mostrarCristalCadaUno);
    totales.appendChild(mostrarDeuterioCadaUno);
}

function redondear(valor){
    if(valor > 1000){
        valor = valor/1000;
        valor = Math.round(valor);
        valor = valor + "k";

        return valor;
    }
    else{
        return valor;
    }
}