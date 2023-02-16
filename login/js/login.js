$(document).ready(function() {
	//Click Login
	$("#loginUsers").click(function() {
		if($("#passwd").val() != '' && $("#usuario").val() != '') {
			var Dat = new Object();
			Dat.claveEmpresa = "string:"+$("#claveEmpresa").val();
			Dat.usuario = "string:"+$("#usuario").val();
			Dat.pass = "pass:"+$("#passwd").val();

			$.post('/minegocio/login/login', {Dat : Dat}, function(data) {
				if(data.usuario != 0) {
					window.open("/minegocio/paneles/dashboards","_self");
				} else {
					Swal.fire({
						icon: 'error',
						title: data.mensaje
					});
				}

			}, 'json');
		} else {
			Swal.fire({
				icon: 'error',
				title: 'La Contraseña es diferente'
			});
		}
	});
	//Fin Click Login
});