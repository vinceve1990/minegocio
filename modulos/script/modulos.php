<?php
	$response = new stdClass();

	$response->modulo[0] = array("nombre" => "PROVEEDORES", "descripcion" => "Catalogo de Proveedores", "icono" => "fa-truck-field", "color" => "00FFFF");

	$response->modulo[1] = array("nombre" => "PRODUCTOS", "descripcion" => "Catalogo de Productos", "icono" => "fa-boxes-packing", "color" => "00FFFF");

	echo json_encode($response);
?>