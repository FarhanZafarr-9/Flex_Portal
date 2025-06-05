function showCredits() {
    if (document.getElementById('credits')) return;

    const creditBtn = document.createElement('div');
    creditBtn.className = 'glass-button';
    creditBtn.innerHTML = `<div id="credits"></div>`;
    creditBtn.style.margin = '10px 5px 0 5px';

    // Add to DOM first so we can measure the container
    if (window.location.href === "https://flexstudent.nu.edu.pk/Login") {
        creditBtn.classList.add('half-width');
        document.body.appendChild(creditBtn);
    } else {
        const menuNav = document.querySelector('.m-aside-menu .m-menu__nav');
        if (menuNav) menuNav.appendChild(creditBtn);
    }

    const creditText = "Redesigned with ❤️ by Parzival";
    const creditElement = document.getElementById('credits');
    const heartSvg = `<svg width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint0_radial_7305_6094)"/>
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint1_radial_7305_6094)"/>
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint2_radial_7305_6094)"/>
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint3_radial_7305_6094)"/>
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint4_linear_7305_6094)"/>
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint5_linear_7305_6094)"/>
                                   <path d="M15.217 29.2015C15.752 29.5 16.3957 29.4835 16.9275 29.1795C20.5106 27.1318 26.7369 22.4179 29.1822 16.2948C32.7713 8.3224 24.3441 1.95834 18.5197 6.5356C17.9122 7.01307 17.1483 7.55954 16.6226 8.07719C16.3849 8.31124 15.966 8.33511 15.7193 8.11061C15.0281 7.48177 13.9479 6.67511 13.2542 6.20577C8.28887 2.84639 -0.74574 7.27463 3.1081 16.7255C4.51986 20.9677 11.2474 26.9862 15.217 29.2015Z" fill="url(#paint6_radial_7305_6094)" fill-opacity="0.6"/>
                                   <g filter="url(#filter0_f_7305_6094)">
                                   <path d="M15.9084 10.5407V17.3634C15.9084 18.2682 17.004 18.6971 17.5681 17.9896C19.3132 15.8006 20.7207 13.1388 19.1499 10.9645C18.5477 10.1309 17.3939 9.59683 16.4512 9.76674C16.0985 9.8303 15.9084 10.1823 15.9084 10.5407Z" fill="#FA1C56"/>
                                   </g>
                                   <g filter="url(#filter1_f_7305_6094)">
                                   <ellipse cx="24.6631" cy="11.3771" rx="4.46173" ry="3.70012" transform="rotate(-44.1901 24.6631 11.3771)" fill="url(#paint7_radial_7305_6094)"/>
                                   </g>
                                   <g filter="url(#filter2_f_7305_6094)">
                                   <ellipse cx="23.4602" cy="6.06678" rx="1.69254" ry="0.355636" transform="rotate(7.16522 23.4602 6.06678)" fill="#FF7383"/>
                                   </g>
                                   <g filter="url(#filter3_f_7305_6094)">
                                   <ellipse cx="9.38895" cy="6.05342" rx="1.51865" ry="0.249413" transform="rotate(-0.697201 9.38895 6.05342)" fill="#FF93BA" fill-opacity="0.5"/>
                                   </g>
                                   <g filter="url(#filter4_f_7305_6094)">
                                   <path d="M14.8451 9.96187L15.1577 20.2119C8.28268 13.5244 6.96067 8.82813 9.59513 7.77437C12.0952 6.77437 14.0952 8.39937 14.8451 9.96187Z" fill="url(#paint8_radial_7305_6094)"/>
                                   </g>
                                   <g filter="url(#filter5_f_7305_6094)">
                                   <path d="M14.3452 9.36191C13.5052 9.24191 13.2452 8.54525 13.2202 8.21191C13.7002 8.71191 14.1702 8.75358 14.3452 8.71191V9.36191Z" fill="#FF7383"/>
                                   </g>
                                   <defs>
                                   <filter id="filter0_f_7305_6094" x="13.9084" y="7.73523" width="7.92259" height="12.608" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                   <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_7305_6094"/>
                                   </filter>
                                   <filter id="filter1_f_7305_6094" x="19.0536" y="5.78906" width="11.219" height="11.176" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                   <feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_7305_6094"/>
                                   </filter>
                                   <filter id="filter2_f_7305_6094" x="19.7803" y="3.65552" width="7.35986" height="4.82251" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                   <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_7305_6094"/>
                                   </filter>
                                   <filter id="filter3_f_7305_6094" x="6.3704" y="4.30334" width="6.03709" height="3.50012" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                   <feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_7305_6094"/>
                                   </filter>
                                   <filter id="filter4_f_7305_6094" x="5.33316" y="4.46667" width="12.8245" height="18.7452" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                   <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_7305_6094"/>
                                   </filter>
                                   <filter id="filter5_f_7305_6094" x="12.2202" y="7.21191" width="3.125" height="3.15002" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                   <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_7305_6094"/>
                                   </filter>
                                   <radialGradient id="paint0_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.8828 5.63363) rotate(90) scale(22.9845 24.4021)">
                                   <stop stop-color="#FC0000"/>
                                   <stop offset="0.527969" stop-color="#FF3B79"/>
                                   <stop offset="1" stop-color="#F724B3"/>
                                   </radialGradient>
                                   <radialGradient id="paint1_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23.0249 11.3631) rotate(134.402) scale(21.2647 39.8308)">
                                   <stop offset="0.797874" stop-color="#C82092" stop-opacity="0"/>
                                   <stop offset="0.908039" stop-color="#C82092"/>
                                   </radialGradient>
                                   <radialGradient id="paint2_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9968 17.7886) rotate(-158.663) scale(22.749 32.159)">
                                   <stop offset="0.40984" stop-color="#B91D43" stop-opacity="0"/>
                                   <stop offset="0.833898" stop-color="#B91D43"/>
                                   </radialGradient>
                                   <radialGradient id="paint3_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.5602 13.8155) rotate(90) scale(19.7992)">
                                   <stop offset="0.671096" stop-color="#FF7AF2" stop-opacity="0"/>
                                   <stop offset="0.933555" stop-color="#FFBCE6"/>
                                   </radialGradient>
                                   <linearGradient id="paint4_linear_7305_6094" x1="17.7454" y1="16.1331" x2="25.7577" y2="25.6685" gradientUnits="userSpaceOnUse">
                                   <stop offset="0.694491" stop-color="#FF7AF2" stop-opacity="0"/>
                                   <stop offset="0.933555" stop-color="#FFBCE6"/>
                                   </linearGradient>
                                   <linearGradient id="paint5_linear_7305_6094" x1="16.7521" y1="16.5304" x2="7.34913" y2="27.1253" gradientUnits="userSpaceOnUse">
                                   <stop offset="0.694491" stop-color="#FF7AF2" stop-opacity="0"/>
                                   <stop offset="0.933555" stop-color="#FFBCE6"/>
                                   </linearGradient>
                                   <radialGradient id="paint6_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.3471 12.8957) rotate(164.618) scale(17.2146 18.1802)">
                                   <stop offset="0.802083" stop-color="#FF73A6" stop-opacity="0"/>
                                   <stop offset="1" stop-color="#FF93BA"/>
                                   </radialGradient>
                                   <radialGradient id="paint7_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.1198 11.2517) rotate(172.927) scale(7.29137 9.69562)">
                                   <stop stop-color="#FF7383"/>
                                   <stop offset="1" stop-color="#FF7383" stop-opacity="0"/>
                                   </radialGradient>
                                   <radialGradient id="paint8_radial_7305_6094" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.3452 13.8393) rotate(-135.591) scale(12.6861 22.52)">
                                   <stop stop-color="#FF6274"/>
                                   <stop offset="1" stop-color="#FF6274" stop-opacity="0"/>
                                   </radialGradient>
                                   </defs>
                                   </svg>`;

    let currentText = "";
    let isDeleting = false;
    let charIndex = 0;
    let cursorVisible = true;
    let typingTimeout;

    // Blinking cursor effect
    function blinkCursor() {
        cursorVisible = !cursorVisible;
        const cursor = cursorVisible ? "&nbsp;&nbsp;|" : "&nbsp;&nbsp;";
        creditElement.innerHTML = `${currentText}<span class="cursor">${cursor}</span>`;
        setTimeout(blinkCursor, 500);
    }

    // Typewriter effect
    function typeWriter() {
        clearTimeout(typingTimeout);

        if (!isDeleting && charIndex < creditText.length) {
            // Typing forward
            currentText = creditText.substring(0, charIndex + 1);
            charIndex++;

            // Replace heart emoji with SVG when we reach that position
            if (currentText.includes("❤️")) {
                currentText = currentText.replace("❤️", heartSvg);
            }

            creditElement.innerHTML = `${currentText}<span class="cursor">|</span>`;
            typingTimeout = setTimeout(typeWriter, Math.random() * 100 + 50);
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            currentText = creditText.substring(0, charIndex - 1);
            charIndex--;

            // Keep SVG in place while deleting
            if (currentText.includes("❤️")) {
                currentText = currentText.replace("❤️", heartSvg);
            }

            creditElement.innerHTML = `${currentText}<span class="cursor">|</span>`;
            typingTimeout = setTimeout(typeWriter, 30);
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;

            // Pause before starting next phase
            const pauseTime = isDeleting ? 10000 : 1000;
            typingTimeout = setTimeout(typeWriter, pauseTime);
        }
    }

    // Start the animations
    typeWriter();
    blinkCursor();

    // Add click event
    creditElement.addEventListener('click', openCredits);
}

function injectBottomNav() {
    if (window.location.href.includes("flexstudent.nu.edu.pk/Login")) return;
    if (document.getElementById('bottomNav') && document.getElementById('shrinkingLine')) return;

    const navMap = {}; // { Home: "url", Attendance: "url", ... }

    // Get all li elements from main sidebar
    document.querySelectorAll('.m-menu__nav > li').forEach(LI => {
        const A = LI.querySelector('a');
        const spans = LI.querySelectorAll('span');
        if (A && spans.length >= 2) {
            const title = spans[spans.length - 1].textContent.trim();
            const href = A.href;
            navMap[title] = href;
        }
    });

    const nav = document.createElement('div');
    nav.id = 'bottomNav';

    nav.innerHTML = `
        <a href="${navMap['Home'] || '#'}" title="Home">
            <i class="fas fa-home"></i>
        </a>
        <a href="${navMap['Attendance'] || '#'}" title="Attendance">
            <i class="fas fa-calendar-check"></i>
        </a>
        <a href="${navMap['Marks'] || '#'}" title="Marks">
            <i class="fas fa-chart-line"></i>
        </a>
        <a href="#" id="moreBtn" title="More">
            <i class="fas fa-ellipsis-h"></i>
        </a>
        <a href="https://flexstudent.nu.edu.pk/Login" title="Logout">
            <i class="fas fa-sign-out-alt"></i>
        </a>
        <div id="moreOptions" class="more-options hidden">
	    <a href="https://flexstudent.nu.edu.pk/Student/ChangePassword" title="Change Password">
		<i class="fas fa-key"></i>
	    </a>
	    <a href="#" title="Credits" onclick="openCredits()">
		<i class="fas fa-star"></i>
	    </a>
	    <a href="https://github.com/FarhanZafarr-9/Flex_Portal" target="_blank" title="GitHub">
		<i class="fas fa-code-branch"></i>
	    </a>
	    <a href="https://github.com/FarhanZafarr-9/Flex_Portal/issues/new?template=bug_report.md" target="_blank" title="Report Bug">
		<i class="fas fa-bug"></i>
	    </a>
	    <a href="https://github.com/FarhanZafarr-9/Flex_Portal/issues/new?template=feature_request.md" target="_blank" title="Suggest Feature">
		<i class="fas fa-lightbulb"></i>
	    </a>
	</div>
    `;
    document.body.appendChild(nav);

    const line = document.createElement('div');
    line.id = 'shrinkingLine';
    document.body.appendChild(line);

    function updateActiveStates() {
        const currentUrl = window.location.href;
        nav.querySelectorAll(':scope > a').forEach(link => link.classList.remove('active'));

        if (currentUrl.includes('farhanzafarr9.netlify.app') || currentUrl.includes('ChangePassword')) {
            const moreBtn = document.getElementById('moreBtn');
            if (moreBtn) moreBtn.classList.add('active');
            return;
        }

        nav.querySelectorAll(':scope > a').forEach(link => {
            if (link.href && !link.href.includes('#')) {
                const linkUrl = new URL(link.href);
                const currentUrlObj = new URL(currentUrl);
                if (linkUrl.hostname === currentUrlObj.hostname && linkUrl.pathname === currentUrlObj.pathname) {
                    link.classList.add('active');
                }
            }
        });
    }

    updateActiveStates();

    window.addEventListener('popstate', updateActiveStates);
    nav.querySelectorAll(':scope > a').forEach(link => {
        link.addEventListener('click', e => {
            if (link.href && !link.href.includes('#')) {
                setTimeout(updateActiveStates, 100);
            }
        });
    });

    document.addEventListener('click', function(e) {
        const moreBtn = document.getElementById('moreBtn');
        const moreOptions = document.getElementById('moreOptions');
        if (!moreBtn || !moreOptions) return;
        const isMoreBtn = e.target.closest('#moreBtn');
        const isInsideOptions = e.target.closest('#moreOptions');
        if (isMoreBtn) {
            e.preventDefault();
            moreOptions.classList.toggle('hidden');
        } else if (!isInsideOptions) {
            moreOptions.classList.add('hidden');
        }
    });

    window.addEventListener('scroll', () => {
        const line = document.getElementById('shrinkingLine');
        if (!line) return;
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        const newWidth = scrollPercent * 100;
        line.style.width = `${newWidth}%`;
    });
}

function injectStyles() {
    const style = document.createElement('style');

    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    document.head.appendChild(fa);

    style.textContent = `
        .glass-box, .glass-button, #bottomNav, .more-options {
            background-color: #18181857;
            position: relative;
            text-align: center;
            color: var(--main-font-color, #fff);
            border: 0.75px solid #55555555 !important;
            font-size: 13px;
		    padding: 10px;
		    width: auto;
		    margin: 10px 6px;
		    margin-bottom: 0px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 99;
            transition: transform 0.4s ease-in-out;
            border-radius: 6px;
            font-family: "Segoe UI Symbol", "Noto Color Emoji" !important;
        }

        svg {
          vertical-align: -0.15em;
        }

         #bottomNav {
            margin: 0px !important;
	    box-shadow: var(--shadow) !important;
         }

        .glass-box:active, .glass-button:active {
            transform: scale(0.95);
        }

        .glass-button.half-width {
            width: 50vw;
            left: 25vw;
            bottom: 20px;
            text-align: center;
        }

        .control-panel {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .theme-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.75px solid #55555555;
            padding: 5px;
        }

        .theme-toggle .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }

        .theme-toggle .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .theme-toggle .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #888;
            border-radius: 20px;
            transition: 0.4s;
        }

        .theme-toggle .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            border-radius: 50%;
            transition: 0.4s;
        }

        .theme-toggle input:checked + .slider {
            background-color: #282828;
        }

        .theme-toggle input:checked + .slider:before {
            transform: translateX(20px);
        }

        #bottomNav {
            position: fixed;
            bottom: 15px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 40px;
            padding: 8px 10px !important;
        }

        .fas {
            font-size: 14px !important;
            font-family: "Font Awesome 6 Free" !important;
        }

        #bottomNav a,
        #bottomNav a.active,
        .more-options a,
        .more-options a.active {
            color: var(--main-font-color);
            text-decoration: none !important;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.75px solid transparent;
            padding: 8px;
            border-radius: 6px;
            transition: transform 0.4s ease;
        }

        #bottomNav a.active,
        .more-options a.active {

            border: 0.75px solid #00000040 !important;
            background-color: #dfdfdf !important;
        }

        #bottomNav a.active i.fas,
		.more-options a.active i.fas {
		    color: #181818 !important;
		}


	more-options {
	    position: absolute;
	    bottom: 70px;
	    right: 0%;
	    display: flex;
	    flex-direction: column;
	    background-color: #202020c0;
	    gap: 15px;
	    padding: 4px;
	    transition: all 0.4s ease-in-out;
	    backdrop-filter: blur(12px) !important;
	    box-shadow: var(--shadow);
	}

        .more-options.hidden {
            display: none;
        }

        #shrinkingLine {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            height: 5px;
            width: 0%;
            background-color: #55555555;
            transition: width 0.2s ease;
            z-index: 998;
            border-radius: 2px;

            pointer-events: none;
        }

        .cursor {
            display: inline-block;
            width: 1px;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

 	.utility-buttons {
	    display: flex;
	    flex-wrap: wrap;
	    border: var(--border-width) solid var(--border-color) !important;
	    margin: 15px 5px;
	    padding: 15px 5px;
	    border-radius: var(--border-radius);
	    background-color: var(--light-bg-color);
	}

	.utility-buttons .glass-button {
		width: 45%;
		padding: 6px 10px;
		font-size: 12px;
		display: flex;
		align-items: center;
		gap: 6px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		background: var(--blur-bg);
		color: var(--main-font-color, #121212);
		transition: background 0.3s ease;
	}

	.utility-buttons .glass-button:nth-child(3) {
		flex: 1 1 100%;
		margin-top: 8px;
	}
    `;

    document.head.appendChild(style);
}

function injectControlPanel() {
    const menuNav = document.querySelector('.m-aside-menu .m-menu__nav');
    if (!menuNav || document.getElementById('controlPanel')) return;

    const panel = document.createElement('div');
    panel.id = 'controlPanel';
    panel.className = 'glass-box control-panel';

    // Theme Toggle
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <span>Dark Mode</span>
        <label class="switch">
            <input type="checkbox" id="themeCheckbox">
            <span class="slider"></span>
        </label>
    `;
    panel.appendChild(themeToggle);

    const r = document.documentElement.style;
    const setDarkTheme = () => {
        r.setProperty('--main-font-color', '#f0f0f0');
        r.setProperty('--bg-color', '#121212');
        r.setProperty('--darker-bg-color', '#0c0c0c');
        r.setProperty('--light-bg-color', '#2b2b2bb2');
        r.setProperty('--border-radius', '8px');
        r.setProperty('--box-shadow', '#8b8b8b');
        r.setProperty('--card-background', '#1a1a1a');
        r.setProperty('--shadow', '4px 4px 6px rgb(0 0 0 / 20%), -4px -4px 6px rgb(35 35 35 / 15%)');
    };
    const setLightTheme = () => {
        //r.setProperty('--main-font-color', '#121212');
        r.setProperty('--bg-color', '#d0d0d0');
        r.setProperty('--darker-bg-color', '#ababab');
        //r.setProperty('--light-bg-color', '#ffffffb2');
        //r.setProperty('--border-radius', '8px');
        //r.setProperty('--box-shadow', '#bbbbbb');
        //r.setProperty('--card-background', '#ffffff');
        //r.setProperty('--shadow', '4px 4px 6px rgb(0 0 0 / 10%), -4px -4px 6px rgb(200 200 200 / 15%)');
    };

    const themeCheckbox = themeToggle.querySelector('#themeCheckbox');
    const savedTheme = localStorage.getItem('darkTheme') === 'false';
    themeCheckbox.checked = savedTheme;
    savedTheme ? setLightTheme() : setDarkTheme();
    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            setDarkTheme();
            localStorage.setItem('darkTheme', 'true');
        } else {
            setLightTheme();
            localStorage.setItem('darkTheme', 'false');
        }
    });

    // Show More Toggle
    const showMore = document.createElement('div');
    showMore.className = 'show-more-btn';
    const expanded = localStorage.getItem('menuExpanded') === 'true';
    showMore.textContent = expanded ? 'Show Less' : 'Show More';
    const hiddenItems = [2, 5, 7, 8, 9, 10, 11, 12, 14]
        .map(i => menuNav.querySelector(`.m-menu__item:nth-child(${i})`))
        .filter(Boolean);
    hiddenItems.forEach(el => el.style.display = expanded ? 'block' : 'none');

    showMore.addEventListener('click', () => {
        const isVisible = hiddenItems[0].style.display === 'block';
        hiddenItems.forEach(el => el.style.display = isVisible ? 'none' : 'block');
        showMore.textContent = isVisible ? 'Show More' : 'Show Less';
        localStorage.setItem('menuExpanded', !isVisible);
    });
    panel.appendChild(showMore);

    menuNav.appendChild(panel);
}

function createUtilityButtons() {
	const menuNav = document.querySelector('.m-aside-menu .m-menu__nav');
    if (!menuNav || document.getElementById('utility-button')) return;
     // GitHub Utility Buttons
    const btnGroup = document.createElement('div');
    btnGroup.className = 'utility-buttons';

    const makeBtn = (label, icon, link) => {
        const btn = document.createElement('button');
        btn.className = 'glass-button';
        btn.innerHTML = `<i class="fas ${icon}"></i> ${label}`;
        btn.onclick = () => window.open(link, '_blank');
        return btn;
    };

    btnGroup.appendChild(makeBtn('GitHub', 'fa-code-branch', 'https://github.com/FarhanZafarr-9/Flex_Portal'));
    btnGroup.appendChild(makeBtn('Report Bug', 'fa-bug', 'https://github.com/FarhanZafarr-9/Flex_Portal/issues/new?template=bug_report.md'));
    btnGroup.appendChild(makeBtn('Suggest Feature', 'fa-lightbulb', 'https://github.com/FarhanZafarr-9/Flex_Portal/issues/new?template=feature_request.md'));

    menuNav.appendChild(btnGroup);
}

function initUI() {
    injectStyles();
    //injectControlPanel();
    showCredits();
    injectBottomNav();
    createUtilityButtons();
}

window.openCredits = function() {
    window.location.href = 'https://farhanzafarr9.netlify.app/';
};

initUI();
