<?php
	class insumos extends controlador
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function insumos($paramRuta)
		{
			$this->views->getViews($this, "insumos", $paramRuta);
		}

		public function server()
		{
			$this->classPost->getPost('script', "scriptInsumos", 'insumos');
		}
	}
?>