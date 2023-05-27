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

			$this->views->getViews($this, "dashboards", $paramRuta);
		}

		public function consultas($paramRuta)
		{

			$this->views->getViews($this, "consultas", $paramRuta);
		}
	}
?>