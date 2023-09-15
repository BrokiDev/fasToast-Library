(function injectCSS() {
    const css = `
    @import url("https://fonts.bunny.net/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");
    @import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css");
    
    :root {
        --normal-bg: #fff;
        --normal-border: #bbbcbc;
        --normal-text: black;
        --success-bg: hsl(143, 85%, 96%);
        --success-border: hsl(145, 92%, 91%);
        --success-text: hsl(140, 100%, 27%);
        --error-bg: hsl(359, 100%, 94%);
        --error-border: (359, 100%, 94%);
        --error-text: hsl(360, 100%, 45%);
      }
      
      body {
        font-family: "Inter";
      }
      
      .colorsuccess {
        background-color: var(--success-bg);
        border: var(--success-border);
        color: var(--success-text);
        font-weight: 600;
        font-size: 14px;
      }
      
      .colorerror {
        background-color: var(--error-bg);
        border: var(--error-border);
        color: var(--error-text);
        font-weight: 600;
        font-size: 14px;
      }
      
      .colorinfo {
        background-color: var(--normal-bg);
        border: var(--normal-border);
        color: var(--normal-text);
        font-weight: 600;
        font-size: 14px;
      }
      
      .toastsContainer > div:not(:last-child) {
        display: none; /* Esconde todas las notificaciones excepto la última */
      }
      .toastsContainer:hover > div {
        display: block; /* Muestra todas las notificaciones al pasar el Cursor */
        margin-top: 0.7rem; /* Espaciado reducido entre notificaciones cuando se muestran */
      }
      .toastsContainer > div {
        animation: slideDown 0.3s forwards;
      }
      
      @keyframes slideDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }`;

    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) { // para IE
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
})();

const DEFAULTS = {
  message: 'Default Toast',
  duration: 3000,
  type: 'info'
};

function getTypeStyles(type) {
    switch (type) {
        case 'success':
            return 'px-15 py-3  bg-opacity-90 colorsuccess rounded shadow-md opacity-1';
        case 'error':
            return 'px-10 py-3  bg-opacity-90 colorerror rounded shadow-md opacity-1';
        case 'info':
        default:
            return 'px-10 py-3  bg-opacity-90 colorinfo rounded shadow-md opacity-1';
    }
  }
  
  function imagesConfig(type) {
    switch (type) {
        case 'success':
            return './Toast/assets/icon-success.svg';
        case 'error':
            return './Toast/assets/icon-error.svg';
        case 'info':
        default:
            return './Toast/assets/icon-info.svg';
    }
  }
  
  function fasToast(options = {}) {
    const config = { ...DEFAULTS, ...options };
  
  
    const toast = document.createElement("div");
    toast.innerHTML = `
        <div class="flex items-center gap-2.5">
            <img src="${imagesConfig(config.type)}" class="w-6 h-6">
            ${config.message}
        </div>
    `;
  
    toast.className = `
        px-10 py-3 rounded-lg shadow-md opacity-1
        ${getTypeStyles(config.type)}
    `;
  
    toastsContainer.appendChild(toast);
  
    let timeout;
  
    function hideToast() {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
  
    timeout = setTimeout(hideToast, config.duration);
  
    toast.addEventListener("mouseover", () => {
        clearTimeout(timeout); 
    });
  
    toast.addEventListener("mouseleave", () => {
        timeout = setTimeout(hideToast, config.duration);
    });
  }
  
  
  const toastsContainer = document.createElement('div');
  toastsContainer.className = 'fixed top-4 right-4 z-50 toastsContainer';
  document.body.appendChild(toastsContainer);
  

  
