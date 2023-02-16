function Coordenada()
{
	var LATITUD   = 1;
	var LONGITUD  = 2;
	var NORTE     = 'n';
	var SUR       = 's';
	var ORIENTE   = 'e';
	var OCCIDENTE = 'o';
	
	/**
	 * Convierte una coordenada en formato decimal a su correspondiente
	 * versiÃ³n en formato grados-minutos-segundos.
	 *
	 * @param	Float	Valor real de la coordenada.
	 * @param	Int		Tipo de la coordenada {Coordenada.LATITUD, Coordenada.LONGITUD}.
	 * @return	Array	['grados', 'minutos', 'segundos', 'direccion', 'valor'].
	 */
	
	this.dec2gms = function(valor, tipo)
	{
		grados    = Math.abs(parseInt(valor));
		minutos   = (Math.abs(valor) - grados) * 60;
		segundos  = minutos;
		minutos   = Math.abs(parseInt(minutos));
		segundos  = Math.round((segundos - minutos) * 60 * 1000000) / 1000000;
		signo     = (valor < 0) ? -1 : 1;
		direccion = (tipo == LATITUD) ? 
		            ((signo > 0) ? 'N' : 'S') : 
		            ((signo > 0) ? 'E' : 'O');
		
	//	if(isNaN(direccion))
	//		grados = grados * signo;
		
		return {
			'grados'   : grados,
			'minutos'  : minutos,
			'segundos' : segundos,
			'direccion': direccion,
			'valor'    : grados + "\u00b0 " + minutos + "' "+ segundos + 
			             "\"" + ((isNaN(direccion)) ? (' ' + direccion) : '')
		};
	};
	
	/**
	 * Convierte una coordenada en formato grados-minutos-segundos a su 
	 * correspondiente versiÃ³n en formato decimal.
	 *
	 * @param	Float	Grados de la coordenada.
	 * @param	Float	Minutos de la coordenada.
	 * @param	Float	Segundos de la coordenada.
	 * @param	String	Sentido de la coordenada {Coordenada.NORTE, 
	                    Coordenada.SUR, Coordenada.ORIENTE, 
	                    Coordenada.OCCIDENTE}
	 * @return	Array	['decimal', 'valor'].
	 */

	this.gms2dec = function(grados, minutos, segundos, direccion)
	{
		if(direccion)
		{
			signo     = (direccion.toLowerCase() == 'o' || 
			             direccion.toLowerCase() == 's') ? 
			            -1 : 1;
			direccion = (direccion.toLowerCase() == 'o' || 
			             direccion.toLowerCase() == 's' || 
			             direccion.toLowerCase() == 'n' || 
			             direccion.toLowerCase() == 'e') ? 
			             direccion.toLowerCase() : '';
		}
		else
		{
			signo     = (grados < 0) ? -1 : 1;
			direccion = '';
		}
		
		dec = Math.round((Math.abs(grados) + ((minutos * 60) + segundos) / 3600) * 1000000) / 1000000;

		if(isNaN(direccion) || direccion == '')
			dec = dec * signo;

		return {
			'decimal': dec,
			'valor'  : dec + "\u00b0" + ((isNaN(direccion) || direccion == '') ? (' ' + direccion) : '')
		};
	};
}