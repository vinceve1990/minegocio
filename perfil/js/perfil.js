$(document).ready(function() {
	//Click Login
	$.ajax({
        dataType:"json",
        url:"/minegocio/perfil/inforPerfil",
        type: "POST",
        data:{accion:'informacion'},
        cache:true,
        async:false,
        success: function(data4){
        	if(data4.error == 0) {
	        	$("#id_persona").val(data4.id_persona_PK);
	        	$("#id_usuario").val(data4.id_usuario_PK);
	        	$("#nombre").val(data4.nombre);
				$("#apellidos").val(data4.apellidos);
				$("#telefono").val(data4.telefono);
				$("#email").val(data4.correo);
				$("#CURP").val(data4.curp);
				$("#usuario").val(data4.usuario);
				$("#nombreComercial").val(data4.nombre_negocio);
				$("#password").val("");

				if(data4.sexo == 1) {
					$("#Rmas").click();
				} else if(data4.sexo == 2){
					$("#Rfem").click();
				}

				//Ruta de la imagen
				if(data4.ruta_img != 'null' && data4.ruta_img != null) {
					img = '<img id="idImg" class="g-width-150 g-width-150--md g-height-150 g-height-150--md rounded-circle g-mr-150--sm" src="/minegocio/perfil'+data4.ruta_img+'">';
				} else {
					img = '<img id="idImg" class="g-width-150 g-width-150--md g-height-150 g-height-150--md rounded-circle g-mr-150--sm" src="/minegocio/img/A.png">';
				}

				$("#zonaDrop").html(img);

				$("#btn_file").change(function(){

					var arch_val = $("#btn_file").val();
					$('#resp').html(arch_val);

					var file = $("#btn_file").val();

					if (file != '') {
						let files = $("#btn_file")[0].files;

						var formData = new FormData();

						for (const f in files) { formData.append(f, files[f]); }

						$.ajax({
							url: '/minegocio/perfil/subirFoto',
							type: 'POST',
							dataType: 'json',
							data: formData,
							contentType:false,
							processData:false,
							cache:false,
	        				async:true,
							beforeSend: function() {},
							success: function(data) {
								if (data.val == 0) {
									Swal.fire(
										'EXITO!',
										data.mensaje,
										'success'
									)

									location.reload();
								}else {
									Swal.fire({
										icon: 'error',
										title: 'La Imagen no se pudo subir'
									});
								}
							},
							error: function() {
								Swal.fire({
									icon: 'error',
									title: 'NO HA ADJUNTADO'
								});
							}
						});
					} else {

						Swal.fire({
							icon: 'error',
							title: 'NO HA ADJUNTADO'
						});
					}
				});
        	} else {
        		Swal.fire({
					icon: 'error',
					title: data4.mensaje
				});
        	}
        }
    });

	$("#guardarPerfil").click(function() {

		DialogProcesando('open');

		var valorActivo = 0;
		var Dat = new Object();

		Dat.id_persona_PK  = "integer:"+$("#id_persona").val();
    	Dat.id_usuario_PK  = "integer:"+$("#id_usuario").val();
		Dat.nombre 		   = "string:"+$("#nombre").val();
		Dat.apellidos 	   = "string:"+$("#apellidos").val();
		Dat.telefono 	   = "telefono:"+$("#telefono").val();
		Dat.email 		   = "emails:"+$("#email").val();
		Dat.curp  		   = "string:"+$("#CURP").val();
		Dat.usuario 	   = "string:"+$("#usuario").val();
		Dat.passwd		   = "pass:"+$("#password").val();
		Dat.nombre_negocio = "string:"+$("#nombreComercial").val();
		Dat.sexo = 0;
		var valorActivo = document.querySelector('input[name="optradio"]:checked').value;
		Dat.sexo = "integer:"+valorActivo;

		$.post('/minegocio/perfil/inforPerfil', {Dat : Dat, accion:'actualizar'}, function(data) {
			if(data.val == 0) {
				DialogProcesando('close');
				window.open("/minegocio/paneles/dashboards/perfil","_self");
			} else {
				DialogProcesando('close');
				Swal.fire({
					icon: 'error',
					title: 'Error al guardar la información'
				});
			}

		}, 'json');
	});
	//Fin Click Login
});