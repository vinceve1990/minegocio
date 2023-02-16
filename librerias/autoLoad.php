<?php  
	spl_autoload_register(function ($class)
	{
		if (file_exists("librerias/".$class.".php")) {
			require_once "librerias/".$class.".php";
		}
	});
?>