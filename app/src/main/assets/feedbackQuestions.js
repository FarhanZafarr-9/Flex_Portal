function add_questions_style(){
	const style = document.createElement('style');
	style.innerHTML = `

	
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
	.m-list-timeline .m-list-timeline__items .m-list-timeline__item .m-list-timeline__text {
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
	.progress.m-progress--lg,
	.m-list-timeline__items .m-list-timeline__item,
	textarea.form-control.m-input.m-input--air,
	.m-demo
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
    	padding: 6px;
	}

	.btn-brand:hover {
		background-color: var(--btn-active-bg) !important;
	}

	.m-demo {
    	background: var(--bg-color);
    	border-radius: var(--border-radius);
        overflow-x: auto;
	}

	.m-list-timeline__items .m-list-timeline__item {
		margin: var(--mar-md) 0 !important;
	}

	.m-checkbox>input, .m-radio>input {
	    position: relative;
	    z-index: 0 !important;
	    opacity: 1 !important;
	    margin: var(--mar-xs);
	    transform: translate(0px, 2px);
	}

	label#focusclose {
	    color: var(--text-muted);
	}

	.m-list-timeline__items .m-list-timeline__item
	 {
	    margin: var(--mar-md) 0 !important;
	    background: var(--blur-bg);
	    border-radius: var(--border-radius);
	    border-left: 0 !important;
	    width: auto;
	}

	.m-list-timeline .m-list-timeline__items .m-list-timeline__item .m-list-timeline__text
    {
	    padding: var(--mar-lg) !important;
	    padding-bottom: 0 !important;
    }

    textarea.form-control.m-input.m-input--air {
	    background-color: var(--bg-color) !important;
	    box-shadow: none !important;
	    border-radius: var(--border-radius) !important;
	}
	`;
	document.head.appendChild(style);
}

add_questions_style();
