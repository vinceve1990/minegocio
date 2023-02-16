/**
 * 
 * Autor: Dfkuro
 * Empresa: Doquimta
 * 3/abril/2013
 * 
 */


/**
 * [replaceContentCell This functions allows the replacemente of jqgrid's content created.]
 * @param  {[string]}  table    [Specify the table id.]
 * @param  {[string]}  key      [Word to search and be replaced]
 * @param  {[string]}  replace  [Word to replace the target]
 * @param  {[int]}         start_h  [If your going to replace all content with other thing, you can specify from what column you'll start]
 * @param  {[int]}         end_h    [end position of the column to be replaced]
 * @param  {[int]}     start_v  [If your going to replace all content with other thing, you can specify from what row you'll start]
 * @param  {[int]}     end_v    [end position of the column to be replaced]
 * @param  {[closure]} callback [callback function]
 * @return {[null]}             [null]
 */
function replaceContentCell(table, key, start_h, end_h, start_v, end_v, callback){
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
                                            alert('finded');
                                            $(this).css('Background','red');
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
                                                alert('finded');
                                                $(this).css('Background','red');
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
 * Autor: Dfkuro
 * Empresa: Doquimta
 * 3/abril/2013
 * 
 */


/**
 * [replaceContentCell This functions allows the replacemente of jqgrid's content created.]
 * @param  {[string]}  table    [Specify the table id.]
 * @param  {[string]}  key      [Word to search and be replaced]
 * @param  {[string]}  replace  [Word to replace the target]
 * @param  {[int]}         start_h  [If your going to replace all content with other thing, you can specify from what column you'll start]
 * @param  {[int]}         end_h    [end position of the column to be replaced]
 * @param  {[int]}     start_v  [If your going to replace all content with other thing, you can specify from what row you'll start]
 * @param  {[int]}     end_v    [end position of the column to be replaced]
 * @param  {[closure]} callback [callback function]
 * @return {[null]}             [null]
 */
function findContentCell(table, key, start_h, end_h, start_v, end_v, callback){
                //alert('table: '+table+' - '+key+' - '+replace+' - '+start_h+' - '+end_h+' - '+start_v+' - '+end_v);
                replace = '';
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
                                            alert('finded');
                                            $(this).css('background','red');
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
                                                alert('finded');
                                                $(this).css('background','red');
                                        });
                                        i = (i == end_h) ? count_td : i;
                                }
                                v = (v == end_v) ? v = count_tr : v;
                        }
                  }
                  if(callback)
                        callback();
        }       