function createPopup() {
    // Check if already exists to prevent duplicates
    if (document.getElementById('custom-popup')) return;

    const overlay = document.createElement('div');
    overlay.id = 'custom-popup-overlay';
    document.body.appendChild(overlay);

    const popup = document.createElement('div');
    popup.id = 'custom-popup';
    popup.className = 'popup-box'; // Using your CSS 2 class
    popup.innerHTML = `
        <div class="popup-header">
            <img src="assets/logo.png" alt="Icon" id="pophead">
            <h2 id="popup-title">Notification</h2>
        </div>
        <hr style="background-color: #B1E50E; height: 2px; border: none; margin: 10px 0;">
        <p id="popup-text">Default text</p>
        <button class="btn-close-popup" onclick="hidePopup()" style="width: 100%; margin-top: 15px;">Close</button>
    `;
    document.body.appendChild(popup);

    // Apply necessary dynamic styles
    const style = document.createElement('style');
    style.innerHTML = `
        #custom-popup-overlay {
            display: none;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        #custom-popup {
            display: none;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            z-index: 9999;
            background: white;
            padding: 25px;
            border-radius: 40px; /* Matching your box design */
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            width: 310px;
            text-align: center;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        #custom-popup.show {
            display: block;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        #custom-popup-overlay.show {
            display: block;
            opacity: 1;
        }

        #popup-text {
            font-family: 'Quicksand', sans-serif;
            font-weight: 600;
            font-size: 15px;
            line-height: 1.5;
            margin: 15px 0;
        }

        .highlight-blue {
            color: #007cf0;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

function showPopup(text, textColor = '#333') {
    createPopup();

    // Auto-highlight special keywords (optional)
    const formattedText = text.replace(/(@[a-zA-Z0-9]+)/g, '<span class="highlight-blue">$1</span>');

    const popupText = document.getElementById('popup-text');
    popupText.innerHTML = formattedText;
    popupText.style.color = textColor;

    const popup = document.getElementById('custom-popup');
    const overlay = document.getElementById('custom-popup-overlay');

    // Small delay to ensure display:block happens before opacity
    popup.style.display = 'block';
    overlay.style.display = 'block';
    
    setTimeout(() => {
        popup.classList.add('show');
        overlay.classList.add('show');
    }, 10);
}

function hidePopup() {
    const popup = document.getElementById('custom-popup');
    const overlay = document.getElementById('custom-popup-overlay');

    if (!popup) return;

    popup.classList.remove('show');
    overlay.classList.remove('show');

    // Remove from DOM after animation finishes
    setTimeout(() => {
        popup.remove();
        overlay.remove();
    }, 400); 
}
