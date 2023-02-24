<?php
	$title = "Dashboards || Kit Punto de Venta";

	require '../minegocio/files/view/header.php';
	require '../minegocio/files/view/body.php';
	require '../minegocio/files/view/dashboardMenu.php';

	if(empty($paramRuta)) {
		$paramRuta = 'menuPrincipal';
	}
?>
<link rel="stylesheet" type="text/css"  href="/minegocio/perfil/css/styleImg.css" />
<link rel="stylesheet" type="text/css"  href="/minegocio/personal/css/stylePersonal.css" />
<script type="text/javascript" src="../../<?php echo $paramRuta; ?>/js/<?php echo $paramRuta; ?>.js"></script>

<main class="container-fluid px-0 g-pt-65">
	<div class="row no-gutters g-pos-rel g-overflow-x-hidden" style="height: 93vh;">
		<!-- Sidebar Nav -->
		<div id="sideNav" class="col-auto u-sidebar-navigation-v1 u-sidebar-navigation--dark">
			<ul id="sideNavMenu" class="u-sidebar-navigation-v1-menu u-side-nav--top-level-menu g-min-height-90vh mb-0">
				<!-- Dashboards -->
				<li class="u-sidebar-navigation-v1-menu-item u-side-nav--has-sub-menu u-side-nav--top-level-menu-item u-side-nav-opened has-active">
					<a class="media u-side-nav--top-level-menu-link u-side-nav--hide-on-hidden g-px-15 g-py-12" href="/minegocio/paneles/dashboards">
						<span class="d-flex align-self-center g-pos-rel g-font-size-18 g-mr-18">
							<i class="hs-admin-server"></i>
						</span>
						<span class="media-body align-self-center">Panel Principal</span>
					</a>
				</li>
				<!-- End Dashboards -->

				<!-- Notifications -->
				<li class="u-sidebar-navigation-v1-menu-item u-side-nav--has-sub-menu u-side-nav--top-level-menu-item">
					<a class="media u-side-nav--top-level-menu-link u-side-nav--hide-on-hidden g-px-15 g-py-12"  data-hssm-target="#subMenu9">
						<span class="d-flex align-self-center g-pos-rel g-font-size-18 g-mr-18">
							<i class="hs-admin-layout-list-thumb"></i>
						</span>
						<span class="media-body align-self-center">Operaciones</span>
						<span class="d-flex align-self-center u-side-nav--control-icon">
							<i class="hs-admin-angle-right"></i>
						</span>
						<span class="u-side-nav--has-sub-menu__indicator"></span>
					</a>

					<!-- Notifications: Submenu-1 -->
					<ul id="subMenu9" class="u-sidebar-navigation-v1-menu u-side-nav--second-level-menu mb-0">
					<!-- Colorful Notifications -->
						<li class="u-sidebar-navigation-v1-menu-item u-side-nav--second-level-menu-item">
							<a class="media u-side-nav--second-level-menu-link g-px-15 g-py-12" href="/minegocio/paneles/dashboards/personal">
								<span class="d-flex align-self-center g-mr-15 g-mt-minus-1">
									<i class="hs-admin-layout-cta-btn-right"></i>
								</span>
								<span class="media-body align-self-center">Personal / Roles</span>
							</a>
						</li>
						<!-- End Colorful Notifications -->

						<!-- Light Notifications -->
						<li class="u-sidebar-navigation-v1-menu-item u-side-nav--second-level-menu-item">
							<a class="media u-side-nav--second-level-menu-link g-px-15 g-py-12" href="/minegocio/paneles/dashboards/roles">
								<span class="d-flex align-self-center g-mr-15 g-mt-minus-1">
									<i class="hs-admin-layout-cta-btn-left"></i>
								</span>
								<span class="media-body align-self-center">Roles / Permisos</span>
							</a>
						</li>
						<!-- End Light Notifications -->

						<!-- Dark Notifications -->
						<li class="u-sidebar-navigation-v1-menu-item u-side-nav--second-level-menu-item">
							<a class="media u-side-nav--second-level-menu-link g-px-15 g-py-12" href="../notifications/notifications-dark.html">
								<span class="d-flex align-self-center g-mr-15 g-mt-minus-1">
									<i class="hs-admin-layout-cta-center"></i>
								</span>
								<span class="media-body align-self-center">Dark Notifications</span>
							</a>
						</li>	
						<!-- End Dark Notifications -->
						<!-- Notifications Builder -->
						<li class="u-sidebar-navigation-v1-menu-item u-side-nav--second-level-menu-item">
							<a class="media u-side-nav--second-level-menu-link g-px-15 g-py-12" href="../notifications/notifications-builder.html">
								<span class="d-flex align-self-center g-mr-15 g-mt-minus-1">
									<i class="hs-admin-infinite"></i>
								</span>
								<span class="media-body align-self-center">Notifications Builder</span>
							</a>
						</li>
						<!-- End Notifications Builder -->
					</ul>
					<!-- Notifications: Submenu-1 -->
				</li>
				<!-- End Notifications -->
				<!-- Metrics -->
				<li class="u-sidebar-navigation-v1-menu-item u-side-nav--top-level-menu-item">
					<a class="media u-side-nav--top-level-menu-link u-side-nav--hide-on-hidden g-px-15 g-py-12" href="/minegocio/paneles/dashboards">
						<span class="d-flex align-self-center g-pos-rel g-font-size-18 g-mr-18">
							<i class="hs-admin-pie-chart"></i>
						</span>
						<span class="media-body align-self-center">Consultas</span>
					</a>
				</li>
				<!-- End Metrics -->

				<!-- Packages -->
				<li class="u-sidebar-navigation-v1-menu-item u-side-nav--top-level-menu-item">
					<a class="media u-side-nav--top-level-menu-link u-side-nav--hide-on-hidden g-px-15 g-py-12" href="/minegocio/paneles/dashboards">
						<span class="d-flex align-self-center g-font-size-18 g-mr-18">
							<i class="hs-admin-medall"></i>
						</span>
						<span class="media-body align-self-center">Reportes</span>
					</a>
				</li>
				<!-- End Packages -->
			</ul>
		</div>
		
		<!-- End Sidebar Nav -->
		<?php
			$viewMod = "vistasHTML/Modulos/".$paramRuta.".php";
			
			if (file_exists($viewMod)) {
				require_once($viewMod);
			}
		?>
	</div>

</main>

<?php require '../minegocio/files/view/headerdh.php';?>

<!-- JS Plugins Init. -->
<script>
	$(document).on('ready', function () {
		// initialization of custom select
		$('.js-select').selectpicker();

		// initialization of hamburger
		$.HSCore.helpers.HSHamburgers.init('.hamburger');

		// initialization of charts
		$.HSCore.components.HSAreaChart.init('.js-area-chart');
		$.HSCore.components.HSDonutChart.init('.js-donut-chart');
		$.HSCore.components.HSBarChart.init('.js-bar-chart');

		// initialization of sidebar navigation component
		$.HSCore.components.HSSideNav.init('.js-side-nav', {
			afterOpen: function() {
				setTimeout(function() {
					$.HSCore.components.HSAreaChart.init('.js-area-chart');
					$.HSCore.components.HSDonutChart.init('.js-donut-chart');
					$.HSCore.components.HSBarChart.init('.js-bar-chart');
				}, 400);
			},
			afterClose: function() {
				setTimeout(function() {
					$.HSCore.components.HSAreaChart.init('.js-area-chart');
					$.HSCore.components.HSDonutChart.init('.js-donut-chart');
					$.HSCore.components.HSBarChart.init('.js-bar-chart');
				}, 400);
			}
		});

		// initialization of range datepicker
		$.HSCore.components.HSRangeDatepicker.init('#rangeDatepicker, #rangeDatepicker2, #rangeDatepicker3');

		// initialization of datepicker
		$.HSCore.components.HSDatepicker.init('#datepicker', {
			dayNamesMin: [
				'SU',
				'MO',
				'TU',
				'WE',
				'TH',
				'FR',
				'SA'
			]
		});

		// initialization of HSDropdown component
		$.HSCore.components.HSDropdown.init($('[data-dropdown-target]'), {dropdownHideOnScroll: false});

		// initialization of custom scrollbar
		$.HSCore.components.HSScrollBar.init($('.js-custom-scroll'));

		// initialization of popups
		$.HSCore.components.HSPopup.init('.js-fancybox', {
			btnTpl: {
				smallBtn: '<button data-fancybox-close class="btn g-pos-abs g-top-25 g-right-30 g-line-height-1 g-bg-transparent g-font-size-16 g-color-gray-light-v3 g-brd-none p-0" title=""><i class="hs-admin-close"></i></button>'
			}
		});
	});
</script>
<?php require '../minegocio/files/view/footer.php'; ?>