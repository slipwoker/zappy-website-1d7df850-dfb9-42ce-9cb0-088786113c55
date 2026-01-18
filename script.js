// Prevent duplicate Zappy injection
if (window.zappyContactFormLoaded) {
    console.log('⚠️ Zappy: Contact form handler already loaded, skipping duplicate injection');
} else {
    window.zappyContactFormLoaded = true;
}

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
        contactForm.addEventListener('submit', async function(e) { 
            e.preventDefault(); 
            
            // Extract form data for Zappy API
            const formData = new FormData(this);
            const formFields = {};
            
            // Build form fields object
            for (let [key, value] of formData.entries()) {
                formFields[key] = value;
            }
            
            // Send to Zappy backend API
            if (!window.zappyContactFormLoaded) {
                console.log('⚠️ Zappy: Contact form handler not properly initialized');
            } else {
                try {
                    console.log('📧 Zappy: Sending contact form to backend...');
                    
                    const zappyPayload = {
                        websiteId: '1d7df850-dfb9-42ce-9cb0-088786113c55',
                        name: formFields.name || formFields.fullname || formFields.fullName || '',
                        email: formFields.email || '',
                        subject: formFields.subject || 'Contact Form Submission',
                        message: formFields.message || formFields.comments || formFields.details || '',
                        phone: formFields.phone || formFields.telephone || formFields.mobile || null
                    };
                    
                    const response = await fetch('https://qaapi.zappy5.com/api/email/contact-form', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(zappyPayload)
                    });
                    
                    if (response.ok) {
                        const result = await response.json();
                        console.log('✅ Zappy: Email sent successfully', result);
                    } else {
                        console.log('⚠️ Zappy: API returned non-OK status', response.status);
                    }
                } catch (error) {
                    console.error('❌ Zappy: Failed to send email', error);
                    // Don't break existing functionality - continue with original behavior
                }
            }
            
            // Keep existing behavior
            alert('תודה על פנייתך! ניצור איתך קשר בהקדם.'); 
            contactForm.reset(); 
        }); 
    } 
});

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
// E-commerce functionality
(function() {
  const websiteId = window.ZAPPY_WEBSITE_ID;
  if (!websiteId) return;
  
  // Translations
  const t = {"products":"מוצרים","ourProducts":"המוצרים שלנו","featuredProducts":"מוצרים מומלצים","noFeaturedProducts":"עוד לא נבחרו מוצרים מומלצים. צפו בכל המוצרים שלנו!","all":"הכל","featured":"מומלצים","new":"חדשים","sale":"מבצעים","loadingProducts":"טוען מוצרים...","cart":"עגלת קניות","yourCart":"עגלת הקניות שלך","emptyCart":"העגלה ריקה","total":"סה\"כ","proceedToCheckout":"המשך לתשלום","checkout":"תשלום","customerInfo":"פרטי לקוח","fullName":"שם מלא","email":"אימייל","phone":"טלפון","shippingAddress":"כתובת למשלוח","street":"רחוב ומספר","city":"עיר","zip":"מיקוד","shippingMethod":"שיטת משלוח","loadingShipping":"טוען שיטות משלוח...","payment":"תשלום","loadingPayment":"טוען אפשרויות תשלום...","orderSummary":"סיכום הזמנה","subtotal":"סכום ביניים","shipping":"משלוח","discount":"הנחה","totalToPay":"סה\"כ לתשלום","placeOrder":"בצע הזמנה","login":"התחברות","customerLogin":"התחברות לקוחות","enterEmail":"הזן את כתובת האימייל שלך ונשלח לך קוד התחברות","emailAddress":"כתובת אימייל","sendCode":"שלח קוד","enterCode":"הזן את הקוד שנשלח לאימייל שלך","verificationCode":"קוד אימות","verify":"אמת","returnPolicy":"מדיניות החזרות","addToCart":"הוסף לעגלה","addedToCart":"המוצר נוסף לעגלה!","remove":"הסר","noProducts":"אין מוצרים להצגה כרגע","errorLoading":"שגיאה בטעינה","days":"ימים","currency":"₪","free":"חינם","freeAbove":"משלוח חינם מעל","noShippingMethods":"אין אפשרויות משלוח זמינות","viewAllResults":"הצג את כל התוצאות","searchProducts":"חיפוש מוצרים","productDetails":"פרטי המוצר","viewDetails":"לפרטים נוספים","inStock":"במלאי","outOfStock":"אזל מהמלאי","sku":"מק\"ט","category":"קטגוריה","relatedProducts":"מוצרים דומים","productNotFound":"המוצר לא נמצא","backToProducts":"חזרה למוצרים","quantity":"כמות"};
  
  // Cart state
  let cart = JSON.parse(localStorage.getItem('zappy_cart_' + websiteId) || '[]');
  
  function saveCart() {
    localStorage.setItem('zappy_cart_' + websiteId, JSON.stringify(cart));
    updateCartCount();
    renderCartDrawer(); // Keep drawer in sync
  }
  
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    // Update all cart count badges (our injected one and any existing ones)
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(function(el) { el.textContent = count; });
  }
  
  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    openCartDrawer(); // Open cart drawer instead of alert
  }
  
  // Load products on products page (uses public storefront API)
  async function loadProducts() {
    const grid = document.getElementById('zappy-product-grid');
    if (!grid) return;
    try {
      // Get category filter from URL if present
      let pagePath = window.location.pathname;
      const urlParams = new URLSearchParams(window.location.search);
      // In preview mode, also check the page parameter
      const pageParam = urlParams.get('page');
      if (pageParam) {
        // Parse query params from the page parameter (e.g., /products?category=xxx)
        const pageUrl = new URL(pageParam, window.location.origin);
        const categoryId = pageUrl.searchParams.get('category') || urlParams.get('category');
        if (categoryId) {
          urlParams.set('category', categoryId);
        }
      }
      const categoryId = urlParams.get('category');
      
      let apiUrl = '/api/ecommerce/storefront/products?websiteId=' + websiteId;
      if (categoryId) {
        apiUrl += '&categoryId=' + categoryId;
      }
      
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (!data.success || !data.data?.length) {
        grid.innerHTML = '<div class="empty-cart">' + t.noProducts + '</div>';
        return;
      }
      grid.innerHTML = data.data.map(p => 
        '<div class="product-card">' +
          '<a href="/product/' + (p.slug || p.id) + '" class="product-card-link">' +
            (p.images?.[0] ? '<img src="' + p.images[0] + '" alt="' + p.name + '">' : '<div style="height:200px;background:#f0f0f0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#999;">📦</div>') +
            '<h3>' + p.name + '</h3>' +
            '<p>' + (p.description || '').substring(0, 100) + '</p>' +
            '<div class="price">' + t.currency + p.price + '</div>' +
          '</a>' +
          '<button class="add-to-cart" onclick="event.stopPropagation(); window.zappyAddToCart(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">' + t.addToCart + '</button>' +
        '</div>'
      ).join('');
    } catch (e) {
      console.error('Failed to load products', e);
      grid.innerHTML = '<div class="empty-cart">' + t.errorLoading + '</div>';
    }
  }
  
  // Render cart drawer (slide-out panel)
  function renderCartDrawer() {
    const drawerItems = document.getElementById('cart-drawer-items');
    const drawerTotal = document.getElementById('cart-drawer-total');
    if (!drawerItems) return;
    
    if (cart.length === 0) {
      drawerItems.innerHTML = '<div class="empty-cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>' + t.emptyCart + '</p></div>';
      if (drawerTotal) drawerTotal.textContent = t.currency + '0';
      return;
    }
    
    let total = 0;
    drawerItems.innerHTML = cart.map(item => {
      total += item.price * item.quantity;
      return '<div class="cart-item" data-item-id="' + item.id + '">' +
        '<img src="' + (item.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2270%22 height=%2270%22 viewBox=%220 0 70 70%22%3E%3Crect fill=%22%23f3f4f6%22 width=%2270%22 height=%2270%22/%3E%3Cpath fill=%22%239ca3af%22 d=%22M28 25h14v14H28z%22/%3E%3C/svg%3E') + '" alt="' + item.name + '">' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + item.name + '</div>' +
          '<div class="cart-item-price">' + t.currency + (item.price * item.quantity).toFixed(2) + '</div>' +
          '<div class="cart-item-qty">' +
            '<button onclick="window.zappyUpdateQty(\'' + item.id + '\', -1)">−</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button onclick="window.zappyUpdateQty(\'' + item.id + '\', 1)">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="cart-item-remove" onclick="window.zappyRemoveFromCart(\'' + item.id + '\')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>' +
      '</div>';
    }).join('');
    if (drawerTotal) drawerTotal.textContent = t.currency + total.toFixed(2);
  }
  
  // Open/close cart drawer
  function openCartDrawer() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-drawer-overlay');
    
    // If drawer doesn't exist, create it dynamically
    if (!drawer) {
      var drawerHtml = '<div class="cart-drawer-overlay" id="cart-drawer-overlay"></div>' +
        '<aside class="cart-drawer" id="cart-drawer">' +
        '<div class="cart-drawer-header"><h2>' + t.yourCart + '</h2>' +
        '<button type="button" class="cart-drawer-close" id="cart-drawer-close">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>' +
        '<div class="cart-drawer-body" id="cart-drawer-items"><div class="empty-cart">' + t.emptyCart + '</div></div>' +
        '<div class="cart-drawer-footer"><div class="cart-drawer-total"><span>' + t.total + ':</span><span id="cart-drawer-total">' + t.currency + '0</span></div>' +
        '<a href="/checkout" class="cart-drawer-checkout">' + t.proceedToCheckout + '</a></div></aside>';
      document.body.insertAdjacentHTML('beforeend', drawerHtml);
      drawer = document.getElementById('cart-drawer');
      overlay = document.getElementById('cart-drawer-overlay');
      
      // Add close handlers for newly created elements
      var closeBtn = document.getElementById('cart-drawer-close');
      if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
      if (overlay) overlay.addEventListener('click', closeCartDrawer);
    }
    
    if (drawer) { 
      drawer.classList.add('active'); 
      document.body.style.overflow = 'hidden';
    }
    if (overlay) {
      overlay.classList.add('active');
    }
    renderCartDrawer();
  }
  
  function closeCartDrawer() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Update quantity
  window.zappyUpdateQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart();
      renderCartDrawer();
    }
  };
  
  // Render cart on cart page (legacy full page)
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
  
  // Checkout state
  let selectedShipping = null;
  let shippingMethods = [];
  
  // Load shipping methods on checkout page
  async function loadShippingMethods() {
    const container = document.getElementById('shipping-methods');
    if (!container) return;
    
    try {
      const res = await fetch('/api/ecommerce/storefront/shipping?websiteId=' + websiteId);
      const data = await res.json();
      shippingMethods = data.data || [];
      
      if (!shippingMethods.length) {
        container.innerHTML = '<div class="no-shipping">' + (t.noShippingMethods || 'No shipping options available') + '</div>';
        return;
      }
      
      container.innerHTML = shippingMethods.map((method, idx) => {
        const isPickup = method.is_pickup;
        const isFree = parseFloat(method.price) === 0;
        const hasFreeAbove = method.conditions?.freeAbove && getCartSubtotal() >= method.conditions.freeAbove;
        const priceDisplay = isFree || hasFreeAbove ? (t.free || 'FREE') : t.currency + method.price;
        const daysText = method.estimated_days ? ' (' + method.estimated_days + ' ' + t.days + ')' : '';
        const pickupIcon = isPickup ? '📍 ' : '🚚 ';
        const pickupAddress = isPickup && method.pickup_address?.street ? '<div class="shipping-address">' + method.pickup_address.street + ', ' + (method.pickup_address.city || '') + '</div>' : '';
        const freeAboveNote = method.conditions?.freeAbove && !hasFreeAbove ? '<div class="shipping-free-note">' + (t.freeAbove || 'Free above') + ' ' + t.currency + method.conditions.freeAbove + '</div>' : '';
        
        return '<label class="shipping-option' + (idx === 0 ? ' selected' : '') + '" data-method-id="' + method.id + '">' +
          '<input type="radio" name="shipping" value="' + method.id + '"' + (idx === 0 ? ' checked' : '') + ' onchange="window.zappySelectShipping(this.value)">' +
          '<div class="shipping-info">' +
            '<div class="shipping-name">' + pickupIcon + method.name + daysText + '</div>' +
            (method.description ? '<div class="shipping-desc">' + method.description + '</div>' : '') +
            pickupAddress +
            freeAboveNote +
          '</div>' +
          '<div class="shipping-price' + (isFree || hasFreeAbove ? ' free' : '') + '">' + priceDisplay + '</div>' +
        '</label>';
      }).join('');
      
      // Auto-select first option
      if (shippingMethods.length > 0) {
        selectedShipping = shippingMethods[0];
        updateOrderTotals();
      }
    } catch (e) {
      console.error('Failed to load shipping methods', e);
      container.innerHTML = '<div class="error">' + (t.errorLoading || 'Error loading options') + '</div>';
    }
  }
  
  // Get cart subtotal
  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  // Calculate shipping cost
  function getShippingCost() {
    if (!selectedShipping) return 0;
    const subtotal = getCartSubtotal();
    // Check free shipping condition
    if (selectedShipping.conditions?.freeAbove && subtotal >= selectedShipping.conditions.freeAbove) {
      return 0;
    }
    return parseFloat(selectedShipping.price) || 0;
  }
  
  // Update order totals on checkout page
  function updateOrderTotals() {
    const subtotalEl = document.getElementById('subtotal');
    const shippingCostEl = document.getElementById('shipping-cost');
    const orderTotalEl = document.getElementById('order-total');
    const orderItemsEl = document.getElementById('order-items');
    
    const subtotal = getCartSubtotal();
    const shippingCost = getShippingCost();
    const total = subtotal + shippingCost;
    
    if (subtotalEl) subtotalEl.textContent = t.currency + subtotal.toFixed(2);
    if (shippingCostEl) shippingCostEl.textContent = shippingCost === 0 ? (t.free || 'FREE') : t.currency + shippingCost.toFixed(2);
    if (orderTotalEl) orderTotalEl.textContent = t.currency + total.toFixed(2);
    
    // Render order items
    if (orderItemsEl) {
      orderItemsEl.innerHTML = cart.map(item => 
        '<div class="order-item">' +
          '<span>' + item.name + ' x ' + item.quantity + '</span>' +
          '<span>' + t.currency + (item.price * item.quantity).toFixed(2) + '</span>' +
        '</div>'
      ).join('');
    }
  }
  
  // Select shipping method
  window.zappySelectShipping = function(methodId) {
    selectedShipping = shippingMethods.find(m => m.id === methodId);
    // Update UI
    document.querySelectorAll('.shipping-option').forEach(el => {
      el.classList.toggle('selected', el.dataset.methodId === methodId);
    });
    updateOrderTotals();
  };
  
  window.zappyAddToCart = addToCart;
  window.zappyRemoveFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
  };
  
  // ══════════════════════════════════════════════════════════════════════
  // SEARCH FUNCTIONALITY
  // ══════════════════════════════════════════════════════════════════════
  let allProducts = [];
  let searchTimeout = null;
  
  async function loadAllProductsForSearch() {
    try {
      const res = await fetch('/api/ecommerce/storefront/products?websiteId=' + websiteId);
      const data = await res.json();
      if (data.success && data.data) {
        allProducts = data.data;
      }
    } catch (e) {
      console.error('Failed to load products for search', e);
    }
  }
  
  function searchProducts(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return allProducts.filter(p => 
      p.name?.toLowerCase().includes(q) || 
      p.description?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.tags?.some(tag => tag.toLowerCase().includes(q))
    ).slice(0, 6); // Limit to 6 results
  }
  
  function renderSearchResults(results, query) {
    const container = document.getElementById('nav-search-results');
    if (!container) return;
    
    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results">' + (t.noProducts || 'No products found') + '</div>';
      container.classList.add('active');
      return;
    }
    
    let html = results.map(p => 
      '<a href="/product/' + (p.slug || p.id) + '" class="search-result-item">' +
        (p.images?.[0] ? '<img src="' + p.images[0] + '" alt="' + p.name + '" class="search-result-img">' : '<div class="search-result-img"></div>') +
        '<div class="search-result-info">' +
          '<div class="search-result-name">' + p.name + '</div>' +
          '<div class="search-result-price">' + t.currency + p.price + '</div>' +
        '</div>' +
      '</a>'
    ).join('');
    
    // Add "View all results" link
    if (allProducts.filter(p => p.name?.toLowerCase().includes(query.toLowerCase())).length > 6) {
      html += '<a href="/products?search=' + encodeURIComponent(query) + '" class="search-view-all">' + 
        (t.viewAllResults || 'View all results') + ' →</a>';
    }
    
    container.innerHTML = html;
    container.classList.add('active');
  }
  
  function initSearch() {
    const input = document.getElementById('nav-search-input');
    const btn = document.getElementById('nav-search-btn');
    const results = document.getElementById('nav-search-results');
    
    if (!input) return;
    
    // Load products for search
    loadAllProductsForSearch();
    
    // Handle input
    input.addEventListener('input', function() {
      const query = this.value.trim();
      
      // Debounce search
      clearTimeout(searchTimeout);
      
      if (query.length < 2) {
        if (results) results.classList.remove('active');
        return;
      }
      
      searchTimeout = setTimeout(function() {
        const matches = searchProducts(query);
        renderSearchResults(matches, query);
      }, 200);
    });
    
    // Handle search button click
    if (btn) {
      btn.addEventListener('click', function() {
        const query = input.value.trim();
        if (query.length >= 2) {
          window.location.href = '/products?search=' + encodeURIComponent(query);
        }
      });
    }
    
    // Handle Enter key
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query.length >= 2) {
          window.location.href = '/products?search=' + encodeURIComponent(query);
        }
      }
    });
    
    // Close results when clicking outside
    document.addEventListener('click', function(e) {
      if (results && !e.target.closest('.nav-search-box')) {
        results.classList.remove('active');
      }
    });
    
    // Handle search query from URL on products page
    if (window.location.pathname === '/products') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get('search');
      if (searchQuery) {
        input.value = searchQuery;
        // Filter products grid based on search
        filterProductsGrid(searchQuery);
      }
    }
  }
  
  function filterProductsGrid(query) {
    const grid = document.getElementById('zappy-product-grid');
    if (!grid) return;
    
    // Wait for products to load, then filter
    setTimeout(function() {
      const cards = grid.querySelectorAll('.product-card');
      const q = query.toLowerCase();
      let visibleCount = 0;
      
      cards.forEach(function(card) {
        const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const matches = name.includes(q) || desc.includes(q);
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
      
      // Show message if no results
      if (visibleCount === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'empty-cart';
        noResults.textContent = t.noProducts || 'No products found';
        noResults.id = 'search-no-results';
        grid.appendChild(noResults);
      }
    }, 500);
  }
  
  // Mobile menu handling - close menu when clicking items
  function initMobileMenuHandling() {
    // Common selectors for mobile menu elements
    const menuSelectors = [
      '.nav-menu', '.mobile-menu', '.mobile-nav', '[class*="mobile-menu"]',
      '[class*="nav-menu"]', '.menu-items', '.nav-links', 'nav ul'
    ];
    const toggleSelectors = [
      '.hamburger', '.menu-toggle', '.nav-toggle', '.mobile-toggle',
      '[class*="hamburger"]', '[class*="menu-toggle"]', '.menu-btn',
      'button[aria-label*="menu"]', '.mobile-menu-btn'
    ];
    
    // Find menu and toggle elements
    let menuEl = null;
    let toggleEl = null;
    
    for (const sel of menuSelectors) {
      menuEl = document.querySelector(sel);
      if (menuEl) break;
    }
    for (const sel of toggleSelectors) {
      toggleEl = document.querySelector(sel);
      if (toggleEl) break;
    }
    
    
    // Check if menu is currently open
    function isMenuOpen() {
      if (!menuEl) return false;
      return menuEl.classList.contains('active') || 
             menuEl.classList.contains('open') || 
             menuEl.classList.contains('show') ||
             menuEl.classList.contains('visible') ||
             menuEl.classList.contains('is-open');
    }
    
    
    // Function to close mobile menu
    function closeMobileMenu() {
      if (!menuEl) return;
      
      // Remove common "open" classes
      menuEl.classList.remove('active', 'open', 'show', 'visible', 'is-open', 'menu-open');
      document.body.classList.remove('menu-open', 'nav-open', 'mobile-menu-open');
      
      // Also check parent nav
      const nav = menuEl.closest('nav') || menuEl.closest('header');
      if (nav) {
        nav.classList.remove('active', 'open', 'show', 'menu-open', 'is-open');
      }
      
      // Update toggle button state
      if (toggleEl) {
        toggleEl.classList.remove('active', 'open', 'is-active');
        toggleEl.setAttribute('aria-expanded', 'false');
      }
      
      // Remove overlay if it exists
      const overlay = document.querySelector('.mobile-menu-overlay');
      if (overlay) overlay.remove();
    }
    
    // Function to open mobile menu
    function openMobileMenu() {
      if (!menuEl) return;
      
      // Add open class
      menuEl.classList.add('active', 'open');
      document.body.classList.add('menu-open');
      
      // Update toggle button state
      if (toggleEl) {
        toggleEl.classList.add('active', 'open');
        toggleEl.setAttribute('aria-expanded', 'true');
      }
      
      // Add overlay for closing
      if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:998;';
        overlay.addEventListener('click', closeMobileMenu);
        document.body.appendChild(overlay);
      }
    }
    
    // Toggle menu
    function toggleMobileMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (isMenuOpen()) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
    
    // DON'T replace the toggle - site's own handler works
    // Instead, just ensure we can close via overlay and other methods
    
    // Monitor menu state changes and add overlay when open
    let lastMenuState = isMenuOpen();
    setInterval(function() {
      const currentState = isMenuOpen();
      if (currentState !== lastMenuState) {
        lastMenuState = currentState;
        if (currentState) {
          // Menu just opened - add overlay
          if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:998;';
            overlay.addEventListener('click', function() {
              // Simulate click on toggle to close via site's own handler
              if (toggleEl) toggleEl.click();
              else closeMobileMenu();
            });
            document.body.appendChild(overlay);
          }
        } else {
          // Menu just closed - remove overlay
          const overlay = document.querySelector('.mobile-menu-overlay');
          if (overlay) overlay.remove();
        }
      }
    }, 100);
    
    // Close menu when clicking on nav items
    document.querySelectorAll('nav a, .nav-menu a, .mobile-menu a').forEach(function(link) {
      link.addEventListener('click', function() {
        setTimeout(closeMobileMenu, 100);
      });
    });
    
    // Close menu when clicking on e-commerce icons
    document.querySelectorAll('.nav-ecommerce-icons a, .cart-link, .login-link').forEach(function(el) {
      el.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
    
    // Close menu when clicking outside (backup)
    document.addEventListener('click', function(e) {
      if (!menuEl || !toggleEl) return;
      
      if (isMenuOpen()) {
        const clickedInMenu = menuEl.contains(e.target);
        const clickedOnToggle = toggleEl.contains(e.target);
        
        if (!clickedInMenu && !clickedOnToggle) {
          closeMobileMenu();
        }
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });
    
    // Make close function globally available
    window.zappyCloseMobileMenu = closeMobileMenu;
  }
  
  // Initialize cart drawer events
  function initCartDrawer() {
    // Handle all cart links/buttons that should open the drawer
    var cartElements = document.querySelectorAll('#cart-drawer-toggle, [data-cart-toggle], .cart-link.nav-cart, a.nav-cart');
    
    cartElements.forEach(function(el) {
      // Skip if already initialized
      if (el.hasAttribute('data-cart-init')) return;
      el.setAttribute('data-cart-init', 'true');
      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openCartDrawer();
      });
    });
    
    // Close button
    var closeBtn = document.getElementById('cart-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCartDrawer);
    }
    
    // Overlay click
    var overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) {
      overlay.addEventListener('click', closeCartDrawer);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeCartDrawer();
      }
    });
    
    // Initial render
    renderCartDrawer();
  }
  
  // Initialize everything
  // Mobile search panel handling
  function initMobileSearch() {
    const toggleBtn = document.getElementById('mobile-search-toggle');
    const panel = document.getElementById('mobile-search-panel');
    const closeBtn = document.getElementById('close-mobile-search');
    const input = document.getElementById('mobile-search-input');
    const results = document.getElementById('mobile-search-results');
    
    if (!toggleBtn || !panel) return;
    
    // Open mobile search panel
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      panel.classList.add('active');
      setTimeout(function() {
        if (input) input.focus();
      }, 100);
    });
    
    // Close mobile search panel
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        panel.classList.remove('active');
        if (input) input.value = '';
        if (results) results.innerHTML = '';
      });
    }
    
    // Handle mobile search input
    if (input) {
      input.addEventListener('input', function() {
        const query = this.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
          if (results) results.innerHTML = '';
          return;
        }
        
        searchTimeout = setTimeout(function() {
          const matches = searchProducts(query);
          renderMobileSearchResults(matches, query);
        }, 200);
      });
      
      // Handle Enter key on mobile
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const query = this.value.trim();
          if (query.length >= 2) {
            window.location.href = '/products?search=' + encodeURIComponent(query);
          }
        }
      });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (panel.classList.contains('active') && 
          !e.target.closest('#mobile-search-panel') && 
          !e.target.closest('#mobile-search-toggle')) {
        panel.classList.remove('active');
      }
    });
  }
  
  function renderMobileSearchResults(matches, query) {
    const results = document.getElementById('mobile-search-results');
    if (!results) return;
    
    if (matches.length === 0) {
      results.innerHTML = '<div class="search-no-results">' + (t.noProducts || 'No products found') + '</div>';
      return;
    }
    
    let html = matches.slice(0, 8).map(function(p) {
      const price = formatPrice(p.price);
      const img = p.images && p.images[0] ? p.images[0] : '';
      return '<a href="/product/' + p.slug + '" class="search-result-item">' +
        (img ? '<img src="' + img + '" alt="' + p.name + '" class="search-result-img">' : '') +
        '<div class="search-result-info">' +
          '<div class="search-result-name">' + p.name + '</div>' +
          '<div class="search-result-price">' + price + '</div>' +
        '</div>' +
      '</a>';
    }).join('');
    
    if (matches.length > 8) {
      html += '<a href="/products?search=' + encodeURIComponent(query) + '" class="search-view-all">' + 
        (t.viewAllResults || 'View all results') + ' (' + matches.length + ')</a>';
    }
    
    results.innerHTML = html;
  }
  
  function initAll() {
    updateCartCount();
    loadProducts();
    renderCart();
    loadShippingMethods();
    updateOrderTotals();
    initSearch();
    initMobileSearch();
    initMobileMenuHandling();
    initMobileCategoriesSubmenu();
    initCartDrawer();
  }
  
  // Add categories submenu to Products link in mobile menu
  function initMobileCategoriesSubmenu() {
    // Only run on mobile
    if (window.innerWidth > 768) return;
    
    // Find the Products link in the mobile menu
    const productsLinks = document.querySelectorAll('a[href="/products"], a[href*="/products"]');
    if (!productsLinks.length) return;
    
    // Get categories from the catalog menu or fetch them
    const catalogMenu = document.getElementById('zappy-category-links');
    let categories = [];
    
    if (catalogMenu) {
      const categoryLinks = catalogMenu.querySelectorAll('a');
      categoryLinks.forEach(function(link) {
        categories.push({ name: link.textContent.trim(), href: link.href });
      });
    }
    
    // If no categories from DOM, try to fetch them
    if (categories.length === 0) {
      const websiteId = window.ZAPPY_WEBSITE_ID;
      if (websiteId) {
        fetch('/api/ecommerce/' + websiteId + '/categories')
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (data.categories && data.categories.length > 0) {
              categories = data.categories.map(function(c) {
                return { name: c.name, href: '/products?category=' + c.id };
              });
              addSubmenuToProductsLinks(productsLinks, categories);
            }
          })
          .catch(function() {});
      }
    } else {
      addSubmenuToProductsLinks(productsLinks, categories);
    }
  }
  
  function addSubmenuToProductsLinks(links, categories) {
    if (!categories.length) return;
    
    links.forEach(function(link) {
      // Skip if already has submenu
      if (link.parentElement.querySelector('.mobile-categories-submenu')) return;
      
      // Only process links in mobile menu context
      const parent = link.closest('.nav-menu, .mobile-menu, .mobile-nav, [class*="mobile"], [class*="nav-menu"]');
      if (!parent) return;
      
      // Create submenu container
      const submenu = document.createElement('div');
      submenu.className = 'mobile-categories-submenu';
      submenu.innerHTML = categories.map(function(cat) {
        return '<a href="' + cat.href + '">' + cat.name + '</a>';
      }).join('');
      
      // Wrap the link content for toggle
      const originalText = link.innerHTML;
      link.innerHTML = '<span class="products-menu-toggle">' + originalText + '</span>';
      link.classList.add('products-menu-item');
      
      // Insert submenu after the link
      link.parentElement.insertBefore(submenu, link.nextSibling);
      
      // Toggle submenu on click
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const toggle = link.querySelector('.products-menu-toggle');
        if (toggle) toggle.classList.toggle('active');
        submenu.classList.toggle('active');
      });
    });
  }
  
  // Handle both cases: DOM already loaded or not yet loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    // DOM already loaded, run immediately
    initAll();
  }
})();

// Load featured products on home page (uses public storefront API)
// Only shows products marked as "featured" - no fallback to all products
async function loadFeaturedProducts() {
  const grid = document.getElementById('zappy-featured-products');
  if (!grid) return;
  const websiteId = window.ZAPPY_WEBSITE_ID;
  if (!websiteId) return;
  
  const t = {"products":"מוצרים","ourProducts":"המוצרים שלנו","featuredProducts":"מוצרים מומלצים","noFeaturedProducts":"עוד לא נבחרו מוצרים מומלצים. צפו בכל המוצרים שלנו!","all":"הכל","featured":"מומלצים","new":"חדשים","sale":"מבצעים","loadingProducts":"טוען מוצרים...","cart":"עגלת קניות","yourCart":"עגלת הקניות שלך","emptyCart":"העגלה ריקה","total":"סה\"כ","proceedToCheckout":"המשך לתשלום","checkout":"תשלום","customerInfo":"פרטי לקוח","fullName":"שם מלא","email":"אימייל","phone":"טלפון","shippingAddress":"כתובת למשלוח","street":"רחוב ומספר","city":"עיר","zip":"מיקוד","shippingMethod":"שיטת משלוח","loadingShipping":"טוען שיטות משלוח...","payment":"תשלום","loadingPayment":"טוען אפשרויות תשלום...","orderSummary":"סיכום הזמנה","subtotal":"סכום ביניים","shipping":"משלוח","discount":"הנחה","totalToPay":"סה\"כ לתשלום","placeOrder":"בצע הזמנה","login":"התחברות","customerLogin":"התחברות לקוחות","enterEmail":"הזן את כתובת האימייל שלך ונשלח לך קוד התחברות","emailAddress":"כתובת אימייל","sendCode":"שלח קוד","enterCode":"הזן את הקוד שנשלח לאימייל שלך","verificationCode":"קוד אימות","verify":"אמת","returnPolicy":"מדיניות החזרות","addToCart":"הוסף לעגלה","addedToCart":"המוצר נוסף לעגלה!","remove":"הסר","noProducts":"אין מוצרים להצגה כרגע","errorLoading":"שגיאה בטעינה","days":"ימים","currency":"₪","free":"חינם","freeAbove":"משלוח חינם מעל","noShippingMethods":"אין אפשרויות משלוח זמינות","viewAllResults":"הצג את כל התוצאות","searchProducts":"חיפוש מוצרים","productDetails":"פרטי המוצר","viewDetails":"לפרטים נוספים","inStock":"במלאי","outOfStock":"אזל מהמלאי","sku":"מק\"ט","category":"קטגוריה","relatedProducts":"מוצרים דומים","productNotFound":"המוצר לא נמצא","backToProducts":"חזרה למוצרים","quantity":"כמות"};
  
  try {
    // Only fetch featured products - no fallback
    const res = await fetch('/api/ecommerce/storefront/products?websiteId=' + websiteId + '&featured=true&limit=6');
    const data = await res.json();
    if (!data.success || !data.data?.length) {
      // Show a friendly message when no featured products
      grid.innerHTML = '<div class="no-featured-products">' + (t.noFeaturedProducts || 'No featured products yet. Check out all our products!') + '</div>';
      return;
    }
    renderProductGrid(grid, data.data, t);
  } catch (e) {
    console.error('Failed to load featured products', e);
    grid.innerHTML = '<div class="empty-cart">' + t.errorLoading + '</div>';
  }
}

function renderProductGrid(grid, products, t) {
  grid.innerHTML = products.map(p => 
    '<div class="product-card">' +
      '<a href="/product/' + (p.slug || p.id) + '" class="product-card-link">' +
        (p.images?.[0] ? '<img src="' + p.images[0] + '" alt="' + p.name + '">' : '<div style="height:200px;background:#f0f0f0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#999;">📦</div>') +
        '<h3>' + p.name + '</h3>' +
        '<p>' + (p.description || '').substring(0, 80) + (p.description?.length > 80 ? '...' : '') + '</p>' +
        '<div class="price">' + t.currency + p.price + '</div>' +
      '</a>' +
      '<button class="add-to-cart" onclick="event.stopPropagation(); window.zappyAddToCart(' + JSON.stringify(p).replace(/"/g, '&quot;') + ')">' + t.addToCart + '</button>' +
    '</div>'
  ).join('');
}

// Load categories into catalog dropdown
async function loadCatalogCategories() {
    const list = document.getElementById('zappy-category-links');
    const navList = document.getElementById('zappy-nav-category-links');
    if (!list && !navList) return;
  const websiteId = window.ZAPPY_WEBSITE_ID;
  if (!websiteId) return;
  
  try {
    const res = await fetch('/api/ecommerce/storefront/categories?websiteId=' + websiteId);
    const data = await res.json();
    if (!data.success || !data.data?.length) return;
    
    const dropdownItemsHtml = data.data.map(cat => 
      '<li data-category-id="' + cat.id + '"><a href="/products?category=' + cat.id + '">' + cat.name + '</a></li>'
    ).join('');

    const barItemsHtml = data.data.map(cat => 
      '<a href="/products?category=' + cat.id + '" class="catalog-menu-item" data-category-id="' + cat.id + '">' + cat.name + '</a>'
    ).join('');

    if (navList) {
      // Remove any previously injected category items
      navList.querySelectorAll('li[data-category-id]').forEach(function(node) { node.remove(); });
      navList.insertAdjacentHTML('beforeend', dropdownItemsHtml);
    }

    if (list) {
      list.querySelectorAll('[data-category-id]').forEach(function(node) { node.remove(); });
      list.insertAdjacentHTML('beforeend', barItemsHtml);
    }
  } catch (e) {
    console.error('Failed to load categories', e);
  }
}

// Initialize featured products and categories on load
document.addEventListener('DOMContentLoaded', function() {
  loadFeaturedProducts();
  loadCatalogCategories();
  loadProductDetailPage();
});

// Load product detail page
async function loadProductDetailPage() {
  const detailSection = document.getElementById('product-detail');
  if (!detailSection) return; // Not on product detail page
  
  const websiteId = window.ZAPPY_WEBSITE_ID;
  if (!websiteId) return;
  
  const t = {"products":"מוצרים","ourProducts":"המוצרים שלנו","featuredProducts":"מוצרים מומלצים","noFeaturedProducts":"עוד לא נבחרו מוצרים מומלצים. צפו בכל המוצרים שלנו!","all":"הכל","featured":"מומלצים","new":"חדשים","sale":"מבצעים","loadingProducts":"טוען מוצרים...","cart":"עגלת קניות","yourCart":"עגלת הקניות שלך","emptyCart":"העגלה ריקה","total":"סה\"כ","proceedToCheckout":"המשך לתשלום","checkout":"תשלום","customerInfo":"פרטי לקוח","fullName":"שם מלא","email":"אימייל","phone":"טלפון","shippingAddress":"כתובת למשלוח","street":"רחוב ומספר","city":"עיר","zip":"מיקוד","shippingMethod":"שיטת משלוח","loadingShipping":"טוען שיטות משלוח...","payment":"תשלום","loadingPayment":"טוען אפשרויות תשלום...","orderSummary":"סיכום הזמנה","subtotal":"סכום ביניים","shipping":"משלוח","discount":"הנחה","totalToPay":"סה\"כ לתשלום","placeOrder":"בצע הזמנה","login":"התחברות","customerLogin":"התחברות לקוחות","enterEmail":"הזן את כתובת האימייל שלך ונשלח לך קוד התחברות","emailAddress":"כתובת אימייל","sendCode":"שלח קוד","enterCode":"הזן את הקוד שנשלח לאימייל שלך","verificationCode":"קוד אימות","verify":"אמת","returnPolicy":"מדיניות החזרות","addToCart":"הוסף לעגלה","addedToCart":"המוצר נוסף לעגלה!","remove":"הסר","noProducts":"אין מוצרים להצגה כרגע","errorLoading":"שגיאה בטעינה","days":"ימים","currency":"₪","free":"חינם","freeAbove":"משלוח חינם מעל","noShippingMethods":"אין אפשרויות משלוח זמינות","viewAllResults":"הצג את כל התוצאות","searchProducts":"חיפוש מוצרים","productDetails":"פרטי המוצר","viewDetails":"לפרטים נוספים","inStock":"במלאי","outOfStock":"אזל מהמלאי","sku":"מק\"ט","category":"קטגוריה","relatedProducts":"מוצרים דומים","productNotFound":"המוצר לא נמצא","backToProducts":"חזרה למוצרים","quantity":"כמות"};
  
  // Get slug from URL - check both pathname and query parameter (preview mode)
  let pagePath = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  if (pageParam) {
    pagePath = pageParam;
  }
  
  // Extract slug from path like /product/slug-name
  const pathParts = pagePath.split('/');
  const slug = pathParts[pathParts.length - 1];
  
  if (!slug || slug === 'product') {
    showProductNotFound(detailSection, t);
    return;
  }
  
  console.log('Loading product with slug:', slug);
  
  try {
    const res = await fetch('/api/ecommerce/storefront/products/' + encodeURIComponent(slug) + '?websiteId=' + websiteId);
    const data = await res.json();
    
    if (!data.success || !data.data) {
      showProductNotFound(detailSection, t);
      return;
    }
    
    const product = data.data;
    renderProductDetail(detailSection, product, t);
    
    // Update page title and meta
    document.title = product.name + ' - ' + (document.title.split(' - ').pop() || '');
    
    // Load related products
    loadRelatedProducts(product, t);
    
  } catch (e) {
    console.error('Failed to load product', e);
    showProductNotFound(detailSection, t);
  }
}

function showProductNotFound(container, t) {
  container.innerHTML = `
    <div class="product-not-found">
      <h2>${t.productNotFound}</h2>
      <a href="/products" class="btn btn-primary">${t.backToProducts}</a>
    </div>
  `;
}

function renderProductDetail(container, product, t) {
  const images = product.images || [];
  const mainImage = images[0] || '';
  const hasMultipleImages = images.length > 1;
  const inStock = product.stock_status !== 'out_of_stock';
  const hasSalePrice = product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price);
  
  container.innerHTML = `
    <a href="/products" class="back-to-products">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      ${t.backToProducts}
    </a>
    <div class="product-detail-container">
      <div class="product-gallery">
        ${mainImage 
          ? '<img src="' + mainImage + '" alt="' + product.name + '" class="product-gallery-main" id="product-main-image">'
          : '<div class="product-gallery-main" style="display:flex;align-items:center;justify-content:center;color:#999;font-size:64px;">📦</div>'
        }
        ${hasMultipleImages ? `
          <div class="product-gallery-thumbs">
            ${images.map((img, i) => `
              <img src="${img}" alt="${product.name}" class="product-gallery-thumb ${i === 0 ? 'active' : ''}" onclick="changeMainImage(this, '${img}')" />
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        ${product.category_name ? '<span class="product-category">' + product.category_name + '</span>' : ''}
        <div class="product-price">
          ${hasSalePrice 
            ? t.currency + product.sale_price + '<span class="original-price">' + t.currency + product.price + '</span>'
            : t.currency + product.price
          }
        </div>
        ${product.sku ? '<div class="product-sku">' + t.sku + ': ' + product.sku + '</div>' : ''}
        <div class="product-stock ${inStock ? 'in-stock' : 'out-of-stock'}">
          ${inStock 
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>' + t.inStock
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' + t.outOfStock
          }
        </div>
        ${product.description ? '<div class="product-description">' + product.description + '</div>' : ''}
        <div class="product-quantity">
          <label>${t.quantity}:</label>
          <div class="quantity-selector">
            <button type="button" onclick="adjustQuantity(-1)">−</button>
            <input type="number" id="product-quantity" value="1" min="1" max="99">
            <button type="button" onclick="adjustQuantity(1)">+</button>
          </div>
        </div>
        <div class="product-actions">
          <button class="add-to-cart" onclick="addProductToCart()" ${!inStock ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
            ${t.addToCart}
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Store product data for add to cart
  window.currentProduct = product;
}

function changeMainImage(thumb, src) {
  const mainImg = document.getElementById('product-main-image');
  if (mainImg) mainImg.src = src;
  
  // Update active thumb
  document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function adjustQuantity(delta) {
  const input = document.getElementById('product-quantity');
  if (!input) return;
  const newVal = Math.max(1, Math.min(99, parseInt(input.value || 1) + delta));
  input.value = newVal;
}

function addProductToCart() {
  const product = window.currentProduct;
  if (!product) return;
  
  const quantity = parseInt(document.getElementById('product-quantity')?.value || 1);
  
  // Add to cart with quantity
  for (let i = 0; i < quantity; i++) {
    window.zappyAddToCart(product);
  }
}

async function loadRelatedProducts(currentProduct, t) {
  const section = document.getElementById('related-products-section');
  const grid = document.getElementById('related-products-grid');
  if (!section || !grid) return;
  
  const websiteId = window.ZAPPY_WEBSITE_ID;
  try {
    // Fetch products from same category or random products
    let url = '/api/ecommerce/storefront/products?websiteId=' + websiteId + '&limit=4';
    if (currentProduct.category_id) {
      url += '&categoryId=' + currentProduct.category_id;
    }
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.success || !data.data?.length) return;
    
    // Filter out current product and limit to 4
    const related = data.data.filter(p => p.id !== currentProduct.id).slice(0, 4);
    if (related.length === 0) return;
    
    renderProductGrid(grid, related, t);
    section.style.display = 'block';
  } catch (e) {
    console.error('Failed to load related products', e);
  }
}
