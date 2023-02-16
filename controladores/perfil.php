<?php  
	/**
	 * 
	 */
	class perfil extends controlador
	{
		
		public function __construct()
		{
			parent::__construct();
		}

		public function inforPerfil()
		{
			$this->ClassPost->getPost('script', "inforPerfil", 'perfil');
		}

		public function subirFoto()
		{
			$this->ClassPost->getPost('script', "subirFoto", 'perfil');
		}
	}
?>