<?php

require '../../library.php';
require '../../anteproyecto/combos.php';
require '../submenu.php';
require 'combos.php';
require '../libreria_obra/libreria_obra.php';

date_default_timezone_set('America/Mexico_City');

autenticar();
conectar();
$nombre = $_SESSION["nombre"];
$nivel = $_SESSION["slevel"];
$id=$_GET['id'];
$proyecto_id=$_GET['id_proyecto'];
$id_anteproy=$_GET['id_anteproy'];
$desc_corta=$_GET['desc_corta'];
$descripcion=$_GET['descripcion'];

$q_beg_proy="SELECT * FROM proyectos where id_anteproy='$id_anteproy' AND id_propuesta='$id' ";
$res_beg=mysql_query($q_beg_proy) or die ("error consulta ".$q_beg_proy.mysql_error());
$row_beg=mysql_fetch_assoc($res_beg);
$fec_ini=$row_beg['inicio_real'];
$pro=$row_beg['id_proyecto'];
$dia_sem=date(N);

//creamos un objeto DateTime que obtenga la fecha actual
$today= new DateTime('now');

//ocupamos la funcion viernes para obtener el ultimo viernes o si fuera viernes quedarse con la fecha
$viernes = viernes($today->format('Y-m-d')); 

//ocupamos la funcion viernes para obtener el proximo jueves de la fecha actual
$jueves = jueves($today->format('Y-m-d'));

$fecha=$today->format('Y-m-d');

?>

<!DOCTYPE HTML>
<head>
    <meta http-equiv="content-type" content="text/html" />
    <title>REPORTE FOTOGRAFICO</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <?php cabeceras_jquery() ?>
    <script type="text/javascript" src="../../js/jquery-ui-1.8.18.custom.min.js"></script>
    <script src="../../js/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../js/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../js/jquery.dcmegamenu.1.3.js"></script>
    <script type="text/javascript" src="../../js/formula/jquery.flot.min.js"></script>
    <script type="text/javascript" src="../../js/formula/jstat-0.1.0.min.js"></script>
    <script type="text/javascript" src="../../js/formula/numeral/numeral.js"></script>
    <script type="text/javascript" src="../../js/formula/lodash.min.js"></script>
    <script type="text/javascript" src="../../js/formula/moment.min.js"></script>
    <script type="text/javascript" src="../../js/formula/numeric-1.2.6.min.js"></script>
    <script type="text/javascript" src="../../js/formula/underscore.string.min.js"></script>
    <script type="text/javascript" src="../../js/formula/formula.js"></script>
    <script src="../../js/library_ext_jqgrid.js"  type="text/javascript"></script>
    <script src="../../css/bootstrap/js/bootstrap.js" type="text/javascript"></script>
    <link type="text/css" href="../../css/bootstrap/css/bootstrap.min.css" rel="Stylesheet" />
    <link type="text/css" href="../../css/bootstrap/css/bootstrap.min.css/bootstrap-responsive.css" rel="Stylesheet" />
    <link type="text/css" href="../../js/menu/menu.css" rel="stylesheet" />
    <link type="text/css" href="../../css/<?php echo $_SESSION["empresa"]; ?>/jquery-ui.css" rel="Stylesheet" />
    <link rel="stylesheet" type="text/css" href="../../css/<?php echo $_SESSION["empresa"] ?>/menu.css" media="screen" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../css/ui.jqgrid.css" />
    <link type="text/css" href="../../css/fileuploader.css" rel="Stylesheet" />
    <link type="text/css" href="../../css/buttonset.css" rel="Stylesheet" />
    <script type="text/javascript" src="../../anteproyecto/generadores.js"></script>
    <script src="fileuploader.js" type="text/javascript"></script>
    <script src="sabana_destajos.js" type="text/javascript"></script>
    <link type="text/css" href="sabana_destajos.css" rel="stylesheet" />
    <link type="text/css" href="../submenu_estilo.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" media="screen" href="../../css/<?php echo $_SESSION["empresa"] ?>/all.css" />
    <script type="text/javascript" src="../submenu.js"></script>
    <script>
        var id_anteproy = "<?php echo $id_anteproy; ?>" ;
        var desc_corta = "<?php echo $desc_corta; ?>" ;
        var descripcion = "<?php echo $descripcion; ?>" ;
        var id_ant = "<?php echo $id_ant; ?>" ;
        var id_proyecto = "<?php echo $pro; ?>" ;
        var f_lunes = "<?php echo $viernes; ?>" ;
        var f_domingo = "<?php echo $jueves; ?>" ;
        var desc_c ="<?php echo $desc_corta; ?>" ;
        var corte =3;
        var col_names_f ="";
        var col_model_f="";
        var arr_fech_f="";
        var D_corte="";
        var names_f=[];
        var model_f=[];
        var arr_f_f=[];
        var id_grid = "";
        var num_sem_actual="";
        var titul="";


          ///inicia document ready






        $(document).ready(function(){$("#mega-menu-tut").dcMegaMenu({rowItems: "3",speed: "fast"});

        


/*            $("#exp").click(function(){
                sem_ini=$("#sem_ini").val();
                sem_fin=$("#sem_fin").val();
                proyecto=$("#id_proyecto").val();
                console.log("proyecto "+proyecto);
                window.location="rep_fot_1.php?proyecto="+proyecto+"&sem_ini="+sem_ini+"&sem_fin="+sem_fin;
             
                //window.location="funcion_zip_1.php?tipo=1&proyecto="+proyecto;
                });*/



              var uploader = new qq.FileUploader({
              
                multiple: false,
                element: document.getElementById('file-uploader-demo1'),
                action: 'upload.php', // este es el archivo que maneja la subida de archivos, debes ver la carpeta de subida
                sizeLimit: 0,
                minSizeLimit: 0,
                onComplete: function(id, fileName, responseJSON){
                    var str = 'file=' + responseJSON.file + '&extension=' + responseJSON.extension + '&ruta=' + responseJSON.ruta;
                    var id=$("#no_personal").val(); 
                    console.log('recibiendo id '+id);
                    console.log('valor str'+str);
                    $("#selecciona_documento").trigger('reloadGrid');
                    $.ajax({
                        beforeSend: function(){
                        },
                        cache: false, // Indicamos que no se guarde en cache
                        type: "POST",
                        url:"mueve_archivo.php?id_catalogo_maq="+id,
                        dataType: "json",
                        data: str + "&filename=" + fileName + "&id=" + Math.random()+'&ruta='+responseJSON.ruta+'&extension='+responseJSON.extension,
                        success: function(response){
                            if (response.error != 'ok') {
                           $(".qq-upload-list").hide();
                                $('#selecciona_documento').trigger('reloadGrid');
                            } else { $(".qq-upload-list").hide();
                                $("#selecciona_documento").dialog('close');
                                $('#selecciona_documento').trigger('reloadGrid');
                            }
                        }
                    });
                },
                onProgress: function(id, fileName, loaded, total){},
                onCancel: function(id, fileName){},
                debug: true //indica si tirara un mensaje de error cuando algun error se produce
            });



            $(function () {//ventana
$("#selecciona_documento").dialog({
autoOpen: false,
modal: true
});
$("#exp")
.button()
.click(function () {
$("#selecciona_documento").dialog("open");
             
           document.getElementById("mylink").onclick =     function myFunction(){

                
                sem_ini=$("#sem_ini").val();
                sem_fin=$("#sem_fin").val();
                proyecto=$("#id_proyecto").val();
                //console.log("proyecto "+proyecto);
                window.location="rep_fot_1.php?proyecto="+proyecto+"&sem_ini="+sem_ini+"&sem_fin="+sem_fin;
                }

                           document.getElementById("mylink2").onclick =     function myFunction2(){

                
                sem_ini=$("#sem_ini").val();
                sem_fin=$("#sem_fin").val();
                proyecto=$("#id_proyecto").val();
                //console.log("proyecto "+proyecto);
                window.location="rep_fot.php?proyecto="+proyecto+"&sem_ini="+sem_ini+"&sem_fin="+sem_fin;
                }

});
});
              
        });
    </script>
</head>

<body>
    <?php
    submenu($pro, $id_ant, $id, $id_anteproy, $desc_corta, $descripcion);
    ?>
    <div id="main">
        <div id="header">
          <?php
            echo "$nombre";
            echo '<a href="home.php" class="logo"><img src="../../img/'.$_SESSION["empresa"].'/logo.png" alt="" /></a>';
            menu( $_SESSION["id"]);
            echo '</div>';
          ?>
                <div id="t_busqueda" align="center">
                    <div class="row-fluid">
                    <div class="span12">
                    <h2>REPORTE FOTOGRAFICO</h2>
                    <?php
                        //obtenemos la fecha inicial, descripcion corta, y con la funcion semana_actual obtenemos la semana actual desde la fecha de inicio
                        echo '
                            <p>'.$descripcion.'</p>
                            <p>'.$desc_corta.'</p>
                            <p>INICIO DE PROYECTO: '.$fec_ini.'</p>
                            <p id="sem" name="sem"> semana: #'.semana_actual($fec_ini).': ('.viernes($today->format('Y-m-d')).' al '.jueves($today->format('Y-m-d')).')</p>';
                    ?>
                    <form id="f_compara" action="" class="form-inline">
                        <fieldset id="proy">
                                <div align="center">
                                    <input type="text" class="input-small" id="sem_ini" name="sem_ini" value="" placeholder="Semana Inicial">
                                    <input type="text" class="input-small" id="sem_fin" name="sem_fin" value="" placeholder="Semana Final">
                                    <input type="button" class="btn btn-primary" id="exp" name="exp" value="EXPORTAR">
                                    <?php echo '
                                        <input type="hidden" id="id_propuesta" name="id_propuesta" value="'.$id.'">
                                        <input type="hidden" id="f_ini" name="f_ini" value="'.$fecha.'">
                                        <input type="hidden" id="id_proyecto" name="id_proyecto" value="'.$proyecto_id.'">';
                                    ?>
                                    <input type="hidden" class="btn btn-primary" id="id_concepto" name="id_concepto" value="">
                                    <input type="hidden" class="btn btn-primary"  id="id_generador" name="id_generador" value="">
                                </div>
                                <br />
                                <div class="row">
                                    <div id="boton"></div>
                                </div>
                <div id="ejemplo" hidden="true">
                    <div class="controls2">
                   
                        <div style="display:none" id="selecciona_documento" title="Excel Destajos Generadores">
                            <!-- titulo del dialogo -->
                             <p>DESCARGA TUS ARCHIVOS</p>
                            <div class='row-fluid2'>
                              <div class='span12'>
                                <form id="d_docind" name="d_doc_indi" action="upload.php" enctype="multipart/form-data">
                                  <!-- <label for="No. de empleado" id="nemp">Folio Maquinaria</label> -->
                                  <input type="hidden" id="no_personal" readOnly="true" />
        
                                  <p id="p_titulo"></p>
                                  <div align="center" style="width:250px; float:none;" id="file-uploader-demo1"></div>


                  

                                </form>
                              </div>

                              <div id="url">'<li>'<a href="#" id="mylink" onclick="myFunction(); return false">Excel Claves Divididas</a>'</li>'</div>
                              <div id="url">'<li>'<a href="#" id="mylink2" onclick="myFunction2(); return false">Excel Todas las Claves</a>'</li>'</div>
                            </div>
                           
                          </div>
                         </div>

                </div>

                                <br />
                                <div align="center"  >
                                    <table  id="t_sabana"></table>
                                    <div id="d_sabana" ></div>
                                </div>
                        </fieldset>
                    </form>
                    </div> <!-- Termina span12 -->
                    </div> <!-- Termina clase row-fluid -->
                </div>
        </div>
</body>
</html>