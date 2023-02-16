<?php
	require 'library.php';
	autenticar();
	conectar();
	$movimientos=array();
	$sql1="SELECT id_persona FROM personal";
	$res1=mysql_query($sql1) or die("Error en la consulta al personal.$sql1");

	while($row1=mysql_fetch_array($res1, MYSQL_ASSOC))
	{
		$idp=$row1['id_persona'];

		$sqlc="SELECT COUNT(*) AS nreg FROM sueldos_movimientos WHERE sm_id_persona=$idp AND sm_status=0";
		$resc=mysql_query($sqlc) or die("Error en la consulta para los mivimientos de las personas $sqlc");
		$rowc=mysql_fetch_assoc($resc);
		
		if($rowc['nreg']>1)
		{
			echo "\n\n<br>El número de registros de la persona es ".$rowc['nreg'];
			$sql2="SELECT  mov.sm_id,mov.sm_id_persona, mov.sm_tipo, mov.sm_clave_imss, mov.sm_mov_admin, mov.sm_mov_imss, mov.sm_fecha_vigencia_imss, mov.sm_fecha_mov FROM sueldos_movimientos mov WHERE mov.sm_id_persona=$idp AND mov.sm_status=0";
			$res2=mysql_query($sql2) or die("Error en la consuta a la base de datos $sql2");
			$i=0;
			while($row2=mysql_fetch_assoc($res2))
			{
				$movimientos[$idp][$i]=array($row2['sm_id_persona'],$row2['sm_id'],$row2['sm_tipo'],$row2['sm_clave_imss']);
				$i++;
			}
		}
	}

	echo "\n\n<br> El tamaño del arreglo es de:".sizeof($movimientos);	
	echo "<pre>";
		print_r($movimientos);
		echo "</pre>";
		$tarr=sizeof($movimientos);
		echo "\n\n<br>El tamaño de este arreglo es: ".$tarr;
	/*foreach ($movimientos AS $key => $value) {
		
		$arrmov=$movimientos[$value];
		$t=count($arrmov);
		if($t>1)
		{
			echo "<pre>";
			print_r($arrmov);
			echo "</pre>";
		}
	}*/
?>