<?php
	/**
	 *
	 */
	class modulos extends controlador
	{
		public function __construct()
		{
			parent::__construct();
		}

		public function modulos()
		{
			$this->ClassPost->getPost('script', "modulos", 'modulos');
		}
	}
?>