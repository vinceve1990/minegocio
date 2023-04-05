<div class="col g-ml-45 g-ml-0--lg g-pb-65--md">
	<center><h4>Proveedores</h4></center>
	<div class="col-xs-12 col-sm-12 mb-4">
		<div class="row">
			<div class="table-responsive g-mb-100">
              <table class="table u-table--v5--bordered g-color-black">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Proveedor</th>
                    <th>RFC</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>C.P.</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody id="bodyProveedores">
                </tbody>
              </table>
            </div>
		</div>
	</div>
</div>

<div id="dialogProveedores">
  <form>
    <div class="row" style="width: 99%;">
      <div class="col-xs-12 col-sm-10 mb-4">
        <div class="row">
          <div>
            <input id="id_proveedor" class="form-control g-color-black" type="hidden">
          </div>

          <div class="col-xs-12 col-sm-4 mb-4">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre:</label>
            <input id="nombre" class="form-control g-color-black" type="text" placeholder="Nombre">
          </div>

          <div class="col-xs-12 col-sm-4 mb-4">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">RFC:</label>
            <input id="rfc" class="form-control g-color-black" type="text" placeholder="RFC">
          </div>

          <div class="col-xs-12 col-sm-4 mb-4">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Email/Correo:</label>
            <input id="email_principal" class="form-control g-color-black" type="email" placeholder="Telefono">
            <!--<select id="roles" name="roles" class="form-control g-color-black"><button type="button" class="btn btn-outline-success" id="agregaRol"><i class="fa-regular fa-users-gear"></i></button>
            </select>-->
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3 mb-3">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Telefono:</label>
            <input id="telefono" class="form-control g-color-black" type="email" placeholder="Telefono">
          </div>

          <div class="col-xs-12 col-sm-3 mb-3">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Giro:</label>
            <select id="giro" name="giro" class="form-control g-color-black">
          </div>

          <div class="col-xs-12 col-sm-3 mb-3">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Codigo Postal:</label>
            <input id="cp" class="form-control g-color-black" type="text" placeholder="C.P.">
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-3 mb-3">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Estado:</label>
            <!--<button type="button" class="btn btn-outline-success" id="agregaRol"><i class="fa-regular fa-users-gear"></i></button>-->
            <select id="estado" name="estado" class="form-control g-color-black">
            </select>
          </div>

          <div class="col-xs-12 col-sm-3 mb-3">
            <!--<button type="button" class="btn btn-outline-success" id="agregaRol"><i class="fa-regular fa-users-gear"></i></button>-->
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Municipo:</label>
            <select id="municipio" name="municipio" class="form-control g-color-black">
          </div>

          <div class="col-xs-12 col-sm-3 mb-3">
            <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Calle:</label>
          </div>
        </div>
      </div><!--info-->
    </div>
  </form>
</div>