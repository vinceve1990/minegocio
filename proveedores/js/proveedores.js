$(document).ready(function() {
	verProveedores(2,1);

    $("#datatablePagination1Prev").click(function() {
        $("#datatablePaginationPage1").css("class","#29364d");
    })

    $("#panelConfiguraciones").css("background-color","#29364d");

    $("#newProveedor").click(function() {
        DialogProveedor('altaProveedor');
    });

    //Enter C.P.

    $.HSCore.components.HSValidation.init('.js-validate');

    let formInfoPrincipal = document.getElementById("formInfoPrincipal");

    $("#formInfoPrincipal").submit(function(event) {
        DialogProcesando('open');

        var Dat = new Object();

        Dat.nombreProveedor   = 'string:'+$("#nombreProveedor").val();
        Dat.rfc               = 'string:'+$("#rfc").val();
        Dat.email             = 'string:'+$("#email").val();
        Dat.telefonoProveedor = 'integer:'+$("#telefonoProveedor").val();
        Dat.cp                = 'integer:'+$("#cp").val();
        Dat.selectEstado      = 'integer:'+$("#selectEstado").val();
        Dat.selectMunicipio   = 'integer:'+$("#selectMunicipio").val();
        Dat.calle             = 'string:'+$("#calle").val();
        Dat.selectGiro        = 'integer:'+$("#selectGiro").val();

        $.post('/minegocio/proveedores/server', {accion: 'altaProveedor', Dat : Dat, token : Token}, function(data) {
            DialogProcesando('close');
        }, 'json');

        return false;
    });

    formInfoPrincipal.addEventListener("reset", (e) => {
        if (e.returnValue == true) {
            $("#dialogProveedores").dialog("close");
        }
    });
});

function verProveedores(rows, page) {
    var filAdd = new Object();
    filAdd.id = "";
    filAdd.nombre_proveedor = "";
    filAdd.rfc = "";
    filAdd.telefono = "";
    filAdd.email = "";
    filAdd.estado = "";
    filAdd.cp = "";
    filAdd.status = "";

    //Recuperar Filtros
    filAdd = recuperarFil(filAdd);

    DialogProcesando('open');
	$.ajax({
        dataType:"json",
        url:"/minegocio/proveedores/server",
        type: "POST",
        data:{accion:'informacion', rows:rows, page:page, sidx:'id_catalogo_proveedor_PK', sord:'desc', filAdd:filAdd},
        cache:true,
        async:false,
        success: function(data){
        	var proveedores = `<tr>
                                    <form name="filForm" id="filForm">
                                        <td>
                                            ${filtrosTabla('id', filAdd.id)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('nombre_proveedor', filAdd.nombre_proveedor)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('rfc', filAdd.rfc)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('telefono', filAdd.telefono)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('email', filAdd.email)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('estado', filAdd.estado)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('cp', filAdd.cp)}
                                        </td>
                                        <td>
                                            ${filtrosTabla('status', filAdd.status)}
                                        </td>
                                        <td>
                                        </td>
                                    </form>
                                </tr>`;

        	if(data.total > 0) {
                for(x in data.rows){
                    var verElimina = `<a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover eliminarProveedor" data-id_proveedor=${'integer:'+data.rows[x][0]}>
                                        <i class="hs-admin-trash g-font-size-18 g-mr-10 g-mr-15--md g-color-secondary--hover" style="color: red;"></i>
                                    </a>`;

                    var verActiva = `<a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover activarProveedor" data-id_proveedor=${'integer:'+data.rows[x][0]}>
                                        <i class="hs-admin-check-box g-font-size-18 g-mr-10 g-mr-15--md g-color-secondary--hover" style="color: green;"></i>
                                    </a>`;

                    if(data.rows[x][7] == 0) {
                        verElimina = "";
                    } else {
                        verActiva = "";
                    }

            		proveedores += `<tr>
                                        <td>${data.rows[x][0]}</td>
                                        <td>${data.rows[x][1]}</td>
                                        <td>${data.rows[x][2]}</td>
                                        <td>${data.rows[x][3]}</td>
                                        <td>${data.rows[x][4]}</td>
                                        <td>${data.rows[x][5]}</td>
                                        <td>${data.rows[x][6]}</td>
                                        <td>${data.rows[x][8]}</td>
                                        <td>
                                            <a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover editarProveedor" data-id_proveedor=${data.rows[x][0]}>
                                                <i class="hs-admin-pencil g-font-size-18 g-mr-10 g-mr-15--md g-color-secondary--hover" style="color: blue;"></i>
                                            </a>
                                            ${verElimina}${verActiva}
                                        </td>
                                    </tr>`;

            	}
            }
    		$("#bodyProveedores").html(proveedores);

            DialogProcesando('close');

            //Paginación
            var pag = paginacion(data, page);

            $("#paginacionTablas").html(pag);
        }
    });

    //Click Editar
    $(".editarProveedor").click(function () {
        datos = $(this).data();

        console.log(datos);
    });

    //Click Eliminar
    $(".eliminarProveedor").click(function () {
        datos = $(this).data();

        DialogProcesando('open');

        $.post('/minegocio/proveedores/server', {accion: 'bajaProveedor', Dat : datos}, function(data) {
            if(data.val == 0){
                DialogProcesando('close');
                verProveedores(rows, page);
                Swal.fire("PROVEEDOR DADO DE BAJA");
            } else {
                DialogProcesando('close');
            }
        }, 'json');
    });

    //Click Activar
    $(".activarProveedor").click(function () {
        datos = $(this).data();

        DialogProcesando('open');

        $.post('/minegocio/proveedores/server', {accion: 'activarProveedor', Dat : datos}, function(data) {
            if(data.val == 0){
                DialogProcesando('close');
                verProveedores(rows, page);
                Swal.fire("PROVEEDOR ACTIVADO");
            } else {
                DialogProcesando('close');
            }
        }, 'json');
    });

    //Click Ant
    clickPrev(rows, page);

    //Click Next
    clickNext(rows, page);

    //Click NumeroPag
    clickPagina(rows, page);

    //EnterFiltros
    enterFiltros(rows, 1);

    //clickQuitarFiltro
    clickQuitarFiltro(rows, 1);
}

function DialogProveedor(tipo) {
    $("#dialogProveedores").dialog({
        title: 'Proveedor',
        autoOpen: false,
        modal: true,
        width: $(".advanced-search-form").width() - 10,
        height: $(".advanced-search-form").height(),
        closeOnEscape: false,
        resizable : false,
        zIndex: 1100,
        open: function() {
            buscarEstados();
            buscarGiros();
        }
    }).dialog('open');
}

function buscarEstados() {
    DialogProcesando('open');
    var cp = $("#cp").val();
    var id_estado = 0;

    var Dat = new Object();
    if(cp > 0) {
        Dat.cp = 'integer:'+cp;
    } else {
        Dat.cp = 'integer:'+0;
    }

    $.post('/minegocio/proveedores/server', {accion: 'selectEstados', Dat : Dat}, function(data) {
        var sel = `<select id="selectEstado" name="selectEstado" style="position: inherit;top: 0;left: 0px;padding-top: revert-layer;padding-right: inherit;padding-bottom: inherit;padding-left: inherit;height: 38px;width: 100%;text-align: center;background-color: transparent;border-color: #b94a48 !important;display: ruby-base-container;">
                    ${data}
                </select>`;

        $(".selectEstadoDiv").html(sel);

        $("#selectEstado").click(function(){
            var id_estado = 'integer:'+$("#selectEstado").val();
            buscarMunicipios(id_estado);
        });


        if($("#selectEstado").val() > 0) {
            var id_estado = 'integer:'+$("#selectEstado").val();

            buscarMunicipios(id_estado);
        }
        DialogProcesando('close');
    }, 'json');
}

function buscarMunicipios(id_estado) {
    DialogProcesando('open');
    var Dat = new Object();

    if($("#cp").val() != "") {
        var cp = 'integer:'+$("#cp").val();
    } else {
        var cp = 'integer:0';
    }

    Dat.id_estado = id_estado;
    Dat.cp = cp;

    $.post('/minegocio/proveedores/server', {accion: 'selectMinicipio', Dat : Dat}, function(data) {
        var sel = `<select id="selectMunicipio" name="selectMunicipio" style="position: inherit;top: 0;left: 0px;padding-top: revert-layer;padding-right: inherit;padding-bottom: inherit;padding-left: inherit;height: 38px;width: 100%;text-align: center;background-color: transparent;border-color: #b94a48 !important;display: ruby-base-container;">
                    ${data}
                </select>`;

        $(".selectMunicipioDiv").html(sel);

        $("#selectMunicipio").click(function(){
            var id_estado = $("#selectMunicipio").val();

            console.log(id_estado);
        });
        DialogProcesando('close');
    }, 'json');
}

function buscarGiros() {
    $.post('/minegocio/proveedores/server', {accion: 'selectGiros'}, function(data) {
        var sel = `<select id="selectGiro" name="selectMunicipio" style="position: inherit;top: 0;left: 0px;padding-top: revert-layer;padding-right: inherit;padding-bottom: inherit;padding-left: inherit;height: 38px;width: 100%;text-align: center;background-color: transparent;border-color: #b94a48 !important;display: ruby-base-container;">
                    ${data}
                </select>`;

        $(".selectGiroDiv").html(sel);
    }, 'json');
}