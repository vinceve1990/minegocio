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

			$this->views->getViews($this, "roles", $paramRuta);
		}

		public function catalogoRoles()
		{
			$this->classPost->getPost('script', "catalogoRoles", 'roles');
		}
	}
?>