function side_nav_style() {

    const style = document.createElement('style');

    style.innerHTML = `
    .m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item:hover>.m-menu__link .m-menu__link-text,
    .m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item--active>.m-menu__link .m-menu__link-text,
    .m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item--active>.m-menu__link .m-menu__link-icon,
    .m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item:hover>.m-menu__link .m-menu__link-icon {
        background-color: var(--bg-color) !important;
        color: var(--main-font-color) !important;
    }

    li.m-menu__item.m-menu__item--submenu {
        background-color: transparent !important;
    }

	.m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item--active>.m-menu__link,
	.m-aside-menu.m-aside-menu--skin-dark .m-menu__nav>.m-menu__item:hover>.m-menu__link
	{
		background-color: var(--bg-color) !important;
		padding: 6px 20px !important;
	}

    .m-aside-left-close.m-aside-left-close--skin-dark {
        background-color: var(--light-bg-color) !important;
        transform: translate(-5px, 45px);
    }

    .m-aside-menu .m-menu__nav>.m-menu__item>.m-menu__link {
        margin-top: 10px !important;
        outline: var(--border-width) solid var(--border-color);
        color: var(--main-font-color) !important;
        transform: scale(.95);
        border-radius: var(--border-radius) !important;
        background-color: var(--blur-bg);
    }

    .m-aside-left-close.m-aside-left-close--skin-dark>i {
	    color: var(--main-font-color) !important;
	}

    .m-aside-left.m-aside-left--skin-dark {
        background-color: var(--glass-bg) !important;
        border-right: var(--border-width) solid var(--border-color)!important;
        border-radius: 0px !important;
        backdrop-filter: var(--glass-blur);
    }

    .m-aside-menu .m-menu__nav > .m-menu__item > .m-menu__link,
    .m-aside-menu .m-menu__nav > .m-menu__item > .m-menu__link:hover {
        padding: 6px 20px !important;
    }

    .m-aside-menu .m-menu__nav .m-menu__item>.m-menu__link .m-menu__link-text,
    .m-aside-menu .m-menu__nav .m-menu__item>.m-menu__link .m-menu__link-text,
    .fas {
        color: var(--main-font-color) !important;
    }

    li.m-menu__item.m-menu__item--active {
    	background-color: transparent !important;
    }

    .m-aside-menu .m-menu__nav .m-menu__item:nth-child(2),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(5),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(7),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(8),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(9),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(10),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(11),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(12),
	.m-aside-menu .m-menu__nav .m-menu__item:nth-child(14) {
		order: 1;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.5s ease;
	}

    .m-aside-menu .m-menu__nav .m-menu__item {
        background: transparent !important;
        order: 0;
    }

	.m-aside-menu .m-menu__nav {
	    padding: 10px 0 30px 0 !important;
	}

	.show-more-btn {
	    cursor: pointer !important;
	    border: var(--border-width) solid var(--border-color) !important;
	    border-radius: var(--border-radius) !important;
	    padding: 10px;
	    margin: var(--mar-xl) calc(var(--mar-xl) * 2) 0 var(--mar-sm);
	    background-color: var(--blur-bg);
	    color: var(--main-font-color);
	    font-weight: var(--font-bold);
	}

    .m-aside-left-overlay {
        background: rgb(0 0 0 / 25%) !important;
        backdrop-filter: var(--backdrop-blur);
        z-index: 500 !important;
        animation: fadeInOverlay 0.3s ease-in-out !important;
    }

    @keyframes fadeInOverlay {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .m-aside-left {
        left: 0 !important;
    }

    .m-aside-left-close,
    .m-aside-left {
         opacity: 0;
         pointer-events: none;
    }

    .m-aside-left.m-aside-left--on,
    .m-aside-left--on .m-aside-left-close {
        transition: all .3s ease-in-out !important;
        opacity: 1;
        pointer-events: auto;
    }

    .m-aside-left-close {
        left: 249px !important;
    }

	`;

	document.head.appendChild(style);

	const menuNav = document.querySelector('.m-aside-menu .m-menu__nav');
	if (!menuNav || document.querySelector('.show-more-btn')) return;

	const showMore = document.createElement('div');
	showMore.className = 'show-more-btn';
	showMore.style.cursor = 'pointer';

	let expanded = localStorage.getItem('menuExpanded') === 'true';
	showMore.textContent = expanded ? 'Show Less' : 'Show More';

	const hiddenItems = [2, 5, 7, 8, 9, 10, 11, 12, 14]
	  .map(i => menuNav.querySelector(`.m-menu__item:nth-child(${i})`))
	  .filter(Boolean);

	hiddenItems.forEach(el => {
	  el.style.overflow = 'hidden';
	  el.style.transition = 'max-height 0.5s ease';
	  el.style.maxHeight = expanded ? '100px' : '0';
	});

	showMore.addEventListener('click', () => {
	  expanded = !expanded;
	  hiddenItems.forEach(el => {
	    el.style.maxHeight = expanded ? '100px' : '0';
	  });
	  showMore.textContent = expanded ? 'Show Less' : 'Show More';
	  localStorage.setItem('menuExpanded', expanded.toString());
	});

	menuNav.parentNode.insertBefore(showMore, menuNav);
}

side_nav_style();