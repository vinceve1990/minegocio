var activeClass = "InfoPrincipal";
$(document).ready(function() {
	verProveedores(5,1);

    $("#datatablePagination1Prev").click(function() {
        $("#datatablePaginationPage1").css("class","#29364d");
    })

    $("#panelOperaciones").css("background-color","#29364d");

    $("#newProveedor").click(function() {
        DialogProveedor('altaProveedor', "");

        $("#InfoCuentas").hide();
        $("#InfoContactos").hide();

        $("#InfoPrincipal").click();
    });

    /*Click de formInfoPrincipal*/
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
        var TokenEncryp = encrypt(Token);

        if($("#selectEstado").val() > 0 && $("#selectMunicipio").val() > 0 && $("#selectGiro").val() > 0) {
            $.post('/minegocio/proveedores/server', {accion: 'altaProveedor', Dat : Dat, token : TokenEncryp}, function(data) {
                DialogProcesando('close');
                if(data.val == 0) {
                    verProveedores(5, 1);
                    limpiarFormulario();
                    $("#dialogProveedores").dialog('close');
                    Swal.fire("ALTA DE PROVEEDOR CON EXITO");
                } else {
                    Swal.fire(
                      data.mensaje,
                      '',
                      'warning'
                    )
                }
                return false;
            }, 'json');
        } else {
            var mensaje = $("#selectEstado").val() == 0 ? "Seleccione un Estado" : $("#selectMunicipio").val() == 0 ? "Seleccione un Municipio" : "Seleccione un Giro";
            Swal.fire(
              mensaje,
              '',
              'warning'
            );
            DialogProcesando('close');
        }

        return false;
    });

    formInfoPrincipal.addEventListener("reset", (e) => {
        if (e.returnValue == true) {
            $("#dialogProveedores").dialog("close");
        }
    });
    /*Fin Click de formInfoPrincipal*/

    /*Click de formInfoCuentas*/
    $.HSCore.components.HSValidation.init('.js-validate');

    let formInfoCuentas = document.getElementById("formInfoCuentas");

    formInfoCuentas.addEventListener("reset", (e) => {
        if (e.returnValue == true) {
            $("#dialogProveedores").dialog("close");
        }
    });
    /*Fin Click de formInfoCuentas*/
});

function verProveedores(rows, page) {
    var filAdd = new Object();
    filAdd.id = "";
    filAdd.nombre_proveedor = "";
    filAdd.rfc = "";
    filAdd.telefono = "";
    filAdd.email = "";
    filAdd.estado = 0;
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
                                            ${filtrosTablaText('id', filAdd.id)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('nombre_proveedor', filAdd.nombre_proveedor)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('rfc', filAdd.rfc)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('telefono', filAdd.telefono)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('email', filAdd.email)}
                                        </td>
                                        <td>
                                            ${filtrosTablaSelect('estado', filAdd.estado, 1)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('cp', filAdd.cp)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('status', filAdd.status)}
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
                                            <a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover editarProveedor" data-id_proveedor=${data.rows[x][0]} data-nom_proveedor="${data.rows[x][1]}">
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

        DialogProveedor('editaProveedor', datos, filAdd);

        $("#InfoCuentas").show();
        $("#InfoContactos").show();
        $("#InfoPrincipal").click();
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
    clickPrev(rows, page, "verProveedores(rows, page)");

    //Click Next
    clickNext(rows, page, "verProveedores(rows, page)");

    //Click NumeroPag
    clickPagina(rows, page, "verProveedores(rows, page)");

    //EnterFiltros
    enterFiltros(rows, 1, "verProveedores(rows, page)");

    //ClickFiltros
    clickFiltros(rows, 1, "verProveedores(rows, page)");

    //clickQuitarFiltro
    clickQuitarFiltro(rows, 1, "verProveedores(rows, page)");
}

function DialogProveedor(tipo, datos, filAdd = '') {
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
            $("#textNombreProveedor").text(datos['nom_proveedor']);
            buscarEstados();
            buscarGiros();

            /*Clicks para la informcaion*/
            clickClassMenu();

            $(".classocultar").hide();

            /*Llenar informacion del proveedor*/
            filAdd.id = datos['id_proveedor'];
            informacion_proveedor(filAdd);
        }
    }).dialog('open');
}

function informacion_proveedor(filAdd) {
    DialogProcesando('open');
    $.post('/minegocio/proveedores/server', {accion: 'informacion', rows:10, page:1, sidx:'id_catalogo_proveedor_PK', sord:'desc', filAdd:filAdd}, function(data) {
        console.log(data.rows[0]);
        $("#nombreProveedor").val(data.rows[0][1]);
        $("#rfc").val(data.rows[0][2]);
        $("#email").val(data.rows[0][4]);
        $("#telefonoProveedor").val(data.rows[0][3]);
        $("#cp").val(data.rows[0][6]);
        $("#selectEstadoDiv").val(data.rows[0][5]);
        $("#selectMunicipioDiv").val(data.rows[0][9]);
        $("#calle").val(data.rows[0][10]);
        $("#selectGiroDiv").val(data.rows[0][11]);
        DialogProcesando('close');
    }, 'json');
}

function buscarEstados() {
    DialogProcesando('open');
    var cp = $("#cp").val();
    var id_estado = 0;

    var Dat = new Object();
    Dat.selected = 'integer:'+0;
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

function limpiarFormulario() {
    document.getElementById("formInfoPrincipal").reset();
}