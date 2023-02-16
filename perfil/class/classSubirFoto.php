<?php
	class classSubirFoto extends ConectarH
	{
		public $val = 0;
		public $mensaje = '';
		public $errorClass = '';

		function __construct()
		{}

		public function subirFoto($param)
		{
			$responce = new stdClass();

			if(in_array($param->extension, $param->permitidos)) {
				$baseDatos = 'farmacom2';

				$rutaI = 'C:/xampp/htdocs/minegocio/';

				$rutaCompleta = $rutaI.'perfil/fotos/'.$baseDatos;

				if (!is_dir($rutaCompleta)) {
			        mkdir($rutaCompleta, 0777, true);
			    }

				$rutaG = '/fotos/'.$baseDatos.'/'.$param->id_usuario.'.'.$param->extension;

				$rutaCompleta .= '/'.$param->id_usuario.'.'.$param->extension;

				if(move_uploaded_file($param->archivo_temporal, $rutaCompleta)) {

					if(file_exists($rutaCompleta)) {
						$id_usuario_negocio_PK = $param->id_usuario;
						$up = <<<EOT
						UPDATE usuariosnegocio SET ruta_img = '$rutaG' WHERE id_usuario_negocio_PK = $id_usuario_negocio_PK
EOT;
						$resU = parent::queryUdate($up);

						if ($resU === "error") {
							$this->val++;
							$this->mensaje .= "AL ACTUALIZAR <br>";
							$this->errorClass .= "subirFoto() - UpdateFoto//";
						}
						$responce->ruta = $rutaG;
						$this->mensaje = "Foto Guardada";
					} else {
						$responce->mensaje = "El Archivo no es valido";
					}

				}

			} else {
				$responce->mensaje = "Archivo no permitodo debe ser extension <h4>'JPEG', 'JPG', 'PNG', 'TIF', 'GIF'</h4>";
			}

			$responce->val = $this->val;
			$responce->mensaje = $this->mensaje;
			$responce->errorClass = $this->errorClass;

			return $responce;
		}
	}
?>