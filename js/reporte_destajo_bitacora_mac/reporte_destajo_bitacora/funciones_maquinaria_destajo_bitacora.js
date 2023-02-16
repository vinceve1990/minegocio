
function autocomplete_element(value, options) {

      var ac = $('<input type="text"/>');

      ac.val(value);

      ac.autocomplete({source:"autocompletar_proveedores.php"});

      return ac;

    }

    function autocomplete_value(elem, op, value) {

      if (op == "set") {

        $('#id_proveedor').val(value);

      }

      return $('#id_proveedor').val();

    }


function send_filters()
{

 // var marcas="<.ui-search-toolbar > th:nth-child(3) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)>#gs_marca>"
                                        // var marcas=$("#gs_marca").val();    
                                         var folio_maquinaria=$("#gs_id_catalogo_maq").val();
                                         var marcas =$("#gs_marca").val();     
                                         var modelo=$("#gs_modelo").val();
                                         var colores=$('#gs_color').val();
                                         var num_serie=$("#gs_num_serie").val();
                                         var num_eco=$("#gs_num_eco").val();
                                         var capacidad_tanque=$("#gs_capacidad_tanque").val();
                                         var consumo_minimo=$("#gs_consumo_minimo").val();
                                         var consumo_maximo=$("#gs_consumo_maximo").val();
                                         var rendimiento=$("#gs_productidad_economica").val();
                                         var id_proveedor=$("#gs_id_nom_proveedor").val();
                                         var id_maq_aux_tipo=$("#gs_id_maq_aux_tipo").val();

               var filters = "&marca="+marcas+"&modelo="+modelo+'&color='+colores+'&num_serie='+num_serie+'&num_eco='+num_eco+'&capacidad_tanque='+capacidad_tanque+'&consumo_minimo='+consumo_minimo+'&consumo_maximo='+consumo_maximo+'&rendimiento='+rendimiento+'&id_proveedor='+id_proveedor+'&id_maq_aux_tipo='+id_maq_aux_tipo+'&id_catalogo_maquinaria='+folio_maquinaria;
  return filters;                            
}


















function formulario()
{
//parate donde agregass datos de una maquinaria 

                                          $("#catalogo_maquinaria").dialog
                            ({                  
                                      width:800,
                                      height:520,
                                      autoOpen:false,
                                      hide: 'fold',
                                      show: 'blind',
                                      model:true,
                                      open: function()
                                      {
                                       
                                          $("span.ui-dialog-title").text('CATÁLOGO DE MAQUINARIA'); 
                                          $('#nombre').val('');
                                          $("#descripcion").val('');
                                          $("#area").val('');

                                      },
                                      buttons:
                                      {
                         
                                      Aceptar:function(event)
                                        { 
                                         //var id_catalogo_maq =$("#id_catalogo_maq").val();                                     
                                         var marca=$("#marca").val();         
                                         var modelo=$("#modelo").val();
                                         var color=$("#color").val();
                                         var num_serie=$("#num_serie").val();
                                         var num_eco=$("#num_eco").val();
                                         var capacidad_tanque=$("#capacidad_tanque").val();
                                         var consumo_minimo=$("#consumo_minimo").val();
                                         var consumo_maximo=$("#consumo_maximo").val();
                                         var rendimiento=$("#productividad_economica").val();
                                         var id_proveedor=$("#id_proveedor_mov").val();
                                         var id_maq_aux=$("#id_maq_aux").val();

                                         
                                         agregar_datos_catalogo_maquinaria(marca,modelo,color,num_serie,num_eco,capacidad_tanque,consumo_minimo,consumo_maximo,rendimiento,id_proveedor,id_maq_aux);  
                                        
                                        },//aceptar

                                        Cancelar:function(event){
                                          $("#catalogo_maquinaria").dialog('close');
                                        }

                                      }       
                            });  
                            
                         $("#catalogo_maquinaria").dialog('open');    
}

function agregar_datos_catalogo_maquinaria(marca,modelo,color,num_serie,num_eco,capacidad_tanque,consumo_minimo,consumo_maximo,rendimiento,id_proveedor,id_maq_aux){
  var result;
if(marca=='')
 {
  alert('Introduce Marca ');
  document.getElementById("marca").focus();
 }else if(modelo=='')
 {
    alert('Introduce Modelo');
    document.getElementById("modelo").focus();
 }else if(num_serie=='')
 {
  alert('Introduce Numero de Serie');
   document.getElementById("num_serie").focus();
 }
 else if(capacidad_tanque=='')
 {
  alert('Introduce Capacidad del Tanque');
  document.getElementById("capacidad_tanque").focus();
 } 
 else if(consumo_minimo=='')
 {
  alert('Introduce Consumo Minimo');
  document.getElementById("consumo_minimo").focus();
 }
 else if(consumo_maximo=='')
 {
    alert('Introduce Consumo Máximo');
    document.getElementById("consumo_maximo").focus();
 }else if(rendimiento=='')
 {
  alert('Introduce Rendimiento');
  document.getElementById("rendimiento").focus();
 } 
 else if(id_proveedor=='')
 {
  alert('Introduce Proveedor');
  $("#nom_proveedor_mov").val("");
  document.getElementById("nom_proveedor_mov").focus();
 }
 if(id_maq_aux=='')
 {
  alert('Selecciona la Maquina');
  $("#id_maq_aux").val("");
  document.getElementById("id_maq_aux").focus();
 }
 else
 {



                $.ajax(
                {

                dataType : 'json',
                type : 'GET',
                //envio de datos para ejecutar la consulta y realizar la devolucion...                                                                                                                                                                                                                                        id_maq_aux
                url :'agrega_maquinaria_catalogo.php?marca='+marca+'&modelo='+modelo+'&num_serie='+num_serie+'&color='+color+'&num_eco='+num_eco+'&capacidad_tanque='+capacidad_tanque+'&consumo_minimo='+consumo_minimo+'&consumo_maximo='+consumo_maximo+'&productividad_economica='+rendimiento+'&id_proveedor='+id_proveedor+'&id_maq_aux='+id_maq_aux,  
                data :{},
                async:true,
                cache:false,
                beforeSend: function(){  
                        $("#confirma_movimiento").dialog('open');                          
                        $("#confirma_movimiento").html("<div><img src='../img/cargando.gif'></img><br><b>Guardando Movimiento</b></div>");
                      },
                success : function(response){

                  var num_eco=$("#num_eco").val();
                  result=response;
                  if(result==1)             
                  {
                      alert("Inserción realizada con exitos!");    
                      marca.value='';
/*                      num_serie.value='';
                      num_eco.value='';
                      modelo.value='';
                      color.value='';
                      capacidad_tanque.value='';
                      consumo_minimo.value='';
                      consumo_maximo.value='';
                      productividad_economica.value='';
                      nom_proveedor_mov.value='';
                      id_maq_aux.value='';*/
                      $("#num_serie").val("");
                      $("#num_eco").val("");
                      $("#marca").val("");
                      $("#modelo").val("");
                      $("#color").val("");
                      $("#capacidad_tanque").val("");
                      $("#consumo_minimo").val("");
                      $("#consumo_maximo").val(""); 
                      $("#productividad_economica").val("");
                      $("#nom_proveedor_mov").val("");
                      $("#id_maq_aux").val("");
                      document.getElementById('marca').focus();
                  }
/*                  if(result==2) 
                  {
                  alert("Número de serie o Número economico ya existen en la base de datos revisar!");
                  $("#num_eco").val("");
                  $("#num_serie").val("");      
                  document.getElementById('num_eco').focus();
                  $("#catalogo_maquinaria").dialog('open');
                  }*/
                  if(result==14)
                  {
                  alert("Número de serie existe cambialo!");
                  $("#num_serie").val("");      
                  document.getElementById('num_serie').focus();
                  $("#catalogo_maquinaria").dialog('open');      
                  }
                  if(result==19)
                  {
                  alert("Número economico existe cambialo!");
                  $("#num_eco").val("");      
                  document.getElementById('num_eco').focus();
                  $("#catalogo_maquinaria").dialog('open');
                  }

                    },
                error : function(error) {
                console.log(error);
                }//terna funcion error
                });
        $("#catalogo_maquinaria").dialog('close'); 

        $("#tbl_cat_maquinaria").trigger("reloadGrid");



  }


}







// mi codigo 
function crear_cat_documentos(){
/*  */
  var nombre_maquinaria=$("#id_maq_aux").val("");
  nombre_maquinaria.value='';
  var filtro=$("#check_todas").val();
  var lastSel;
  var id_almacen_busca=$("#id_alm_salida").val();
  var id_proveedor=$("#id_proveedor").val();
  
  //?id_proveedor='+id_proveedor
  $("#tbl_cat_maquinaria").jqGrid("GridUnload");

        jQuery("#tbl_cat_maquinaria").jqGrid({ 
          url:'server_reporte_destajo_bitacora.php',
            datatype: 'json',
            colNames: ['FOLIO RENTA','MARCA', 'MODELO','NÚMERO DE SERIE','FOLIO ORDEN COMPRA'/*,'CAPACIDAD DEL TANQUE Lt','CONSUMO MINIMO Lt/hr','CONSUMO MAXIMO Lt/hr','RENDIMIENTO Lt/hr','PROVEEDOR','id_nom_proveedor','MAQUINA','ARCHIVO'*/],  
            colModel: [ 
            {name:'id_catalogo_maq',index:'id_catalogo_maq',align:"left", width:60,editable:false,hidden:false, key:true, search:true}, 
            {name:'marca',index:'marca',width:70,align:'center', editable:true, search:true,hidden:false}, 
            {name:'modelo',index:'modelo',width:80,align:'center', editable:true, search:true}, 
            {name:'color',index:'color',width:70,align:'center', editable:true, search:true,hidden:false},
            {name:'num_serie',index:'num_serie',width:140,align:'center', editable:true, search:true,hidden:false}
/*            {name:'num_eco',index:'num_eco',align:"left", width:140,editable:true,hidden:false, key:true, search:true},
            {name:'capacidad_tanque',index:'capacidad_tanque',align:"left", width:160,editable:true,hidden:false, key:true, search:true}, 
            {name:'consumo_minimo',index:'consumo_minimo',width:120,align:'center', editable:true, search:true}, 
            {name:'consumo_maximo',index:'consumo_maximo',width:140,align:'center', editable:true, search:true},
            {name:'productidad_economica',index:'productidad_economica',width:90,align:'center', editable:true, search:true,hidden:false},
            {name:'id_nom_proveedor',index:'id_nom_proveedor',width:90,align:'center', editable:true, search:true,hidden:false,edittype: "text", editoptions:{
dataInit: function (element)
{
  window.setTimeout(function (){
    $(element).autocomplete({
            //id: 'AutoComplete', 
            source: function(request, responce)
            {
            this.xhr=$.ajax({
            url:'autocompletar_proveedores.php',
            data: request,
            dataType: "json",
            success: function(data)
            {
            responce(data);
            },
            error: function(model, response, options)
            {
            response([]);
            }
            });

            },
            autoFocus: true    
    });

  },100);
  

  
            }

      }
   },        
            

            {name:'id_proveedor',index:'id_proveedor',width:90,align:'center', editable:true, search:true,hidden:true},
            {name:'id_maq_aux_tipo',index:'id_maq_aux_tipo',width:270,align:'left', editable:true, search:true,hidden:false,edittype:'select',editoptions:{dataUrl:'select_proveedores.php'}},
            {name:'imprimir',index:'imprimir',width:90,align:'center', editable:true, search:true,hidden:false}*/
        
              ],
/*console.log('entro en jqgrid');*/
          rowNum:10000, 
          rowList:[100000,1000000,20000000], 
          toppager: true, 
          sortname: 'fecha', 
          viewrecords: true, 
          sortorder: "desc", 
       
          /*shrinkToFit: true,*/
          caption:"CATÁLOGO DE MAQUINARIA",
          editurl:'editar_maquinaria.php',
          width:($(window).width()-10),
          height: $(window).height()-100,


          //altRows:true,
          footerrow: true,/* opcion para mostrar una fila al final de la tabla */
          userDataOnFooter: true,/* opcion para usar datos que usuario mande*/
          multiselect: false,
          rownumbers:true,

           ondblClickRow: function(id_row){
                                            // alert('error');
                                                 if(id_row && id_row!==lastSel){ 
                                                  jQuery($(this)).restoreRow(lastSel);
                                                  lastSel=id_row; 
                                                }    
                                                jQuery("#tbl_cat_maquinaria").jqGrid('editRow',id_row,{
                                                       //editurl:'editar_almacenes.php',
                                                        keys:true,
                                                        multiple:false,
                                                        
                                                        aftersavefunc: function(id_row){  
                                                               $("#tbl_cat_maquinaria").trigger("reloadGrid");                
                                                        },
                                                        oneditfunc: function(){
                                                        }

                                                      });
                                   },      
              
          afterInsertRow: function(rowId){


            var aux_pintar=$("#tbl_cat_maquinaria").getCell(rowId,'id_alm_salida');
            if(aux_pintar==1){
     
                $("#tbl_cat_maquinaria").jqGrid('setRowData',rowId,'',{background:'green'});

                 $("#tbl_cat_maquinaria").setCell(rowId,'id_solicitud','',{color:'white','font-weight':'bold','text-align':'right'});

            }
         
          },

          loadComplete: function()
          {
            //$("#gs_fecha").datepicker({dateFormat:'yy-mm-dd'});
            $("#add#tbl_cat_maquinaria_top").click(function(){

              $('#editmo#tbl_cat_maquinaria').attr("style","width: 600.167px; height: 600.1667px; align:center;z-index: 950; overflow: hidden; display: block;");

            });

          }

      });//cierra grid
   jQuery("#tbl_cat_maquinaria").jqGrid('filterToolbar',{ searchOnEnter: true, enableClear: true });
   jQuery('#tbl_cat_maquinaria').navGrid('#tbl_cat_maquinaria_toppager',{edit:false,edittext:'Editar',add:false,addtext:'Insertar',del:true,deltext:'ELIMINAR',search:false},{closeAfterEdit:true},{closeAfterAdd:true}).navButtonAdd('#tbl_cat_maquinaria_toppager',{
                  caption:'MAQUINARIA',
                  buttonicon:"ui-icon ui-icon-circle-plus",
                  onClickButton: function(){
                    /*$("#agrega_anticipo").dialog('open');*/
                    formulario();
                     //lista_proveedor();
                  }, position:"last"}).navButtonAdd('#tbl_cat_maquinaria_toppager', 
                      {
                              caption:'Exportar Excel',
                              buttonicon:'ui-icon ui-icon-print',
                              onClickButton:function()
                              {
                              var valores_filtros=send_filters();
                              console.log(valores_filtros);
                              var url_m='excel_maquinaria_catalogo_1.php?valores=1'+valores_filtros;

                              try{
                              window.open(url_m,"","width=1200, height=700, menubar=0,scrollbar=0,status=1");
                              console.log("envio exitoso");
                              }catch(e){
                              location.target="_blank";
                              location.href=url_m;
                              }
                        },
                        position:'firts'
                      });

/*onSelectRow: function(id){ 
      if(id && id!==lastSel){ 
         jQuery('#tbl_cat_maquinaria').restoreRow(lastSel); 
         lastSel=id; 
      } 
      jQuery('#tbl_cat_maquinaria').editRow(id, true); 
   },*/


                     /////////Inicialización de la variable uploader que se carga en el index principal para poder subir archivos//////////////////////
//var id_catalogo_maq=$("#id_catalogo_maq").val();





              var uploader = new qq.FileUploader({
              
                multiple: false,
                element: document.getElementById('file-uploader-demo1'),
                action: 'upload.php', // este es el archivo que maneja la subida de archivos, debes ver la carpeta de subida
                sizeLimit: 0,
                minSizeLimit: 0,

                onComplete: function(id, fileName, responseJSON){
                     
                 // console.log('valor del id'+id_catalogo_maq);
                    //cuando se ha terminado de subir el archivo se ejecuta llamada por ajax para mover el archivo y procesar formulario
                    // Serializamos el formulario
                   // str = $("#d_docind").serialize();
                    var str = 'file=' + responseJSON.file + '&extension=' + responseJSON.extension + '&ruta=' + responseJSON.ruta;
                    var id=$("#no_personal").val(); 
                    console.log('recibiendo id '+id);
                    console.log('valor str'+str);
                    $("#selecciona_documento").trigger('reloadGrid');

                  //   str=$("#f_imagen2").serialize();

                    $.ajax({
                     
                     // console.log('valor folio maquinass='+id_catalogo_maq);
                        beforeSend: function(){
                           // $('#respuestaAJAX').html('<img id="loader" src="../../../img/cargando.gif"/><p><small>Cargando...</small></p>');
                        },
                        cache: false, // Indicamos que no se guarde en cache
                        type: "POST",
                        url:"mueve_archivo.php?id_catalogo_maq="+id,
                        dataType: "json",
                        data: str + "&filename=" + fileName + "&id=" + Math.random()+'&ruta='+responseJSON.ruta+'&extension='+responseJSON.extension,
                        success: function(response){
                            if (response.error != 'ok') {
                           $(".qq-upload-list").hide();
                                //$('#respuestaAJAX').html(response.error);
                                $('#selecciona_documento').trigger('reloadGrid');
                                /*$('#file-uploader-demo1').click(function()
                                  {
                                      $("#respuestaAJAX").empty();
                                      $(".qq-upload-list").empty();
                                  }); 
                                       $('#adicionales > input[type=text]').val('');*/
                            } else {
                              //  $('#adicionales > input[type=text]').val('');
                                //$('#respuestaAJAX').html('Archivo procesado');
                                
                                
                               // alert('adjuntado correctamente');
                            $(".qq-upload-list").hide();
                                $("#selecciona_documento").dialog('close');
                                $('#selecciona_documento').trigger('reloadGrid');
                                /*id_fila = $('#id_doc').val();
                                iconos = '<table><tr><td><a onclick="d('+id_fila+')" alt="Ver imagen" title="Ver imagen"><span class="ui-icon ui-icon-image"></span></a></td>';
                                iconos += '<td><a onclick="edita_imagen('+id_fila+')" alt="Adjunta imagen" title="Adjunta imagen"><span class="ui-icon ui-icon-extlink"></span></a></td>';
                                iconos += '<td><a onclick="elimina_imagen('+id_fila+')" alt="Elimina imagen" title=""><span class="ui-icon ui-icon-trash"></span></a></td></tr></table>';
                                $('#t_insumos').jqGrid('setRowData',id_fila,{imagen: iconos})*/
                            }
                        }
                    });
                },
                onProgress: function(id, fileName, loaded, total){},
                onCancel: function(id, fileName){},
                debug: true //indica si tirara un mensaje de error cuando algun error se produce
            });
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////Termina la declaración de la variable para poder generar un input de tipo file y subir el archivo en sl servidor////////////////
  }




    
    //////////////////////Termina función del subgrid///////////////////////////
    //////////////////////////////////////////////////////////////////////////// 

    ////////////////////////////////////////////////////////////////////////////
   //Función que genera una ventana modal para que se pueda agregar un documento
  function  imprimir_archivo_maquinaria(personal_id)
{

console.log('el id de la maquina es '+personal_id);
                            $("#selecciona_documento").dialog
              ({                  
                        autoOpen: false,
                        modal: true,
                        show: "fold",
                        hide: "explode",
                        width: 300,
                        height: 200,
                        scrollbar:false,
                        open: function()
                        {
                         
                            $("span.ui-dialog-title").text('Adjunta Archivo Maquinaria PDF, JPG'); 
                            $("#no_personal").val(personal_id);
                            $('#myDialogId').css('overflow', 'hidden');

                        },
                        buttons:
                        {
           
/*                        Aceptar:function(event)
                          {                      
                           var id_p=$("#no_personal").val();                                             
            
console.log('se lanzo Inserción de documento');
                             $("#tbl_cat_maquinaria").trigger('reloadGrid');
                             $("#fecha_ins").val('');
                 
                             $("#respuestaAJAX").empty();
                             $(".qq-upload-list").empty();
                          },//Boton Aceptar del cuadro de dialogo

                          Cancelar:function(event){
                            $("#selecciona_documento").dialog('close');
                             $("#tbl_cat_maquinaria").trigger('reloadGrid');
                             $("#fecha_ins").val('');
              
                             $("#respuestaAJAX").empty();
                             $(".qq-upload-list").empty();
                          }*/

                        }       
              });  
           
              $("#selecciona_documento").dialog('open');  

  }
   ////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////Termina la función para agregar documentos/////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////Función hora//////////////////////////////////////////////////////////
    function genera_hora()
            {
                 var tiempo=new Date();
              var hora="";
              hora+=tiempo.getHours();
              hora+=":";
              hora+=tiempo.getMinutes();
              hora+=":" ;
              hora+=tiempo.getSeconds();

              $("#hr_insert").val(hora);
            }
    ////////////////////////////////////////Termina función hora/////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////Inicia la función que guardara  los archivos en la base de datos/////////////

    ////////////////////////////Termina la carga de los archivos////////////////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////Función para modificar los archivos en la base de datos//////////////////////

   function modifica_documentos(nper)
   {

     $.ajax({
            
                  dataType : 'json',
                  type : 'POST',
                  url : 'modifica_documento.php',  
                  data :{idper:nper},
                  async:true,
                  cache:false,
                  success : function(response){
                     var resusponse;
                    if(result==1)
                    {
                      alert("El documento se ha registrado exitosamente");
                    }
                    else
                    {
                      alert("El documento que desea ingresar ya ha sido ingresado para el usuario actual");
                    }
                    $("#confirma_modif").dialog('close');
                    $("#tbl_documentos_personal").trigger('reloadGrid');
                  },
                  error : function(error) {
                    console.log(error);
                  }
              });
   }
   ///////////////////////////////////Termina función de modificar//////////////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////Modifica archivo en la base de datos (abre el cuadro de diálogo)///////////////////////////////////////////
   function modifica_documentos_dialogo(nper,res_inser)
   {
      //Verifica si el documento ha sido ingresado, en el caso de que ya este registrado el documento pregunta al usuario si desea modificar
      if(res_inser==0)
      {
         $("#confirma_modif").dialog
              ({                  
                        width:1000,
                        height:450,
                        autoOpen:false,
                        hide: 'fold',
                        show: 'blind',
                        model:true,
                        open: function()
                        {
                         
                            $("span.ui-dialog-title").text('Arcivo Maquina'); 

                        },
                        buttons:
                        {
           
                        Aceptar:function(event)
                          {                      
                            modifica_documentos(nper);
                             $("#confirma_modif").dialog('close');
                             $("#selecciona_documento").dialog('close');
                             $("#tbl_documentos_personal").trigger('reloadGrid'); 
                          },//Boton Aceptar del cuadro de dialogo

                          Cancelar:function(event){
                            alert("Saldras de la opción para agregar documentos");
                            $("#confirma_modif").dialog('close');
                            $("#selecciona_documento").dialog('close'); 
                          }

                        }       
              });  
           
              $("#confirma_modif").dialog('open');   
      }
      else
      {
         $("#salir_dialogo").dialog({
                              width:200,
                              height:150,
                              autoOpen:false,
                              hide: 'fold',
                              show: 'blind',
                              model:true,
                              open: function()
                              {
                               
                                  $("span.ui-dialog-title").text('Archivo Maquina'); 

                              },
                              buttons:
                              {
                 
                              Aceptar:function(event)
                                {                      
                                  $("#salir_dialogo").dialog('close');
                                  $("#selecciona_documento").dialog('close');
                                }

                              }    
         });
          $("#salir_dialogo").dialog('open');
      }
   }
   //////////////////////////////Termina la modificación de los archivos subidos en la base de datos////////////
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////Funcion que abre el dialogo para mostrar los documentos de la tabla///////////////////
   function dialog_documentos(ident_personal)
   {
    var id_persona_docs=ident_personal;
     $("#dialogo_documentos").dialog({
                              width:$(window).width()-50,
                              height:$(window).height()-200,
                              autoOpen:false,
                              hide: 'fold',
                              show: 'blind',
                              model:true,
                              open: function()
                              {
                               
                                  $("span.ui-dialog-title").text('Documentos por persona');
                                  subgrid_documentos_individuales(id_persona_docs);
                                  carga_documento();

                              },
                              buttons:
                              {
                 
                              Aceptar:function(event)
                                {                      
                                  $("#dialogo_documentos").dialog('close');
                                }

                              }    
      });
     $("#dialogo_documentos").dialog('open');
   }
   /////////////////////////////////////Termina diálogo de los documentos///////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////
   function carga_documento()
        {
            $("#id_docto").val(function()
            {
                $.ajax(
                        {
                            //El parametro url hace referencia al archivo donde se realizará la evaluación de los datos (archivo de php, devuelve la respuesta en formato json)
                              datatype : 'json',
                              type : 'POST',
                              url : '../documentos_por_persona/controlador/funciones/carga_select.php',  
                              data :{},
                          
                              success : function(option){
                                $("#id_docto").html(option);              
                              },
                              error : function(error) {
                                console.log(error);
                              }//termina la evaluación de los errores que devuelve en el ajax
                        }
                    );//termina ajax
            }
                );
            ////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////
        } 
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////







//////////////////////////////////77777777SUBGRID VISTA PARA EDITAR ARCHIVO O DESCARGARLO... JAJAJAJAJAJA






function edicion_archivo(id_catalogo_maq){
  //console.log('has entrado vista para ver los archivos de ,maqquinaria '+id_catalogo_maq);
      $('#grid_dwg').dialog('open');
  /*    var type = 66;
      $("#semana").val(semana);
      $("#id_doc").val(id);*/
      jQuery("#t_archivos_n").jqGrid('GridUnload');
          jQuery("#t_archivos_n").jqGrid({
              url:'datos_archivos_maquinaria.php?id_catalogo_maq='+id_catalogo_maq,
               //url:'datos_archivos.php?id='+id+'&filtrodwg='+type,

              datatype: "json",
              colNames:['FOLIO','ID',  'Archivo','Adjuntar'],
              colModel:[
                  {name:'id_maq_doc',index:'id_maq_doc', width:5, key:true, hidden:false},
                  {name:'id_catalogo_maq',index:'id_catalogo_maq', width:5, key:false, hidden:true},
                  {name:'ruta_doc',index:'ruta_doc', width:40},
                  {name:'img',index:'img', width:20}
              ],
              rowNum:100,
              rowList:[100,200,500],
              pager: '#d_archivos',
              sortname: 'descripcion',
              viewrecords: true,
              sortorder: "desc",
              altRows:true,
              width:600,
              height:'200px',
              caption: "Archivos"
          });

      jQuery("#t_archivos_n").jqGrid('navGrid','#d_archivos',{edit:false,add:false,del:false});
            // $('#d_imagen').dialog('open');
            // console.log("*****  Termina la funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber);
        }



        function elimina_imagen(id_maq_doc){
          console.log("*****  Se inicia la funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber);
          $.ajax({
              cache: false, // Indicamos que no se guarde en cache
              type: "POST",
              url:"eliminar_maquinaria.php",
              dataType: "json",
              data: "id_maq_doc=" + id_maq_doc,
              success: function(responce){

                  var mensaje=responce;
                  if(mensaje==0){
                    alert("ARCHIVO ELIMINADO");

                  }else{
                    alert("No existe Archivo");
                  }
                  $("#t_archivos_n").trigger('reloadGrid');
                  //$("#"+id_grid).trigger('reloadGrid');
              }
          });
          console.log("*****  Termina la funcion " + arguments.callee.name + ' en la linea: ' + (new Error).lineNumber);
        }