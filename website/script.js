document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect
    const typedTextSpan = document.getElementById("typed-text");
    
    const textArray = [
        "welcome to nomitechs test web"
    ];
    const typingDelay = 100;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        }
    }

    // Start typing effect after a short delay
    if(textArray.length) {
        setTimeout(type, 1000);
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 15, 25, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(11, 15, 25, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Contact Form Submission (Real Email via FormSubmit)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            try {
                await fetch("https://formsubmit.co/ajax/starbar9913@gmail.com", {
                    method: "POST",
                    body: formData
                });
                
                submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
                submitBtn.classList.replace('btn-accent', 'btn-success');
                contactForm.reset();
            } catch (error) {
                submitBtn.innerHTML = '<i class="bi bi-x-circle me-2"></i>Error!';
                submitBtn.classList.replace('btn-accent', 'btn-danger');
            }
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.replace('btn-success', 'btn-accent');
                submitBtn.classList.replace('btn-danger', 'btn-accent');
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // 5. Chat Widget Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatBox = document.getElementById('chatBox');
    const chatForm = document.getElementById('chatForm');

    if (chatToggle && chatBox && chatClose) {
        chatToggle.addEventListener('click', () => {
            chatBox.classList.remove('d-none');
            chatToggle.classList.add('d-none');
        });

        chatClose.addEventListener('click', () => {
            chatBox.classList.add('d-none');
            chatToggle.classList.remove('d-none');
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = chatForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            submitBtn.disabled = true;
            
            const formData = new FormData(chatForm);
            
            try {
                await fetch("https://formsubmit.co/ajax/starbar9913@gmail.com", {
                    method: "POST",
                    body: formData
                });
                submitBtn.innerHTML = 'Sent!';
                submitBtn.classList.replace('btn-accent', 'btn-success');
                chatForm.reset();
            } catch (error) {
                submitBtn.innerHTML = 'Error';
                submitBtn.classList.replace('btn-accent', 'btn-danger');
            }
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.replace('btn-success', 'btn-accent');
                submitBtn.classList.replace('btn-danger', 'btn-accent');
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // 6. Local Storage Authentication System
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    const displayUsername = document.getElementById('displayUsername');
    const logoutBtn = document.getElementById('logoutBtn');

    const navProfilePic = document.getElementById('navProfilePic');

    function checkLoginState() {
        if(!authButtons) return;
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            authButtons.classList.add('d-none');
            authButtons.classList.remove('d-flex');
            userProfile.classList.remove('d-none');
            userProfile.classList.add('d-flex');
            displayUsername.textContent = currentUser;
            
            // Set profile picture
            let users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[currentUser] && users[currentUser].profilePic) {
                navProfilePic.src = users[currentUser].profilePic;
            } else {
                // Default avatar based on username
                navProfilePic.src = `https://ui-avatars.com/api/?name=${currentUser}&background=9CA3AF&color=fff`;
            }

            // Set badge
            const badgeContainer = document.getElementById('badgeContainer');
            if (badgeContainer) {
                badgeContainer.innerHTML = ''; // Clear previous badges
                
                // nomitech inherently gets the highest rank (legend)
                let userBadge = (currentUser.toLowerCase() === 'nomitech') ? 'legend' : users[currentUser]?.badge;
                
                // Default to 'member' if no badge or badge is 'none'
                if (!userBadge || userBadge === 'none') {
                    if (currentUser.toLowerCase() !== 'nomitech') {
                        userBadge = 'member';
                    }
                }
                
                if (userBadge) {
                    let badgeText = userBadge.toUpperCase();
                    if(userBadge === 'legend') badgeText = 'LEGEND 👑';
                    badgeContainer.innerHTML = `<span class="badge ms-1 badge-${userBadge}">${badgeText}</span>`;
                }
            }
        } else {
            authButtons.classList.remove('d-none');
            authButtons.classList.add('d-flex');
            userProfile.classList.add('d-none');
            userProfile.classList.remove('d-flex');
        }
    }
    checkLoginState();

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value;
            const profilePicInput = document.getElementById('regProfilePic');
            const errorEl = document.getElementById('regError');
            const successEl = document.getElementById('regSuccess');

            let users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username]) {
                errorEl.classList.remove('d-none');
                successEl.classList.add('d-none');
                return;
            } 
            
            // Function to save user data
            const saveUser = (picBase64) => {
                users[username] = { password, profilePic: picBase64 };
                localStorage.setItem('users', JSON.stringify(users));
                errorEl.classList.add('d-none');
                successEl.classList.remove('d-none');
                registerForm.reset();
            };

            // Read image file if uploaded
            if (profilePicInput.files && profilePicInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    saveUser(event.target.result);
                };
                reader.readAsDataURL(profilePicInput.files[0]);
            } else {
                saveUser(null);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            const errorEl = document.getElementById('loginError');

            let users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username] && users[username].password === password) {
                localStorage.setItem('currentUser', username);
                errorEl.classList.add('d-none');
                loginForm.reset();
                const modalEl = document.getElementById('loginModal');
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
                
                // Ensure backdrop is removed
                const backdrop = document.querySelector('.modal-backdrop');
                if(backdrop) backdrop.remove();
                document.body.classList.remove('modal-open');
                document.body.style = '';
                
                checkLoginState();
            } else {
                errorEl.classList.remove('d-none');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            checkLoginState();
        });
    }

    // 7. Settings System
    const updateProfileForm = document.getElementById('updateProfileForm');
    
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentUser = localStorage.getItem('currentUser');
            if(!currentUser) return;
            
            const newPassword = document.getElementById('updatePassword').value;
            const newProfilePicInput = document.getElementById('updateProfilePic');
            const successEl = document.getElementById('updateSuccess');
            
            let users = JSON.parse(localStorage.getItem('users')) || {};
            let userData = users[currentUser];
            
            if(newPassword.trim() !== '') {
                userData.password = newPassword;
            }

            const finishUpdate = () => {
                users[currentUser] = userData;
                localStorage.setItem('users', JSON.stringify(users));
                successEl.classList.remove('d-none');
                checkLoginState(); // Update navbar picture
                setTimeout(() => { successEl.classList.add('d-none'); }, 3000);
            };

            if (newProfilePicInput.files && newProfilePicInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    userData.profilePic = event.target.result;
                    finishUpdate();
                };
                reader.readAsDataURL(newProfilePicInput.files[0]);
            } else {
                finishUpdate();
            }
            updateProfileForm.reset();
        });
    }

    // Theme logic
    window.setTheme = function(accent1, accent2) {
        document.documentElement.style.setProperty('--accent-color', accent1);
        document.documentElement.style.setProperty('--accent-color-2', accent2);
        
        // Update glow colors based on hex
        const hexToRgb = hex => 
            hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1).match(/.{2}/g)
            .map(x => parseInt(x, 16));
        
        const rgb = hexToRgb(accent1);
        document.documentElement.style.setProperty('--accent-glow', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`);
        
        localStorage.setItem('themeAccent1', accent1);
        localStorage.setItem('themeAccent2', accent2);
    };

    // Load saved theme
    const savedAccent1 = localStorage.getItem('themeAccent1');
    const savedAccent2 = localStorage.getItem('themeAccent2');
    if (savedAccent1 && savedAccent2) {
        setTheme(savedAccent1, savedAccent2);
    }
});
