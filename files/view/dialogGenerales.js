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

function dialogRol(accion = 'close', catalogo = "roles") {
    var d = {};

    d.padre       = $("html");
    d.z_index     = maximoZindex(d.padre);

    d.body = `<div id="dialogRoles" style="display: none;">
            <form>
                <div class="col-xs-12 col-sm-12 mb-12">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 mb-12">
                            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre Rol:</label>
                            <input id="nombreRol" class="form-control g-color-black" type="text" placeholder="Nombre Rol">
                        </div>
                    </div>
                </div>
            </form>
        </div>`;

    if( accion == 'open' ){
        d.padre.append(d.body);

        $("#dialogRoles").dialog({
            title: 'Alta Roles',
            autoOpen: false,
            modal: true,
            width: 320,
            closeOnEscape: false,
            resizable : false,
            zIndex: d.z_index,
            open: function() {
                $("#nombreRol").val('');
            },
            buttons: [
                {
                    id: 'btnGuardaRol',
                    text: 'Guardar',
                    click: function() {
                        DialogProcesando('open');

                        var DatR = new Object();

                        var data = $("#dialogRoles").data();

                        DatR.nombreRol = "string:"+$("#nombreRol").val();

                        if(catalogo == "editRoles") {
                            var accion = "editarRol";
                            DatR.id_roles_PK = "integer:"+data.id_roles_PK;
                        } else {
                            var accion = "nuevoRol";
                        }

                        $.post('/minegocio/roles/catalogoRoles', {accion: accion, DatR : DatR}, function(data) {
                            DialogProcesando('close');
                            Swal.fire(data.mensaje);

                            $("#dialogRoles").dialog('close');

                            if(catalogo == "roles" || catalogo == "editRoles") {
                                $("#GridRoles").trigger("reloadGrid");
                            }

                            if(catalogo == "personal") {
                                cargarRoles();
                            }

                        }, 'json');

                    }
                },
                {
                    id: 'btnCancelaRol',
                    text: 'Cancelar',
                    click: function() {
                        $("#dialogRoles").dialog('close');
                    }
                }]
        }).dialog('open');
    } else if( accion == 'close' ){

        // Elimina (si existe) el objeto
        $("#dialogRoles").dialog('close');

    }
}