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
			$this->classPost->getPost('script', "serverPersonal", 'personal');
		}
	}
?>