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

function paginacion(datos, pageactivo) {

    var pag = `<li class="list-inline-item">       
                  <a id="datatablePagination1Prev" class="u-pagination-v1__item u-pagination-v1-2 g-brd-gray-light-v7 g-brd-secondary--hover g-rounded-4 g-py-8 g-px-12" aria-label="Previous"><span class="g-line-height-1 g-valign-middle" aria-hidden="true"><i class="hs-admin-angle-left"></i></span><span class="sr-only">Anterior</span></a>       
                </li>`;

    for (var i = 1; i <= datos.total; i++) {
        var act = "";

        if(i == pageactivo) {
            act = "active";
        }

        pag += `<li class="list-inline-item g-hidden-sm-down">
                    <a class="u-pagination-v1__item u-pagination-v1-2 g-bg-secondary--active g-color-white--active g-brd-gray-light-v7 g-brd-secondary--hover g-brd-secondary--active g-rounded-4 g-py-8 g-px-15 datatablePaginationPage ${act}" data-dtpageto="${i}">${i}</a>
                </li>`;
    }

    pag += `<li class="list-inline-item">       
                  <a id="datatablePagination1Next" class="u-pagination-v1__item u-pagination-v1-2 g-brd-gray-light-v7 g-brd-secondary--hover g-rounded-4 g-py-8 g-px-12" data-pageFinal="${datos.total}" aria-label="Next"><span class="g-line-height-1 g-valign-middle" aria-hidden="true"><i class="hs-admin-angle-right"></i></span><span class="sr-only">Siguiente</span></a>        
                </li>`;

    return pag;
}

function clickPrev(rows, page) {
    $("#datatablePagination1Prev").click(function () {
        page--;

        if(page < 1) {
            page = 1;
        }
        
        verProveedores(rows, page);
    });
}

function clickNext(rows, page) {
    $("#datatablePagination1Next").click(function () {
        page++;

        var paginacion = $("#datatablePagination1Next").data();

        if (page > paginacion.pagefinal) {
            page = paginacion.pagefinal;
        }
        
        verProveedores(rows, page);
    });
}

function clickPagina(rows, page) {
    $(".datatablePaginationPage").click(function () {

        var paginacion = $(this).data();

        page = paginacion.dtpageto;
        
        verProveedores(rows, page);
    });
}

function filtrosTabla(trNombre, valor) {
    var filTabla = `<div class="g-pos-rel">
                        <button class="btn u-input-btn--v1 g-width-20 g-bg-primary g-rounded-right-10 quitarfiltro" data-txtnombre="${trNombre}" type="submit">
                            <i class="hs-admin-close g-absolute-centered g-font-size-12 g-color-white"></i>
                        </button>
                        <input id="txt${trNombre}" class="form-control form-control-md g-brd-gray-light-v7 g-brd-gray-light-v3 g-rounded-20 g-px-10 g-py-2 txtFiltros" type="text" value="${valor}">
                    </div>`;
    return filTabla;
}

function enterFiltros(rows, page) {

    $(".txtFiltros").on('keyup', function (event) {
        if (event.keyCode === 13) {
            verProveedores(rows, page);
        }
    });
}

function clickQuitarFiltro(rows, page) {
    $(".quitarfiltro").click(function () {
        var valor = $(this).data();

        $("#txt"+valor.txtnombre).val("");

        verProveedores(rows, page);
    });
}

function recuperarFil(filAdd) {
    for(x in filAdd) {
        if($("#txt"+x).val() != "" && $("#txt"+x).val() != 'undefined' && $("#txt"+x).val() != undefined) {
            filAdd[x] = $("#txt"+x).val();
        }
    }
    return filAdd;
}