<?php
	class controlador
	{
		public function __construct()
		{
			$this->views = new views();
			$this->classPost = new classPost();
			$this->loadModel();
		}

		public function loadModel()
		{
			$model = get_class($this)."Model";
			$rutaClass = "modelos/".$model.".php";

			if(file_exists($rutaClass)) {
				require_once($rutaClass);
				$this->model = new $model();
			}
		}
	}
?>