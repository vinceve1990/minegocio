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
			$this->Views->getViews($this, "registroUsuarios");
		}

		public function alta()
		{
			$this->ClassPost->getPost('script', "registroUsuario", 'registroUsuarios');
		}
	}
?>