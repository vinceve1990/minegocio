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
			$this->Views->getViews($this, "inicio");
		}

		public function registroUsuarios()
		{
			$this->Views->getViews($this, "registroUsuarios");
		}
	}
?>