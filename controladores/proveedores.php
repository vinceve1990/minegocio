<?php
	/**
	 *
	 */
	class proveedores extends controlador
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function proveedores($paramRuta)
		{
			$this->views->getViews($this, "proveedores", $paramRuta);
		}

		public function server()
		{
			$this->classPost->getPost('script', "scriptProveedores", 'proveedores');
		}
	}
?>