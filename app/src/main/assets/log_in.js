function add_log_in() {
	const style = document.createElement('style');
	style.innerHTML = `

	.m-grid__item.m-grid__item--fluid.m-grid.m-grid--center.m-grid--hor.m-grid__item--order-tablet-and-mobile-1.m-login__content,
	.m-login__logo,
	#frmlogin .m-checkbox,
	#frmlogin .input-group-addon,
	#frmlogin input placeholder,
	.m-form span.m-form__help,
	span.input-group-addon
	{
	    display: none !important;

	}
	.m-grid.m-grid--hor.m-grid--root.m-page ,
	div#m_login
	{
		flex-direction: row !important;
	    justify-content: center !important;
	    align-items: center !important;
	}

	div#m_login {
	    display: flex !important;
	    background: transparent;
	}

	m-grid.m-grid--hor.m-grid--root.m-page
	{
		background: var(--bg-color) !important;
	}

	.m-login__wrapper {

	    background: var(--card-background);
	    backdrop-filter: blur(10px);
	    border-radius: calc(var(--border-radius) * 1) !important;
	}

	@media (max-width: 768px) {
	    .m-login.m-login--1 .m-login__aside {
	        padding: 2rem 1rem;
		}
	}

	.m-login__title {
		color: var(--text-primary) ;
		margin-bottom: var(--mar-xl) !important;
	}

	#frmlogin h5,
	.m-login__desc {
		color: var(--text-secondary);
		margin-bottom: var(--mar-sm) ;
	}

	#frmlogin input,
	#m_email {
		border-radius: calc(var(--border-radius) * 0.85);
		background-color: var(--light-bg-color);
		color: var(--main-font-color);
	}

	input:-webkit-autofill {
	  box-shadow: 0 0 0px 1000px #282828 inset !important;
	  -webkit-text-fill-color: white !important;
	  caret-color: white;
	  transition: background-color 5000s ease-in-out 0s;
	}

	.m-login.m-login--1 .m-login__wrapper {
	    padding: 5% 2rem 0rem 2rem !important;
	        max-width: 95vw !important;
	}

	.g-recaptcha {
	    padding: 0 1.85rem !important;
	}

	.form-group.m-form__group {
	    margin: 30px 0;
	}

	#m_login_forget_password {
		color: var(--text-muted) ;
		text-decoration: underline !important;
    text-decoration-color: var(--text-disabled) !important;
	}

	input::placeholder {
		opacity: 0 !important;
	}

	button#m_login_signin_submit,
	.btn {
	    border-radius: calc(var(--border-radius) * 0.85) !important ;
	    background-color: var(--btn-active-bg) !important;
	    box-shadow: var(--glass-shadow) !important;
	    padding: .75rem 2rem !important;
	}

	.alert.m-alert--outline.alert-danger,
    #pass-error,
    #m_inputmask_4-error,
	#m_email-error{
	    padding: var(--pad-sm);
	    background-color: var(--alert-danger-light);
	    color: var(--alert-danger);
	    font-weight: var(--font-normal);
	    border: var(--border-width) solid var(--alert-danger) !important;
	    border-radius: var(--border-radius);
    	margin: 5px;
	}

	.m-input,
	button#m_login_signin_submit,
	.btn,
	.m-login__wrapper,
	#frmlogin input,
	#m_email
	{
		border: var(--border-width) solid var(--border-color) !important;
	}

	.m-grid.m-grid--hor.m-grid--root.m-page,
	body {
		background-color: transparent !important;
	}

	`;
	document.head.appendChild(style);
}

add_log_in();