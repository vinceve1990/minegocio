function abrepuerta(puerta){
    url = "http://192.168.1.202/enu/trigger/";
    if (puerta == "salida"){
        url += "AbreSalida";
    } else if (puerta == "entrada"){
        url += "AbreEntrada";
    }
    $.ajax({
      url: url,
      context: document.body
    }).done(function() {
    });
    
}