<?php  
	/**
	 * 
	 */
	class errores extends controlador
	{
		
		public function __construct()
		{
			parent::__construct();
		}

		public function notFount()
		{
			$this->Views->getViews($this, "errores");
		}
	}

	$notFount = new Errores();
	$notFount->notFount();
?>