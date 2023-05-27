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
			$this->views->getViews($this, "login");
		}

		public function recuperarPass()
		{
			$this->views->getViews($this, "recuperarPass");
		}

		public function login()
		{
			$this->classPost->getPost('class', "loginUsers", 'login');
		}

		public function cerrarSession()
		{
			$this->classPost->getPost('class', "cerrarSession", 'login');
		}

		public function enviarPass()
		{
			$this->classPost->getPost('script', "correoPass", 'login');
		}
	}
?>