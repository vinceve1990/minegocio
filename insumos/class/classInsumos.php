<?php
	class classInsumos extends ConectarH
	{
		
		function __construct() {}

		public function informacionInsumos($fil)
		{
			/*Paginación*/
			$paramPag = new stdClass();
			$inicioModel = new inicioModel();

			$paramPag->page = $_POST['page'];
			$paramPag->limit = $_POST['rows'];
			$paramPag->sidx = $_POST['sidx'];
			$paramPag->sord = $_POST['sord'];
			$paramPag->count = 0;

			$sqlcount = <<<EOT
			SELECT COUNT(a.id_catalogo_proveedor_PK) AS total FROM catalogo_proveedores a WHERE 1 $fil
EOT;
			$querycount = parent::querySelect($sqlcount);

			$paramPag->count = $querycount->fetch_object()->total;

			$datPag = $inicioModel->paginacion($paramPag);

			$responce = new stdClass();

			$sql = <<<EOT
			SELECT
				a.*, b.nombre_estado, c.nombre_municipio, d.nombre_giro, IF(a.status_proveedor = 1, 'ACTIVO', 'DESACTIVADO') AS tipoestado
			FROM
				catalogo_proveedores a, catalogo_estados b, catalogo_municipios c, catalogo_giro d
			WHERE
				a.id_catalogo_estado_FK = b.id_catalogo_estado_PK
			AND a.id_catalogo_municipios_FK = c.id_catalogo_municipios_PK
			AND a.id_catalogo_giro_FK = d.id_catalogo_giro_PK
			$fil
			ORDER BY a.id_catalogo_proveedor_PK ASC
			LIMIT $datPag->start , $datPag->limit
EOT;
        	$query = parent::querySelect($sql);

        	$i = 0;

			while ($row = $query->fetch_object()) {
			    $responce->rows[$i] = array($row->id_catalogo_proveedor_PK, $row->nombre, $row->rfc, $row->telefono, $row->email_principal, $row->nombre_estado, $row->cp, $row->status_proveedor, $row->tipoestado);
			    $i++;
			}

			$responce->page = $datPag->page;
			$responce->total = $datPag->total_pages;
			$responce->records = $datPag->count;
			$responce->registros = $i;

			return $responce;
		}
	}
?>