$(document).ready(function() {
	/*$('body').on("keydown", function(e) {
		//console.log(e.which);
		e.ctrlKey &&
		if (e.shiftKey && e.which === 88) {
			$("#btn_alta").click();
		}

		if (e.shiftKey && e.which === 82) {
			$("#refresh_GridPersonal_top").click();
		}

		if (e.ctrlKey && e.shiftKey && e.which === 83) {
			$("#agregaRol").click();
		}
	});*/

	$("#panelConfiguraciones").css("background-color","#29364d");

	$("#agregaRol").click(function() {
		dialogRol("open", "personal");
	});

	cargaGrid();
});

function cargaGrid() {
	$("#GridPersonal").jqGrid("GridUnload");

	jQuery("#GridPersonal").jqGrid({
	   	url:'/minegocio/personal/server',
		datatype: "json",
		mtype:'POST',
		postData:{accion: 'server'},
	   	colNames:['No', 'Usuario', 'Nombre', 'Apellidos', 'Telefono', 'Email', 'Curp', 'Sexo', 'Rol', 'Status', 'Acciones'],
	   	colModel:[
	   		{name:'id',index:'id', width:55},
	   		{name:'usuario',index:'usuario', width:120},
	   		{name:'nombre',index:'nombre', width:120},
	   		{name:'apellidos',index:'apellidos', width:150},
	   		{name:'telefono',index:'telefono', width:80},
	   		{name:'email',index:'email', width:80,},
	   		{name:'curp',index:'curp', width:80},
	   		{name:'sexo',index:'sexo', width:65, sortable:false},
	   		{name:'rol',index:'rol', width:65},
	   		{name:'status',index:'status', width:65},
	   		{name:'acciones',index:'acciones', width:100, sortable:false, search:false}
	   	],
	   	rowNum:50,
	   	sortname: 'id',
	   	width: $("#advanced-search-form").width() - 10,
	    viewrecords: true,
	    sortorder: "desc",
	    caption:"Personal / Roles",
	    toppager: true,
	    rownumbers:true,
	    loadComplete:function() {
	    	jQuery("#GridPersonal").setGridWidth($('#advanced-search-form').width() - 10);
	    }
	});

	jQuery("#GridPersonal").jqGrid('filterToolbar',{ searchOnEnter: true, enableClear: true });

	jQuery('#GridPersonal').navGrid('#GridPersonal_toppager',{edit:false,add:false,addtext:'Insertar',del:false,deltext:'Eliminar',search:false,refreshtext:'Actualizar'},{},{closeAfterAdd:true})
	.navButtonAdd('#GridPersonal_toppager',{
		caption:'Alta',
		id:'btn_alta',
		buttonicon:"ui-icon-plus",
		onClickButton: function(){
			DialogAlta('Alta');
        }
    });//termina boton excel
}

function DialogAlta(tipo) {
	$("#dialogPersonal").dialog({
        title: tipo + ' De Personal',
        autoOpen: false,
        modal: true,
        width: $("#advanced-search-form").width() - 10,
        closeOnEscape: false,
        resizable : false,
        zIndex: 1100,
        open: function() {
        	$("#tituloDialog").text(tipo + ' De Personal');
        	$("#btnGuarda").prepend('<i class="fa-solid fa-floppy-disk" height="25px" width="25px" /></i>');
        	$("#btnCancela").prepend('<i class="fa-solid fa-ban" height="25px" width="25px" /></i>');
        	$("#nombre").val('');
			$("#apellidos").val('');
			$("#telefono").val('');
			$("#email").val('');
			$("#CURP").val('');

			cargarRoles();

			//Ruta de la imagen
			img = '<img id="idImg" class="g-width-150 g-width-150--md g-height-150 g-height-150--md rounded-circle g-mr-150--sm" src="/minegocio/img/personaNoCargada.png">';

			$("#zonaDrop").html(img);

			$("#btn_file").change(function(){

				var arch_val = $("#btn_file").val();
				$('#resp').html(arch_val);

				var file = $("#btn_file").val();

				if (file != '') {
					$("#zonaDrop").html('');

					img = '<img id="idImg" class="g-width-150 g-width-150--md g-height-150 g-height-150--md rounded-circle g-mr-150--sm" src="/minegocio/img/personaCargada.png">';

					$("#zonaDrop").html(img);

				} else {

					Swal.fire({
						icon: 'error',
						title: 'NO HA ADJUNTADO'
					});
				}
			});
        },
        buttons: [
        	{
        		id: 'btnGuarda',
        		text: 'Guardar',
        		click: function() {
        			DialogProcesando('open', 'Guardando Personal');

        			var valorActivo = 0;
					var Dat = new Object();
					if(tipo == "Edicion") {
						Dat.id_persona_PK  = "integer:"+$("#id_persona").val();
					}
					Dat.nombre 		   = "string:"+$("#nombre").val();
					Dat.nombre 		   = "string:"+$("#nombre").val();
					Dat.apellidos 	   = "string:"+$("#apellidos").val();
					Dat.telefono 	   = "telefono:"+$("#telefono").val();
					Dat.email 		   = "emails:"+$("#email").val();
					Dat.curp  		   = "string:"+$("#CURP").val();
					Dat.rol  		   = "integer:"+$("#roles").val();
					Dat.rolText 	   = "string:"+$('select[name="roles"] option:selected').text();
					Dat.sexo = 0;
					var valorActivo = document.querySelector('input[name="optradio"]:checked').value;
					Dat.sexo = "integer:"+valorActivo;

					let files = $("#btn_file")[0].files;

					var formData = new FormData();

					for (const f in files) { formData.append(f, files[f]); }

					$.post('/minegocio/personal/server', {accion: tipo, Dat : Dat}, function(data) {
						if(data.val == 0 && files.length != 0) {
							if(tipo == "Edicion") {
								formData.append('id_usuarioNew', $("#id_usuario").val());
							} else {
								formData.append('id_usuarioNew', data.id_usuarioN);
							}

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

											DialogProcesando('close');

											Swal.fire("REGISTRO EXITOSO");

											$("#dialogPersonal").dialog('close');

											cargaGrid();

									}else {
										DialogProcesando('close');
										Swal.fire({
											icon: 'error',
											title: 'La Imagen no se pudo subir'
										});
									}
								},
								error: function() {
									DialogProcesando('close');
									Swal.fire({
										icon: 'error',
										title: 'NO HA ADJUNTADO'
									});
								}
							});
						} else if(data.val == 0 && files.length == 0) {
							DialogProcesando('close');

							Swal.fire("REGISTRO EXITOSO");

							$("#dialogPersonal").dialog('close');

							cargaGrid();
						} else {
							DialogProcesando('close');
							Swal.fire({
								icon: 'error',
								title: data.mensaje
							});
						}
					}, 'json');
        		}
        	},
        	{
        		id: 'btnCancela',
        		text: 'Cancelar',
        		click: function() {
        			$("#dialogPersonal").dialog('close');
        		}
        	}]
    }).dialog('open');
}

function cargarRoles() {
	DialogProcesando('open', 'Guardando Rol');
	$.ajax({
        dataType:"json",
        url:"/minegocio/roles/catalogoRoles",
        type: "POST",
        data:{accion: 'buscarRol'},
        cache:true,
        async:false,
        success: function(data){
        	DialogProcesando('close');
        	$("#roles").html(data);
        }
    });
}

function editarPersonal(dat) {
	DialogAlta('Edicion');

	$.post('/minegocio/personal/server', {accion: 'informacionPersona', Dat : dat}, function(data) {
		$("#id_usuario").val(data.id_usuario_negocio_PK);
		$("#id_persona").val(data.id_persona_negocio_PK);
		$("#nombre").val(data.nombre);
		$("#apellidos").val(data.apellidos);
		$("#telefono").val(data.telefono);
		$("#CURP").val(data.curp);
		$("#email").val(data.correo);

		if(data.sexo == 1) {
			$("#Rmas").click();
		} else if(data.sexo == 2) {
			$("#Rfem").click();
		}

		const select = document.querySelector('#roles');
  		const options = Array.from(select.options);
		const optionToSelect = options.find(item => item.text === data.nombreRol);
		optionToSelect.selected = true;

	}, 'json');
}

function eliminarPersonal(dat) {

	DialogProcesando('open');

	$.post('/minegocio/personal/server', {accion: 'bajaPersonal', Dat : dat}, function(data) {
		DialogProcesando('close');
		cargaGrid();
		Swal.fire(data.mensaje);
	}, 'json');
}

function activarPersonal(dat) {

	DialogProcesando('open');

	$.post('/minegocio/personal/server', {accion: 'activarPersonal', Dat : dat}, function(data) {
		DialogProcesando('close');
		cargaGrid();
		Swal.fire(data.mensaje);
	}, 'json');
}