<?php
require '../../library.php';

conectar();autenticar();


$nombre = $_SESSION["nombre"];
$nivel = $_SESSION["slevel"];
?>

<!DOCTYPE HTML>

<head>
    <title> <?php echo strtoupper($_SESSION["empresa"]) ?> CATÁLAGO DE MAQUINARIA </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
    <link type="text/css" href="../../../css/<?php echo $_SESSION["empresa"]; ?>/jquery-ui.css" rel="Stylesheet" />
    <link rel="stylesheet" type="text/css" href="../../../css/<?php echo $_SESSION["empresa"] ?>/menu.css" media="screen" />
    <style media="all" type="text/css">@import "../../../css/buttonset.css";</style>
    <link href="../../../FixedHeaderTable/css/myTheme.css" rel="stylesheet" media="screen" /> 
    <link href="../../../FixedHeaderTable/css/defaultTheme.css" rel="stylesheet" media="screen" />
    <link type="text/css" href="../../../css/jquery-ui-timepicker-addon.css" rel="Stylesheet" />
    <!--Estilo de bootstrap -->
    <link rel="stylesheet" href="../../../css/bootstrap/css/bootstrap.min.css" />
    <?php cabeceras_jquery() ?>
    <script type="text/javascript" src="../../../js/jquery-ui-1.8.18.custom.min.js"></script>
    <script src="../../../js/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../js/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../../js/jquery.dcmegamenu.1.3.js"></script>
    <script type="text/javascript" src="../../../js/jquery.ui.datepicker-es.js"></script>
    <script src="../../../js/jquery-ui-timepicker-addon.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/jquery.ptTimeSelect.css" />
    <script type="text/javascript" src="../../../js/jquery.ptTimeSelect.js"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../../css/<?php echo $_SESSION["empresa"] ?>/all.css">
    <script src="fileuploader.js" type="text/javascript"></script><!--Libreria para subir archivos-->
    <link type="text/css" href="css/fileuploader.css" rel="Stylesheet" /><!--Estilo de la libreria para subir archivos-->




<!--     <script src="../../../js/upload/fileuploader.js" type="text/javascript"></script> -->
<!--     <link type="text/css" href="../../../css/fileuploader.css" rel="Stylesheet" /> -->



    <script type="text/javascript" src="../../../css/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="funciones_maquinaria_destajo_bitacora.js"></script>
    <style type="text/css">
           









             .sinborde{
              border:none;
            }
            .ui-jqgrid .ui-pg-input {
              width:100px;
              height:14px;
            }
            .ui-jqgrid .ui-pg-selbox{
              width:100px;
              height:25px;
            }
            .icono_cont{width:65px;height:20px;float:left;text-align:left;}
            .icono_check{width:30px;height:20px;float:left;text-align:left;}
            .icono_close{width:30px;height:20px;float:right;text-align:left;}



              .ui-menu-item {
            font-size: 11px;
        }

         .ui-autocomplete { font-size: 11px; position: absolute; cursor: default;z-index:5000 !important;}    



    </style>
   <script type="text/javascript">
   $(document).ready(function(){$("#mega-menu-tut").dcMegaMenu({rowItems: "2",speed: "fast"});
crear_cat_documentos();
carga_documento();
$("#file-uploader-demo2").addClass('btn btn-primary');
  $("#nom_proveedor_mov").autocomplete({
    source:'autocompletar_proveedores.php',
    minLength:2,
    appendTo: '#ajusta_ancho_proveedor',
    search:function(){
      if($("#id_proveedor_mov").val()!=''){
      $("#nom_proveedor_mov").val('');
      if(this.value==''){
        $("#id_proveedor_mov").val('');
      }
     }
    },
      focus:function(){
      ///no permite que se inserte el valor en el input si es que pierde el foco
      return false;
    },
    select:function(event,data){
       var valor=data.item['id_proveedor'];
       console.log ("pro:"+valor);
       $("#id_proveedor_mov").val(valor);
       $("#nom_proveedor_mov").val(data.item['nombre_proveedor']);
      
    }
  });
                   $("#nom_proveedor_mov").autocomplete('widget').zIndex(10009);

  });



        function carga_documento()
        {
            $("#id_maq_aux").val(function()
            {
                $.ajax(
                        {
                            //El parametro url hace referencia al archivo donde se realizará la evaluación de los datos (archivno de php, devuelve la respuesta en formato json)
                              datatype : 'json',
                              type : 'POST',
                              url : 'carga_select_maquinaria.php',  
                              data :{},
                          
                              success : function(option){
                                $("#id_maq_aux").html(option);              
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
   


       function validatenumber(e) {
      
      var keynum = window.event ? window.event.keyCode : e.which;
      if ((keynum == 8) || (keynum == 46))
      return true;
      return /\d/.test(String.fromCharCode(keynum));
    }

function validar(e) { // 1
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla==8) return true; // 3
    patron =/[A-Za-z\s]/; // 4
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}
   </script>
</head>

<body>

  <div id="main">
    <div id="header">
      <?php
      echo "$nombre";
      echo '<a href="../../../home.php" class="logo"><img src="../../../img/'.$_SESSION["empresa"].'/logo.png" alt="" /></a>';    
      menu( $_SESSION["id"]);
      ?>
      <div align="center">
      <label><h4>CATÁLOGO DE MAQUINARIA</h4></label>
      <div>
    </div>
                <div id="middle">
                  <br>

                  <div id="tabs">
                    <ul>

<!--                       <li><a  href="#tabs-1">PENDIENTES</a></li>
                      <li><a  href="#tabs-2">APROBADAS</a></li>
                      <li><a  href="#tabs-3">CANCELADAS</a></li> -->
                      <!--  <li><a href="#tabs-2">RESUMEN POR PROVEEDOR</a></li> -->
                    </ul>
                    <br>
                                    <div class="form-inline">


          
                <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
                <!--En este segmento de cÃ³digo  se declara todo lo que se va a presentar en el cuadro de dialogo para insertar los archivos -->
                <div id="ejemplo" hidden="true">
                    <div class="controls2">
                   
                        <div style="display:none" id="selecciona_documento">
                            <div class='row-fluid2'>
                              <div class='span12'>
                                <form id="d_docind" name="d_doc_indi" action="upload.php" enctype="multipart/form-data">
                                  <label for="No. de empleado" id="nemp">Numero de empleado</label>
                                  <input type="text" id="no_personal" readOnly="true"/>
                                  <label for="documento" name="documento">Documento a ingresar:</label>
                                  <select id="id_docto"></select>
                                  <br>
                                  <label for="fecha" name="fecha">Fecha de alta de documento:</label>
                                  <input  type="text" id="fecha_ins" class="fecha" />
                                  <br>
                                  <label for="hora_insert" name="hora">Hora de ingreso de documento</label>
                                  <input type="text" id="hr_insert" name="hr_insert" readOnly="true"/>
                                  <br>
                                  <p id="p_titulo"></p>
                                  <div align="center" style="width:250px; float:none;" id="file-uploader-demo1"></div>


                                  <div class="qq-upload-button" style="position: relative; overflow: hidden; direction: ltr;">
                                  Adjuntar Archivo
                                  <input type="file" name="file" style="position: absolute; right: 0px; top: 0px; font-family: Arial; font-size: 118px; margin: 0px; padding: 0px; cursor: pointer; opacity: 0;">
                                  </div>
                                  
                                </form>
                              </div>
                              <div id="respuestaAJAX"></div>
                            </div>
                           
                          </div>
                         </div>

                </div>
                <!-- Termina el dialogo de adjuntar archivos-->
                <!-- //////////////////////////////////////////////////////////////////////////// -->
        


                <div id="catalogo_maquinaria" hidden="true" title="Catalogo de Documentos:">


                                




<div class="row-fluid">
<div class="span1">

</div>
  <div class="span3">

                                <div id="Folio" >
                                <label  aling="center";  for="folio" id="folio">Marca </label>
                                </div>

                                <div class="controls">
                                <input style="width: 280px" type="text" id="marca" placeholder="Marca:" >
                                </div>

                                                                <div id="Folio" >
                                <label  aling="center";  for="folio" id="folio">Color </label>
                                </div>

                                <div class="controls">
                                <input style="width: 280px" type="text" id="color" placeholder="Color:" >
                                </div>

                                                                <div id="Folio" >
                                <label  aling="center";  for="folio" id="folio">Número Economico </label>
                                </div>

                                <div class="controls">
                                <input style="width: 280px" type="text" id="num_eco" placeholder="Número Economico: " >
                                </div>

                                                                <div id="Folio" >
                                <label  aling="center";  for="folio" id="folio">Consumo Minimo Lt/hr</label>
                                </div>

                                <div class="controls">
                                <input style="width: 280px" type="text" id="consumo_minimo" placeholder="Consumo Minimo:" onkeypress="return validatenumber(event);" >
                                </div>

                                                                <div id="Folio" >
                                <label  aling="center";  for="folio" id="folio">Rendimiento Lt/hr</label>
                                </div>

                                <div class="controls">
                                <input style="width: 280px" type="text" id="productividad_economica" placeholder="Rendimiento: " onkeypress="return validatenumber(event);" >
                                </div>





           


</div>
 <div class="span3">

 </div> 
<div class="span3">
  


                                <div class="controls " >


                                <label aling="center"; for="descripcion" id="descripcion1">Modelo     </label>
                                <input type="text" style="width: 280px" name="modelo" id="modelo" placeholder="Modelo: ">
                                </div>      

                                                                <div class="controls " >


                                <label aling="center"; for="descripcion" id="descripcion1">Número de Serie     </label>
                                <input type="text" style="width: 280px" name="num_serie" id="num_serie" placeholder="Número de Serie : ">
                                </div>  

                                                                <div class="controls " >


                                <label aling="center"; for="descripcion" id="descripcion1">Capacidad del Tanque Lt    </label>
                                <input type="text" style="width: 280px" name="capacidad_tanque" id="capacidad_tanque" placeholder="Capacidad del Tanque: " onkeypress="return validatenumber(event);">
                                </div>  

                                                                <div class="controls " >


                                <label aling="center"; for="descripcion" id="descripcion1">Consumo Máximo Lt/hr</label>
                                <input type="text" style="width: 280px" name="consumo_maximo" id="consumo_maximo" placeholder="Consumo Máximo : " onkeypress="return validatenumber(event);">
                                </div>    

                        


                                         
          <div id="a_favor_de_proveedor" class="control-group"> 
            <label  class="control-label" for="Cuenta" >Proveedor </label>
            <div class="controls">
              <input type="text" style="width: 280px" id="nom_proveedor_mov" placeholder="Proveedor : "    onkeypress="return validar(event)">
              <input id="id_proveedor_mov" type="hidden">
              <div style="position:absolute; width:350px;" id="ajusta_ancho_proveedor"></div>
            </div>
          </div>
                                  
          <div id="a_mostrar_maquina" class="control-group"> 
          <label for="documento" name="documento">Maquina a Ingresar:</label>
          <select id="id_maq_aux" style="width: 280px"></select>
          </div>                               


</div>

</div>
                                                




                                                
                                                  <div style="position:absolute; width:350px;" id="ajusta_ancho"></div>
                                     </div>


                                    <div id="tabs-1"><!-- div de tab 1-->                  
                                      <table id="tbl_cat_maquinaria" class="tbl"></table>
                                      <div id="tbl_cat_maquinaria"></div>              
                                    </div><!-- CIERRA DIV DE LA TAB 1 --> 

  
                                    <div id="footer">            
                  </div><!-- CIERRA DIV DE LA TAB 3 --> 
                 <div id="dialog_error"></div>
  </div> <!-- cierra div middle -->
</div> <!-- cierra div principal -->  
</body>
</html>
