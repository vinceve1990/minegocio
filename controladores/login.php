<?php  
	/**
	 * 
	 */
	class login extends controlador
	{
		
		public function __construct()
		{
			parent::__construct();
		}

		public function users()
		{
			$this->Views->getViews($this, "login");
		}

		public function recuperarPass()
		{
			$this->Views->getViews($this, "recuperarPass");
		}

		public function login()
		{
			$this->ClassPost->getPost('class', "loginUsers", 'login');
		}

		public function cerrarSession()
		{
			$this->ClassPost->getPost('class', "cerrarSession", 'login');
		}

		public function enviarPass()
		{
			$this->ClassPost->getPost('script', "correoPass", 'login');
		}
	}
?>