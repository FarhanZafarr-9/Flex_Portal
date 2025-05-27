function add_fee_report(){
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
	.col-lg-12:not(.col-lg-12 .col-lg-12){
		background-color: var(--blur-bg) !important;
		border-radius: var(--border-radius) !important;
		border: var(--border-width) solid var(--border-color) !important;
	}

	.col-lg-12 .col-lg-12 {
        border: 0 !important;
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

	.mb-2 .row:first-child:not(.col-lg-5 .row):not(.col-lg-12 .row) {
    border: var(--border-width) solid var(--border-color) !important;
	    display: grid;
	    gap: 10px;
	    grid-template-columns: repeat(7, auto);
	    padding: 16px;
	    text-align: center;
	    overflow-x: auto;
	    border-radius: var(--border-radius);
	    margin: 20px 0 !important;
	}

	.col-lg-3 {
	    display: flex;
	    gap: 10px;
	    align-items: center;
	}

	.col-lg-3 label {
	    width: 70px;
	}

	.col-lg-1:not(.col-lg-5 .col-lg-1):not(.col-lg-12 .col-lg-1) {
	    background: var(--light-bg-color);
	    border-radius: var(--border-radius);
	    border: var(--border-width) solid var(--border-color) !important;
	    padding: var(--pad-sm) var(--pad-md);
	}

	.col-lg-12 .row:not(:nth-last-of-type(-n+2)) {
	    display: grid;
	    grid-template-columns: repeat(2, auto);
	    margin: 10px 0;
	    background-color: var(--light-bg-color);
	    padding: 5px;
	    border: var(--border-width) solid var(--border-color) !important;
	    border-radius: var(--border-radius);
	}

	.col-md-12 .row:not(:nth-of-type(2)) {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        margin: 10px 0;
        background-color: var(--light-bg-color);
        padding: var(--pad-xs);
        border-radius: 8px !important;
        border: var(--border-width) solid var(--border-color) !important;
    }

    .col-lg-7 h4 {
        margin-top: var(--mar-xl) !important;
        margin-bottom: var(--mar-lg) !important;
    }
	`;
	document.head.appendChild(style);
}

add_fee_report();