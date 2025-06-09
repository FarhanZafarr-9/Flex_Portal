function add_attendance(){
	const style = document.createElement('style');
	style.innerHTML = `

	.flaticon-more {
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

	.col-md-6 h4, td {
		color: var(--main-font-color) !important;
		padding-left: var(--pad-sm);
	}

	small {
		margin-left: var(--mar-sm);
	}

	.col-md-6 h4 {
	    margin: var(--mar-md) 0;
	}

	td a.edit, label a {
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
	.alert.m-alert--outline.alert-info .close {
	    color: var(--main-font-color) !important;
	}

	.m-subheader__title {
		padding-right: var(--pad-sm) !important;
		margin-right: var(--mar-sm) !important;
	}

	.btn,
	.m-portlet__body,
	.m-portlet__head,
	.table,
	.m-scroll-top,
	.progress.m-progress--lg
	{
		border: var(--border-width) solid var(--border-color) !important;
	}

	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg {
		box-shadow: none !important;
	}

	.m-grid.m-grid--hor.m-grid--root.m-page,
	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg,
	.m-body,
	.m-stack.m-stack--ver.m-stack--desktop,
	.m-container.m-container--fluid.m-container--full-height,
	header.m-grid__item.m-header,
	div#m_header_topbar,
	body {
		background-color: transparent !important;
	}

	`;
	document.head.appendChild(style);
}

add_attendance();