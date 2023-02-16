
<div class="container" id="advanced-search-form">
    <h4>DATOS PERSONALES</h4><br>
    <form>
      <div class="row">
        <!--Foto-->
        <?php require '../minegocio/vistasHTML/foto.php'; ?>
        <!--Foto-->
        <!--info-->
        <div class="col-xs-12 col-sm-10 mb-4">
          <div class="row">
            <div>
              <input id="id_persona" class="form-control g-color-black" type="hidden">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre:</label>
              <input id="nombre" class="form-control g-color-black" type="text" placeholder="Nombre">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Apellidos:</label>
              <input id="apellidos" class="form-control g-color-black" type="text" placeholder="Apellidos">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Sexo:</label>
               <div class="radio">
                    <label class="radio-inline" class="form-control g-color-black">
                        <input type="radio" name="optradio" id="Rmas" value="1">Masculino</label>
                    <label class="radio-inline" class="form-control g-color-black">
                        <input type="radio" name="optradio" id="Rfem" value="2">Femenino</label>
                </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Telefono:</label>
              <input id="telefono" class="form-control g-color-black" type="email" placeholder="Telefono">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Email:</label>
              <input id="email" class="form-control g-color-black" type="ape" placeholder="Email">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">CURP:</label>
              <input id="CURP" class="form-control g-color-black" type="ape" placeholder="CURP">
            </div>
          </div>
        </div><!--info-->
      </div>

      <h4>INFORMACIÒN DE LA CUENTA</h4><br>
      <div class="row">
            <div>
              <input id="id_usuario" class="form-control g-color-black" type="hidden">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Usuario:</label>
              <input id="usuario" class="form-control g-color-black" type="usuario" placeholder="Usuario">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Cambio/Actual Contraseña:</label>
              <input id="password" class="form-control g-color-black" type="password" placeholder="Cambio/Actual Contraseña">
            </div>

            <div class="col-xs-12 col-sm-4 mb-4">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre Comercial:</label>
              <input id="nombreComercial" class="form-control g-color-black" type="ape" placeholder="Nombre Comercial">
            </div>
          </div>
      <div class="clearfix"></div>
      <button class="btn btn-md btn-block u-btn-primary g-rounded-10 g-py-13 g-px-25" type="button" id="guardarPerfil">Guardar</button>
    </form>
</div>