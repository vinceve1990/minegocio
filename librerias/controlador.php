<?php  
	/**
	 * 
	 */
	class controlador
	{
		
		public function __construct()
		{
			$this->Views = new Views();
			$this->ClassPost = new ClassPost();
			$this->loadModel();
		}

		public function loadModel()
		{
			$model = get_class($this)."Model";
			$rutaClass = "Modelos/".$model.".php";

			if(file_exists($rutaClass)) {
				require_once($rutaClass);
				$this->model = new $model();
			}
		}
	}
?>