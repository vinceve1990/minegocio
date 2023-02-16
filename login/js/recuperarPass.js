$(document).ready(function() {
	//Click Recuperar
	$("#enviarPasss").click(function() {
		if($("#correo").val() != '') {
			var Dat = new Object();
			Dat.usuario = $("#correo").val();

			$.post('/minegocio/login/enviarPass', {Dat : Dat}, function(data) {
				Swal.fire("La Contraseña es diferente o no existe usuario");
			}, 'json');
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Inserte Correo'
			});
		}
	});
	//Fin Click Recuperar
});