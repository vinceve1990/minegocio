<?php  
	/**
	 * 
	 */
	class views
	{
		public function getViews($controlador, $view, $paramRuta = '')
		{
			$controlador = get_class($controlador);
			if($controlador == 'inicio') {
				$view = "vistasHTML/".$view.".php";
			} else {
				$view = "vistasHTML/".$controlador."/".$view.".php";
			}

			require_once($view);
		}
	}
?>