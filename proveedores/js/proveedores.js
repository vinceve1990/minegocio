$(document).ready(function() {
	verProveedores(2,1);

    $("#datatablePagination1Prev").click(function() {
        $("#datatablePaginationPage1").css("class","#29364d");
    })

    $("#panelConfiguraciones").css("background-color","#29364d");
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