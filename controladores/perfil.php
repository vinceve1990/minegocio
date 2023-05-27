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
			$this->classPost->getPost('script', "inforPerfil", 'perfil');
		}

		public function subirFoto()
		{
			$this->classPost->getPost('script', "subirFoto", 'perfil');
		}
	}
?>