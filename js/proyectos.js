
  
  function clear_form_elements(ele) {
    $("#concepto").val('');
    $("#eje1").val('');
    $("#eje2").val('');
    $("#eje3").val('');
    $("#largo").val('');
    $("#ancho").val('');
    $("#altura").val('');
    $("#piezas").val('');
    $("#total").val('');
    $("#formula").val('');
  }
  
  function calcular(){
    $("#total").val("indefinido");
    var cad = "var total = 1";
    var par = 0;
    var opt = "";
    var cont = 0;
    if ($(":checked").val() == "normal"){
      $(".medida").each(function(){
	par = parseFloat($(this).val());
	if (!isNaN(par)){
	  cad += " * " + par;
	  cont++;
	}
      })
      eval(cad);
    } else {
      delete a;
      delete b;
      delete c;
      delete d;
      if (valida($("#formula").val())){
	$(".medida").each(function(){
	  par = parseFloat($(this).val());
	  if (!isNaN(par)){
	    cont++;
	    switch ($(this).attr("name")){
	      case "largo":
		a = par;
		break;
	      case "ancho":
		b = par;
		break;
	      case "altura":
		c = par;
		break;
	      case "piezas":
		d = par;
		break;	    
	    }
	  }  
	});
	var x = 0;
	for(j=0; j<usados.length; j++){
	  cond = "if(typeof(" + usados[j] + ") == 'undefined'){ x = 1; }";
	  eval(cond);
	}
	if (x == 0)
	  eval("total = " + $("#formula").val());
	else
	  alert('Todas las variables usadas en la formula no estan definidas');
      } else {
	$("#formula").focus();
      }
    } 
  
    if(cont==0)
       total="";
    $("#total").val(total);
  }
  
  

  function valida(texto){
    var validos="abcd+-*/.()0123456789";
    var variables = "abcd";
    var f = 0;
    usados = "";
    for(i=0; i<texto.length; i++){
      if (validos.indexOf(texto.charAt(i),0)==-1){
         alert("Caracter u operador invalido \"" + texto.charAt(i) + "\"");
	 f = 1;
      } else {
	if (variables.indexOf(texto.charAt(i),0)!=-1)
	  usados += texto.charAt(i);
      }
    }
    if (f==0)
      if(texto != "")
	return 1;
      else
	return 0;
    else
      return 0;
    
  } 