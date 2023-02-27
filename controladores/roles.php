<?php
	/**
	 *
	 */
	class roles extends controlador
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function roles($paramRuta)
		{

			$this->Views->getViews($this, "roles", $paramRuta);
		}

		public function catalogoRoles()
		{
			$this->ClassPost->getPost('script', "catalogoRoles", 'roles');
		}
	}
?>