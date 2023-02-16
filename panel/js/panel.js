$(document).ready(function() {
	//Cerrar Session
	$("#cerrarSession").click(function() {
		$.post('/minegocio/login/cerrarSession', {tipo : 'cerrar'}, function(data) {
			if(data.session != 0) {
				window.open("/minegocio/inicio/inicio","_self");
			}
		}, 'json');
	});
});