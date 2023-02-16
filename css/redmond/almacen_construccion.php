<?php
/**
 * @DOQUIMTA
 * @author Francisco
 * @copyright 2013
 */
require '../library.php';
autenticar();
conectar();
$nombre = $_SESSION["nombre"];
$nivel = $_SESSION["slevel"];
$iduser=$_SESSION['id'];
?>
<!DOCTYPE HTML>
<head>
  <meta http-equiv="content-type" content="text/html" />
  <title>Inventarios Construcci&oacuten</title>

  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <?php cabeceras_jquery() ?>
  <script type="text/javascript" src="../js/jquery-ui-1.8.18.custom.min.js"></script>

  <script src="../js/i18n/grid.locale-es.js" type="text/javascript"></script>
  <script src="../js/jquery.jqGrid.min.js" type="text/javascript"></script>
  <script type="text/javascript" src="../js/jquery.dcmegamenu.1.3.js"></script>
  <script src="../js/upload/fileuploader.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" media="screen" href="../css/jquery.ptTimeSelect.css" />
  <!--Elementos de bootstrap-->
  <script src="../css/bootstrap/js/bootstrap.js" type="text/javascript"></script>
  <link type="text/css" href="../css/bootstrap/css/bootstrap.min.css" rel="Stylesheet" />
  <script type="text/javascript" src="../js/jquery.ptTimeSelectProv.js"></script>
  <!--   -->
  
  <script type="text/javascript">
// Variables globales
    var auxiliar=0;
    var insumoids = new Array();
    var cantidads = new Array();
    var almacens = new Array();
    var ordenescompras = new Array();
    var consultadb=new Array();  


  jQuery(document).ready(function(){//Inicia document 

    $('#tabs').tabs();

    var lastsel;        
    jQuery("#t_materiales_construccion").jqGrid({
      url:'datos_ordenes_compra.php',
      datatype: 'json',
      mtype: 'GET',      
      colNames:['Número de Orden','Proveedor','Fecha','Hora','Almacen'], 
      colModel:[
        {name:'orden',index:'orden',align:"center", width:40,editable:false,hidden:false},   
        {name:'proveedor',index:'proveedor', editable:false,width:100,search:true,stype:'text'},          
        {name:'fecha',index:'fecha',align:"right" ,width:50, editable:false, search:true},         
        {name:'hora',index:'hora',align:"right" ,width:50, editable:false, search:true}, 
        {name:'almacen',index:'almacen',width:70, align:"right", editable:true,edittype:"select",search:false, editoptions:{dataUrl:'seleccion.php'}}      
      ],
      rowNum:100, 
      rowList:[100,200,500],
      pager: '#d_materiales_construccion', 
      sortname: 'id_materiales_construccion', 
      viewrecords: true,      
      sortorder: "asc",
      altRows:true,
      width:($(window).width())-300,      
      height:'230',
      editurl: "",
      caption:"Materiales de Construccion",
      subGrid:true,
      subGridRowExpanded: function(subgrid_id, row_id) {
       var subgrid_table_id;
       var lastsel2;
       subgrid_table_id = subgrid_id+"_t";
       jQuery("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table>");
       jQuery("#"+subgrid_table_id).jqGrid({
          url:"detalle_ordenes.php?id="+row_id,
          datatype: "json",
          colNames: ['Clave','Insumo','UMED','Cantidad','Cantidad Recibida','Cantidad Restante'],
          colModel: [
            {name:"clave",index:"clave",width:200},
            {name:"detalle",index:"detalle",width:350,align:"center"},
            {name:"umed",index:"umed",width:50,align:"center"},
            {name:"cantidad",index:"cantidad",width:80,align:"right"},           
            {name:"recibida",index:"recibida",width:120,align:"right",editable:true},
            {name:"restante",index:"restante",width:120,align:"center"}
          ],
          height: '100%',                    
          editurl:'',          
          sortorder: "asc",
            onSelectRow: function(id){ 
              if(id && id!==lastsel2){ 
                dialogo();
            } 
          }
       });

      },

      beforeSelectRow: function(id){                            
            console.log("Valor de variable:"+auxiliar);
      }//beforeSelectRow finaliza
        

    });//Finaliza Grid



$('#enviar').click(function(event) {
 mifuncion(insumoids,cantidads,almacens,ordenescompras);
});

jQuery("#t_materiales_construccion").jqGrid('filterToolbar',{ searchOnEnter: false, enableClear: true });


});//Finaliza ready     
</script>

<link type="text/css" href="../css/<?php echo $_SESSION["empresa"]; ?>/jquery-ui.css" rel="Stylesheet" />
<link rel="stylesheet" type="text/css" href="../css/<?php echo $_SESSION["empresa"] ?>/menu.css" media="screen" />
<link rel="stylesheet" type="text/css" media="screen" href="../css/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" media="screen" href="../css/<?php echo $_SESSION["empresa"] ?>/all.css" />
<link type="text/css" href="../css/fileuploader.css" rel="Stylesheet" />
<link type="text/css" href="../css/buttonset.css" rel="Stylesheet" />

    <link type="text/css" href="../menusession/css/menu.css" rel="stylesheet" />    
    <script type="text/javascript" src="../menusession/js/menu.js"></script>
    <link rel="stylesheet" type="text/css" href="../menusession/css/estilo.css">                
  

<style type="text/css">
div#menu {
    margin:10px 0 0 left;          
    position:relative;
}
</style>


        <!-- Funciones -->
<script type="text/javascript">
// Funcion de cierre de sesion
function redireccion() {
    document.location.href='http://192.168.1.2';
    }
    function hacer_click()
    {

          <?php 
           if(!empty($_SESSION[''])){
   session_destroy();   
            }
           ?>
          alert("La sesión de esta cerrando, espero un momento....");      
        setTimeout('redireccion()',3000);     
     
  }
//Termina funcion de cierre de sesion



function correcto(){      
        setTimeout(function() {
        $("#correcta").fadeOut(1500);
        },5000);
       $("#correcta").fadeIn(1500);   
}
function incorrecto(){     
        setTimeout(function() {          
        $("#incorrecta").fadeOut(1500);
        },5000);
       $("#incorrecta").fadeIn(1500);   
}
function incorrecto_seleccion(){     
        setTimeout(function() {          
        $("#incorrecta_sele").fadeOut(1500);
        },5000);
       $("#incorrecta_sele").fadeIn(1500);   
}
function incorrectoreg(){     
        setTimeout(function() {          
        $("#incorrectareg").fadeOut(1500);
        },5000);
       $("#incorrectareg").fadeIn(1500);   
}



// function mifuncion(insu_id,cant_insu,almac_id,ordenes_compra) {  
//   var idusuario='<?php echo $iduser ?>'; 
//   console.log("Usuario-->"+idusuario);
// if (insu_id.length <1){
// incorrecto_seleccion();
// }
// else{ 
function dialogo(){  
$('#dialog').dialog({
        show:'blind',
        hide:'blind',
        position: 'center',
        modal: true,
        width: 'auto',
        height:'auto',
        buttons: {
            "Guardar": function () {
                // $(this).dialog("close");
                // $.ajax({
                //   url: 'edita_materiales_construccion.php',
                //   type: 'POST',
                //   dataType: 'json',
                //   data:"arrayinsumos="+insu_id+"&arraycantidades="+cant_insu+"&arrayalmacenes="+almac_id+"&arrayordenes="+ordenes_compra+"&userid="+idusuario,
                // success: function(response){
                //     jQuery("#t_materiales_construccion").trigger("reloadGrid");                                      
                //     correcto();  
                //     auxiliar=0; 
                //     insumoids=[];
                //     almacens=[];
                //     ordenescompras=[];
                //     cantidads=[]; 
                //   },
                //   error: function (error) {
                //     incorrectoreg();
                //   }

                // }); //Fin de Ajax                            
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }//Fin Buttons
    })//Dialog
// }//else fin
// }
.label-class {
    display: block;
    width: 150px;
    float: left;
    text-align: right;
    padding-right: 10px;
}

.input-class {
    float: left;
    margin-bottom: 10px;
}
}
</script>
              <!-- Terminan funciones -->

</head>

<body>
  <div id="main">
<ul id="main">
  <!-- Contenedor de boton sesion -->
    <div id="menu-contenedor">
      <ul id="menu">      
        <div id="menu" >
          <ul class="menu">
            <li><a class="parent"><span><?php echo "Sesión: $nombre";?></span></a>
              <div><ul>
                  <li><a class="parent"><span>Sesión</span></a>
                    <div><ul>
                        <li><a id="cerrar" onMouseUp="hacer_click()" class="parent"><span>Cerrar Sesión</span></a>
                        </li>
                    </ul>
                </div>
            </li>        
        </ul>
    </div>
    </li>   
    </ul>
</div>
</ul>          
    </div>
<!-- Contenedor de boton de sesion -->

    <div id="header">
     <?php     
     echo '<a href="../home.php" class="logo"><img src="../img/'.$_SESSION["empresa"].'/logo.png" alt="" /></a>';     
     menu( $_SESSION["id"]);
     ?>

   </div><!-- cierra el div entrada -->

 <div id="middle">
    <div>
      <div align="center" class="row-fluid">
        <div align="center" class="span12">
          <div align="center" id="tabs" style="width:95%">
            <ul>
              <li><a href="#seccion_agregar_insumos">Agregar a Almacen</a></li>            
            </ul>
<!-- ----------------------------------------Seccion de agregar insumos a almacen------------------------ -->
            <div align="center" id="seccion_agregar_insumos">
                    <div class="top-bar">
                      <div align="center"><h1>Alta de Materiales de Construcción en Almacen</h1></div>
                    </div>
                    <br/>

                  <table id="t_materiales_construccion"></table> 
                    <div  id="d_materiales_construccion" align="right" style="height:1%">  
                    </div>

                                <!-- Mensajes de alerta -->
     <br>
<div id="correcta" class="ui-corner-all ui-state-highlight" style="display:none;">
  <p>
    <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
    <strong>Successful! </strong>Los insumos han sido agregados satisfactoriamente.
  </p>
</div>
<div id="incorrecta" class="ui-corner-all ui-state-error" style="display:none;">
  <p>
    <span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
    <strong>Error: </strong>Almacen, cantidad y/u orden de compra no son aceptables, verifique sus valores.
  </p>
</div>
<div id="incorrecta_sele" class="ui-corner-all ui-state-error" style="display:none;">
  <p>
    <span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
    <strong>Error: </strong>No se encuentra alg&uacuten insumo, verifique sus selecciones.
  </p>
</div>
<div id="incorrectareg" class="ui-corner-all ui-state-error" style="display:none;">
  <p>
    <span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
    <strong>Error: </strong>Los insumos no pudieron ser agregados correctamente, verifique que su conexi&oacuten a la red sea correcta.
  </p>
</div>
          <!-- Termina mensajes de alertas -->
    <br>
            </div>
<!-- ------------------------------------Termina seccion de agregar insumos a almacen------------------------ -->

          </div>
        </div>  
      </div>
    </div>    
</div><!-- Fin de middle -->


<!-- Dialog de Guardar -->
<div id="dialog" style="display: none;" title="Guardar insumos en almacen">
  <div style="width: auto;" id="int_dialog">
   <center> <div style="text-align: justify; font-size: 13px; width: auto;">
    <form action="" id="dialog">
       <label class="label-class" for="cantrec">Cantidad recibida: <input type="text" align="rigth" id="cant"/></label>
      <br>
       <label class="label-class" for="almaclab">Almacen:<input type="text" align="rigth" id="almac"/></label>
    </form>
    </div></center>
  </div>
</div>
<!-- Fin de dialog -->


</body>
</html>
