$(document).ready(function() {
	$("#verCategorias").hide();
	cargaGridRoles();
});

function cargaGridRoles() {
	$("#GridRoles").jqGrid("GridUnload");

	jQuery("#GridRoles").jqGrid({
	   	url:'/minegocio/roles/catalogoRoles',
		datatype: "json",
		mtype:'POST',
		postData:{accion: 'server'},
	   	colNames:['No', 'Nombre Rol', 'Status', 'Acciones'],
	   	colModel:[
	   		{name:'id',index:'id', width:55},
	   		{name:'nombre_rol',index:'nombre_rol', width:220},
	   		{name:'status',index:'status', width:65},
	   		{name:'acciones',index:'acciones', width:100, sortable:false, search:false}
	   	],
	   	rowNum:50,
	   	sortname: 'id',
	   	width: $("#advanced-search-form").width(),
	   	height: ($("#advanced-search-form").width() / 6),
	    viewrecords: true,
	    sortorder: "desc",
	    caption:"Roles / Permisos",
	    toppager: true,
	    rownumbers:true,
	    loadComplete:function() {
	    	jQuery("#GridRoles").setGridWidth($('#advanced-search-form').width());
	    },
	    onSelectRow:function(id) {

	    	var nombreRol = $("#GridRoles").getCell(id, "nombre_rol");

	    	var status = $("#GridRoles").getCell(id, "status");

	    	if(status == "Desactivado") {
	    		Swal.fire(
					'ROL DESACTIVADO',
					'Favor de activar para editar los Permisos',
					'info'
				);
	    	} else {
	    		DialogProcesando('open');

		    	$("#rolTitulo").text(nombreRol+" (Permisos)");

		    	$("#rowCategorias").html("");

		    	$("#rowModulos").html("");

		    	$("#verCategorias").show();

		    	verCategorias(id);
	    	}
	    }
	});

	jQuery("#GridRoles").jqGrid('filterToolbar',{ searchOnEnter: true, enableClear: true });

	jQuery('#GridRoles').navGrid('#GridRoles_toppager',{edit:false,add:false,addtext:'Insertar',del:false,deltext:'Eliminar',search:false,refresh:false},{},{closeAfterAdd:true})
	.navButtonAdd('#GridRoles_toppager',{
		caption:'Actualizar',
		id:'btn_actualizar',
		buttonicon:"ui-icon-refresh",
		onClickButton: function(){
			$("#verCategorias").hide();
			$("#GridRoles").trigger("reloadGrid");
        }
    })
	.navButtonAdd('#GridRoles_toppager',{
		caption:'Alta',
		id:'btn_alta',
		buttonicon:"ui-icon-plus",
		onClickButton: function(){
			dialogRol("open", "roles");
        }
    });//termina boton excel
}

function editarRol(dat) {
	dialogRol('open', "editRoles");

	var nombreRol = $("#GridRoles").getCell(dat.id_roles_PK, "nombre_rol");

	var dRol = $("#dialogRoles");

	var id_roles_PK = dRol.data("id_roles_PK");

	dRol.data( 'id_roles_PK', dat.id_roles_PK );

	$("#nombreRol").val(nombreRol);

	/*DialogProcesando('open');

 	$.post('/minegocio/roles/catalogoRoles', {accion: 'editarRol', Dat : dat}, function (res) {
 		if(res.val == 0) {
 			Swal.fire(
				'EDITADO CON EXITO',
				'You clicked the button!',
				'success'
			)
 		}
 		DialogProcesando('close');
 	}, 'json');*/

}

function eliminarRol(dat) {
	DialogProcesando('open');

 	$.post('/minegocio/roles/catalogoRoles', {accion: 'eliminarRol', Dat : dat}, function (res) {
 		if(res.val == 0) {
 			Swal.fire(
				'BAJA EXITOSA',
				'',
				'success'
			);
 			DialogProcesando('close');

 			$("#GridRoles").trigger("reloadGrid");
 		} else {
 			Swal.fire(
				'ERROR EN LA BAJA DEL ROL',
				'',
				'error'
			);
 		}
 	}, 'json');

}

function activarRol(dat) {
	DialogProcesando('open');

 	$.post('/minegocio/roles/catalogoRoles', {accion: 'activarRol', Dat : dat}, function (res) {
 		if(res.val == 0) {
 			Swal.fire(
				'ACTIVADO CON EXITO',
				'',
				'success'
			);
 			DialogProcesando('close');

 			$("#GridRoles").trigger("reloadGrid");
 		}
 	}, 'json');

}
