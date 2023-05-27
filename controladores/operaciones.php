<?php
	/**
	 *
	 */
	class operaciones extends controlador
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function operaciones($paramRuta)
		{
			$this->views->getViews($this, "operaciones", $paramRuta);
		}

		/*public function menuPrincipal()
		{
			$this->ClassPost->getPost('script', "menuPrincipal", 'menuPrincipal');
		}*/
	}
?>