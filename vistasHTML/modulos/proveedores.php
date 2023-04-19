<div class="col g-ml-45 g-ml-0--lg g-pb-65--md advanced-search-form">

  <div class="media">
    <div class="media-body align-self-center text-center">
      <h1 class="g-font-weight-350 g-font-size-28 g-color-black mb-0">Proveedores</h1>
    </div>

    <div class="media-body align-self-center text-center">
      <a class="btn btn-xl u-btn-primary g-width-180--md g-ml-12 g-color-secondary--hover2" style="color: white;background: green; size: 14;font-weight: bold;" id="newProveedor"><i class="hs-admin-view-list"></i>  Proveedor</a>
    </div>
  </div>

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
                    <th>Status</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody id="bodyProveedores">
                </tbody>
              </table>
              <center id="paginacionTablas"></center>              
      </div>
		</div>
	</div>
</div>

<div id="dialogProveedores" style="display: none">
  <div class="g-pa-20">
    <div class="row">
      <div class="col-md-3 g-mb-30 g-mb-0--md">
        <div class="h-100 g-brd-around g-brd-gray-light-v7 g-rounded-4 g-pa-15 g-pa-20--md">
          <!-- User Information -->
          <section class="text-center g-mb-30 g-mb-50--md">
            <h3 class="g-font-weight-300 g-font-size-20 g-color-black mb-0">Charlie Bailey</h3>
          </section>
          <!-- User Information -->

          <!-- Profile Sidebar -->
          <section>
            <ul class="list-unstyled mb-0">
              <li class="g-brd-top g-brd-gray-light-v7 mb-0">
                <a class="d-flex align-items-center u-link-v5 g-parent g-py-15 active" href="../app-views/app-profile.html">
                  <span class="g-font-size-18 g-color-gray-light-v6 g-color-primary--parent-hover g-color-primary--parent-active g-mr-15">
                    <i class="hs-admin-user"></i>
                  </span>
                  <span class="g-color-gray-dark-v6 g-color-primary--parent-hover g-color-primary--parent-active">Información General</span>
                </a>
              </li>
              <li class="g-brd-top g-brd-gray-light-v7 mb-0">
                <a class="d-flex align-items-center u-link-v5 g-parent g-py-15" href="../app-views/app-profile-biography.html">
                  <span class="g-font-size-18 g-color-gray-light-v6 g-color-primary--parent-hover g-color-primary--parent-active g-mr-15">
                    <i class="hs-admin-write"></i>
                  </span>
                  <span class="g-color-gray-dark-v6 g-color-primary--parent-hover g-color-primary--parent-active">Cuentas</span>
                </a>
              </li>
              <li class="g-brd-top g-brd-gray-light-v7 mb-0">
                <a class="d-flex align-items-center u-link-v5 g-parent g-py-15" href="../app-views/app-profile-interests.html">
                  <span class="g-font-size-18 g-color-gray-light-v6 g-color-primary--parent-hover g-color-primary--parent-active g-mr-15">
                    <i class="hs-admin-medall"></i>
                  </span>
                  <span class="g-color-gray-dark-v6 g-color-primary--parent-hover g-color-primary--parent-active">Contactos</span>
                </a>
              </li>
            </ul>
          </section>
          
        </div>
      </div>


      <!-- Información General -->
      <div class="col-md-9">
        <div class="h-100 g-brd-around g-brd-gray-light-v7 g-rounded-4 g-pa-15 g-pa-20--md">
          <form class="js-validate" novalidate="novalidate" id="formInfoPrincipal">
            <header>
              <h2 class="text-uppercase g-font-size-12 g-font-size-default--md g-color-black mb-0">Información General</h2>
            </header>

            <hr class="d-flex g-brd-gray-light-v7 g-my-15 g-my-30--md">

            <div class="row g-mb-20">
              <div class="col-md-3 align-self-center g-mb-5 g-mb-0--md">
                <label class="mb-0" for="#firstName">Nombre Proveedor:</label>
              </div>

              <div class="col-md-9 align-self-center">
                <div class="form-group g-pos-rel mb-0 has-success">
                  <span class="g-pos-abs g-top-0 g-right-0 d-block g-width-40 h-100 opacity-0 g-opacity-1--success">
                  <i class="hs-admin-check g-absolute-centered g-font-size-default g-color-secondary"></i>
                </span>
                  <input id="firstName" name="firstName" class="form-control h-100 form-control-md g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-brd-primary--error g-rounded-4 g-px-20 g-py-12" type="text" value="Charlie" required="required" data-msg="This field is mandatory" data-error-class="u-has-error-v3" data-success-class="has-success" aria-required="true" aria-invalid="false">
                </div>
              </div>
            </div>

            <div class="row g-mb-20">
              <div class="col-md-3 align-self-center g-mb-5 g-mb-0--md">
                <label class="mb-0" for="#lastName">RFC:</label>
              </div>

              <div class="col-md-9 align-self-center">
                <div class="form-group g-pos-rel mb-0 has-success">
                  <span class="g-pos-abs g-top-0 g-right-0 d-block g-width-40 h-100 opacity-0 g-opacity-1--success">
                  <i class="hs-admin-check g-absolute-centered g-font-size-default g-color-secondary"></i>
                </span>
                  <input id="lastName" name="lastName" class="form-control h-100 form-control-md g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-brd-primary--error g-rounded-4 g-px-20 g-py-12" type="text" value="Bailey" required="required" data-msg="This field is mandatory" data-error-class="u-has-error-v3" data-success-class="has-success" aria-required="true" aria-invalid="false">
                </div>
              </div>
            </div>

            <div class="row g-mb-20">
              <div class="col-md-3 align-self-center g-mb-5 g-mb-0--md">
                <label class="mb-0" for="#email">Email</label>
              </div>

              <div class="col-md-9 align-self-center">
                <div class="form-group g-pos-rel mb-0 has-success">
                  <span class="g-pos-abs g-top-0 g-right-0 d-block g-width-40 h-100 opacity-0 g-opacity-1--success">
                  <i class="hs-admin-check g-absolute-centered g-font-size-default g-color-secondary"></i>
                </span>
                  <input id="email" name="email" class="form-control h-100 form-control-md g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-brd-primary--error g-rounded-4 g-px-20 g-py-12" type="email" value="example@example.com" required="required" data-msg="This field is mandatory" data-error-class="u-has-error-v3" data-success-class="has-success" aria-required="true" aria-invalid="false">
                </div>
              </div>
            </div>

            <div class="row g-mb-20">
              <div class="col-md-3 align-self-center g-mb-5 g-mb-0--md">
                <label class="mb-0">Estado:</label>
              </div>

              <div class="col-md-9 align-self-center">
                <div class="row g-mx-minus-10">
                  <div class="col-md align-self-center g-px-10 g-mb-20 g-mb-0--md">
                    <div class="form-group u-select--v2 g-pos-rel g-brd-gray-light-v7 g-rounded-4 mb-0">
                      <span class="g-pos-abs g-top-0 g-right-0 d-block g-width-40 h-100 opacity-0 g-opacity-1--success">
                        <i class="hs-admin-check g-absolute-centered g-font-size-default g-color-secondary"></i>
                      </span>
                      <div class="dropdown bootstrap-select js-select u-select--v2-select dropup">
                        <select class="js-select u-select--v2-select" required="required" style="display: none;" tabindex="-98" aria-required="true">
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                    </div>
                    <i class="hs-admin-angle-down g-absolute-centered--y g-right-0 g-color-gray-light-v6 ml-auto g-mr-15"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-mb-20">
              <div class="col-md-3 align-self-center g-mb-5 g-mb-0--md">
                <label class="mb-0" for="#phone">Telefono:</label>
              </div>

              <div class="col-md-9 align-self-center">
                <div class="row g-mx-minus-10">
                  <div class="col-auto align-self-center g-width-270 g-px-10">
                    <div class="form-group g-pos-rel mb-0">
                      <span class="g-pos-abs g-top-0 g-right-0 d-block g-width-40 h-100 opacity-0 g-opacity-1--success">
                      <i class="hs-admin-check g-absolute-centered g-font-size-default g-color-secondary"></i>
                    </span>
                      <input id="phone" name="phone" class="form-control h-100 form-control-md g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-brd-primary--error g-rounded-4 g-px-20 g-py-12" type="tel" value="771 111 1234" required="required" data-msg="This field is mandatory" data-error-class="u-has-error-v3" data-success-class="has-success" aria-required="true">
                    </div>
                  </div>

                  <div class="col align-self-center g-hidden-md-down g-px-10">
                    <em class="d-flex align-self-center align-items-center g-font-style-normal g-color-gray-dark-v6">
                    <span class="g-pos-rel g-width-18 g-height-18 g-bg-secondary g-brd-around g-brd-secondary rounded-circle">
                      <i class="hs-admin-check g-absolute-centered g-font-weight-800 g-font-size-8 g-color-white" title="Confirmed"></i>
                    </span>
                    <span class="g-hidden-lg-down g-font-weight-300 g-font-size-default g-color-secondary g-ml-8">Confirmed</span>
                  </em>
                  </div>
                </div>
              </div>
            </div>

            <hr class="d-flex g-brd-gray-light-v7 g-my-15 g-my-30--md">

            <div>
              <button class="btn btn-md btn-xl--md u-btn-secondary g-width-160--md g-font-size-12 g-font-size-default--md g-mb-10" type="submit">Guardar</button>
              <button class="btn btn-md btn-xl--md u-btn-outline-gray-dark-v6 g-font-size-12 g-font-size-default--md g-mr-10 g-mb-10" type="reset">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      <!-- End Información General -->
    </div>
  </div>
</div>