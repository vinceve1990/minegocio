/**
 * 
 * Autor: Izmir
 * Empresa: Doquimta
 * 3/abril/2013
 * 
 */


/**
 * [replaceContentCell This functions allows the replacemente of jqgrid's content created.]
 * @param  {[string]}  table    [Specify the table id.]
 * @param  {[string]}  key      [Word to search and be replaced]
 * @param  {[string]}  replace  [Word to replace the target]
 * @param  {[int]} 	   start_h  [If your going to replace all content with other thing, you can specify from what column you'll start]
 * @param  {[int]} 	   end_h    [end position of the column to be replaced]
 * @param  {[int]}     start_v  [If your going to replace all content with other thing, you can specify from what row you'll start]
 * @param  {[int]}     end_v    [end position of the column to be replaced]
 * @param  {[closure]} callback [callback function]
 * @return {[null]}             [null]
 */
function replaceContentCell(table, key, replace, start_h, end_h, start_v, end_v, callback){
		//alert('table: '+table+' - '+key+' - '+replace+' - '+start_h+' - '+end_h+' - '+start_v+' - '+end_v);

		/**
		 * [count_tr Total of tr of the table]
		 * @type {[Int]}
		 */
    var count_tr = parseInt($('#'+table+' tbody').children().length);
		/**
		 * [count_td Total of td of the tr]
		 * @type {[Int]}
		 */
		var count_td = parseInt($('#'+table+' tbody > tr:eq(0)').children().length);
		if(typeof(replace) == 'undefined') {
			return alert('Replace value null.'); 
			exit;  
		}
		if(key == '' && (typeof(start_h) == 'undefined'  || typeof(start_v) == 'undefined' || typeof(end_h) == 'undefined' || typeof(end_v) == 'undefined')) {
			return alert('Wrong parameters, please check documentation.'); 
			exit;  
		}
		if(key != false){
			for(var i  = 0; i <= count_td; i++) {
				
				$('#'+table+' tbody > tr:gt(0) td:nth-child('+i+')').each(function(){
					if($(this).text() == key){
							$(this).html(replace);
					}	
				});					
			}			

		} else {	
			start_v = (start_v == 0) ? 1 : start_v;
			end_v = (end_v == 0) ? count_tr : end_v;
			start_h = (start_h == 0) ? 1 : start_h;
			end_h = (end_h == 0) ? count_td : end_h;
					
			for(var v = start_v; v <= count_tr; v++){// loop for tr

				for(var i = start_h; i <= count_td; i++){ //loop for td
				//alert('#'+table+' tbody > tr:eq('+v+') td:nth-child('+i+')');	
					$('#'+table+' tbody > tr:eq('+v+') td:nth-child('+i+')').each(function(){
						$(this).html(replace);
					});
					i = (i == end_h) ? count_td : i;
				}
				v = (v == end_v) ? v = count_tr : v;
			}
		  }
		  if(callback)
			callback();
	}	


/**
 * 
 * Autor: Izmir
 * Empresa: Doquimta
 * 3/abril/2013
 * 
 */


/**
 * [replaceCell This functions allows the replacemente of jqgrid's content created.]
 * @param  {[string]}  table    [Specify the table id.]
 * @param  {[string]}  key      [Word to search and be replaced]
 * @param  {[string]}  replace  [Word to replace the target]
 * @param  {[int]} 	   start_h  [If your going to replace all content with other thing, you can specify from what column you'll start]
 * @param  {[int]} 	   end_h    [end position of the column to be replaced]
 * @param  {[int]}     start_v  [If your going to replace all content with other thing, you can specify from what row you'll start]
 * @param  {[int]}     end_v    [end position of the column to be replaced]
 * @param  {[closure]} callback [callback function]
 * @return {[null]}             [null]
 */
function replaceCell(table, key, replace, start_h, end_h, start_v, end_v, callback){
		//alert('table: '+table+' - '+key+' - '+replace+' - '+start_h+' - '+end_h+' - '+start_v+' - '+end_v);

		/**
		 * [count_tr Total of tr of the table]
		 * @type {[Int]}
		 */
    var count_tr = parseInt($('#'+table+' tbody').children().length);
		/**
		 * [count_td Total of td of the tr]
		 * @type {[Int]}
		 */
		var count_td = parseInt($('#'+table+' tbody > tr:eq(0)').children().length);
		if(typeof(replace) == 'undefined') {
			return alert('Replace value null.'); 
			exit;  
		}
		if(key == '' && (typeof(start_h) == 'undefined'  || typeof(start_v) == 'undefined' || typeof(end_h) == 'undefined' || typeof(end_v) == 'undefined')) {
			return alert('Wrong parameters, please check documentation.'); 
			exit;  
		}
		if(key != false){
			for(var i  = 0; i <= count_td; i++) {
				
				$('#'+table+' tbody > tr:gt(0) td:nth-child('+i+')').each(function(){
					if(key == 'partidos' && replace == 'partidos'){
						var str = $(this).text();
						var party = str.split(',');
						var icons = '';

						for (var h = 0; h < party.length; h++) {
							if(party[h] == 'PRI'){
								icons += '<img class="partido" src="../../images/pri.png" width="20">';
							}else if(party[h] == 'PAN'){
								icons += '<img class="partido" src="../../images/pan.png" width="20">';
							}else if(party[h] == 'PRD'){
								icons += '<img class="partido" src="../../images/prd.png" width="20">';
							}else if(party[h] == 'PT'){
								icons += '<img class="partido" src="../../images/pt.png" width="20">';
							}else if(party[h] == 'VERDE ECOLOGISTA'){
								icons += '<img class="partido" src="../../images/verde_ecologista.png" width="20">';
							}else if(party[h] == 'CONVERGENCIA'){
								icons += '<img class="partido" src="../../images/convergencia.png" width="20">';
							}else if(party[h] == 'NUEVA ALIANZA'){
								icons += '<img class="partido" src="../../images/nueva_alianza.png" width="20">';
							}else{
								icons = $(this).html();
							}

						}

						$(this).html(icons);

					}else if($(this).text() == key){
							$(this).html(replace);
					}	
				});					
			}			

		} else {	
			start_v = (start_v == 0) ? 1 : start_v;
			end_v = (end_v == 0) ? count_tr : end_v;
			start_h = (start_h == 0) ? 1 : start_h;
			end_h = (end_h == 0) ? count_td : end_h;
					
			for(var v = start_v; v <= count_tr; v++){// loop for tr

				for(var i = start_h; i <= count_td; i++){ //loop for td
				//alert('#'+table+' tbody > tr:eq('+v+') td:nth-child('+i+')');	
					$('#'+table+' tbody > tr:eq('+v+') td:nth-child('+i+')').each(function(){
						$(this).html(replace);
					});
					i = (i == end_h) ? count_td : i;
				}
				v = (v == end_v) ? v = count_tr : v;
			}
		  }
		  if(callback)
			callback();
	}	


 function obligatorios(table)
 {

		$('#'+table+' tbody tr td a').each(function()
		{

			if($(this).attr('alt')=="1")
			{
				$(this).parent().css('background', '#8BF594');
			}
			else
			{
				$(this).css('background', '#FF8000');
			}
       });
}

function replaceCell2(table, key, replace, start_h, end_h, start_v, end_v, callback){
		//alert('table: '+table+' - '+key+' - '+replace+' - '+start_h+' - '+end_h+' - '+start_v+' - '+end_v);

		/**
		 * [count_tr Total of tr of the table]
		 * @type {[Int]}
		 */
    var count_tr = parseInt($('#'+table+' tbody').children().length);
		/**
		 * [count_td Total of td of the tr]
		 * @type {[Int]}
		 */
		var count_td = parseInt($('#'+table+' tbody > tr:eq(0)').children().length);
		if(typeof(replace) == 'undefined') {
			return alert('Replace value null.'); 
			exit;  
		}
		if(key == '' && (typeof(start_h) == 'undefined'  || typeof(start_v) == 'undefined' || typeof(end_h) == 'undefined' || typeof(end_v) == 'undefined')) {
			return alert('Wrong parameters, please check documentation.'); 
			exit;  
		}
		if(key != false){
			for(var i  = 0; i <= count_td; i++) {
				
				$('#'+table+' tbody > tr:gt(0) td:nth-child('+i+')').each(function(){
					 if($(this).text() == key){
							$(this).html(replace);
					}	
				});					
			}			

		} else {	
			start_v = (start_v == 0) ? 1 : start_v;
			end_v = (end_v == 0) ? count_tr : end_v;
			start_h = (start_h == 0) ? 1 : start_h;
			end_h = (end_h == 0) ? count_td : end_h;
					
			for(var v = start_v; v < count_tr-1; v++){// loop for tr

				for(var i = start_h; i <= count_td; i++){ //loop for td
				//alert('#'+table+' tbody > tr:eq('+v+') td:nth-child('+i+')');	
					$('#'+table+' tbody > tr:eq('+v+') td:nth-child('+i+')').each(function(){
						var padre=$(this).parent();
						var id= padre.children(":eq(1)").text();
						
							var pres="";
						    pres+='<a href="javascript:telefonox(';
							pres+=id;
							pres+=')" alt="Ver Presupuesto" class="ui-icon-circle-arrow-e" >';
							pres+='<img class="partido" src="adjuntos/tel2.jpg" width="20"></a>'

						
						$(this).html(pres);

					});
					i = (i == end_h) ? count_td : i;
				}
				v = (v == end_v) ? v = count_tr : v;
			}
		  }
		  if(callback)
			callback();
	}	



/**
 * [sabana_documentos_status description]
 * @param  {[type]}   table    [description]
 * @param  {[type]}   key      [description]
 * @param  {[type]}   replace  [description]
 * @param  {[type]}   start_h  [description]
 * @param  {[type]}   end_h    [description]
 * @param  {[type]}   start_v  [description]
 * @param  {[type]}   end_v    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
 function sabana_documentos_status(table){
		//alert('table: '+table+' - '+key+' - '+replace+' - '+start_h+' - '+end_h+' - '+start_v+' - '+end_v);


		

		$('#'+table+'_frozen tbody > tr:gt(0) td:nth-child(9)').each(function(){

			var str_td = $(this).children().text();
			str_td = str_td.toString();
			
			if(str_td.indexOf('EN PROCESO') >= 0){
				$(this).css('background', '#C4BD97');

			}	
			if(str_td.indexOf('GESTIONADO') >= 0){
				$(this).css('background', '#E6B8B7');

			}	
			if(str_td.indexOf('INGRESADO') >= 0){
				$(this).css('background', '#C4D79B');

			}	
			if(str_td.indexOf('PREDIO') >= 0){
				$(this).css('background', '#92D050');

			}	
			if(str_td.indexOf('VALIDADO') >= 0){
				$(this).css('background', '#00B0F0');

			}	
		});					


		//$('.ui-jqgrid-htable thead > tr > th:lt(14)').fadeOut(1000);

	}	



/**
 * [sabana_documentos_status description]
 * @param  {[type]}   table    [description]
 * @param  {[type]}   key      [description]
 * @param  {[type]}   replace  [description]
 * @param  {[type]}   start_h  [description]
 * @param  {[type]}   end_h    [description]
 * @param  {[type]}   start_v  [description]
 * @param  {[type]}   end_v    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
 function sabana_documentos_programas(table, row){
		//alert('table: '+table+' - '+key+' - '+replace+' - '+start_h+' - '+end_h+' - '+start_v+' - '+end_v);


		

		$('#'+table+'_frozen tbody > tr:gt(0) td:nth-child('+row+')').each(function(){

			var str_td = $(this).text();
			str_td = str_td.toString();
			
			if(str_td.indexOf('SIN PROGRAMA') >= 0){
				$(this).css('background', '#FFFF66');

			}if(str_td.indexOf('SIN APOYO') >= 0){
				$(this).css('background', '#FF6466');

			}if(str_td.indexOf('CDI') >= 0){
				$(this).css('background', '#FF96C8');

			}if(str_td.indexOf('CEAA') >= 0){
				$(this).css('background', '#B8DEE8');

			}if(str_td.indexOf('CNA') >= 0){
				$(this).css('background', '#FAA460');

			}if(str_td.indexOf('PREFERENTE') >= 0){
				$(this).css('background', '#DEB887');

			}if(str_td.indexOf('SEDESO') >= 0){
				$(this).css('background', '#7030A0');

			}if(str_td.indexOf('SEDESOL') >= 0){
				$(this).css('background', '#4F6231');

			}if(str_td.indexOf('SEDESO - SEDESOL') >= 0){
				$(this).css('background', '#F3FF35');

			}	
		});					


		//$('.ui-jqgrid-htable thead > tr > th:lt(14)').fadeOut(1000);

	}



var fixPositionsOfFrozenDivs = function () {
        var $rows;
        if (typeof this.grid.fbDiv !== "undefined") {
            $rows = $('>div>table.ui-jqgrid-btable>tbody>tr', this.grid.bDiv);
            $('>table.ui-jqgrid-btable>tbody>tr', this.grid.fbDiv).each(function (i) {
                var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                if ($(this).hasClass("jqgrow")) {
                    $(this).height(rowHight);
                    rowHightFrozen = $(this).height();
                    if (rowHight !== rowHightFrozen) {
                        $(this).height(rowHight + (rowHight - rowHightFrozen));
                    }
                }
            });
            $(this.grid.fbDiv).height(this.grid.bDiv.clientHeight);
            $(this.grid.fbDiv).css($(this.grid.bDiv).position());
        }
        if (typeof this.grid.fhDiv !== "undefined") {
            $rows = $('>div>table.ui-jqgrid-htable>thead>tr', this.grid.hDiv);
            $('>table.ui-jqgrid-htable>thead>tr', this.grid.fhDiv).each(function (i) {
                var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                $(this).height(rowHight);
                rowHightFrozen = $(this).height();
                if (rowHight !== rowHightFrozen) {
                    $(this).height(rowHight + (rowHight - rowHightFrozen));
                }
            });
            $(this.grid.fhDiv).height(this.grid.hDiv.clientHeight);
            $(this.grid.fhDiv).css($(this.grid.hDiv).position());
        }
    };


fixGboxHeight = function () {
                    var gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight(),
                        pagerHeight = $(this.p.pager).outerHeight();

                    $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
                    gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight();
                    pagerHeight = $(this.p.pager).outerHeight();
                    $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
                };




function replaceContentHeader(table, content, replace){
	number = (content === 'number') ? parseInt(replace) : 0;
	var i = 1;	
	if($('#'+table+' .ui-jqgrid-htable thead tr > th').length){
		var count = $('#'+table+' .ui-jqgrid-htable thead tr > th:gt('+(number-1)+')').length;
		$('#'+table+' .ui-jqgrid-htable thead tr > th').each(function(){
			if(content === 'number'){
				numbers += '<th>('+i+')</th>';
				i++;
			}
		});
	}else{
		var count = $('#gbox_'+table+' .ui-jqgrid-htable thead tr > th').length;
		numbers = '<tr class="ui-jqgrid-labels" role="rowheader">';
		if(number != 0){
				for(var j = 1; j <= number; j++){
					numbers += '<th></th>';
				}
			}

		$('#gbox_'+table+' .ui-jqgrid-htable thead tr > th:gt('+(number-1)+')').each(function(){

			if(content === 'number'){
				numbers += '<th>('+i+')</th>';
				i++;
			}
			});
		numbers += '</tr>';
		$('#gbox_'+table+' .ui-jqgrid-htable thead').prepend(numbers);
	}
}

function principales(table){

		var tr_tam = parseInt($('#'+table+' tbody > tr:gt(0)').length);
		
		var tamaño=tr_tam-1;


		var count = $('.jqg-third-row-header > th').length;
	//alert(count);
	var i=1;
	var posicion=0;	
	$('.jqg-third-row-header > th ').each(function(){

		if($(this).attr('title')=="ACTAS DE DONACION DEL PREDIO"){
			posicion=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion+')').css("background","#18DA79");

		}


		if($(this).attr('title')=="COMPROBANTE DE PAGO PERMISO DE DESCARGA"){
			posicion2=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion2+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="TITULO CONCESION DE POZO"){
			posicion3=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion3+')').css("background","#18DA79");

		}


		//////////////////////////////////////////////////////////////////7
		if($(this).attr('title')=="COPIA LEGIBLE DE RFC DEL PRESIDENTE MUNICIPAL"){
			posicion4=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion4+')').css("background","#DF4800");

		}
				if($(this).attr('title')=="COPIA LEGIBLE DE RFC DEL SINDICO PROCURADOR"){
			posicion5=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion5+')').css("background","#DF4800");

		}
				if($(this).attr('title')=="SOLICITUD DE APOYO CEAA"){
			posicion6=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion6+')').css("background","#DF4800");

		}
				if($(this).attr('title')=="OFICIO DE APORTACION DE RECURSOS CEAA"){
			posicion7=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion7+')').css("background","#DF4800");

		}
						if($(this).attr('title')=="PAGO ACTUALIZADO DEL IMPUESTO PREDIAL "){
			posicion8=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion8+')').css("background","#DF4800");

		}


		if($(this).attr('title')=="DICTAMEN DE IMPACTO AMBIENTAL (SEMARNAT ESTATAL O FEDERAL)"){
			posicion9=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion9+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="MANIFESTACION DE IMPACTO AMBIENTAL O EXENCION DE LA MISMA"){
			posicion10=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion10+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="PERMISO DE CONSTRUCCION EN ZONA FEDERAL (CONAGUA)"){
			posicion11=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion11+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="TOPOGRAFIA DE COLECTORES, EMISORES Y PTAR"){
			posicion12=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion12+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="NUMERO DE PLANTAS REQUERIDAS"){
			posicion13=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion13+')').css("background","#18DA79");

		}		

		if($(this).attr('title')=="CAPACIDAD DE LA PLANTA (Q)"){
			posicion14=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion14+')').css("background","#18DA79");


		}

		if($(this).attr('title')=="TRAMITE DEL PERMISO DE DESCARGA DE LA CONAGUA"){
			posicion15=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion15+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="ACUSE DE TRAMITE DE PERMISO DE DESCARGA"){
			posicion16=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion16+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="PERMISO DE DESCARGA (CONAGUA)"){
			posicion17=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion17+')').css("background","#18DA79");

		}

		if($(this).attr('title')=="ACUSE DE INGRESO DE EXPEDIENTE PARA SU VALIDACION"){
			posicion18=i;	

			$('#'+table+' tbody > tr:gt(0):lt('+tamaño+') td:nth-child('+posicion18+')').css("background","#18DA79");

		}






		i++;

	});





}


function telefonos(table){


	var count = $('.jqg-third-row-header > th').length;
	//alert(count);
	var i=1;
	var posicion=0;	
	$('.jqg-third-row-header > th ').each(function(){

if($(this).attr('title')=="TELEFONO"){


posicion=i;	



replaceCell2(table, '', '<img class="partido" src="adjuntos/tel1.png" width="20">',posicion, posicion,0,0 );

}
	i++;

});





}


function replaceTextHeader(table, data, colores){
	
	if($('#'+table+' .ui-jqgrid-htable thead tr > th').length){
		var count = $('#'+table+' .ui-jqgrid-htable thead tr > th').length;
		var i = 0;
		$('#'+table+' .ui-jqgrid-htable thead tr:gt(1) > th:gt(11)').each(function(){

			if(i < count){
				$(this).text(data[i]);
				$(this).css('background-color',colores[i]);
			}else{
				$(this).text('');
			}

			i++;
		});
		
	}else{
		var count = $('#gbox_'+table+' .ui-jqgrid-htable thead tr > th').length;
		var i = 0;
		$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-third-row-header th:gt(11)').each(function(){

			if(i < data.length){
				$(this).attr('title', data[i]);
				$(this).html('<div>'+data[i]+'</div>');
				$(this).css('background-color',colores[i]);
				$(this).children('div').css('-moz-transform', 'rotate(-90deg)');
			}else{
				$(this).text('');
				$(this).css('background-color','#FFFFFF');
			}

			i++;
		});
	}
}

function duplicateColor(table, opcion){
	var i = 12;

	if(opcion==0){
	$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-second-row-header th:gt(11)').each(function(){
		var color = $(this).css('background-color');

		//alert($(this).text()+' : '+rgbToHex(color));
		$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-third-row-header th:eq('+i+')').css('background-color', rgbToHex(color));
		i++;
	});
}else if(opcion==1)
{
$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-third-row-header th:gt(11)').each(function(){
		var color = $(this).css('background-color');

		//alert($(this).text()+' : '+rgbToHex(color));
		$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-second-row-header th:eq('+i+')').css('background-color', rgbToHex(color));
		i++;
	});

}


}


function padre(tipos, position){
	$('.ui-jqgrid-btable tr').each(function(){
		var titulo = $(this).children('td:eq('+position+')').attr('title');
		$(this).addClass(titulo);
	})
}

function padre_2(position){
	var titul="";
	$('.ui-jqgrid-btable tr:gt(0)').each(function(){
	  titul = $(this).children('td:eq('+position+')').attr('title');
	  x=titul+"";
	  //console.log(titul);
if(x!=''){
	 tit=replaceAll(x, " ", "_" );
	 tit2=replaceAll2(tit, ",", "_" );
		$(this).addClass(tit2);
	}

	})
}

function replaceAll( text, busca, reemplaza ){
	  while (text.toString().indexOf(busca) != -1)
	      text = text.toString().replace(busca,reemplaza);
	  return text;
	}
	function replaceAll2( text, busca, reemplaza ){
	  while (text.toString().indexOf(busca) != -1)
	      text = text.toString().replace(busca,reemplaza);
	  return text;
	}


    function rgbToHex(rgb) {
        if (rgb.match(/^#[0-9A-Fa-f]{6}$/)) {
            return rgb;
        }
        var rgbvals = /rgb\((.+),(.+),(.+)\)/i.exec(rgb);
        if (!rgbvals) {
            return rgb;
        }
        var rval = parseInt(rgbvals[1]);
        var gval = parseInt(rgbvals[2]);
        var bval = parseInt(rgbvals[3]);
        var pad = function(value) {
            return (value.length < 2 ? '0' : '') + value;
        };
        return '#' + pad(rval.toString(16)) + pad(gval.toString(16)) + pad(bval.toString(16));
    } 

var fixPositionsOfFrozenDivs = function () {
        var $rows;
        if (typeof this.grid.fbDiv !== "undefined") {
            $rows = $('>div>table.ui-jqgrid-btable>tbody>tr', this.grid.bDiv);
            $('>table.ui-jqgrid-btable>tbody>tr', this.grid.fbDiv).each(function (i) {
                var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                if ($(this).hasClass("jqgrow")) {
                    $(this).height(rowHight);
                    rowHightFrozen = $(this).height();
                    if (rowHight !== rowHightFrozen) {
                        $(this).height(rowHight + (rowHight - rowHightFrozen));
                    }
                }
            });
            $(this.grid.fbDiv).height(this.grid.bDiv.clientHeight);
            $(this.grid.fbDiv).css($(this.grid.bDiv).position());
        }
        if (typeof this.grid.fhDiv !== "undefined") {
            $rows = $('>div>table.ui-jqgrid-htable>thead>tr', this.grid.hDiv);
            $('>table.ui-jqgrid-htable>thead>tr', this.grid.fhDiv).each(function (i) {
                var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                $(this).height(rowHight);
                rowHightFrozen = $(this).height();
                if (rowHight !== rowHightFrozen) {
                    $(this).height(rowHight + (rowHight - rowHightFrozen));
                }
            });
            $(this.grid.fhDiv).height(this.grid.hDiv.clientHeight);
            $(this.grid.fhDiv).css($(this.grid.hDiv).position());
        }
    };


fixGboxHeight = function () {
                    var gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight(),
                        pagerHeight = $(this.p.pager).outerHeight();

                    $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
                    gviewHeight = $("#gview_" + $.jgrid.jqID(this.id)).outerHeight();
                    pagerHeight = $(this.p.pager).outerHeight();
                    $("#gbox_" + $.jgrid.jqID(this.id)).height(gviewHeight + pagerHeight);
                };




function replaceContentHeader(table, content, replace){
	number = (content === 'number') ? parseInt(replace) : 0;
	var i = 1;	
	if($('#'+table+' .ui-jqgrid-htable thead tr > th').length){
		var count = $('#'+table+' .ui-jqgrid-htable thead tr > th:gt('+(number-1)+')').length;
		$('#'+table+' .ui-jqgrid-htable thead tr > th').each(function(){
			if(content === 'number'){
				numbers += '<th>('+i+')</th>';
				i++;
			}
		});
	}else{
		var count = $('#gbox_'+table+' .ui-jqgrid-htable thead tr > th').length;
		numbers = '<tr class="ui-jqgrid-labels" role="rowheader">';
		if(number != 0){
				for(var j = 1; j <= number; j++){
					numbers += '<th></th>';
				}
			}

		$('#gbox_'+table+' .ui-jqgrid-htable thead tr > th:gt('+(number-1)+')').each(function(){

			if(content === 'number'){
				numbers += '<th>('+i+')</th>';
				i++;
			}
			});
		numbers += '</tr>';
		$('#gbox_'+table+' .ui-jqgrid-htable thead').prepend(numbers);
	}
}

function replaceTextHeader(table, data, colores){
	
	if($('#'+table+' .ui-jqgrid-htable thead tr > th').length){
		var count = $('#'+table+' .ui-jqgrid-htable thead tr > th').length;
		var i = 0;
		$('#'+table+' .ui-jqgrid-htable thead tr:gt(1) > th:gt(11)').each(function(){

			if(i < count){
				$(this).text(data[i]);
				$(this).css('background-color',colores[i]);
			}else{
				$(this).text('');
			}

			i++;
		});
		
	}else{
		var count = $('#gbox_'+table+' .ui-jqgrid-htable thead tr > th').length;
		var i = 0;
		$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-third-row-header th:gt(11)').each(function(){

			if(i < data.length){
				$(this).attr('title', data[i]);
				$(this).html('<div>'+data[i]+'</div>');
				$(this).css('background-color',colores[i]);
				$(this).children('div').css('-moz-transform', 'rotate(-90deg)');
			}else{
				$(this).text('');
				$(this).css('background-color','#FFFFFF');
			}

			i++;
		});
	}
}

function duplicateColor(table, opcion){
	var i = 12;

	if(opcion==0){
	$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-second-row-header th:gt(11)').each(function(){
		var color = $(this).css('background-color');

		//alert($(this).text()+' : '+rgbToHex(color));
		$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-third-row-header th:eq('+i+')').css('background-color', rgbToHex(color));
		i++;
	});
}else if(opcion==1)
{
$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-third-row-header th:gt(11)').each(function(){
		var color = $(this).css('background-color');

		//alert($(this).text()+' : '+rgbToHex(color));
		$('#gbox_'+table+' .ui-jqgrid-view div:eq(1) div table thead .jqg-second-row-header th:eq('+i+')').css('background-color', rgbToHex(color));
		i++;
	});

}


}


function padre(tipos, position){
	$('.ui-jqgrid-btable tr').each(function(){
		var titulo = $(this).children('td:eq('+position+')').attr('title');
		$(this).addClass(titulo);
	})
}





    function rgbToHex(rgb) {
        if (rgb.match(/^#[0-9A-Fa-f]{6}$/)) {
            return rgb;
        }
        var rgbvals = /rgb\((.+),(.+),(.+)\)/i.exec(rgb);
        if (!rgbvals) {
            return rgb;
        }
        var rval = parseInt(rgbvals[1]);
        var gval = parseInt(rgbvals[2]);
        var bval = parseInt(rgbvals[3]);
        var pad = function(value) {
            return (value.length < 2 ? '0' : '') + value;
        };
        return '#' + pad(rval.toString(16)) + pad(gval.toString(16)) + pad(bval.toString(16));
    } 