function add_password(){
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

	strong a, td a.edit, label a {
	    color: var(--main-font-color) !important;
	    text-decoration: underline !important;
	}

	.m-section {
	    margin: 0 !important;
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

	label {
	    color: var(--main-font-color);
	    font-weight: 500;
	}

	input span {
	    display: none !important;
	}

	input {
        background-color: var(--light-bg-color) !important;
        box-shadow: none !important;
        border: var(--border-width) solid var(--border-color) !important;
        border-radius: var(--border-radius) !important;
        color: var(--main-font-color) !important;
    }

	input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #282828 inset !important;
        -webkit-text-fill-color: white !important;
        caret-color: white;
        transition: background-color 5000s ease-in-out 0s;
    }

	.col-md-4 {
		padding-left: 0px !important;
	}

	`;
	document.head.appendChild(style);
}

add_password();
