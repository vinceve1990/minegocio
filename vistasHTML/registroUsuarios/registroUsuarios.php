<?php $title = "Registro || Kit Punto de Venta"; require '../minegocio/files/view/header.php';?>
<script type="text/javascript" src="../registroUsuarios/js/registro.js"></script>
<?php require '../minegocio/files/view/body.php'; require '../minegocio/files/view/menu.php';?>
	
	<!-- Signup -->
    <section class="g-bg-gray-light-v5">
      <div class="container g-py-20">
        <div class="row justify-content-center">
          <div class="col-sm-10 col-md-9 col-lg-6">
            <div class="u-shadow-v21 g-bg-white rounded g-py-40 g-px-30">
              <header class="text-center mb-4">
                <h2 class="h2 g-color-black g-font-weight-600">REGISTRARSE</h2>
              </header>

              <!-- Form -->
              <form class="g-py-15">
                <div class="row">
                  <div class="col-xs-12 col-sm-6 mb-4">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre:</label>
                    <input id="nombre" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="email" placeholder="Nombre">
                  </div>

                  <div class="col-xs-12 col-sm-6 mb-4">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Apellidos:</label>
                    <input id="apellidos" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="ape" placeholder="Apellidos">
                  </div>
                </div>

                <div class="mb-4">
                  <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Telefono:</label>
                  <input id="tel" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="telefono" name="tel" placeholder="__________" required="required" title="1234567890" pattern="^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$"/>
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-6 mb-4">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Giro Comercial:</label>
                    <select id="giroComercial" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15">
                      <option value="0">Seleccione un Giro Comercial</option>
                      <option value="1">Farmacias</option>
                      <option value="2">Abarrotes</option>
                    </select>
                  </div>

                  <div class="col-xs-12 col-sm-6 mb-4">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre Comercial:</label>
                    <input id="nombreComercial" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="ape" placeholder="Nombre Comercial">
                  </div>
                </div>

                <div class="mb-4">
                  <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Email:</label>
                  <input id="email" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="email" placeholder="ejemplo@gmail.com">
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-6 mb-4">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Password:</label>
                    <input id="pass" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="password">
                  </div>

                  <div class="col-xs-12 col-sm-6 mb-4">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Confirmar Password:</label>
                    <input id="passconf" class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v4 g-brd-primary--hover rounded g-py-15 g-px-15" type="password">
                  </div>
                </div>

                <div class="mb-4">
                  <button class="btn btn-md btn-block u-btn-primary g-rounded-50 g-py-13 g-px-25" type="button" id="registrarUsuarios">Registrar</button>
                </div>

              </form>
              <!-- End Form -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Signup -->

<?php require '../minegocio/files/view/footer.php'; ?>