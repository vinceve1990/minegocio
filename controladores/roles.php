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

		public function catalogoRoles()
		{
			$this->ClassPost->getPost('script', "catalogoRoles", 'roles');
		}
	}
?>