<?php  
	/**
	 * 
	 */
	class paneles extends controlador
	{

		public function __construct()
		{
			parent::__construct();
		}

		public function dashboards($paramRuta)
		{

			$this->Views->getViews($this, "dashboards", $paramRuta);
		}

		public function consultas($paramRuta)
		{

			$this->Views->getViews($this, "consultas", $paramRuta);
		}
	}
?>