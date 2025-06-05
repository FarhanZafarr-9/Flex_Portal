function add_home() {
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
    }

	.table {
		border-radius: var(--border-radius) !important;
	}

	.table th ,
	.table td {
		padding: .75rem !important;
    	vertical-align: middle !important;
    	text-align: left !important;
	}

	.table th {
		background-color: var(--bg-color) !important;
		color: var(--main-font-color) !important;
		border-bottom: var(--border-thick) solid var(--border-color) !important;
	}

    .table td {
        background-color: var(--secondary-bg-color) !important;
    }

	.row:nth-of-type(1) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4
	{
	    max-width: fit-content;
	    display: block !important;
	}

	.row:nth-of-type(1) .col-lg-12:nth-of-type(2) .m-portlet:nth-of-type(1) .col-md-4
	{
	    grid-template-columns: 1fr auto;
	}

	.row:nth-of-type(2) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4:nth-of-type(1),
	.row:nth-of-type(2) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4:nth-of-type(3){
	    grid-template-columns: auto auto;
	}

	.row:nth-of-type(2) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4:nth-of-type(2) {
	    grid-template-columns: auto auto auto;
	}

	.col-md-6 {
		margin-bottom: 25px;
	    grid-template-columns: auto auto auto;

	}
	.col-md-6 p:nth-of-type(1) {
	    grid-column: 1;
	}

	.col-md-6,
	.row:nth-of-type(1) .col-lg-12:nth-of-type(2) .m-portlet:nth-of-type(1) .col-md-4,
	.row:nth-of-type(2) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4:nth-of-type(1),
	.row:nth-of-type(2) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4:nth-of-type(3),
	.row:nth-of-type(2) .col-lg-12:nth-of-type(1) .m-portlet:nth-of-type(1) .col-md-4:nth-of-type(2)
	{
		max-width: fit-content;
		display: grid;
		gap: var(--mar-sm);
	}

	.col-md-6 strong {
		font-size: var(--font-lg);
	}

	.mr-auto, .m-subheader__title {
	    color: var(--main-font-color) !important;
	}

	.m-subheader__title {
		padding-right: var(--pad-sm) !important;
		margin-right: var(--mar-sm) !important;
	}

	p {
	    display: grid;
	    /* margin: 10px; */
	    gap: 10px;
	    border-radius: var(--border-radius);
	    background-color: var(--blur-bg);
	    padding: 10px 15px;
	    border: var(--border-width) solid var(--border-color) !important;
	    max-width: fit-content;
	    align-content: center;
	    justify-items: stretch;
	    justify-content: center;
	    align-items: center;
	}

	.btn,
	.m-portlet__body,
	.m-portlet__head,
	.table,
	.m-scroll-top
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

add_home();
