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
			$this->Views->getViews($this, "proveedores", $paramRuta);
		}

		/*public function menuPrincipal()
		{
			$this->ClassPost->getPost('script', "menuPrincipal", 'menuPrincipal');
		}*/
	}
?>