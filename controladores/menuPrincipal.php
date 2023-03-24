<?php
	/**
	 *
	 */
	class menuPrincipal extends controlador
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function menuPrincipal($paramRuta)
		{
			$this->Views->getViews($this, "menuPrincipal", $paramRuta);
		}

		/*public function menuPrincipal()
		{
			$this->ClassPost->getPost('script', "menuPrincipal", 'menuPrincipal');
		}*/
	}
?>