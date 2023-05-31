<?php
	class classValidacionesProveedores extends ConectarH
	{
		private $RFC;
		function __construct($param){
			$this->RFC = $param->rfc;
		}

		public function validaRFC() {
			$sRFC = <<<EOT
			SELECT COUNT(rfc) AS existe FROM catalogo_proveedores WHERE rfc = '$this->RFC'
EOT;
        	$query = parent::querySelect($sRFC);

        	$row = $query->fetch_object();

        	return $row->existe;
		}
	}
?>