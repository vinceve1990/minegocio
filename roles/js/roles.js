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
	    viewrecords: true,
	    sortorder: "desc",
	    caption:"Roles / Permisos",
	    toppager: true,
	    rownumbers:true,
	    loadComplete:function() {
	    	jQuery("#GridRoles").setGridWidth($('#advanced-search-form').width());
	    },
	    onSelectRow:function(id) {
	    	DialogProcesando('open');

	    	var nombreRol = $("#GridRoles").getCell(id, "nombre_rol");

	    	$("#rolTitulo").text(nombreRol+" (Permisos)");

	    	$("#rowCategorias").html("");

	    	$("#rowModulos").html("");

	    	$("#verCategorias").show();

	    	verCategorias(id);
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
			DialogAlta('Alta');
        }
    });//termina boton excel
}