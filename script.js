
      async function fetchProducts() {
        try {
          const websiteId = window.ZAPPY_WEBSITE_ID;
          if (!websiteId) return;
          const response = await fetch('/api/ecommerce/products?websiteId=' + websiteId);
          const data = await response.json();
          if (!data.success) return;
          const products = data.data || [];
          const grid = document.getElementById('zappy-product-grid');
          if (!grid) return;
          if (products.length === 0) {
            grid.innerHTML = '<div>No products yet</div>';
            return;
          }
          grid.innerHTML = products.map(p => {
            return '<div class="product-card standard">' +
              '<div class="image-placeholder">Image</div>' +
              '<h3>' + (p.name || '') + '</h3>' +
              '<p>' + (p.description || '') + '</p>' +
              '<div class="price">$' + (p.price || 0) + '</div>' +
            '</div>';
          }).join('');
        } catch (e) {
          console.error('Failed to load products', e);
        }
      }
      document.addEventListener('DOMContentLoaded', fetchProducts);
    

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`[WARNING] Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        setTimeout(initCookieConsent, 100);
      } else {
      }
      return;
    }

    const cc = window.CookieConsent;
    
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "he",
    "translations": {
      "he": {
        "consentModal": {
          "title": "אנחנו משתמשים בעוגיות 🍪",
          "description": "אבוטבול ברגים משתמש בעוגיות כדי לשפר את החוויה שלך, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "showPreferencesBtn": "נהל העדפות",
          "footer": "<a href=\"#privacy-policy\">מדיניות פרטיות</a> | <a href=\"#terms-conditions\">תנאי שימוש</a>"
        },
        "preferencesModal": {
          "title": "העדפות עוגיות",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "savePreferencesBtn": "שמור העדפות",
          "closeIconLabel": "סגור",
          "sections": [
            {
              "title": "עוגיות חיוניות",
              "description": "עוגיות אלה הכרחיות לתפקוד האתר ולא ניתן להשבית אותן.",
              "linkedCategory": "necessary"
            },
            {
              "title": "עוגיות ניתוח",
              "description": "עוגיות אלה עוזרות לנו להבין איך המבקרים מתקשרים עם האתר שלנו.",
              "linkedCategory": "analytics"
            },
            {
              "title": "עוגיות שיווקיות",
              "description": "עוגיות אלה משמשות להצגת פרסומות מותאמות אישית.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      
      // Optional: Handle consent changes (check if onChange is available)
      if (typeof cc.onChange === 'function') {
        cc.onChange(function(cookie, changed_preferences) {
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
        });
      } else {
      }

      // Note: Cookie Preferences button removed per marketing guidelines
      // Footer should be clean and minimal - users can manage cookies via banner
    } catch (error) {
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

/* Mickidum Accessibility Toolbar Initialization - Zappy Style */

window.onload = function() {
    
    try {
        window.micAccessTool = new MicAccessTool({
            buttonPosition: 'left', // Position on left side
            forceLang: 'he-IL', // Force language
            icon: {
                position: {
                    bottom: { size: 50, units: 'px' },
                    left: { size: 20, units: 'px' },
                    type: 'fixed'
                },
                backgroundColor: 'transparent', // Transparent to allow CSS styling
                color: 'transparent', // Let CSS handle coloring
                img: 'accessible',
                circular: false // Square button for consistent styling
            },
            menu: {
                dimensions: {
                    width: { size: 300, units: 'px' },
                    height: { size: 'auto', units: 'px' }
                }
            }
        });
        
    } catch (error) {
    }
    
    // Keyboard shortcut handler: ALT+A (Option+A on Mac) to toggle accessibility widget visibility (desktop only)
    document.addEventListener('keydown', function(event) {
        // Check if ALT+A is pressed (ALT on Windows/Linux, Option on Mac)
        var isAltOrOption = event.altKey || event.metaKey;
        var isAKey = event.keyCode === 65 || event.which === 65 || 
                      (event.key && (event.key.toLowerCase() === 'a' || event.key === 'å' || event.key === 'Å'));
        
        if (isAltOrOption && isAKey) {
            // Only work on desktop (screen width > 768px)
            if (window.innerWidth > 768) {
                event.preventDefault();
                event.stopPropagation();
                
                // Toggle visibility class on body
                var isVisible = document.body.classList.contains('accessibility-widget-visible');
                
                if (isVisible) {
                    // Hide the widget
                    document.body.classList.remove('accessibility-widget-visible');
                } else {
                    // Show the widget
                    document.body.classList.add('accessibility-widget-visible');
                    
                    // After a short delay, click the button to open the menu
                    setTimeout(function() {
                        var accessButton = document.getElementById('mic-access-tool-general-button');
                        if (accessButton) {
                            accessButton.click();
                        }
                    }, 200);
                }
            }
        }
    }, true);
};


    // Enhanced contact form handling with Elastic Email integration
    // API URL: http://localhost:5001
    (function() {
        // Check if contact form handler is already loaded
        if (window.zappyContactFormLoaded) {
            console.log('📧 Zappy contact form already loaded');
            return;
        }
        window.zappyContactFormLoaded = true;
        
        // Wait for DOM to be ready before initializing
        function initContactForm() {
            console.log('📧 Zappy: Initializing contact form handler...');
            
            // Find contact form with multiple selector fallbacks
            const contactForm = document.querySelector('.contact-form') || 
                               document.querySelector('form[action*="contact"]') ||
                               document.querySelector('form#contact') ||
                               document.querySelector('form#contactForm') ||
                               document.getElementById('contactForm') ||
                               document.querySelector('section.contact form') ||
                               document.querySelector('section#contact form') ||
                               document.querySelector('form');
            
            if (!contactForm) {
                console.log('⚠️ Zappy: No contact form found on page');
                return;
            }
            
            console.log('✅ Zappy: Contact form found:', contactForm.className || contactForm.id || 'unnamed form');
            
            // Remove any existing submit handlers by cloning the form element
            const newContactForm = contactForm.cloneNode(true);
            contactForm.parentNode.replaceChild(newContactForm, contactForm);
            
            // Now add our handler to the clean form
            newContactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation - check for both empty strings and missing fields
            const name = (data.name || '').trim();
            const email = (data.email || '').trim();
            const message = (data.message || '').trim();
            
            if (!name || !email || !message) {
                console.error('❌ Validation failed:', { name: !!name, email: !!email, message: !!message });
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            
            // Email validation
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Get submit button and show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Add loading animation
            submitBtn.classList.add('loading');
            
            try {
                // Send to Zappy email API (use absolute URL for deployed sites)
                const apiUrl = 'http://localhost:5001';
                const endpoint = apiUrl + '/api/email/contact-form';
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        websiteId: '1d7df850-dfb9-42ce-9cb0-088786113c55',
                        name: data.name,
                        email: data.email,
                        subject: data.subject || 'Contact Form Submission',
                        message: data.message,
                        phone: data.phone || null
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Success - show confirmation message
                    showNotification(result.message || 'Thank you for your message! We\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Optional: Show additional success UI
                    showSuccessModal();
                } else {
                    // Error from server
                    console.error('❌ Server returned error:', result);
                    showNotification(result.error || 'Failed to send message. Please try again.', 'error');
                }
                
            } catch (error) {
                console.error('❌ Network error:', error);
                console.error('Failed to connect to:', 'http://localhost:5001/api/email/contact-form');
                
                // Fallback: Show error message and provide alternative contact info
                showNotification(
                    'Unable to send message right now. Please try again later or contact us directly.',
                    'error'
                );
                
                // Show fallback contact info
                showFallbackContact();
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
        
        // Email validation helper
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Notification system
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.zappy-notification');
            existingNotifications.forEach(notification => notification.remove());
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `zappy-notification zappy-notification--${type}`;
            notification.innerHTML = `
            <div class="zappy-notification__content">
                <span class="zappy-notification__icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="zappy-notification__message">${message}</span>
                <button class="zappy-notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            `;
            
            // Add styles if not already present
            if (!document.querySelector('#zappy-notification-styles')) {
                const styles = document.createElement('style');
            styles.id = 'zappy-notification-styles';
            styles.textContent = `
                .zappy-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    padding: 16px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .zappy-notification--success {
                    background-color: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                }
                
                .zappy-notification--error {
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                }
                
                .zappy-notification--info {
                    background-color: #d1ecf1;
                    border: 1px solid #bee5eb;
                    color: #0c5460;
                }
                
                .zappy-notification__content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .zappy-notification__icon {
                    font-size: 18px;
                    flex-shrink: 0;
                }
                
                .zappy-notification__message {
                    flex: 1;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .zappy-notification__close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.7;
                }
                
                .zappy-notification__close:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .loading {
                    position: relative;
                    pointer-events: none;
                }
                
                .loading::after {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    margin: auto;
                    border: 2px solid transparent;
                    border-top-color: currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds for success, 8 seconds for errors
        const timeout = type === 'error' ? 8000 : 5000;
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, timeout);
    }
    
    // Success modal for enhanced UX
    function showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'zappy-success-modal';
        modal.innerHTML = `
            <div class="zappy-success-modal__backdrop" onclick="this.parentElement.remove()">
                <div class="zappy-success-modal__content" onclick="event.stopPropagation()">
                    <div class="zappy-success-modal__icon">🎉</div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We've received your message and will get back to you as soon as possible.</p>
                    <button onclick="this.closest('.zappy-success-modal').remove()" class="zappy-success-modal__button">
                        Got it!
                    </button>
                </div>
            </div>
        `;
        
        // Add modal styles
        if (!document.querySelector('#zappy-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'zappy-modal-styles';
            styles.textContent = `
                .zappy-success-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10001;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .zappy-success-modal__backdrop {
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .zappy-success-modal__content {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    animation: slideUp 0.3s ease-out;
                }
                
                .zappy-success-modal__icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                }
                
                .zappy-success-modal__content h3 {
                    margin: 0 0 15px 0;
                    color: #333;
                    font-size: 24px;
                }
                
                .zappy-success-modal__content p {
                    margin: 0 0 25px 0;
                    color: #666;
                    line-height: 1.5;
                }
                
                .zappy-success-modal__button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .zappy-success-modal__button:hover {
                    background: #0056b3;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(modal);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 5000);
    }
    
    // Fallback contact information
    function showFallbackContact() {
        const fallback = document.createElement('div');
        fallback.className = 'zappy-fallback-contact';
        fallback.innerHTML = `
            <div class="zappy-fallback-contact__content">
                <h4>Alternative Contact Methods</h4>
                <p>If you're having trouble sending your message, you can also reach us at:</p>
                <div class="zappy-fallback-contact__methods">
                    <a href="mailto:support@zappy5.com?subject=Contact Form Issue" class="zappy-fallback-contact__method">
                        📧 support@zappy5.com
                    </a>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="zappy-fallback-contact__close">
                    Close
                </button>
            </div>
        `;
        
        // Add fallback styles
        if (!document.querySelector('#zappy-fallback-styles')) {
            const styles = document.createElement('style');
            styles.id = 'zappy-fallback-styles';
            styles.textContent = `
                .zappy-fallback-contact {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    max-width: 350px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    animation: slideInUp 0.3s ease-out;
                }
                
                .zappy-fallback-contact__content {
                    padding: 20px;
                }
                
                .zappy-fallback-contact__content h4 {
                    margin: 0 0 10px 0;
                    color: #333;
                    font-size: 16px;
                }
                
                .zappy-fallback-contact__content p {
                    margin: 0 0 15px 0;
                    color: #666;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .zappy-fallback-contact__methods {
                    margin-bottom: 15px;
                }
                
                .zappy-fallback-contact__method {
                    display: block;
                    padding: 8px 12px;
                    background: #f8f9fa;
                    border: 1px solid #e9ecef;
                    border-radius: 4px;
                    text-decoration: none;
                    color: #495057;
                    font-size: 14px;
                    transition: background-color 0.2s;
                }
                
                .zappy-fallback-contact__method:hover {
                    background: #e9ecef;
                }
                
                .zappy-fallback-contact__close {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    float: right;
                }
                
                @keyframes slideInUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(fallback);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (fallback.parentElement) {
                fallback.remove();
            }
        }, 10000);
        }
        
        // ═══════════════════════════════════════════════════════════════
        // 🍔 MOBILE MENU TOGGLE HANDLER
        // ═══════════════════════════════════════════════════════════════
        (function initMobileMenu() {
            const mobileToggle = document.getElementById('mobileToggle') || 
                               document.querySelector('.mobile-toggle') || 
                               document.querySelector('.hamburger');
            const navMenu = document.getElementById('navMenu') || 
                          document.querySelector('.nav-menu') ||
                          document.querySelector('.navbar-menu');
            
            if (mobileToggle && navMenu) {
                
                // Toggle menu on button click
                mobileToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const hamburgerIcon = this.querySelector('.hamburger-icon');
                    const closeIcon = this.querySelector('.close-icon');
                    const isActive = this.classList.contains('active');
                    
                    if (isActive) {
                        // Show hamburger, hide X
                        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
                        if (closeIcon) closeIcon.style.display = 'none';
                        this.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    } else {
                        // Show X, hide hamburger  
                        if (hamburgerIcon) hamburgerIcon.style.display = 'none';
                        if (closeIcon) closeIcon.style.display = 'block';
                        this.classList.add('active');
                        navMenu.classList.add('active');
                        document.body.style.overflow = 'hidden'; // Prevent scroll when menu open
                    }
                });
                
                // Close menu when clicking a nav link
                const navLinks = navMenu.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
                        const closeIcon = mobileToggle.querySelector('.close-icon');
                        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
                        if (closeIcon) closeIcon.style.display = 'none';
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (navMenu.classList.contains('active') && 
                        !navMenu.contains(e.target) && 
                        !mobileToggle.contains(e.target)) {
                        const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
                        const closeIcon = mobileToggle.querySelector('.close-icon');
                        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
                        if (closeIcon) closeIcon.style.display = 'none';
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                
                // Handle escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                        const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
                        const closeIcon = mobileToggle.querySelector('.close-icon');
                        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
                        if (closeIcon) closeIcon.style.display = 'none';
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                
                // Phone header button functionality
                const phoneHeaderBtn = document.querySelector('.phone-header-btn');
                if (phoneHeaderBtn) {
                    phoneHeaderBtn.addEventListener('click', function() {
                        // Default placeholder - business owner can update
                        const phoneNumber = '+1234567890';
                        window.location.href = 'tel:' + phoneNumber;
                    });
                }
            }
        })();
        
        // ═══════════════════════════════════════════════════════════════
        // 🔗 DISABLE SOCIAL MEDIA LINKS WITH PLACEHOLDERS
        // ═══════════════════════════════════════════════════════════════
        (function disablePlaceholderLinks() {
            // List of social media placeholders to check for (both old and new formats)
            const socialPlaceholders = [
                // New format (handle placeholders within URLs)
                '[facebook_handle]',
                '[instagram_handle]',
                '[whatsapp_handle]',
                '[twitter_handle]',
                '[linkedin_handle]',
                '[youtube_handle]',
                '[tiktok_handle]',
                '[pinterest_handle]',
                // Old format (full URL placeholders)
                '[social_facebook]',
                '[social instagram]',
                '[social_instagram]',
                '[social whatsapp]',
                '[social_whatsapp]',
                '[social_twitter]',
                '[social_linkedin]',
                '[social_youtube]',
                '[social_tiktok]',
                '[social_pinterest]'
            ];
            
            // Find all links that might contain placeholders
            const allLinks = document.querySelectorAll('a[href]');
            
            allLinks.forEach(link => {
                const href = link.getAttribute('href');
                
                // Check if href contains any placeholder
                const hasPlaceholder = socialPlaceholders.some(placeholder => 
                    href && href.includes(placeholder)
                );
                
                if (hasPlaceholder) {
                    // Prevent navigation
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                    
                    // Add visual indication that link is disabled
                    link.style.cursor = 'not-allowed';
                    link.style.opacity = '0.6';
                    link.setAttribute('aria-disabled', 'true');
                    link.setAttribute('title', 'Social media link not configured');
                    
                    // Remove target="_blank" to prevent opening empty tabs
                    link.removeAttribute('target');
                    link.removeAttribute('rel');
                }
            });
        })();
        } // End of initContactForm
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initContactForm);
        } else {
            // DOM is already ready, initialize immediately
            initContactForm();
        }
    })(); // End of IIFE
    