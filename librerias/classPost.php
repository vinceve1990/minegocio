<?php
	class classPost
	{
		public function getPost($controlador, $class, $carpeta)
		{
			$class = $carpeta."/".$controlador."/".$class.".php";

			require_once($class);
		}
	}
?>