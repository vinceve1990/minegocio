<?php
	class classValidacionesUsuario extends ConectarH
	{
		private $sqlConnect;

		function __construct()
		{}

		public function validaExisteUsuario($param, $sqlConnect = '')
		{
			$id_usuario_negocio_PK = $_SESSION['id_usuario_negocio_PK'];

			if($param->nuevo == 'NUEVO') {
				$fil = "";
			} else {
				$fil = " AND id_usuario_negocio_PK != ".$id_usuario_negocio_PK;
			}

			$sUser = <<<EOT
			SELECT COUNT(usuario) AS existe FROM usuariosnegocio WHERE usuario = '$param->usuario'$fil
EOT;

			$query = parent::querySelect($sUser);

        	$row = $query->fetch_object();

        	return $row->existe;
		}

		public function validaUsuarioActivo($param, $sqlConnect = '')
		{
			$sUser = <<<EOT
			SELECT COUNT(usuario) AS activo FROM usuariosnegocio WHERE id_usuario_negocio_PK = '$param->id_usuario_negocio_PK' AND status_usuario = 1
EOT;

        	$query = parent::querySelect($sUser);

        	$row = $query->fetch_object();

        	return $row->activo;
		}

		public function validaUsuarioRoot($param, $sqlConnect = '')
		{
			//Validar el Usuario Principal para la modificación del nombre del negocio
		}
	}
?>