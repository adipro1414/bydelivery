/**
 * Main JavaScript File
 * Handles UI interactions, animations and micro-interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // אופטימיזציה של אנימציות - ביטול אנימציות למכשירים חלשים
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // זיהוי מכשיר עם ביצועים נמוכים
    if (isLowEndDevice || prefersReducedMotion) {
        // ביטול אנימציות שדורשות משאבים רבים
        document.body.classList.add('reduced-motion');
        
        // דילול אירועי גלילה
        let scrollThrottleTimer;
        window.addEventListener('scroll', function() {
            if (!scrollThrottleTimer) {
                scrollThrottleTimer = setTimeout(function() {
                    scrollThrottleTimer = null;
                    reveal();
                }, 100);
            }
        });
    } else {
        // במכשירים רגילים - המשך כרגיל
        window.addEventListener('scroll', reveal);
    }
    
    // אופטימיזציה לפונקציה reveal - שימוש ב-IntersectionObserver במקום לבדוק בכל גלילה
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-element');
                    observer.unobserve(entry.target); // הפסקת מעקב אחרי אלמנט שכבר הופיע
                }
            });
        }, { threshold: 0.15 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // פתרון חלופי לדפדפנים ישנים
        function reveal() {
            const reveals = document.querySelectorAll('.animate-on-scroll');
            
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('show-element');
                }
            }
        }
        
        window.addEventListener('scroll', reveal);
        reveal(); // קריאה ראשונית
    }
    
    // דחיית טעינה של תוכן לא קריטי - שיפור Time to Interactive
    setTimeout(() => {
        // אתחול פונקציות שאינן קריטיות
        initNavbarScroll();
        initSmoothScroll();
        initWhatsAppButton();
        initRandomNotifications();
        fixHomeLinks();
    }, 500);

    // === סרגל התקדמות גלילה ===
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        // דילול עדכון הסרגל בגלילה (throttling)
        let scrollProgress = 0;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            scrollProgress = (document.body.scrollTop || document.documentElement.scrollTop) / 
                            (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
                            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    progressBar.style.width = scrollProgress + '%';
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // === אבטחת האתר ומניעת הגישה לקוד ===
    // מניעת קליק ימני
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // מניעת לחיצה על F12
    document.addEventListener('keydown', function(e) {
        // F12 key
        if (e.keyCode === 123) {
            e.preventDefault();
            alert("גישה לכלי הפיתוח נחסמה");
            return false;
        }
        
        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            alert("גישה לכלי הפיתוח נחסמה");
            return false;
        }
        
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            alert("גישה לכלי הפיתוח נחסמה");
            return false;
        }
        
        // Ctrl+S
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            alert("גישה לקוד המקור נחסמה");
            return false;
        }
        
        // מניעת העתקה
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            alert("העתקת תוכן מהאתר אסורה");
            return false;
        }
        
        // מניעת צילום מסך
        if (e.keyCode === 44) {
            e.preventDefault();
            alert("צילום מסך מהאתר אסור");
            return false;
        }
    });
    
    // זיהוי פתיחת כלי פיתוח
    let devtoolsOpen = false;
    
    // זיהוי פתיחה על ידי גודל חלון
    function checkDevTools() {
        // בדיקת גודל החלון
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        // שיטת זיהוי נוספת - זיהוי פונקציית debugger
        let isDebuggerEnabled = false;
        try {
            // בדיקה שונה לזיהוי debugger
            const isDebuggerPresent = function() {
                const div = document.createElement('div');
                let isCalled = false;
                
                Object.defineProperty(div, "id", {
                    get: function() {
                        isCalled = true;
                        return "";
                    }
                });
                
                console.log(div);
                console.clear();
                
                return isCalled;
            };
            
            isDebuggerEnabled = isDebuggerPresent();
        } catch (e) {
            // התעלם משגיאות
        }
        
        // שיטת זיהוי נוספת - בדיקת Firebug
        const isFirebugEnabled = window.console && 
            (window.console.firebug || 
             (window.console.table && 
              typeof window.console.table === 'function' && 
              /firebug/i.test(window.console.table.toString())));
        
        // שיטה נוספת - בדיקת פתיחת חלון לפי שימוש בפאנלים של הדפדפן
        let isDevToolsOpen = false;
        if (window.Firebug && 
            window.Firebug.chrome && 
            window.Firebug.chrome.isInitialized) {
            isDevToolsOpen = true;
        }
        
        // בדיקה מרובה של תנאים
        if (widthThreshold || 
            heightThreshold || 
            isDebuggerEnabled || 
            isFirebugEnabled || 
            isDevToolsOpen || 
            (window.devtoolIsOpen && typeof window.devtoolIsOpen === 'function' && window.devtoolIsOpen()) || 
            (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized)) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // פעולה כאשר כלי הפיתוח נפתחים
                document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:sans-serif;direction:rtl;"><h1>הגישה לכלי הפיתוח נחסמה</h1><p>אין אפשרות לצפות בקוד המקור של האתר.</p><p>יש לרענן את הדף כדי להמשיך לגלוש באתר.</p></div>';
                
                // הצפנת כל התוכן
                for (let i = 0; i < document.body.children.length; i++) {
                    if (document.body.children[i].style) {
                        document.body.children[i].style.display = 'none';
                    }
                }
                
                // ביטול פונקציות העתקה נוספות
                document.body.oncopy = function(e) {
                    e.preventDefault();
                    return false;
                };
                
                document.body.onselectstart = function(e) {
                    e.preventDefault();
                    return false;
                };
            }
        } else {
            devtoolsOpen = false;
        }
    }
    
    // בדיקה בפרקי זמן קבועים
    setInterval(checkDevTools, 1000);
    
    // זיהוי פתיחה דרך console
    (function() {
        // יצירת אלמנט משלנו
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                // אם מישהו מנסה לבדוק את ה-id, סימן שהוא פתח את הconsole
                document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:sans-serif;direction:rtl;"><h1>הגישה לכלי הפיתוח נחסמה</h1><p>אין אפשרות לצפות בקוד המקור של האתר.</p><p>יש לרענן את הדף כדי להמשיך לגלוש באתר.</p></div>';
            }
        });
        
        console.log('%c', element);
    })();
    
    // שיטה נוספת לזיהוי כלי פיתוח - עיכוב זמן
    function detectDevTools() {
        const start = new Date().getTime();
        // השתמש בפעולות שעשויות לקחת זמן כשדיבאגר פעיל
        for (let i = 0; i < 1000; i++) {
            console.info("Checking for debugger");
            console.clear();
        }
        const end = new Date().getTime();
        
        if (end - start > 100) {
            // סימן שיש עיכוב חריג שעשוי להצביע על שימוש בדיבאגר
            document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:sans-serif;direction:rtl;"><h1>הגישה לכלי הפיתוח נחסמה</h1><p>אין אפשרות לצפות בקוד המקור של האתר.</p><p>יש לרענן את הדף כדי להמשיך לגלוש באתר.</p></div>';
        }
        
        setTimeout(detectDevTools, 1000);
    }
    
    // הפעלת בדיקת עיכוב זמן
    setTimeout(detectDevTools, 1000);
    
    // מניעת העתקה של טקסט
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        alert("העתקת תוכן מהאתר אסורה");
        return false;
    });
    
    // מניעת גרירה של תמונות
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // ביטול פונקציות פיתוח חשובות
    // נעטוף בתנאי כדי למנוע שגיאות
    try {
        // שכתוב פונקציות קריטיות
        window.eval = function() {
            throw new Error("גישה לפונקציית Eval נחסמה");
        };
        
        Object.defineProperty(document.body, 'contentEditable', {
            get: function() {
                return false;
            },
            set: function() {
                return false;
            }
        });
    } catch(e) {
        // התעלם משגיאות
    }

    // === אפקטים מיוחדים לכפתורים ===
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // === אנימציות מיקרו לאלמנטים בריחוף ===
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const svg = icon.querySelector('.service-svg');
            if (svg) {
                svg.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                svg.style.transform = 'rotate(10deg) scale(1.2)';
            }
        });

        icon.addEventListener('mouseleave', () => {
            const svg = icon.querySelector('.service-svg');
            if (svg) {
                svg.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                svg.style.transform = 'rotate(0) scale(1)';
            }
        });
    });

    // === אנימציות לכותרות גדולות ===
    const mainHeadings = document.querySelectorAll('h1, h2.promo-title');
    mainHeadings.forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-3px)';
        });

        heading.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // === אפקטים נוספים ===
    // אפקט לתיבות צור קשר
    const contactItems = document.querySelectorAll('.contact-list li');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // === אפקט נצנוץ לאלמנטים מסוימים ===
    const flashyElements = document.querySelectorAll('.price-feature-item');
    flashyElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s';
            this.style.backgroundColor = 'rgba(249, 168, 38, 0.2)';
            this.style.transform = 'scale(1.05)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            this.style.transform = 'scale(1)';
        });
    });

    // === אפקט לרוג'ו לאייקונים לאחר גלילה ===
    function reveal() {
        const reveals = document.querySelectorAll('.animate-on-scroll');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('show-element');
            }
        }
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // קריאה ראשונית
    
    // === אינטראקציה בעכבר על אלמנטים שונים ===
    document.querySelectorAll('.footer-links a, .navbar-nav a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.letterSpacing = '0.5px';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.letterSpacing = 'normal';
        });
    });
    
    // === תפריט ניידים התנהגות מיוחדת ===
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // הפעלת כל התכונות כאשר העמוד נטען לגמרי
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
    });
});

// Initialize navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
    // Select all links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a default action link
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
                
                // Special case for 'home' section - scroll to top
                if (targetId === '#home') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Scroll to element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for navbar
                        behavior: 'smooth'
                    });
                }
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Initialize WhatsApp button
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    
    if (!whatsappBtn) return;
    
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form data
        const form = document.querySelector('.order-form');
        
        if (!form) {
            // If no form, just open WhatsApp with default message
            window.open(this.href, '_blank');
            return;
        }
        
        // Form validation
        const valid = validateForm(form);
        
        if (!valid) {
            // Focus on the first invalid field
            const invalidField = form.querySelector(':invalid');
            if (invalidField) {
                invalidField.focus();
            }
            return;
        }
        
        // Get form values from the fields that actually exist
        const name = document.getElementById('name')?.value || '';
        const deliveryAddress = document.getElementById('deliveryAddress')?.value || '';
        const packageDetails = document.getElementById('packageDetails')?.value || '';
        
        // Create WhatsApp message
        let message = `היי, אני ${name} מעוניין/ת בשירותי משלוחים!\n\n`;
        
        if (deliveryAddress) {
            message += `כתובת למשלוח: ${deliveryAddress}\n`;
        }
        
        if (packageDetails) {
            message += `פרטי החבילה: ${packageDetails}\n`;
        }
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with form data - use the actual WhatsApp number from the link
        const waHref = whatsappBtn.getAttribute('href') || '';
        const waNumber = waHref.match(/wa\.me\/(\d+)/)?.[1] || '972554426607';
        
        window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
    });
}

// Validate form
function validateForm(form) {
    // Check validity
    const valid = form.checkValidity();
    
    // Show validation errors
    if (!valid) {
        // Add 'was-validated' class to display validation errors
        form.classList.add('was-validated');
    }
    
    return valid;
}

// Show animation when section becomes visible
function initSectionAnimation() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Create an observer for the section
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add('section-visible');
                    // Stop observing after animation is triggered
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.2 }); // 20% of the section visible
        
        observer.observe(section);
    });
}

// Initialize section animations if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initSectionAnimation);
}

// Initialize random delivery notifications
function initRandomNotifications() {
    const cities = [
        "תל אביב", "ירושלים", "חיפה", "באר שבע", 
        "אשדוד", "אשקלון", "פתח תקווה", "נתניה", 
        "הרצליה", "רמת גן", "חולון", "רחובות", 
        "כפר סבא", "ראשון לציון", "חדרה", "עפולה"
    ];
    
    const times = [
        "לפני 2 דקות", "לפני 5 דקות", "לפני 7 דקות", "לפני 12 דקות",
        "לפני 15 דקות", "לפני 20 דקות", "לפני 25 דקות", "לפני שעה"
    ];
    
    const messages = [
        "משלוח הועבר בהצלחה ל%s",
        "משלוח נמסר ללקוח ב%s",
        "הזמנה חדשה התקבלה מ%s",
        "משלוח בדרך ל%s",
        "שליח יצא לאיסוף ב%s",
        "שליח הגיע ליעד ב%s"
    ];
    
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    // Clear any initial notifications
    container.innerHTML = '';
    
    // Show first notification after a delay
    setTimeout(showRandomNotification, 3000);
    
    function showRandomNotification() {
        // Select random message, city and time
        const city = cities[Math.floor(Math.random() * cities.length)];
        const time = times[Math.floor(Math.random() * times.length)];
        const msgTemplate = messages[Math.floor(Math.random() * messages.length)];
        const message = msgTemplate.replace('%s', city);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
                <span class="notification-time">${time}</span>
            </div>
        `;
        
        // Add to container
        container.appendChild(notification);
        
        // Remove notification after animation completes (6 seconds)
        setTimeout(() => {
            notification.remove();
        }, 6000);
        
        // Show next notification after random time
        const nextTime = Math.random() * 20000 + 10000; // 10-30 seconds
        setTimeout(showRandomNotification, nextTime);
    }
}

// Fix home links in navbar and footer
function fixHomeLinks() {
    // Get all links to #home
    const homeLinks = document.querySelectorAll('a[href="#home"]');
    
    // Add click event to each home link
    homeLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
            
            // Scroll to top of page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update URL hash
            history.pushState(null, null, '#home');
            
            console.log('Home link clicked, scrolling to top');
        });
    });
} 