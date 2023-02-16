<?php
    /*Ataques XSS: Cross-Site Scripting*/
	class validacionesDatosIngreso
	{
		public $result;
		public $param;
		public $paramValidado;
		public $mensaje;
		public $valor;
		public $arrayBusqueda = ["alert", "console", "console.log", "window", "Window", "echo", "_POST", "_GET", "_post", "_get"];//Todas las variables de impresion

		function __construct($param) {
		    $this->param = $param;

		    $paramValidado = new stdClass();

			foreach ($param as $key => $datos) {
				$val = explode(':', $datos);

			    $this->valor = $key;

				if($val[0] == "telefono") {//Valores Solo Numeros
					$this->result = $this->validaTelefono($val[1]);
				} else if($val[0] == "string") {//Valores String
				    $this->result = $this->validaString($val[1], $key);
				} else if($val[0] == "emails") {//Valores Correo Sintaxis
				    $this->result = $this->validaCorreos($val[1]);
				} else if($val[0] == "double") {
				    $this->result = $this->validaDouble($val[1]);
				} else if($val[0] == "integer") {
				    $this->result = $this->validaInteger($val[1]);
				}

				if($this->result == 1) {
					break;
				} else {
					$paramValidado->$key = $val[1];
				}
			}

			$this->paramValidado = $paramValidado;
		}

		public function validaSoloNumeros($valor)
		{
			$numerico = 0;

			if(!is_numeric($valor)) {
				$numerico = 1;
			}

			return $numerico;
		}

		public function validaTelefono($valor)
		{
		    $resultado = 0;

			$tel = str_split($valor);

			foreach ($tel as $key => $val) {
				$resultado = $this->validaSoloNumeros($val);

				if ($resultado == 1) {
				    $this->mensaje = ucfirst($this->valor." es incorrecto (Solo numeros)");
					break;
				}
			}

			if($resultado == 0 && strlen($valor) != 10) {
			    $resultado = 1;
			}

			return $resultado;
		}

		public function validaString($valor, $key)
		{
		    $resultado = 0;

		    if($valor != "") {
		        //quitar etiquetas html
		        $valor = strip_tags($valor);

		        $valor = str_replace($this->arrayBusqueda, "", $valor);

		        $this->param->$key = $valor;
		    } else {
		        $resultado = 1;
		        $this->mensaje = ucfirst($this->valor." viene vacio");
		    }

		    return $resultado;
		}

		public function validaCorreos($valor)
		{
		    $resultado = 0;
		    if(filter_var($valor, FILTER_VALIDATE_EMAIL)) {
		        //Falta verificar email si existe (libreria)
		    } else {
		        $resultado = 1;
		        $this->mensaje = ucfirst($this->valor." es incorrecto");
		    }

		    return $resultado;
		}

		public function validaDouble($valor) {
		    $resultado = 0;

			$dou = str_split($valor);

			$punto = 0;

			foreach ($dou as $key => $val) {
			    if($val == '.') {
			        $punto++;
			        $resultado = $punto > 1 ? 1 : 0;
			    } else {
			        $resultado = $this->validaSoloNumeros($val);
			    }

			    if ($resultado == 1) {
					break;
					$this->mensaje = ucfirst($this->valor." es incorrecto (Solo numeros y decimales)");
				}
			}

			return $resultado;
		}

		public function validaInteger($valor) {
		    $resultado = 0;

			$ent = str_split($valor);

			foreach ($ent as $key => $val) {
			    $resultado = $this->validaSoloNumeros($val);

			    if ($resultado == 1) {
					break;
					$this->mensaje = ucfirst($this->valor." es incorrecto (Solo numeros enteros)");
				}
			}

			return $resultado;
		}
	}
?>