<?php
	class classCrearUsuario
	{
		function __construct() {}

		public function CreaUsuario($param)
		{
			$user = '';

			$user .= strtoupper(substr($param->nombre, 0, 2));
			$user .= strtoupper(substr($param->apellidos, 0, 2));
			$user .= strtoupper(substr($param->telefono, 0, 2));
			$user .= strtoupper(substr($param->telefono, -3, -1));
			$user .= strtoupper(substr($param->id_persona, -3, -1));

			return $user;
		}

		function CreaUsuarioDif($param) {
			$user = '';

			$dia = date('d');
			$micros = date('v');

			$user .= strtoupper(substr($param->nombre, 0, 2));
			$user .= strtoupper(substr($param->apellidos, 0, 2));
			$user .= strtoupper($dia);
			$user .= strtoupper(substr($micros, 0, 2));
			$user .= strtoupper(substr($param->id_persona, -3, -1));

			return $user;
		}
	}
?>