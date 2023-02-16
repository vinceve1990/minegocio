$(document).ready(function() {
	//Validacion de telefono
	function validate_int(myEvento) {
		if ((myEvento.charCode >= 48 && myEvento.charCode <= 57) || myEvento.keyCode == 9 || myEvento.keyCode == 10 || myEvento.keyCode == 13 || myEvento.keyCode == 8 || myEvento.keyCode == 116 || myEvento.keyCode == 46 || (myEvento.keyCode <= 40 && myEvento.keyCode >= 37)) {
			dato = true;
		} else {
			dato = false;
		}
		return dato;
	}

	function phone_number_mask() {
		var myMask = "__________";
		var myCaja = document.getElementById("tel");
		var myText = "";
		var myNumbers = [];
		var myOutPut = ""
		var theLastPos = 1;
		myText = myCaja.value;
		//get numbers
		for (var i = 0; i < myText.length; i++) {
			if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
				myNumbers.push(myText.charAt(i));
			}
		}
		//write over mask
		for (var j = 0; j < myMask.length; j++) {
			if (myMask.charAt(j) == "_") { //replace "_" by a number
				if (myNumbers.length == 0)
					myOutPut = myOutPut + myMask.charAt(j);
				else {
					myOutPut = myOutPut + myNumbers.shift();
					theLastPos = j + 1; //set caret position
				}
			} else {
				myOutPut = myOutPut + myMask.charAt(j);
			}
	  	}

	  	document.getElementById("tel").value = myOutPut;
	  	document.getElementById("tel").setSelectionRange(theLastPos, theLastPos);
	}

	document.getElementById("tel").onkeypress = validate_int;
	document.getElementById("tel").onkeyup = phone_number_mask;
	//Fin de validacion de telefono

	//Click Registrar
	$("#registrarUsuarios").click(function() {
		DialogProcesando('open');
		if($("#pass").val() == $("#passconf").val()) {
			var Dat = new Object();
			Dat.nombre = "string:"+$("#nombre").val();
			Dat.apellidos = "string:"+$("#apellidos").val();

			Dat.giroComercial = "string:"+$("#giroComercial").val();
			Dat.nombreComercial = "string:"+$("#nombreComercial").val();

			const tel = $("#tel").val();
			Dat.telefono = "telefono:"+tel.replace(/[() -]/g, '');

			Dat.email = "emails:"+$("#email").val();
			Dat.pass = "pass:"+$("#pass").val();
			if($("#giroComercial").val() != '' && $("#nombreComercial").val() != '' && tel.replace(/[() -]/g, '') != '' && $("#email").val() != '' && $("#pass").val() != '') {
				$.post('/minegocio/registroUsuarios/alta', {accion : 'registro', Dat : Dat}, function(data) {
					if(data.val == 0) {
						DialogProcesando('close');
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Usuario Registrado!',
							text:'Favor de revisar su correo, se envio un codigo de acceso',
							showConfirmButton: false,
							timer: 10000
						});
						limpiarCajas();
						//window.open("/minegocio/Login/users","_self");
					} else {
						DialogProcesando('close');
						Swal.fire(data.mensaje);
					}

				}, 'json');
			} else {
				DialogProcesando('close');
				Swal.fire({
					icon: 'error',
					title: 'Favor de llenar los datos'
				});
			}
		} else {
			DialogProcesando('close');
			Swal.fire({
				icon: 'error',
				title: 'La Contraseña es diferente'
			});
		}
	});
	//Fin Click Registrar

	function limpiarCajas() {
		$("#nombre").val("");
		$("#apellidos").val("");
		$("#giroComercial").val("");
		$("#nombreComercial").val("");
		$("#tel").val("");
		$("#email").val("");
		$("#pass").val("");
		$("#passconf").val("");
	}

});