<?php
class ConectarH {
	private $sqlConnect;
	private $error = "";
	public $BD;

	public function __construct(){
	}

	public function Connect($Superusuario = ""){

		if($Superusuario == "") {
			/*$bd = (!empty($_SESSION["baseDatos"])) ? $_SESSION["baseDatos"] : ((!empty($this->BD)) ? $this->BD : 'minegocio_config');
			$servidor = "localhost";
			$user = "userNormal";//usuario sin privilegios
	    	$pwd = "msE0jvNc0L31F9UO";*/
	    	$bd = (!empty($_SESSION["baseDatos"])) ? $_SESSION["baseDatos"] : ((!empty($this->BD)) ? $this->BD : 'minegocio_config');
			$servidor = (!empty($_SESSION["baseDatos"])) ? "bbnoibydfqpo4fjy0h3n-mysql.services.clever-cloud.com" : ((!empty($this->BD)) ? "bbnoibydfqpo4fjy0h3n-mysql.services.clever-cloud.com" : "localhost");
			$user = (!empty($_SESSION["baseDatos"])) ? "unrtlkmlpwthqfay" : ((!empty($this->BD)) ? "unrtlkmlpwthqfay" : "userNormal");//usuario sin privilegios
	    	$pwd = (!empty($_SESSION["baseDatos"])) ? "4na5O8iVB1P2Mf3Yb8AM" : ((!empty($this->BD)) ? "4na5O8iVB1P2Mf3Yb8AM" : "msE0jvNc0L31F9UO");
		} else {
			$bd = 'minegocio_config';
			$servidor = "localhost";
			$user = "minegociouser";//Superusuario
	    	$pwd = "S9rQrSDpdKmR6pJ";
		}

		$this->sqlConnect = new mysqli($servidor,$user,$pwd,$bd);
		// Verificar la conexión
		if (mysqli_connect_errno()) {
			printf("Falló la conexión: %s\n", mysqli_connect_error());
			exit();
		}

		// Establecer el conjunto de caracteres a utf8
		if (!$this->sqlConnect->set_charset("utf8")) {
			printf("Error cargando el conjunto de caracteres utf8: %s\n", $this->sqlConnect->error);
		}

		return $this->sqlConnect;
	}

	/**
	 * [conexionInterna metodo usado para verificar si parametro $sqlConexion contiene valor] (utilizado para ejecutar metodos que no contengan el proceso de conexion)
	 * @param  string $sqlConexion [objeto de conexion actual]
	 * @return [$conexion]         [objeto conexion]
	 */
	public function conexionInterna($sqlConexion = "", $Superusuario = "")
	{
		$conexion = ($sqlConexion == "") ? $this->Connect($Superusuario) : $sqlConexion;

    	return $conexion;
	}

	public function setBD($BD) {
		$this->BD = $BD;
	}

	public function querySelect($sql, $sqlConnect = "", $Superusuario = "") {
		$this->error = "";

		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$query = $this->sqlConnect->query($sql);

		if ($query->num_rows < 0) {
			return $this->error = "error";
		}

		return $query;
	}

	public function queryInsert($sql, $sqlConnect = "", $Superusuario = "") {
		$this->error = "";

		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$this->sqlConnect->query($sql);

		if ($this->sqlConnect->affected_rows < 0) {
			return $this->error = "error";
		}

		$id = $this->sqlConnect->insert_id;

		return $id;
	}

	public function queryUdate($sql, $sqlConnect = "", $Superusuario = "") {
		$this->error = "";

		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$this->sqlConnect->query($sql);

		if ($this->sqlConnect->affected_rows < 0) {
			return $this->error = "error";
		}

		return $this->error;
	}

	public function queryDelete($sql, $sqlConnect = "", $Superusuario = "") {
		$this->error = "";

		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$this->sqlConnect->query($sql);

		if ($this->sqlConnect->affected_rows < 1) {
			$this->error++;
		}

		return $this->error;
	}

	public function queryCreacion($sql, $sqlConnect = "", $Superusuario = "") {
		$this->error = "";

		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$queryBD = $this->sqlConnect->query($sql);

		if ($this->sqlConnect->errno != 0) {
			return $this->error = "error";
		}

		return $queryBD;
	}

	public function queryBegin($sqlConnect = "", $Superusuario = "") {
		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$this->sqlConnect->query("BEGIN");
	}

	public function queryCommit($sqlConnect = "", $Superusuario = "") {
		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$this->sqlConnect->query("COMMIT");

		$this->sqlConnect->close();
	}

	public function queryRollback($sqlConnect = "", $Superusuario = "") {
		$this->sqlConnect = $this->conexionInterna($sqlConnect, $Superusuario);

		$this->sqlConnect->query("ROLLBACK");

		$this->sqlConnect->close();
	}

	public function escapeQuery($param, $sqlConnect = "") {
		$this->sqlConnect = $this->conexionInterna($sqlConnect);
		foreach ($param as $key => $value) {

	        $dat2 = $this->sqlConnect->real_escape_string($value);

	        $param->$key = $dat2;
		}

		return $param;
	}

	public function Autenticar()
	{
		//$bd = ($this->BD = "" OR $this->BD = NULL OR $this->BD = "NULL") ? 'minegocio_config' : $this->BD;
		session_name("MiNegocio");
		session_start();
	}

	public function button($title, $method, $data, $class, $style = '', $btn_class='', $tipo='funcion', $parametros = '')
	{
		$retornaBtn='';

		if(!isset($parametros->idBotonAux)) {
			$parametros = new stdClass();

			$parametros->idBotonAux = '';
			$parametros->styleTexto = '';
			$parametros->texto = '';
			$parametros->tipoBtn = '';
		}

		if($btn_class==''){
			$class_btn=str_replace(' ', '-', $title);
		}else{
			$class_btn=$btn_class;
		}

		$metodo='onclick="'.$method.'('.htmlspecialchars(json_encode($data)).', this)"';

		if($tipo=='link'){
			$metodo='onclick="javascript:window.open(\'/'.$method.'\',\'_blank\')"';
		}

		$retornaBtn='<div title="'.$title.'" '.$metodo.' class="ui-state-default ui-corner-all '.$class_btn.'" id="'.$parametros->idBotonAux.'" style="align-items: center; cursor: pointer; background: #6734H; display: inline-flex; float: none; width: 25px; height: 20px; margin: 3px; '.$style.'" data-g_buttonwidget data-g_buttonwidget_object><span class="'.$class.'" style="margin: 0 auto;"></ span></div>';

		if($parametros->tipoBtn == 'iconoText'){//Es un boton con icono y texto
			$retornaBtn='<div title="'.$title.'" '.$metodo.' style="height: 20px; padding:2px 0 4px 0; display:inline-block; cursor: pointer;"><div class="'.$btn_class.' ui-state-default ui-corner-all" style="width: auto; height: auto; padding-right: 5px; font-weight: bold; display:inline-block; '.$parametros->styleTexto.' "><i class="'.$class.'" style="font-size:14px; padding:2px 2px 4px 2px; border-radius:4px; '.$style.' "></i>'.$parametros->texto.'</div></div>';
		}
		else if($parametros->tipoBtn == 'btnText') {//Es un boton sin icono , pero con texto
			$retornaBtn='<div title="'.$title.'" '.$metodo.' class="ui-state-default ui-corner-all '.$class_btn.'" style="align-items: center; cursor: pointer; background: #6734H; display: inline-flex; float: none; height: 23px; margin: 3px; '.$style.'" data-g_buttonwidget data-g_buttonwidget_object><div style="width: auto; height: auto; font-size:10px; text-align:left; padding:7px;">'.$parametros->texto.'</div></div>';
		}

		return $retornaBtn;
	}
}
?>