<?php

?>
<div class="container" id="advanced-search-form" style="max-width: 1000vh !important;">
    <h4>REGISTRO DE PERSONAL / ROLES</h4><br>
    <table id="GridPersonal"></table>
</div>

<div id="dialogPersonal" style="display: none">
	<h4 id="tituloDialog"></h4><br>
    <form>
      <div class="row" style="width: 99%;">
        <!--Foto-->
        <?php require '../minegocio/vistasHTML/foto.php'; ?>
        <!--Foto-->
        <!--info-->
        <div class="col-xs-12 col-sm-10 mb-4">
          <div class="row">
            <div>
              <input id="id_persona" class="form-control g-color-black" type="hidden">
              <input id="id_usuario" class="form-control g-color-black" type="hidden">
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
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Rol:</label><button type="button" class="btn btn-outline-success" id="agregaRol"><i class="fa-regular fa-users-gear"></i></button>
              <select id="roles" name="roles" class="form-control g-color-black">
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-3 mb-3">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Telefono:</label>
              <input id="telefono" class="form-control g-color-black" type="email" placeholder="Telefono">
            </div>

            <div class="col-xs-12 col-sm-3 mb-3">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Email:</label>
              <input id="email" class="form-control g-color-black" type="ape" placeholder="Email">
            </div>

            <div class="col-xs-12 col-sm-3 mb-3">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">CURP:</label>
              <input id="CURP" class="form-control g-color-black" type="ape" placeholder="CURP">
            </div>

            <div class="col-xs-12 col-sm-3 mb-3">
              <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Sexo:</label>
               <div class="radio">
                    <label class="radio-inline" class="form-control g-color-black">
                        <input type="radio" name="optradio" id="Rmas" value="1">Masculino</label>
                    <label class="radio-inline" class="form-control g-color-black">
                        <input type="radio" name="optradio" id="Rfem" value="2">Femenino</label>
                </div>

            </div>
          </div>
        </div><!--info-->
      </div>
    </form>
</div>

<div id="dialogRoles" style="display: none">
    <form>
        <div class="col-xs-12 col-sm-12 mb-12">
            <div class="row">
                <div class="col-xs-12 col-sm-12 mb-12">
                    <label class="g-color-gray-dark-v2 g-font-weight-600 g-font-size-13">Nombre Rol:</label>
                    <input id="nombreRol" class="form-control g-color-black" type="text" placeholder="Nombre Rol">
                </div>
            </div>
        </div>
    </form>
</div>