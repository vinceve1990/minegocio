function DialogProcesando(accion = 'close', texto = 'Procesando...'){

    var o = {};

    o.name        = 'dialogProcesando';
    o.icono       = '<img src="/minegocio/img/Circlesmenu.gif" style="width: 80px; margin: 20px;" /><br>';
    o.contenido   = texto;
    o.padre       = $('html');
    o.z_index     = maximoZindex(o.padre);
    o.body        = `<div class="noselect" data-type="modal" data-name="${o.name}" style="position: fixed; background: #00000030; left: 0; top: 0; width: 100vw; height: 100vh; z-index: ${o.z_index} !important; text-align: center;">
        <div data-type="item" data-name="${o.name}" style="display: table; height: 100%; width: 100%;">
            <div data-type="contenido" data-name="${o.name}" style="vertical-align: middle; display: table-cell; color: #fff; font-family: 'Verdana'; font-size: 20px; letter-spacing: 1px;">
                <div style="background: #fff; padding: 30px 40px; display: inline-block; border-radius: 4px; box-shadow: 0px 1px 6px rgba(0,0,0,0.5); text-transform: uppercase; font-size: 14px;">${o.icono}<h4 style="color: #000000";>${o.contenido}</h4></div>
            </div>
        </div>
    </div>`;

    if( accion == 'open' ){
        // Elimina (si existe) el objeto
        $('div[data-type="modal"][data-name="'+o.name+'"]').remove();

        // Crea un nuevo objeto
        o.padre.append(o.body);
    } else if( accion == 'close' ){

        // Elimina (si existe) el objeto
        $('div[data-type="modal"][data-name="'+o.name+'"]').remove();

    } else {
        alert('No se reconoce "'+accion+'" dentro de la función DialogProcesando');
    }
}

function maximoZindex(from){
    var max = 0;
    from.find(">*").each(function(i, e){
        var z = Number($(e).css("z-index"));

        if(z > max) {
            max = z;
        }
    });

    return 110000 + (max * 10000000);
}