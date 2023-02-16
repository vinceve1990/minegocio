<?php
	class classValidacionesPersonas extends ConectarH
	{
		private $id_persona_negocio_PK;

		function __construct() {
			if (isset($_SESSION['id_persona_PK']) && $_SESSION['id_persona_PK'] != "") {
				$this->id_persona_negocio_PK = $_SESSION['id_persona_PK'];
			}
		}

		public function curpValidar($param)
		{
			$row = new stdClass();

			if($param->nuevo == 'NUEVO') {
				$fil = "";
			} else {
				$fil = " AND id_persona_negocio_PK != ".$this->id_persona_negocio_PK;
			}
			if($param->curp != "" && isset($param->curp)) {
				$sUser = <<<EOT
				SELECT COUNT(id_persona_negocio_PK) AS existe FROM personalnegocio WHERE curp = '$param->curp'$fil
EOT;
	        	$query = parent::querySelect($sUser);

	        	$row = $query->fetch_object();
			} else {
				$row->existe = 0;
			}

        	return $row->existe;
		}

		public function telValidar($param)
		{
			if($param->nuevo == 'NUEVO') {
				$fil = "";
			} else {
				$fil = " AND id_persona_negocio_PK != ".$this->id_persona_negocio_PK;
			}

			$sUser = <<<EOT
			SELECT COUNT(id_persona_negocio_PK) AS existe FROM personalnegocio WHERE telefono = '$param->telefono'$fil
EOT;
        	$query = parent::querySelect($sUser);

        	$row = $query->fetch_object();

        	return $row->existe;
		}

		public function correoValidar($param)
		{

			if($param->nuevo == 'NUEVO') {
				$fil = "";
			} else {
				$fil = " AND id_persona_negocio_PK != ".$this->id_persona_negocio_PK;
			}

			$sUser = <<<EOT
			SELECT COUNT(id_persona_negocio_PK) AS existe FROM personalnegocio WHERE correo = '$param->email'$fil
EOT;
        	$query = parent::querySelect($sUser);

        	$row = $query->fetch_object();

        	return $row->existe;
		}
	}
?>