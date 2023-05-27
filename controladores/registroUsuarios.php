<?php  
	/**
	 * 
	 */
	class registroUsuarios extends controlador
	{
		
		public function __construct()
		{
			parent::__construct();
		}

		public function registro()
		{
			$this->views->getViews($this, "registroUsuarios");
		}

		public function alta()
		{
			$this->classPost->getPost('script', "registroUsuario", 'registroUsuarios');
		}
	}
?>