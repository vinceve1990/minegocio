<?php  
	/**
	 * 
	 */
	class personal extends controlador
	{
		
		public function __construct()
		{
			parent::__construct();
		}

		public function server()
		{
			$this->ClassPost->getPost('script', "serverPersonal", 'personal');
		}
	}
?>