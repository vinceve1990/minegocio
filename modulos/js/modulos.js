$(document).ready(function() {
	
});

function verModulos(id, id_rol) {
	$("#rowModulos").html("");

	var Dat = new Object();

	Dat.id_categoria_PK = "integer:"+id;

	$.ajax({
        dataType:"json",
        url:"/minegocio/modulos/modulos",
        type: "POST",
        data:{accion:'informacion', fil:'permisos', Dat:Dat},
        cache:true,
        async:false,
        success: function(data){
        	var modulos = "";

        	for(x in data.modulo){
        		modulos += `<div class="col-sm-4 col-lg-4 col-xl-3 g-mb-30">
				<!-- Panel -->
					<div class="card h-100 g-brd-gray-light-v7 g-rounded-3 moduloClick" data-id_interfaz="${data.modulo[x]['id_interfaz']}" data-id_rol="${id_rol}">
						<div class="card-block g-font-weight-300 g-pa-20">
							<div class="media">
								<div class="d-flex g-mr-15">
									<div class="u-header-dropdown-icon-v1 g-pos-rel g-width-60 g-height-60 g-bg-lightblue-v3 g-font-size-18 g-font-size-24--md g-color-white rounded-circle" style="background-color: #${data.modulo[x]['color']} !important;">
										<i class="fa-regular ${data.modulo[x]['icono']} g-absolute-centered"></i>
									</div>
								</div>
								<div class="media-body align-self-center">
									<div class="d-flex align-items-center g-mb-5">
										<span class="g-font-size-16 g-line-height-1 g-color-black">${data.modulo[x]['nombre']}</span>
										<span class="d-flex align-self-center g-font-size-0 g-ml-5 g-ml-10--md">
											${data.modulo[x]['checkbox']}
										</span>
									</div>
									<h6 class="g-font-size-13 g-font-weight-300 g-color-gray-dark-v6 mb-0">${data.modulo[x]['descripcion']}</h6>
								</div>
							</div>
						</div>
					</div>
					<!-- End Panel -->
				</div>`;

				$("#rowModulos").html(modulos);
        	}
        }
    });

    //Click Modulos
	$(".moduloClick").click(function () {
		datos = $(this).data();

		var Dat = new Object();

		Dat.id_interfaz_PK = datos['id_interfaz'];
		Dat.id_rol = datos['id_rol'];

		if($("#inter"+datos['id_interfaz']).prop("checked") == true) {
			$("#inter"+datos['id_interfaz']).prop("checked", false);

			guardarPermiso(Dat);
		} else {
			$("#inter"+datos['id_interfaz']).prop("checked", true);

			guardarPermiso(dat);
		}
	});
}

function verCategorias(id_rol) {
	$("#rowCategorias").html("");
	
	DialogProcesando('open');
	
	var Dat = new Object();

	Dat.id_rol_PK = "integer:"+id_rol;

	$.ajax({
        dataType:"json",
        url:"/minegocio/modulos/modulos",
        type: "POST",
        data:{accion:'categorias', Dat:Dat},
        cache:true,
        async:false,
        success: function(data){
        	var categoria = "";

        	var tot = data.count;

        	var widthTot = $("#rowCategorias").width();

        	var widthCat = widthTot / tot;
        	for(x in data.categorias){
        		categoria += `<div class="categoriaClick g-font-weight-300 g-pa-20" style="height: auto; background-color: #ddfaf8 !important; width: ${widthCat}px !important;" data-id_categorias="${data.categorias[x]['id_catalogo_categoria_PK']}">
					<div class="media">
						<div class="d-flex g-mr-5">
							<div class="u-header-dropdown-icon-v1 g-pos-rel g-width-30 g-height-30 g-bg-lightblue-v3 g-font-size-18 g-font-size-18--md g-color-white rounded-circle" style="background-color: #${data.categorias[x]['color']} !important;">
								<i class="fa-solid ${data.categorias[x]['icono']} g-absolute-centered"></i>
							</div>
						</div>
						<div class="media-body align-self-center">
							<div class="d-flex align-items-center">
								<span class="g-font-size-13 g-line-height-1 g-color-black" style="font-weight: bold;">${data.categorias[x]['nombre']}</span>
								
							</div>
						</div>
					</div>
				</div>`;

				$("#rowCategorias").html(categoria);
        	}
        	DialogProcesando('close');
        }
    });

    /*Click Categorias*/
	$(".categoriaClick").click(function () {
		datos = $(this).data();

		verModulos(datos['id_categorias'], id_rol);

		$(".categoriaClick").css("background-color","#ddfaf8");

		$(this).css("background-color","#f4d796");
	});
}

function guardarPermiso(dat) {
	$.ajax({

	});
}