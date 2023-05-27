<?php  
	/**
	 * 
	 */
	class inicio extends controlador
	{
		
		public function __construct()
		{
			parent::__construct();
		}

		public function inicio()
		{
			$this->views->getViews($this, "inicio");
		}

		public function registroUsuarios()
		{
			$this->views->getViews($this, "registroUsuarios");
		}
	}
?>