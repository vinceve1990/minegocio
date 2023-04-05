$(document).ready(function() {
	verProveedores();

    //Click Editar
    $(".editarProveedor").click(function () {
        datos = $(this).data();

        console.log(datos);
    });

    //Click Eliminar
    $(".eliminarProveedor").click(function () {
        datos = $(this).data();

        console.log(datos);
    });

    //Click Activar
    $(".activarProveedor").click(function () {
        datos = $(this).data();

        console.log(datos);
    });
});

function verProveedores() {
	$.ajax({
        dataType:"json",
        url:"/minegocio/proveedores/server",
        type: "POST",
        data:{accion:'informacion', rows:'10', page:'1', sidx:'id_catalogo_proveedor_PK', sord:'desc'},
        cache:true,
        async:false,
        success: function(data){
        	var proveedores = "";

        	for(x in data.rows){
                var verElimina = `<a class="d-flex align-items-center u-link-v5 g-bg-gray-light-v8--hover g-font-size-12 g-font-size-default--md g-color-gray-dark-v6 g-px-25 g-py-14 eliminarProveedor" data-id_proveedor=${data.rows[x][0]}>
                                    <i class="hs-admin-trash g-font-size-18 g-mr-10 g-mr-15--md" style="color: red;"></i>
                                </a>`;

                var verActiva = `<a class="d-flex align-items-center u-link-v5 g-bg-gray-light-v8--hover g-font-size-12 g-font-size-default--md g-color-gray-dark-v6 g-px-25 g-py-14 activarProveedor" data-id_proveedor=${data.rows[x][0]}>
                                    <i class="hs-admin-check-box g-font-size-18 g-mr-10 g-mr-15--md" style="color: green;"></i>
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
                                    <td>
                                        <a class="d-flex align-items-center u-link-v5 g-bg-gray-light-v8--hover g-font-size-12 g-font-size-default--md g-color-gray-dark-v6 g-px-25 g-py-14 editarProveedor" data-id_proveedor=${data.rows[x][0]}>
                                            <i class="hs-admin-pencil g-font-size-18 g-mr-10 g-mr-15--md" style="color: blue;"></i>
                                        </a>
                                        ${verElimina}${verActiva}
                                    </td>
                                </tr>`;

				$("#bodyProveedores").html(proveedores);
        	}
        }
    });
}