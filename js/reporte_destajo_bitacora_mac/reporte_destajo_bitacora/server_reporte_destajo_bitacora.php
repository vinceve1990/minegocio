<?php

$response = new stdClass;
require '../library.php';

conectar();autenticar();

$user=$_SESSION['id'];
$nom_empresa=$_SESSION['empresa'];

 foreach($_GET as $variable => $valor)
                eval("$\$variable = '$valor';");

$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid 
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort 
$sord = $_GET['sord']; // get the direction if(!$sidx) 
//$sidx =1; // connect to the database 

if(!$sidx) $sidx =1;
$havi='';
$va='';
//redireccion de las obciones de los filtros ...

if($id_catalogo_maquinaria!='')
{

   $va.="and id_catalogo_maquinaria like '%$id_catalogo_maquinaria%'"; 
}
if($marca!='')
{
   $va.="and marca = '$marca'"; 
}

if($modelo!='')
{
   $va.="and modelo like '%$modelo%'"; 
}

if($color!='')
{
   $va.="and color like '%$color%'"; 
}
if($num_serie!='')
{
   $va.="AND id_documento  = '$id_documento'"; 
}

if($num_eco!='')
{

   $va.="and num_serie like '%$num_serie%'"; 
}
if($capacida_tanque!='')
{
   $va.="and capacida_tanque = '$capacida_tanque'"; 
}

if($consumo_minimo!='')
{
   $va.="and consumo_minimo = '$consumo_minimo'"; 
}

if($consumo_maximo!='')
{
   $va.="and area = '$area'"; 
}
if($rendimiento!='')
{
   $va.="AND consumo_maximo  = '$consumo_maximo'"; 
}
if($id_proveedor!='')
{
   $va.="AND id_proveedor  = '$id_proveedor'"; 
}


//seleccion de de asd estado salida 

    if($opcion==0)
    {
    $aux_tipo=2; 
   
    }else if($opcion==1)
    {
   $aux_tipo=0;

    }else
    {
     $aux_tipo=3;
     
    }   



$SQL="SELECT mr.id_maq_renta,mc.marca,mc.modelo,mc.num_serie,mr.id_orden FROM maquinaria_renta mr INNER JOIN maquinaria_catalogo mc on mc.id_catalogo_maq=mr.id_catalogo_maq;" ;  





$result = mysql_query($SQL) or die("Consulta no realizada ".$SQL.mysql_error());


$count = $row['id_catalogo_maq']; 
if( $count > 0 && $limit > 0) { 
                            $total_pages = ceil($count/$limit); 
} else { 
                            $total_pages = 0; 
}
if ($page > $total_pages) $page=$total_pages;
$start = $limit*$page - $limit;

if($start <0) $start = 0; 

  $response->page = $page; 
    $response->total = $total_pages; 
    $response->records = $count; 
    $response->sql = $SQL;
    $i=0;



$total_final='';

    while($row = mysql_fetch_array($result,MYSQL_ASSOC)) { 
 $id_proveedor=$row['id_proveedor'];




 $id_proveedor=$row['id_proveedor'];
$queri2="SELECT
   id_proveedor, nombre 
FROM
   proveedor 
where id_proveedor='".$row['id_proveedor']."'";


            $result2=mysql_query($queri2) or die("Error al seleccionar datos de cotizacion".mysql_error());

            $nombre=mysql_fetch_assoc($result2);
            $nom_pro=$nombre['nombre'];
//echo 'nombre del proveedor '.$nom_pro['nombre_proveedor'].'<br>'; 

        $response->rows[$i]['id']=$row['id_maq_renta']; 
        $response->rows[$i]['cell']=array($row['id_maq_renta'], strtoupper($row['marca']), strtoupper($row['modelo']), strtoupper($row['num_serie']),strtoupper($row['id_orden'])); 

                                         

        $i++; 
    }   


    echo json_encode($response);  
?>