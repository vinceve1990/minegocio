<?php $title = "Registro || Kit Punto de Venta"; require '../minegocio/files/view/header.php';?>
<script type="text/javascript" src="../login/js/recuperarPass.js"></script>
<?php require '../minegocio/files/view/menu.php';?>

    <!-- Login -->
    <section class="container g-py-150">
      <div class="row justify-content-center">
        <div class="col-sm-8 col-lg-6">
          <div class="g-brd-around g-brd-gray-light-v4 rounded g-py-40 g-px-30">
            <header class="text-center mb-4">
              <h2 class="h2 g-color-black g-font-weight-600">Recuperar Contraseña</h2>
            </header>

            <!-- Form -->
            <form class="g-py-15">
              <div class="mb-4">
                <div class="input-group g-brd-primary--focus">
                  <div class="input-group-prepend">
                    <span class="input-group-text g-width-45 g-brd-right-none g-brd-gray-light-v4 g-color-gray-dark-v5"><i class="icon-finance-067 u-line-icon-pro"></i></span>
                  </div>
                  <input class="form-control g-color-black g-bg-white g-brd-gray-light-v4 g-py-15 g-px-15" type="email" id="correo" placeholder="Correo">
                </div>
              </div>

              <div class="mb-4">
                <button class="btn btn-md btn-block u-btn-primary g-py-13" type="button" id="enviarPasss">Enviar Contraseña</button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </section>
    <!-- End Login -->

<?php require '../minegocio/files/view/footer.php'; ?>