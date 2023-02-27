$(document).ready(function() {
	//Click Login
});

function verModulos() {
	$.ajax({
        dataType:"json",
        url:"/minegocio/modulos/modulos",
        type: "POST",
        data:{accion:'informacion', fil:'permisos'},
        cache:true,
        async:false,
        success: function(data){
        	var modulos = "";

        	for(x in data.modulo){
        		modulos += `<div class="col-sm-4 col-lg-4 col-xl-3 g-mb-30">
				<!-- Panel -->
					<div class="card h-100 g-brd-gray-light-v7 g-rounded-3">
						<div class="card-block g-font-weight-300 g-pa-20">
							<div class="media">
								<div class="d-flex g-mr-15">
									<div class="u-header-dropdown-icon-v1 g-pos-rel g-width-60 g-height-60 g-bg-lightblue-v3 g-font-size-18 g-font-size-24--md g-color-white rounded-circle">
										<i class="fa-regular ${data.modulo[x]['icono']} g-absolute-centered"></i>
									</div>
								</div>
								<div class="media-body align-self-center">
									<div class="d-flex align-items-center g-mb-5">
										<span class="g-font-size-16 g-line-height-1 g-color-black">${data.modulo[x]['nombre']}</span>
										<span class="d-flex align-self-center g-font-size-0 g-ml-5 g-ml-10--md">
											<i class="g-fill-gray-dark-v9">
												<svg width="12px" height="20px" viewbox="0 0 12 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g transform="translate(-21.000000, -751.000000)">
														<g transform="translate(0.000000, 64.000000)">
															<g transform="translate(20.000000, 619.000000)">
																<g transform="translate(1.000000, 68.000000)">
																	<polygon points="6 20 0 13.9709049 0.576828937 13.3911999 5.59205874 18.430615 5.59205874 0 6.40794126 0 6.40794126 18.430615 11.4223552 13.3911999 12 13.9709049"></polygon>
																</g>
															</g>
														</g>
													</g>
												</svg>
											</i>
											<i class="g-fill-lightblue-v3">
												<svg width="12px" height="20px" viewbox="0 0 12 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g transform="translate(-33.000000, -751.000000)">
														<g transform="translate(0.000000, 64.000000)">
															<g transform="translate(20.000000, 619.000000)">
																<g transform="translate(1.000000, 68.000000)">
																	<polygon
																		transform="translate(18.000000, 10.000000) scale(1, -1) translate(-18.000000, -10.000000)"
																		points="18 20 12 13.9709049 12.5768289 13.3911999 17.5920587 18.430615 17.5920587 0 18.4079413 0 18.4079413 18.430615 23.4223552 13.3911999 24 13.9709049"></polygon>
																</g>
															</g>
														</g>
													</g>
												</svg>
											</i>
										</span>
									</div>
									<h6 class="g-font-size-14 g-font-weight-300 g-color-gray-dark-v6 mb-0">${data.modulo[x]['descripcion']}</h6>
								</div>
							</div>
						</div>
					</div>
					<!-- End Panel -->
				</div>`;

				$("#rowModulos").html(modulos);
        		//console.log(data.modulo[x]);
        	}
        }
    });
}