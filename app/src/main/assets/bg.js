const canvas = document.createElement("canvas");
canvas.id = "bgCanvas";
Object.assign(canvas.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  zIndex: "-1",
  pointerEvents: "none"
});

document.documentElement.appendChild(canvas);
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawGrid({
  boxSize = 20,
  bgColor = "#121212",
  fillColor = "#181818",
  strokeColor = "#55555555",
  strokeOpacity = 0.2,
  density = 0.35,
  randomOpacity = true,
  blurAmount = 0.8 // in pixels
} = {}) {
  canvas.style.filter = `blur(${blurAmount}px)`;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += boxSize) {
    for (let y = 0; y < canvas.height; y += boxSize) {
      if (Math.random() < density) {
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = randomOpacity ? Math.random() : 0.5;
        ctx.fillRect(x, y, boxSize, boxSize);
      }

      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = strokeOpacity;
      ctx.strokeRect(x, y, boxSize, boxSize);
    }
  }

  ctx.globalAlpha = 1; // Reset opacity
}

window.addEventListener("resize", () => {
  resizeCanvas();
  drawGrid(currentSettings);
});

const currentSettings = {
  boxSize: 20,
  bgColor: "#121212",
  fillColor: "#181818",
  strokeColor: "#55555555",
  strokeOpacity: 0.2,
  density: 0.35,
  randomOpacity: true,
  blurAmount: 0.8 // adjust this for more/less blur
};

resizeCanvas();
drawGrid(currentSettings);

function add_root_colors(){
    const style = document.createElement('style');
    style.innerHTML = `
    	:root {
    	/* Main Colors */
    	--main-font-color: #f0f0f0;
    	--bg-color: #121212;
    	--secondary-bg-color: #222222;
    	--darker-bg-color: #0c0c0c;
    	--light-bg-color: #282828;
    	--lighter-bg-color: #303030;
    	--card-background: #1a1a1a;
    	--lighter-card-background: #1c1c1c;
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
    	--shadow: 1px 1px 12px rgb(0 0 0 / 40%), -4px -4px 12px rgb(35 35 35 / 55%);
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
    	--glass-blur: blur(20px);
    	--backdrop-blur: blur(5px);
    	}

        * {
            text-decoration: none !important;
            border: var(--border-width) transparent !important;
        }

        *:not(.la):not(.close):not(.fa):not(.fas):not(#credits) {
            font-family: 'Poppins', segoe ui !important;
        }

        .m-scroll-top {
            background: var(--lighter-card-background);
            border-radius: var(--border-radius);
            box-shadow: none !important;
            transform: translate(10px, -10px);
        }

        .m-footer{
        		box-shadow: none !important;
        		background-color: transparent !important;
        		margin-bottom: 4rem !important;
        }
	
        .m-footer .m-footer__copyright {
        	  color: transparent !important;
        }
    `;
    document.head.appendChild(style);
}
add_root_colors();
