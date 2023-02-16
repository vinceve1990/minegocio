<?php
	class inicioModel
	{
		function __construct()
		{}

		public function paginacion($paramPag) {
			$paramPagAct = new stdClass();

			//page get the requested page
			//limit get how many rows we want to have into the grid
			//sidx get index row - i.e. user click to sort
			//sord get the direction
			if(!$paramPag->sidx) $paramPag->sidx = 1;

			if( $paramPag->count > 0 ) {
				$total_pages = ceil($paramPag->count/$paramPag->limit);
			} else {
				$total_pages = 0;
			}

			if ($paramPag->page > $total_pages) $paramPag->page = $total_pages;

			$start = $paramPag->limit * $paramPag->page - $paramPag->limit; // do not put $paramPag->limit*($paramPag->page - 1)

			$paramPagAct->page = $paramPag->page;
			$paramPagAct->total_pages = $total_pages;
			$paramPagAct->count = $paramPag->count;
			$paramPagAct->start = $start;
			$paramPagAct->limit = $paramPag->limit;

			return $paramPagAct;
		}
	}
?>