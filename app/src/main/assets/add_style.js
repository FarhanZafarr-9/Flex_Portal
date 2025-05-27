function add_style() {
	const style = document.createElement('style');
	style.innerHTML = `
    :root {
    	/* Main Colors */
    	--main-font-color: #f0f0f0;
    	--bg-color: #121212;
    	--darker-bg-color: #0c0c0c;
    	--light-bg-color: #282828;
    	--card-background: #1a1a1a;
    	--alert-danger: #f4516c;
    	--alert-danger-light: rgb(127 29 29 / 30%);

    	/* Semi-transparent Colors */
    	--border-color: #55555555; /* Used extensively in your script */
    	--border-light: #55555533; /* Used for subtler borders */
    	--border-dark: #323232; /* Used in Student Marks border */
    	--glass-bg: #21212157; /* Used in portlet backgrounds */
    	--blur-bg: #2222229e; /* Used with backdrop-filter */

    	/* UI Colors */
    	--progress-default: #333;
    	--progress-above-avg: #A0A0A0;
    	--progress-avg: #D0D0D0;
    	--progress-below-avg: #808080;
    	--progress-min: #404040;
    	--progress-max: #B0B0B0;
    	--progress-hover: #FFD700;

    	/* Text Colors */
    	--text-primary: #ffffff;
    	--text-secondary: #c0c0c0;
    	--text-muted: #9a9a9a;
    	--text-disabled: #666666;
    	--link-color: #42a5f5;

    	/* Font Sizes */
    	--font-xs: 0.75rem;    /* 12px */
    	--font-sm: 0.875rem;   /* 14px */
    	--font-md: 1rem;       /* 16px */
    	--font-lg: 1.25rem;    /* 20px */
    	--font-xl: 1.5rem;     /* 24px */
    	--font-2xl: 2rem;      /* 32px */
    	--font-3xl: 2.5rem;    /* 40px */

    	/* Font Weights */
    	--font-light: 300;
    	--font-normal: 400;
    	--font-medium: 500;
    	--font-bold: 700;

    	/* Spacing */
    	--pad-xs: 4px;
    	--pad-sm: 8px;
    	--pad-md: 16px;
    	--pad-lg: 24px;
    	--pad-xl: 32px;

    	--mar-xs: 4px;
    	--mar-sm: 8px;
    	--mar-md: 16px;
    	--mar-lg: 24px;
    	--mar-xl: 32px;

    	/* Borders */
    	--border-radius: 8px;
    	--border-width: 0.75px;
    	--border-thick: 2.5px;

    	/* Shadows */
    	--shadow: 4px 4px 6px rgb(0 0 0 / 20%), -4px -4px 6px rgb(35 35 35 / 15%);
    	--box-shadow: #8b8b8b;
    	--glass-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

    	/* Buttons */
    	--btn-bg: #1f1f1f;
    	--btn-hover-bg: #2a2a2a;
    	--btn-active-bg: #333333;
    	--btn-disabled-bg: #2b2b2b;
    	--btn-text-color: #f0f0f0;

    	/* Inputs */
    	--input-bg: #1a1a1a;
    	--input-border: #333333;
    	--input-focus: #42a5f5;
    	--input-placeholder: #666666;

    	/* Transitions */
    	--transition-fast: 0.2s ease-in-out;
    	--transition-normal: 0.3s ease;
    	--transition-slow: 0.5s ease;

    	/* Z-Index */
    	--z-index-dropdown: 1000;
    	--z-index-modal: 1100;
    	--z-index-tooltip: 1200;
    	--z-index-toast: 1300;
    	--z-index-glass: 99;
    	--z-index-line: 998;

    	/* Blur Effects */
    	--glass-blur: blur(12px);
    	--backdrop-blur: blur(5px);
    	}

	* {
		text-decoration: none !important;
		border: 0px transparent !important;
		font-family: segoe ui;
	}

	.m-footer .m-footer__copyright {
    		color: transparent !important;
    }

    .m-footer {
        margin-top: 30px !important;
        background-color: var(--bg-color) !important;
        box-shadow: none !important;
    }

    html, body {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
        overscroll-behaviour: contain !important;
    }

    html::-webkit-scrollbar, body::-webkit-scrollbar {
        display: none !important;
    }

	*:not(th):not(td) {
		border-radius: var(--border-radius) !important;
	}

	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg,
	.m-portlet.m-portlet--primary.m-portlet--head-solid-bg,
	.m-page--fluid .m-header,
	.m-page--wide .m-header,
	.m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item:hover,
	.card {
		background-color: transparent !important;
	}

	.m-subheader .m-subheader__title.m-subheader__title--separator {
		color: var(--main-font-color) !important;
		border: none !important;
	}

	.m-subheader label, a {
		color: var(--box-shadow) !important;
	}

	a:not(.m-aside-menu .m-menu__nav > .m-menu__item > .m-menu__link):not(.m-tabs__link),
	a:hover:not(.m-aside-menu .m-menu__nav > .m-menu__item > .m-menu__link):not(.m-tabs__link) {
		text-decoration: underline !important;
	}

	.m-subheader label {
		margin-left:20px;
	}

	.m-checkbox>span {
		outline: 1px solid var(--main-font-color);
		left: 10px;
	}

	#remember {
		position:relative !important;
	}

	.m-checkbox.m-checkbox--focus>span:after {
		border:1px solid var(--main-font-color);
	}

	th {
		vertical-align: middle !important;
	}

	.img-responsive,
	.m-grid__item.m-grid__item--fluid.m-grid.m-grid--center.m-grid--hor.m-grid__item--order-tablet-and-mobile-1.m-login__content,
	.input-group-addon,
	.m-form__help,
	#m_login_forget_password,
	.m-brand__tools .m-brand__icon>i,
	.m-topbar__userpic,
	.m-grid__item .m-header {
		display: none !important;
	}

	.m-stack {
		/*background-color: var(--light-bg-color) !important;*/
		height: auto;
	}

	.m-stack.m-stack--hor.m-stack--desktop {
		padding: 0px 20px !important;
	}

	.m-grid,
	.m--skin- {
		background-color: var(--bg-color) !important;
		border-radius: 0 !important;
	}

	/*
	.progress,
	.progress .progress-bar,
	.m-checkbox>span,
	.btn {
		border-radius: calc(var(--border-radius) / 1.5) !important;
	}
	*/

	.progress,
	.progress .progress-bar	{
	    border-radius: calc(var(--border-radius) / 1.5) !important;
	}

	.m-login__signin h5 {
		padding: 20px 0px !important;
	}

	.g-recaptcha {
		border-radius: 8px !important;
		padding: 10px 0 0 8px;
	}

    .m-stack.m-stack--hor>.m-stack__item.m-stack__item--fluid {
        border: 0.75px solid #55555555 !important;
        padding: 0px 25px;
        margin-top: 50%;
        background: #161616 !important;
    }

	/*

	.m-stack.m-stack--hor>.m-stack__item.m-stack__item--fluid {
    	margin-top: 130px;
    }

	#m_aside_left {
		border-radius: 0 calc(var(--border-radius) * 2.5)
			calc(var(--border-radius) * 2.5) 0 !important;
	}

	.m-brand.m-brand--skin-dark {
		border-radius: 0 0 calc(var(--border-radius) * 2)
			calc(var(--border-radius) * 2) !important;
		background-color: var(--light-bg-color) !important;
	}
	*/

	.m-brand.m-brand--skin-dark {
		border-radius: 0 0 calc(var(--border-radius)* 2)
			calc(var(--border-radius)* 2) !important;
		/*background-color: rgb(18 18 18) !important;*/
		background-color: var(--light-bg-color) !important;
		/* box-shadow: -2px -9px 4px 4px rgb(145 145 145 / 15%) !important; */
    	outline: 2.5px solid #55555555;
	}

	input::placeholder {
		opacity: 0 !important;
	}

	thead {
		height: 50px;
	}


	.input-group.m-input-group--square>.form-control{
		background-color: var(--light-bg-color) !important;
		color: var(--main-font-color) !important;
	}

	.nav-link.m-tabs__link.active,
	.card-header,
	.m-header-head,
	.m-brand.m-brand--skin-dark,
	.m-topbar,
	th {
		background-color: var(--bg-color) !important;
	}

	.card-body,
	.progress {
		margin: 20px 0;
		/* background-color: rgb(68 68 68 / 80%) !important; */
		background-color: rgb(50 50 50 / 50%) !important;
		outline: 0.75px solid #5555555555;
	}

	.card {
		margin-top: 20px;
	}

	.card-body {
		padding-top: 30px !important;
        border: .75px solid #55555555 !important;
        margin-top: 10px !important;
	}

	.m-portlet__head,
	.m-portlet__body,
	.m-alert,
	.btn:not(.btn-link)  {
		/*background-color: var(--darker-bg-color) !important;*/
		/*background-color: rgb(75 75 75 / 4%) !important;*/
		/*background-color: var(--light-bg-color) !important;*/
        background-color: #21212157 !important;
		color: var(--main-font-color) !important;
	}

	.m-portlet__head,
	.m-portlet__body,
	.m-alert {
		margin: 30px 0 15px 0 !important;
	}

	.m-tabs__link,
	.btn-link {
		color: var(--main-font-color) !important;
		font-weight: 500 !important;
	}

	.alert.m-alert--outline.alert-warning.m-alert--icon-solid .m-alert__icon i,
	.m-aside-left-close.m-aside-left-close--skin-dark>i,
    .m-aside-left-close.m-aside-left-close--skin-dark:hover>i,
	.m-login__signin,
	.m-login__forget-password,
	.m-portlet__head-text,
	.m-portlet__head-icon,
	.m-tabs-line .m-tabs__link,
	.col-md-3 h5,
	.pull-right,
	.close, b,
	.btn-light,
	.btn-link,
	#overlay23,
	.col-md-6 h4,
	.m-table.m-table--head-bg-metal thead th,
	.col-md-12 strong,
	.m-alert {
		color: var(--main-font-color) !important;
	}


	table {
		/* border-collapse: separate !important; */
		border: 0.5px solid #55555555 !important;
	}

    table td {
        text-align: center !important;
    }

    table tr:not(:last-child) td {
        border-bottom: 0.75px solid #55555555 !important;
    }

	table th {
	    border-bottom: 0.75px solid #55555555 !important;
	}

	.pull-right {
		float:left;
		margin-bottom: 15px;
		background-color: var(--card-background) !important;
		border: 0.75px solid #55555555 !important;
		padding: 5px;
	}

	.pull-right>span {
		margin-left: 12px;
	}

	.m-checkbox {
		padding-left: 30px !important;
	}

	.m-tabs__link.active, u {
		color: var(--box-shadow) !important;
	}

	.m-login.m-login--1 .m-login__wrapper,
	.m-grid.m-grid--hor-tablet-and-mobile.m-grid--tablet-and-mobile>.m-grid__item {
		padding: 0 !important;
	}

	tr,
	td {
        background-color: var(--card-background) !important;
        color: var(--main-font-color) !important;
        margin: 2px;
	}

	.m-alert__icon,
	#overlay23,
	.m-scroll-top {
		//background-color: var(--card-background) !important;
		color: var(--main-font-color) !important;
		margin: 2px;
        background-color: #2222229e !important;
        border: 0.75px solid #55555555 !important;
        backdrop-filter: blur(10px);
	}

	.m-portlet,
	.btn-primary.m-btn--air,
	.m-header--fixed-mobile .m-header .m-header-head  {
		box-shadow: none !important;
	}

	.m-portlet__head,
	.m-portlet__body,
	.btn:not(.btn-link),
	.m-tabs__link.active,
	.m-menu__link.active,
	.card-header,
	.card-body,
	.pull-right,
	table,
	.m-scroll-top,
	.m-tabs__link.active,
	.m-alert {
		box-shadow: var(--shadow) !important;
	}

	input {
		outline: 0.75px solid #55555555;
	}

	/*
	.btn:not(.btn-link) {
		background-color: var(--light-bg-color) !important;
		background-color: var(--bg-color) !important;
	}
	*/

	.nav-link.m-tabs__link.active,
	.card-header,
	.m-alert__icon {
		/*background-color: var(--main-font-color) !important;*/
		/*background-color: var(--bg-color) !important;*/
        background-color: #0c0c0ccc !important;
		color: var(--main-font-color) !important;
		/*color: var(--bg-color) !important;*/
		font-weight: 600 !important;

	}

	.btn {
		font-weight: 600 !important;
	}

	#overlay23 {
		width: 200px !important;
		left: 30% !important;
	}

	.progress,
	.col-md-3 h5 {
		margin: 25px 0;
	}

	.bg-success {
		background-color: var(--darker-bg-color) !important;
	}

	.m-portlet__head {
		padding: 0.75rem 2.2rem;
	}

	.no-styles * {
		visibility: hidden;
	}

	.no-styles {
		visibility: visible !important;
	}

	.m-aside-menu .m-menu__nav {
		display: flex;
		flex-direction: column !important;
	}

    .m-scroll-top--shown .m-scroll-top {
        margin-bottom: 40px !important;
    }

	.m-toggle-button {
		font-weight: 500;
		padding: 10px 15px;
		margin: 10px 0;
	}

	.circular-progress-container {
		position: relative;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.circular-progress-bar {
		position: absolute;
		width: 20px;
		height: 20px;
	}

	#overlay23 {
		padding-bottom: 20px !important;
		border: 0.75px solid #55555555 !important;
	}

	/*inset 4px 4px 8px 0px rgb(145 145 145 / 15%) !important*/

	.m-brand .m-brand__tools .m-brand__icon {
		margin-top: 25px !important;
	}

	.m-brand.m-brand--skin-dark .m-brand__tools .m-brand__toggler.m-brand__toggler--active span,
	.m-brand.m-brand--skin-dark .m-brand__tools .m-brand__toggler.m-brand__toggler--active span::after,
	.m-brand.m-brand--skin-dark .m-brand__tools .m-brand__toggler.m-brand__toggler--active span::before {
		background: var(--main-font-color) !important;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
		max-width: 20px;
		max-height: 20px;
	}

	.circular-progress-container:hover .progress-ring {
		stroke: #FFD700;
		cursor: pointer;
	}

	.progress-ring {
		fill: none;
		stroke-linecap: round;
		transition: stroke-dashoffset 0.5s ease;
	}

	.m-portlet.m-portlet--head-sm .m-portlet__head {
		padding: 25px !important;
	}

	.table td,
	.table th {
		padding: .75rem !important;
	}

	.col-md-6 h4 {
		margin-top: 60px !important;
	}

	.m-alert {
    	margin-bottom: 40px;
	}

	.col-md-4 p span:nth-child(2) {
		margin-left: 20px !important;
	}

	input:-webkit-autofill {
    	transition: background-color 100s ease-in-out 0s;
	}
	.btn:not(.btn-link) {
    	margin-top: 10px !important;
	}

	/*
	.m-portlet .m-portlet__head .m-portlet__head-caption {
		border-right: 3.5px solid #121212 !important;
		border-radius: 0px !important;
	}
	*/

	.nav {
	    padding-left: 20px !important;
	}

	.m-alert,
	.m-portlet__head, .m-portlet__body,
	.btn:not(.btn-link), .m-brand.m-brand--skin-dark,
	input, .nav-link.m-tabs__link.active, .card-header   {
		outline: 0.75px solid #55555555 !important;
	}

	.card-header {
	    z-index: 1 !important;
	}

	`;
	document.head.appendChild(style);
}

add_style();