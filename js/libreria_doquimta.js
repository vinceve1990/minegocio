/**
* @Descripcion de Archivo: Este archivo contiene funciones basicas y esenciales para el sistema
* @author: Dfkuro (Izmir)
* @copyright Doquimta 2013
*/
         



/**
 * [justNumbers Para poder usar esta funcion es necesario poner en el html la siguiente etiqueta --onkeypress="return justNumbers(event);"--
 *              Esta funcion evita que el usuario coloque otro tipo de dato en algun input que sea diferente de algun numero ]
 * @param  {[type]} e [evento que recibe el input desde el teclado]
 * @return {[type]}   [Regresa la respuesta dando permiso o no de escritura dependiendo de la expresion regular /\d/]
 */
function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
    return true;
     
    return /\d/.test(String.fromCharCode(keynum));
}
