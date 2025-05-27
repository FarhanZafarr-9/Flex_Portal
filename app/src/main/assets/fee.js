function add_fee(){
	const style = document.createElement('style');
	style.innerHTML = `

	.m-footer,
	.flaticon-more,
	span.rdosp {
		display: none !important;
	}

	.m-portlet__head {
		border-radius: calc(var(--border-radius) * 0.85) !important;
	    margin: 15px 0;
	}

	.m-brand.m-brand--skin-dark
	{
		background-color: var(--card-background) !important;
		border-bottom-right-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
		border-bottom: var(--border-thick) solid var(--border-color) !important;
		height: 80% !important;
	}

	.m-portlet__body,
	.m-portlet__head {

		color: var(--main-font-color) !important;
		backdrop-filter: var(--glass-blur) !important;
		border-radius: var(--border-radius) !important;
	}

	.m-portlet__body
	{
	    background-color: var(--glass-bg) !important;
	}

    .m-portlet__head
    {
        background-color: var(--secondary-bg-color) !important;
        height: 4rem !important;
    }

	.col-md-6 {
	    margin-top: var(--mar-lg);
	}

	.table {
		border-radius: var(--border-radius) !important;
	}

	.table th ,
	.table td {
		vertical-align: middle !important;
	    padding: 0.75rem !important;
	    text-align: left !important;
	}

	td {
		border-bottom: var(--border-width) solid var(--border-color) !important;
	}

	.col-md-12
	{
	    border-radius: var(--border-radius);
	}

	strong a, td a.edit, label a {
	    color: var(--main-font-color) !important;
	    text-decoration: underline !important;
	}

	.m-section {
	    margin: 0 !important;
	}

	.table th {
		background-color: var(--bg-color) !important;
		color: var(--main-font-color) !important;
		border-bottom: var(--border-thick) solid var(--border-color) !important;
	}

    .table td {
        background-color: var(--secondary-bg-color) !important;
        text-wrap-mode: nowrap !important;
    }

	.mr-auto, .m-subheader__title,
	.alert.m-alert--outline.alert-info .close,
	strong {
	    color: var(--main-font-color) !important;
	}

	.m-subheader__title {
		padding-right: var(--pad-sm) !important;
		margin-right: var(--mar-sm) !important;
	}

	input {
	    margin: var(--mar-sm);
	}

	.btn,
	.m-portlet__body,
	.m-portlet__head,
	.table,
	.m-scroll-top,
	.progress.m-progress--lg,
	.m-list-timeline__items .m-list-timeline__item,
	textarea.form-control.m-input.m-input--air,
	.m-demo,
	.col-md-12:not(:last-of-type),
	.col-lg-12
	{
		border: var(--border-width) solid var(--border-color) !important;
	}

	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg {
		box-shadow: none !important;
	}

	.col-md-12:not(.col-lg-12 .col-md-12),
	.col-lg-12{
		background-color: var(--blur-bg) !important;
		border-radius: var(--border-radius) !important;
		border: var(--border-width) solid var(--border-color) !important;
	}

	.m-grid.m-grid--hor.m-grid--root.m-page,
	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg,
	.m-body,
	.m-stack.m-stack--ver.m-stack--desktop,
	.m-container.m-container--fluid.m-container--full-height,
	header.m-grid__item.m-header,
	div#m_header_topbar,
	.m-portlet.m-portlet--primary.m-portlet--head-solid-bg,
	.m-demo .m-demo__preview,
	body {
		background-color: transparent !important;
	}

	.m-portlet.m-portlet--primary.m-portlet--head-solid-bg {
    	box-shadow: none !important;
	}

	.btn, button {
	    border-radius: calc(var(--border-radius) * 0.85) !important;
	    background-color: var(--btn-active-bg) ;
	    box-shadow: var(--glass-shadow) !important;
	    color: var(--main-font-color);
    	padding: var(--pad-sm) !important;
    	margin: var(--mar-sm) 0 !important;
	}

	.btn-brand:hover {
		background-color: var(--btn-active-bg) !important;
	}

	.alert.m-alert--outline.alert-info {
	    background-color: var(--glass-bg);
	    border: var(--border-width) solid var(--border-color) !important;
	    color: var(--main-font-color);
	    font-weight: 400;
	    border-radius: var(--border-radius);
	    backdrop-filter: var(--glass-blur);
	}

	.m-alert__icon {
	    border-radius: var(--border-radius);
	    background-color: var(--blur-bg) !important;
	}

	td {
		color: var(--main-font-color) !important;
	}

	.table .table,
	tr {
		background-color: transparent !important;
	}

	`;
	document.head.appendChild(style);
}

add_fee();