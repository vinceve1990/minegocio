$(document).ready(function() {
	verInsumos(5,1);

    $("#datatablePagination1Prev").click(function() {
        $("#datatablePaginationPage1").css("class","#29364d");
    })

    $("#panelOperaciones").css("background-color","#29364d");
});

function verInsumos(rows, page) {
    var filAdd = new Object();
    filAdd.id = "";
    filAdd.codigoI = "";
    filAdd.codigoB = "";
    filAdd.descripcion = "";
    filAdd.umed = "";
    filAdd.status = "";

    //Recuperar Filtros
    filAdd = recuperarFil(filAdd);

    DialogProcesando('open');
    $.ajax({
        dataType:"json",
        url:"/minegocio/insumos/server",
        type: "POST",
        data:{accion:'informacion', rows:rows, page:page, sidx:'id_catalogo_proveedor_PK', sord:'desc', filAdd:filAdd},
        cache:true,
        async:false,
        success: function(data){
            var proveedores = `<tr>
                                    <form name="filForm" id="filForm">
                                        <td>
                                            ${filtrosTablaText('id_catalogo_insumos_PK', filAdd.id)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('codigo', filAdd.codigoI)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('codigo_barras', filAdd.codigoB)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('descripcion_insumo', filAdd.descripcion)}
                                        </td>
                                        <td>
                                            ${filtrosTablaText('nomenclatura', filAdd.umed)}
                                        </td>
                                        <td>
                                        </td>
                                        <td>
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
                    var verElimina = `<a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover eliminarInsumo" data-id_insumo=${'integer:'+data.rows[x][0]}>
                                        <i class="hs-admin-trash g-font-size-18 g-mr-10 g-mr-15--md g-color-secondary--hover" style="color: red;"></i>
                                    </a>`;

                    var verActiva = `<a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover activarInsumo" data-id_insumo=${'integer:'+data.rows[x][0]}>
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
                                            <a class="js-edit u-link-v5 g-color-gray-light-v6 g-color-secondary--hover editarInsumo" data-id_insumo=${data.rows[x][0]} data-nom_proveedor="${data.rows[x][1]}">
                                                <i class="hs-admin-pencil g-font-size-18 g-mr-10 g-mr-15--md g-color-secondary--hover" style="color: blue;"></i>
                                            </a>
                                            ${verElimina}${verActiva}
                                        </td>
                                    </tr>`;

                }
            }
            $("#bodyProductos").html(proveedores);

            DialogProcesando('close');

            //Paginación
            var pag = paginacion(data, page);

            $("#paginacionTablas").html(pag);
        }
    });

    //Click Ant
    clickPrev(rows, page, "verInsumos(rows, page)");

    //Click Next
    clickNext(rows, page, "verInsumos(rows, page)");

    //Click NumeroPag
    clickPagina(rows, page, "verInsumos(rows, page)");

    //EnterFiltros
    enterFiltros(rows, 1);

    //ClickFiltros
    clickFiltros(rows, 1);

    //clickQuitarFiltro
    clickQuitarFiltro(rows, 1);
}