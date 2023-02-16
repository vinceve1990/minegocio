function abrepuerta(puerta){
    url = "http://192.168.1.198/index.html?";
    if (puerta == "salida"){
        url += "p1=10000";
    } else if (puerta == "entrada"){
        url += "p0=10000";
    }
    $.ajax({
      url: url,
      context: document.body
    }).done(function() {
    });
    
}