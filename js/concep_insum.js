
var id_grid = "";
var cant_mat="";
var path_file="catalogos/conceptos_costo/concep_insum.js";


$(document).ready(function(){


    // inicia dialogo de eliminacion de insumo de la matriz


    $('#d_elimina').dialog({
        title: 'Eliminar',
        modal: true,
        show: "scale",
        hide: "xplode",
        autoOpen : false,
        width: 200,
        buttons: {

            "Aceptar": function(){
                var datos = $('#nuevo_insumo').serialize();
                concep = $('#id_concepto').val();
                id_mat=$('#id_matriz').val();
                $.ajax({
                    type: "POST",
                    url: 'del_insumos.php',
                    dataType: "json",
                    data: datos + "&id=" + Math.random(),
                    success: function(precios){
                        //console.log(precios);
                        //console.log(id_grid + "vzlor");
                        $("#"+id_grid).trigger('reloadGrid');
                        $('#t_conceptos').jqGrid('setRowData',concep,{precio1: precios.pre1, precio2: precios.pre2, precio3: precios.pre3});
                        $('#d_elimina').dialog('close');
                    }
                }); // Termina llamada a ajax
            },

            "Cancelar": function() {
                $('#d_elimina').dialog('close');
            }
        }// termina la declaracion de botones
    }); // finaliza dialogo de eliminacion de insumo "#d_elimina"



    //inicia dialogo cantidad
    $('#d_cantidad').dialog({ //inicia condicional para tipo de dialogo si es insumo o concepto
        title: 'Confirma insumo',
        modal: true,
        show: "scale",
        hide: "xplode",
        autoOpen : false,
        buttons: {
            "Aceptar": function(){
                var datos = $('#nuevo_insumo').serialize();
                ida = $('#id_concepto').val();
                $.ajax({
                    cache: false,
                    type: "POST",
                    url: "inserta_matriz.php",
                    dataType: "json",
                    data: datos + "&id=" + Math.random(),
                    success: function(precios){
                        //console.log(precios);
                        $('#t_conceptos_'+ida+"_t").trigger("reloadGrid");
                        $('#t_conceptos').jqGrid('setRowData',ida,{precio1: precios.pre1, precio2: precios.pre2, precio3: precios.pre3})
                        $('#cantidad').val("");
                        $('#d_cantidad').dialog('close');
                    }
                });
            },
            "Cancelar": function(){
                $('#d_cantidad').dialog('close');
            }
        } // termina la declaracion de botones,.
    }); //termina dialogo cantidad

  //Editar opciones de los dialogos
    $('#d_edita_insu').dialog({
        title: 'Agrega Insumo a Matriz',
        modal: false,
        show: "scale",
        hide: "xplode",
        autoOpen : false,
        width: 950
    });

    $('#d_edita_concep').dialog({
        title: 'Agrega subconcepto a Matriz',
        modal: false,
        show: "scale",
        hide: "xplode",
        autoOpen : false,
        width: 650
    });

    $('#d_edita_insu_com').dialog({
        title: 'Agrega insumo compuesto a matriz',
        modal: false,
        show: "scale",
        hide: "xplode",
        autoOpen : false,
        width: 950
    });

  // Termina opciones de dialogos



    // inicia grid de insumos para mostrar en dialogo
    jQuery("#t_m_insumos").jqGrid({
        url:'datos_insumo.php?insumo=normal',
        datatype: "json",
        colNames:['ID','Clave','Descripcion', 'U. Medida', 'U. Medida2','Equivalencia','Precio Z1' ,'Precio Z2','Precio Z3' ,'Clase', 'Tipo Producto', 'Categoria'],
        colModel:[
            {name:'id',index:'id', width:40, key:true },
            {name:'clave',index:'clave', width:70, editable:true, search:true,editrules:{edithidden:true, custom:true, custom_func:val_clave }},
            {name:'descripcion',index:'descripcion', width:200,  editable:true, search:true, editrules:{edithidden:true, custom:true, custom_func:val_desc }},
            {name:'umed',index:'umed', width:50, align:"right", editable:true, search:true,  editrules:{edithidden:true, required:true }},
            {name:'umed2',index:'umed2', width:50, align:"right",search:true, editable:true},
            {name:'equivalencia',index:'equivalencia', width:50,align:"right", search:true, editable:true, editrules:{edithidden:true, number:true}},
            {name:'precio1',index:'precio1', width:40,align:"right", editable:true , search:true, editrules:{edithidden:true, custom:true, number:true, custom_func:val_prec1 }},
            {name:'precio2',index:'precio2', width:40,align:"right", editable:true , search:true, editrules:{edithidden:true, custom:true, number:true, custom_func:val_prec2 }},
            {name:'precio3',index:'precio3', width:40,align:"right", editable:true ,search:true,  editrules:{edithidden:true, custom:true, number:true, custom_func:val_prec3 }},
            {name:'clase',index:'clase', width:80, sortable:true, editable:true, search:true,  editrules:{edithidden:true, required:true }},
            {name:'tipo_producto',index:'tipo_producto', width:80, search:true,  editable:true },
            {name:'categoria', index:'categoria', width:100, align:'right',  editable: true, search:true,  edittype:"select", editoptions:{value: "material:material; mano de obra:mano de obra; herramienta:herramienta; maquinaria:maquinaria"}},
        ],
        rowNum:100,
        rowList:[100,200,500],
        pager: '#d_m_insumos',
        sortname: 'descripcion',
        viewrecords: true,
        sortorder: "desc",
        altRows:true,
        autowidth:true,
        height:'350px',
        ondblClickRow: function(id){
            $('#d_cantidad').dialog('open');
            $('#id_insumo').val(id);
            $('#categoria').val($("#t_m_insumos").getCell(id,'categoria'));
            $('#categoria').val($("#t_m_insumos").getCell(id,'categoria'));
            $('#tipo').val('insumo');
        },
        caption:"Catalogo de insumos en matriz"
    }); // Termina declaracion del grid "#t_m_insumos"


    jQuery("#t_m_insumos").jqGrid('bindKeys', {
        onEnter: function(rowid) {
            $('#d_cantidad').dialog('open');
            $('#id_insumo').val(rowid);
            $('#categoria').val($("#t_m_insumos").getCell(id,'categoria'));
            $('#tipo').val('insumo');
        }
    });

    jQuery("#t_m_insumos").jqGrid('filterToolbar',{ searchOnEnter: false, enableClear: true });
    jQuery("#t_m_insumos").jqGrid('navGrid','#d_m_insumos',{edit:false,add:false,del:false});
    // Termina grid Inumos dentro del dialogo agregar insumos.



    // inicia grid de insumos compuestos para mostrar en dialogo
    jQuery("#t_m_insumos_com").jqGrid({
        url:'datos_insumo.php?insumo=compuesto',
        datatype: "json",
        colNames:['ID','Clave','Descripcion', 'U. Medida', 'U. Medida2','Equivalencia','Precio Z1' ,'Precio Z2','Precio Z3' ,'Clase', 'Tipo Producto', 'Categoria'],
        colModel:[
            {name:'id',index:'id', width:40, key:true },
            {name:'clave',index:'clave', width:70, editable:true, search:true,editrules:{edithidden:true, custom:true, custom_func:val_clave }},
            {name:'descripcion',index:'descripcion', width:200,  editable:true, search:true, editrules:{edithidden:true, custom:true, custom_func:val_desc }},
            {name:'umed',index:'umed', width:50, align:"right", editable:true, search:true,  editrules:{edithidden:true, required:true }},
            {name:'umed2',index:'umed2', width:50, align:"right",search:true, editable:true},
            {name:'equivalencia',index:'equivalencia', width:50,align:"right", search:true, editable:true, editrules:{edithidden:true, number:true}},
            {name:'precio1',index:'precio1', width:40,align:"right", editable:true , search:true, editrules:{edithidden:true, custom:true, number:true, custom_func:val_prec1 }},
            {name:'precio2',index:'precio2', width:40,align:"right", editable:true , search:true, editrules:{edithidden:true, custom:true, number:true, custom_func:val_prec2 }},
            {name:'precio3',index:'precio3', width:40,align:"right", editable:true ,search:true,  editrules:{edithidden:true, custom:true, number:true, custom_func:val_prec3 }},
            {name:'clase',index:'clase', width:80, sortable:true, editable:true, search:true,  editrules:{edithidden:true, required:true }},
            {name:'tipo_producto',index:'tipo_producto', width:80, search:true,  editable:true },
            {name:'categoria', index:'categoria', width:100, align:'right',  editable: true, search:true,  edittype:"select", editoptions:{value: "material:material; mano de obra:mano de obra; herramienta:herramienta; maquinaria:maquinaria"}},
        ],
        rowNum:100,
        rowList:[100,200,500],
        pager: '#d_m_insumos_com',
        sortname: 'descripcion',
        viewrecords: true,
        sortorder: "desc",
        altRows:true,
        autowidth:true,
        height:'350px',
        ondblClickRow: function(id){
            $('#d_cantidad').dialog('open');
            $('#id_insumo').val(id);
            $('#categoria').val($("#t_m_insumos_com").getCell(id,'categoria'));
            $('#tipo').val('insumo compuesto');
        },
        editurl: "agregar_insumo_com.php",
        caption:"Catalogo de insumos compuestos en matriz"
    }); // Termina declaracion del grid "#t_m_insumos_com"

    jQuery("#t_m_insumos_com").jqGrid('bindKeys', {
        onEnter: function(rowid) {
            $('#d_cantidad').dialog('open');
            $('#id_insumo').val(rowid);
            $('#categoria').val($("#t_m_insumos_com").getCell(id,'categoria'));
            $('#tipo').val('insumo compuesto');
        }
    });
    jQuery("#t_m_insumos_com").jqGrid('filterToolbar',{ searchOnEnter: false, enableClear: true });
    jQuery("#t_m_insumos_com").jqGrid('navGrid','#d_m_insumos_com',{edit:false,add:true,del:false});
    // Termina grid Insumos compuestos dentro del dialogo agregar insumos.



/////inicia grid subconceptos dentro de dialogo agrega subconceptos

    jQuery("#t_m_conceptos").jqGrid({
        url:'datos_concepto2.php',
        datatype: "json",
        colNames:['ID','Clave','Descripcion', 'U. Medida', 'U. Medida2', 'Equivalencia', 'Precio Z1' ,'Precio Z2','Precio Z3' , 'Familia'],
        colModel:[
            {name:'id',index:'id', width:40, search:false},
            {name:'clave',index:'clave', width:70, editable:true, editrules:{edithidden:true, custom:true, custom_func:val_clave}},
            {name:'descripcion',index:'descripcion', width:200,  editable:true, editrules:{edithidden:true, custom:true, custom_func:val_desc }},
            {name:'umed',index:'umed', width:50, align:"right", editable:true},
            {name:'umed2',index:'umed2', width:50, align:"right", editable:true},
            {name:'equivalencia',index:'equivalencia', width:50, align:"right", editable:true},
            {name:'precio1',index:'precio1', width:40,align:"right", formatter:'number', search:false, editrules:{edithidden:true, custom:true, custom_func:val_prec1 }},
            {name:'precio2',index:'precio2', width:40,align:"right", formatter:'number', search:false, editrules:{edithidden:true, custom:true, custom_func:val_prec2 }},
            {name:'precio3',index:'precio3', width:40,align:"right", formatter:'number', search:false, editrules:{edithidden:true, custom:true, custom_func:val_prec3 }},
            {name:'familia',index:'familia', width:80, editable:true}
        ],
        rowNum:100,
        rowList:[100,200,500],
        altRows: true,
        pager: '#d_m_conceptos',
        sortname: 'descripcion',
        viewrecords: true,
        sortorder: "desc",
        altRows:true,
        autowidth:true,
        height:'350px',
        ondblClickRow: function(id){
            $('#d_cantidad').dialog('open');
            $('#id_insumo').val(id);
            $('#categoria').val($("#t_m_conceptos").getCell(id,'categoria'));
            $('#tipo').val('subconcepto');
            $('#cantidad').focus();
        },
        caption:"Catalogo de Subconceptos"
    }); // Termina declaracion del grid "#t_m_conceptos"

    jQuery("#t_m_conceptos").jqGrid('bindKeys', {
        onEnter: function(rowid) {
            $('#d_cantidad').dialog('open');
            $('#id_insumo').val(rowid);
            $('#categoria').val($("#t_m_conceptos").getCell(id,'categoria'));
            $('#tipo').val('subconcepto');
            $('#cantidad').focus();
        }
    });
    jQuery("#t_m_conceptos").jqGrid('filterToolbar',{ searchOnEnter: false, enableClear: true });
    jQuery("#t_m_conceptos").jqGrid('navGrid','#d_m_conceptos',{edit:false,add:false,del:false});
    /////termina grid//////////////////////////////////7

}); // Termina Ready Document

function val_clave(value, colname) {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    //var clave = jQuery("#t_insumos").jqGrid('getRowData','descripcion');
    if(value=='')
       return [false,"Ingresa "+colname];
    else
       return [true,""];
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function val_desc(value, colname) {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    //var clave = jQuery("#t_insumos").jqGrid('getRowData','descripcion');
    if(value=='')
        return [false,"Ingresa "+colname];
    else
        return [true,""];
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function val_prec1(value, colname) {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    //var clave = jQuery("#t_insumos").jqGrid('getRowData','descripcion');
    if(value=='')
        return [false,"Ingresa "+colname];
    else
        return [true,""];
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}


function conceptos() {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    $('#g_ins').hide();
    $('#g_conc').show();
    $('#selec_tipo').show();
    $('#tipo').val('concepto');
    $('#categoria').show();
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function insumos() {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    $('#tipo').val('insumo');
    $('#g_ins').show();
    $('#g_conc').hide();
    $('#selec_tipo').hide();
    $('#categoria').hide();
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function val_prec2(value, colname) {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    //var clave = jQuery("#t_insumos").jqGrid('getRowData','descripcion');
    if(value=='')
        return [false,"Ingresa "+colname];
    else
        return [true,""];
    console.log("*****  Termina " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function val_prec3(value, colname) {
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    //var clave = jQuery("#t_insumos").jqGrid('getRowData','descripcion');
    if(value=='')
        return [false,"Ingresa "+colname];
    else
        return [true,""];
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

var lastsel;

function edita_obra_insu(row_id){
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    jQuery("#t_m_insumos").trigger('reloadGrid');
    jQuery('#t_matriz').jqGrid().setGridParam({url:'datos_insumo3.php?row_id='+row_id}).trigger('reloadGrid');
    lastsel3 = row_id;
    $("#d_edita_insu").dialog("open");
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function edita_obra_insu_com(row_id){
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    jQuery("#t_m_insumos_com").trigger('reloadGrid');
    jQuery('#t_matriz').jqGrid().setGridParam({url:'datos_insumo3.php?row_id='+row_id}).trigger('reloadGrid');
    lastsel3 = row_id;
    $("#d_edita_insu_com").dialog("open");
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function edita_obra_concep(row_id){
    console.log("*****  Se inicia funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
    jQuery("#t_m_conceptos").trigger('reloadGrid');
    jQuery('#t_matriz').jqGrid().setGridParam({url:'datos_insumo3.php?row_id='+row_id}).trigger('reloadGrid');
    lastsel3 = row_id;
    $("#d_edita_concep").dialog("open");
    console.log("*****  Termina funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber + ' Archivo: ' + path_file);
}

function construir_grid_matrices(clave_matriz)
{

    var data = '';

    if(clave_matriz != ''){
        data = '?'
        data += 'clave_matriz='+clave_matriz;
    }

    jQuery("#t_conceptos").jqGrid({
        url:'obtener_catalogo.php'+data,
        datatype: "json",
        colNames:['ID','Clave','Descripcion', 'U. Medida', 'Precio Z1' ,'Precio Z2','Precio Z3' , 'Familia'],
        colModel:[
            {name:'id',index:'id', width:40, search:false, key:true, hidden:true},
            {name:'clave',index:'clave', width:70, editable:true, align:"center", editrules:{edithidden:true, custom:true, custom_func:val_clave }},
            {name:'descripcion',index:'descripcion', width:200,  editable:true, align:"center", editrules:{edithidden:true, custom:true, custom_func:val_desc }},
            {name:'umed',index:'umed', width:50, align:"center", editable:true},
            {name:'precio1',index:'precio1', width:40,align:"right", formatter:'number', search:false, editrules:{edithidden:true, custom:true, custom_func:val_prec1 }},
            {name:'precio2',index:'precio2', width:40,align:"right", formatter:'number', search:false, editrules:{edithidden:true, custom:true, custom_func:val_prec2 }},
            {name:'precio3',index:'precio3', width:40,align:"right", formatter:'number', search:false, editrules:{edithidden:true, custom:true, custom_func:val_prec3 }},
            {name:'familia',index:'familia', width:80, editable:true, align:"center"}
        ],
        rowNum:100,
        rowList:[100,200,500],
        altRows: true,
        pager: '#d_conceptos',
        sortname: 'descripcion',
        viewrecords: true,
        sortorder: "desc",
        altRows:true,
        subGrid: true,
        autowidth: true,
        height:'350px',


        loadComplete: function(){
            /*
            var width = $("#t_conceptos").parent().width();
            $("#t_conceptos").setGridWidth(width,true);
            alert(width);*/
         },

        onSelectRow: function (id){
            $("#id_concepto").val(id);
            /*** getcolprop
              var col = $("#t_conceptos").jqGrid('getColProp','precio1');
              col.editable = true;
            */
        },

        gridComplete: function(){
            /*
            $("#add_t_conceptos").click(function(){
                jQuery('#tr_A').show();
                jQuery('#tr_B').show();
                jQuery('#tr_C').show();
                jQuery('#tr_D').show();
                jQuery('#tr_E').show();
                jQuery('#tr_F').show();
            });*/
            $(".ui-pg-input, ").css({padding: '0', width: '30px'});
            $(".ui-pg-selbox").css({padding: '0', width: '50px'});
        },

        beforeShowForm:  function(formid){
          // $('#tr_A',formid).show()
        },

        ondblClickRow: function(id){
            jQuery('#t_conceptos').jqGrid('restoreRow',lastsel);
            if(id /*&& id!==lastsel*/){
                jQuery('#t_conceptos').jqGrid('editRow',id,true);
                lastsel=id;
            }

            $('.editable').css({padding: 0, width: '95%'});
        },
        editurl: "actualizar_catalogo.php",
        caption:"Catalogo de conceptos y matrices",
        subGridOptions: {
            "plusicon" : "ui-icon-triangle-1-e",
            "minusicon" : "ui-icon-triangle-1-s",
            "openicon" : "ui-icon-arrowreturn-1-e",
            // load the subgrid data only once
            "reloadOnExpand" : false,
            // select the row when the expand column is clicked
            "selectOnExpand" : true
        },
        // inicia subgrid del concepto (Matriz)
        subGridRowExpanded: function(subgrid_id, row_id) {
            var subgrid_table_id, pager_id, lastsel2;
            subgrid_table_id = subgrid_id+"_t";
            id_grid = subgrid_table_id;
            pager_id = "p_"+subgrid_table_id;
            $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");
            jQuery("#"+subgrid_table_id).jqGrid({
                url:"datos_relac.php?q=2&id="+row_id,
                datatype: "json",
                shrinkToFit: true,
                ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
                colNames:['ID', 'CLAVE', 'DESCRIPCION', 'CATEGORIAS', 'TIPO', 'U. MED.', 'CANTIDAD', 'COSTO1', 'COSTO2', 'COSTO3', 'IMPORTE1', 'IMPORTE2', 'IMPORTE3'],
                colModel:[
                    {name:'id',index:'id', width:60, sorttype:'int', search:false, key:true, hidden:true},
                    {name:'clave',index:'clave', width:70, align:"left", search:true, stype:'text', searchrules: {}, searchoptions:{ attr:{title:'Selecciona Clave'}, dataurl: 'busqueda.php'}},
                    {name:'descripcion',index:'descripcion', width:300, align:"left", summaryType:'count', summaryTpl : '{0} insumos' },
                    {name:'categoria',index:'categoria', width:80,align:"center", hidden:true},
                    {name:'tipo',index:'tipo', width:80,align:"center", hidden:false},
                    {name:'umed',index:'umed', width:60,align:"center"},
                    {name:'cantidad',index:'cantidad', width:90, align:"right", editable:true},
                    {name:'precio1',index:'precio1', width:100, align:"right", formatter:'number'},
                    {name:'precio2',index:'precio2', width:100, align:"right", formatter:'number'},
                    {name:'precio3',index:'precio3', width:100, align:"right", formatter:'number'},
                    {name:'importe1',index:'importe1', width:100, align:"right", formatter:'currency', sorttype:'number',summaryType:'sum'},
                    {name:'importe2',index:'importe2', width:100, align:"right", formatter:'currency', sorttype:'number',summaryType:'sum'},
                    {name:'importe3',index:'importe3', width:100, align:"right", formatter:'currency', sorttype:'number',summaryType:'sum'}
                ],
                rowNum: 20,
                pager: pager_id,
                sortname: 'descripcion',
                sortorder: "asc",
                editurl: "actualizar_matriz.php?cantid="+cant_mat+"&mat=" + Math.random(),
                align:"center",
                height: '100 %',
                grouping: true,
                groupingView : {
                    groupField : ['tipo' ,'categoria'],
                    groupText : ['<b class="level_1">{0} ({1})</b>', '<b class="level_2">{0} ({1})</b>'],
                    groupCollapse : false,
                    groupOrder: ['asc'],
                    groupSummary : [true],
                    groupDataSorted : true,
                    groupColumnShow: false
                },
                footerrow: true,
                userDataOnFooter: true,
                onSelectRow: function(id){
                    cant_mat=$("#"+subgrid_table_id).getCell(id, 'cantidad');
                },


                ondblClickRow: function(id){

                    jQuery("#"+subgrid_table_id).jqGrid('restoreRow',lastsel2);

                    if(id /*&& id!==lastsel2*/){
                        jQuery("#"+subgrid_table_id).jqGrid('editRow',id,{
                            successfunc: function(resp){
                                var responce=JSON.parse(resp.responseText);
                                //console.log(responce);
                                $('#t_conceptos').jqGrid('setRowData',row_id,{precio1:responce.pfin1, precio2:responce.pfin2, precio3:responce.pfin3});
                                $('#'+id_grid).trigger('reloadGrid');
                            },
                            keys: true,
                            multiple: false
                        });
                        lastsel2=id;
                    }
                },

                loadComplete: function(){
                    $('.level_1').parent().css({'background': '#DBB5FF'});
                    $('.level_2').parent().css({'background': '#FFCEB5'});
                    $('.ui-pg-input').css({'padding': '0', 'width': '20%'});
                    /*var sub_width = $(this).parent().parent().parent().width();
                    $(this).width(sub_width);*/
                }

            }); ////termina subgrid

            // Comenzamos a agregar los botones para insumo y subconceptos.
            jQuery("#"+subgrid_table_id).navGrid("#"+pager_id,{edit:false,add:false,del:false,search:false}).navButtonAdd("#"+pager_id,{// agregar insumo boton a navegador
                caption:"Eliminar  .",
                buttonicon:"none",
                onClickButton: function(){
                    selec= $('#'+subgrid_table_id).jqGrid('getGridParam', 'selrow');
                    $("#id_matriz").val($('#'+subgrid_table_id).jqGrid('getGridParam', 'selrow'));
                    if(selec){
                        $("#d_elimina").dialog("open");
                    } else {
                        alert("Selecciona Insumo");
                    }
                },
                position:"last"
            }).navButtonAdd("#"+pager_id,{// agregar insumo boton a navegador
                caption:"Agregar insumos",
                buttonicon:"none",
                onClickButton: function(){
                    $('#id_concepto').val(row_id);
                        edita_obra_insu(row_id);
                    },
                position:"last"
            })// termina el agregado de boton
            .navButtonAdd("#"+pager_id,{// agregar insumo compuest boton a navegador
                caption:"Agregar insumos compuesto",
                buttonicon:"none",
                onClickButton: function(){
                    $('#id_concepto').val(row_id);
                  edita_obra_insu_com(row_id);
                },
                position:"last"
            })// termina el agregado de boton
            .navButtonAdd("#"+pager_id,{// agregar boton subconcepto a navegador
                caption:"Agregar Subconcepto",
                buttonicon:"none",
                onClickButton: function(){
                    $('#id_concepto').val(row_id);
                    edita_obra_concep(row_id);
                },
                position:"last"
            });// termina el agregado de boton

        }// termina subgrid de concepto (Matriz)

    });

    jQuery("#t_conceptos").jqGrid('navGrid','#d_conceptos',{edit:false,add:true,del:true});



    jQuery("#t_conceptos").jqGrid('editRow','#d_conceptos', {multiple:false, size:3 });
    options = {autosearch:true, searchOnEnter:false};
    jQuery("#t_conceptos").jqGrid('filterToolbar',options);
    jQuery("#t_conceptos").jqGrid('bindKeys', {
        onEnter: function(rowid) {
            editingRowId = rowid;
            jQuery("#t_conceptos").jqGrid('editRow',rowid,true,null, null, null, {},function(){
                setTimeout(function(){jQuery("#dq_catalogos").focus();},100);
            });
        },
        onSpace: function(rowid) {
            //agregarIC(rowid);
        }
    }); // Termina declaracion de grid para "#t_conceptos"
}