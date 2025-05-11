// Accessibility JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accessibility toggle
    initAccessibilityWidget();
});

// Initialize accessibility toggle
function initAccessibilityWidget() {
    const accessibilityToggle = document.querySelector('.accessibility-toggle');
    const accessibilityWidget = document.querySelector('.accessibility-widget');
    
    if (!accessibilityToggle || !accessibilityWidget) return;
    
    // Toggle accessibility panel
    accessibilityToggle.addEventListener('click', function() {
        accessibilityWidget.classList.toggle('active');
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!accessibilityWidget.contains(e.target)) {
            accessibilityWidget.classList.remove('active');
        }
    });
    
    // Initialize button functionalities
    initAccessibilityButtons();
}

// Initialize accessibility buttons
function initAccessibilityButtons() {
    const increaseTextBtn = document.getElementById('increaseText');
    const decreaseTextBtn = document.getElementById('decreaseText');
    const highContrastBtn = document.getElementById('highContrast');
    const stopAnimationBtn = document.getElementById('stopAnimation');
    const lightContrastBtn = document.getElementById('lightContrast');
    const readableTextBtn = document.getElementById('readableText');
    const keyboardAccessBtn = document.getElementById('keyboardAccess');
    const showAltTextBtn = document.getElementById('showAltText');
    const resetAccessBtn = document.getElementById('resetAccess');
    
    // Check if basic buttons exist
    if (!increaseTextBtn || !decreaseTextBtn || !highContrastBtn || !stopAnimationBtn) return;
    
    // Load saved preferences
    loadAccessibilityPreferences();
    
    // Increase text size
    increaseTextBtn.addEventListener('click', function() {
        document.body.classList.remove('smaller-text');
        document.body.classList.toggle('larger-text');
        saveAccessibilityPreference('textSize', document.body.classList.contains('larger-text') ? 'large' : 'normal');
    });
    
    // Decrease text size
    decreaseTextBtn.addEventListener('click', function() {
        document.body.classList.remove('larger-text');
        document.body.classList.toggle('smaller-text');
        saveAccessibilityPreference('textSize', document.body.classList.contains('smaller-text') ? 'small' : 'normal');
    });
    
    // High contrast mode (dark)
    highContrastBtn.addEventListener('click', function() {
        document.body.classList.remove('light-contrast');
        document.body.classList.toggle('high-contrast');
        saveAccessibilityPreference('highContrast', document.body.classList.contains('high-contrast'));
        saveAccessibilityPreference('lightContrast', false);
    });
    
    // Stop animations
    stopAnimationBtn.addEventListener('click', function() {
        document.body.classList.toggle('no-animation');
        saveAccessibilityPreference('noAnimation', document.body.classList.contains('no-animation'));
    });
    
    // New accessibility features - only add listeners if buttons exist
    
    // Light contrast mode
    if (lightContrastBtn) {
        lightContrastBtn.addEventListener('click', function() {
            document.body.classList.remove('high-contrast');
            document.body.classList.toggle('light-contrast');
            saveAccessibilityPreference('lightContrast', document.body.classList.contains('light-contrast'));
            saveAccessibilityPreference('highContrast', false);
        });
    }
    
    // Readable text
    if (readableTextBtn) {
        readableTextBtn.addEventListener('click', function() {
            document.body.classList.toggle('readable-text');
            saveAccessibilityPreference('readableText', document.body.classList.contains('readable-text'));
        });
    }
    
    // Keyboard accessibility
    if (keyboardAccessBtn) {
        keyboardAccessBtn.addEventListener('click', function() {
            document.body.classList.toggle('keyboard-accessible');
            saveAccessibilityPreference('keyboardAccessible', document.body.classList.contains('keyboard-accessible'));
        });
    }
    
    // Show alt text
    if (showAltTextBtn) {
        showAltTextBtn.addEventListener('click', function() {
            document.body.classList.toggle('show-alt-text');
            saveAccessibilityPreference('showAltText', document.body.classList.contains('show-alt-text'));
        });
    }
    
    // Reset all accessibility settings
    if (resetAccessBtn) {
        resetAccessBtn.addEventListener('click', function() {
            resetAccessibilitySettings();
        });
    }
}

// Reset all accessibility settings
function resetAccessibilitySettings() {
    // Remove all accessibility classes
    document.body.classList.remove(
        'larger-text', 
        'smaller-text', 
        'high-contrast', 
        'light-contrast', 
        'no-animation', 
        'readable-text', 
        'keyboard-accessible', 
        'show-alt-text'
    );
    
    // Clear localStorage settings
    localStorage.removeItem('accessibilityPreferences');
    
    // Display a message to the user
    alert('הגדרות הנגישות אופסו בהצלחה');
}

// Save accessibility preference
function saveAccessibilityPreference(key, value) {
    try {
        const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences')) || {};
        preferences[key] = value;
        localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    } catch (error) {
        console.error('Error saving accessibility preference:', error);
    }
}

// Load accessibility preferences
function loadAccessibilityPreferences() {
    try {
        const preferences = JSON.parse(localStorage.getItem('accessibilityPreferences')) || {};
        
        // Apply text size preference
        if (preferences.textSize === 'large') {
            document.body.classList.add('larger-text');
            document.body.classList.remove('smaller-text');
        } else if (preferences.textSize === 'small') {
            document.body.classList.add('smaller-text');
            document.body.classList.remove('larger-text');
        }
        
        // Apply high contrast preference
        if (preferences.highContrast) {
            document.body.classList.add('high-contrast');
        }
        
        // Apply light contrast preference
        if (preferences.lightContrast) {
            document.body.classList.add('light-contrast');
        }
        
        // Apply animation preference
        if (preferences.noAnimation) {
            document.body.classList.add('no-animation');
        }
        
        // Apply readable text preference
        if (preferences.readableText) {
            document.body.classList.add('readable-text');
        }
        
        // Apply keyboard accessibility preference
        if (preferences.keyboardAccessible) {
            document.body.classList.add('keyboard-accessible');
        }
        
        // Apply show alt text preference
        if (preferences.showAltText) {
            document.body.classList.add('show-alt-text');
        }
    } catch (error) {
        console.error('Error loading accessibility preferences:', error);
    }
}

// Add ARIA attributes to improve accessibility
function enhanceAccessibility() {
    // Add aria-label to SVGs
    document.querySelectorAll('svg').forEach(svg => {
        if (!svg.getAttribute('aria-label')) {
            svg.setAttribute('aria-label', 'תמונה דקורטיבית');
            svg.setAttribute('role', 'img');
        }
    });
    
    // Add aria-labels to buttons without text
    document.querySelectorAll('button').forEach(button => {
        if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', 'כפתור');
        }
    });
    
    // Form validation
    const form = document.querySelector('.order-form');
    if (form) {
        form.setAttribute('novalidate', '');
        
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                
                // Add focus and aria-invalid to first invalid field
                const firstInvalid = form.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                    firstInvalid.setAttribute('aria-invalid', 'true');
                    
                    // Create error message
                    const errorId = `${firstInvalid.id}-error`;
                    let errorMessage = document.getElementById(errorId);
                    
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.id = errorId;
                        errorMessage.className = 'error-message';
                        errorMessage.setAttribute('role', 'alert');
                        firstInvalid.parentNode.appendChild(errorMessage);
                    }
                    
                    errorMessage.textContent = firstInvalid.validationMessage;
                    firstInvalid.setAttribute('aria-describedby', errorId);
                }
            }
        });
        
        // Reset validation state on input
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                this.removeAttribute('aria-invalid');
                const errorId = `${this.id}-error`;
                const errorMessage = document.getElementById(errorId);
                if (errorMessage) {
                    errorMessage.textContent = '';
                }
            });
        });
    }
}

// Call enhanceAccessibility after DOM loaded
document.addEventListener('DOMContentLoaded', enhanceAccessibility); 