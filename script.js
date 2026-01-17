document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      const hamburgerIcon = this.querySelector('.hamburger-icon');
      const closeIcon = this.querySelector('.close-icon');
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        this.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        this.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
        const closeIcon = mobileToggle.querySelector('.close-icon');
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  const phoneHeaderBtn = document.querySelector('.phone-header-btn');
  if (phoneHeaderBtn) {
    phoneHeaderBtn.addEventListener('click', function() {
      const phoneNumber = '[business_phone]';
      window.location.href = 'tel:' + phoneNumber;
    });
  }
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      console.log('Form submitted:', data);
      
      alert('תודה על פנייתך! נחזור אליך בהקדם האפשרי.');
      contactForm.reset();
    });
  }
});
// E-commerce functionality
(function() {
  const websiteId = window.ZAPPY_WEBSITE_ID;
  if (!websiteId) return;
  
  // Translations
  const t = {"products":"מוצרים","ourProducts":"המוצרים שלנו","all":"הכל","featured":"מומלצים","new":"חדשים","sale":"מבצעים","loadingProducts":"טוען מוצרים...","cart":"עגלת קניות","yourCart":"עגלת הקניות שלך","emptyCart":"העגלה ריקה","total":"סה\"כ","proceedToCheckout":"המשך לתשלום","checkout":"תשלום","customerInfo":"פרטי לקוח","fullName":"שם מלא","email":"אימייל","phone":"טלפון","shippingAddress":"כתובת למשלוח","street":"רחוב ומספר","city":"עיר","zip":"מיקוד","shippingMethod":"שיטת משלוח","loadingShipping":"טוען שיטות משלוח...","payment":"תשלום","loadingPayment":"טוען אפשרויות תשלום...","orderSummary":"סיכום הזמנה","subtotal":"סכום ביניים","shipping":"משלוח","discount":"הנחה","totalToPay":"סה\"כ לתשלום","placeOrder":"בצע הזמנה","login":"התחברות","customerLogin":"התחברות לקוחות","enterEmail":"הזן את כתובת האימייל שלך ונשלח לך קוד התחברות","emailAddress":"כתובת אימייל","sendCode":"שלח קוד","enterCode":"הזן את הקוד שנשלח לאימייל שלך","verificationCode":"קוד אימות","verify":"אמת","returnPolicy":"מדיניות החזרות","addToCart":"הוסף לעגלה","addedToCart":"המוצר נוסף לעגלה!","remove":"הסר","noProducts":"אין מוצרים להצגה כרגע","errorLoading":"שגיאה בטעינת מוצרים","days":"ימים","currency":"₪"};
  
  // Cart state
  let cart = JSON.parse(localStorage.getItem('zappy_cart_' + websiteId) || '[]');
  
  function saveCart() {
    localStorage.setItem('zappy_cart_' + websiteId, JSON.stringify(cart));
    updateCartCount();
  }
  
  function updateCartCount() {
    const countEl = document.querySelector('.cart-count');
    if (countEl) countEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    alert(t.addedToCart);
  }
  
  // Load products on products page
  async function loadProducts() {
    const grid = document.getElementById('zappy-product-grid');
    if (!grid) return;
    try {
      const res = await fetch('/api/ecommerce/products?websiteId=' + websiteId);
      const data = await res.json();
      if (!data.success || !data.data?.length) {
        grid.innerHTML = '<div class="empty-cart">' + t.noProducts + '</div>';
        return;
      }
      grid.innerHTML = data.data.map(p => 
        '<div class="product-card">' +
          (p.images?.[0] ? '<img src="' + p.images[0] + '" alt="' + p.name + '">' : '<div style="height:200px;background:#f0f0f0;border-radius:8px;"></div>') +
          '<h3>' + p.name + '</h3>' +
          '<p>' + (p.description || '').substring(0, 100) + '</p>' +
          '<div class="price">' + t.currency + p.price + '</div>' +
          '<button class="add-to-cart" onclick="window.zappyAddToCart(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">' + t.addToCart + '</button>' +
        '</div>'
      ).join('');
    } catch (e) {
      console.error('Failed to load products', e);
      grid.innerHTML = '<div class="empty-cart">' + t.errorLoading + '</div>';
    }
  }
  
  // Render cart on cart page
  function renderCart() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!itemsEl) return;
    
    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="empty-cart">' + t.emptyCart + '</div>';
      if (totalEl) totalEl.textContent = t.currency + '0';
      return;
    }
    
    let total = 0;
    itemsEl.innerHTML = cart.map(item => {
      total += item.price * item.quantity;
      return '<div class="cart-item">' +
        '<img src="' + (item.images?.[0] || '') + '" alt="' + item.name + '">' +
        '<div><strong>' + item.name + '</strong><br>' + t.currency + item.price + ' x ' + item.quantity + '</div>' +
        '<button onclick="window.zappyRemoveFromCart(\'' + item.id + '\')">' + t.remove + '</button>' +
      '</div>';
    }).join('');
    if (totalEl) totalEl.textContent = t.currency + total;
  }
  
  window.zappyAddToCart = addToCart;
  window.zappyRemoveFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadProducts();
    renderCart();
  });
})();


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


// Zappy Contact Form API Integration (Fallback)
(function() {
    if (window.zappyContactFormLoaded) {
        console.log('📧 Zappy contact form already loaded');
        return;
    }
    window.zappyContactFormLoaded = true;

    function initContactFormIntegration() {
        console.log('📧 Zappy: Initializing contact form API integration...');

        // Find the contact form (try multiple selectors for flexibility)
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

        // Store original submit handler if exists
        const originalOnSubmit = contactForm.onsubmit;

    // Add Zappy API integration using capture phase to run before other handlers
    contactForm.addEventListener('submit', async function(e) {
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Send to Zappy backend API (don't prevent default, let other handlers run)
        try {
            console.log('📧 Zappy: Sending contact form to backend API...');
            const response = await fetch('http://localhost:5001/api/email/contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    websiteId: '1d7df850-dfb9-42ce-9cb0-088786113c55',
                    name: data.name || '',
                    email: data.email || '',
                    subject: data.subject || 'Contact Form Submission',
                    message: data.message || '',
                    phone: data.phone || null
                })
            });

            const result = await response.json();
            
            if (result.success) {
                console.log('✅ Zappy: Contact form data sent successfully to backend');
            } else {
                console.log('⚠️ Zappy: Backend returned error:', result.error);
            }
        } catch (error) {
            console.error('❌ Zappy: Failed to send to backend API:', error);
            // Don't break the existing form submission
        }
        }, true); // Use capture phase to run before other handlers

        console.log('✅ Zappy: Contact form API integration initialized');
    } // End of initContactFormIntegration
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactFormIntegration);
    } else {
        // DOM is already ready, initialize immediately
        initContactFormIntegration();
    }
})();
