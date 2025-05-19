document.addEventListener('DOMContentLoaded', function() {
    //  MOBILE MENU TOGGLE 
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('main-nav');
    
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      this.classList.toggle('is-active');
    });
  
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('is-active');
        }
      });
    });
  
    //  SEARCH FUNCTIONALITY 
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    function performSearch() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // In a real implementation, this would redirect to search results
        alert(`Searching for: ${searchTerm}`);
        // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
      }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') performSearch();
    });
  
    // Focus search input on mobile when button clicked
    if (window.innerWidth < 768) {
      searchButton.addEventListener('click', function() {
        searchInput.focus();
      });
    }
  
    //  CART FUNCTIONALITY 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Animation feedback
        this.textContent = 'Added!';
        this.style.backgroundColor = 'var(--accent-color)';
        
        setTimeout(() => {
          this.textContent = 'Add to Cart';
          this.style.backgroundColor = 'var(--dark-color)';
        }, 1000);
      });
    });
  
    //  PRODUCT FILTERING 
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.dataset.category;
        
        // Filter products
        productCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  
    //  BACK TO TOP BUTTON 
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    //  CURRENT YEAR IN FOOTER 
    document.getElementById('year').textContent = new Date().getFullYear();
  
    //  NEWSLETTER FORM 
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        
        // In a real implementation, you would send this to your server
        console.log(`Subscribed with email: ${email}`);
        alert('Thank you for subscribing!');
        this.reset();
      });
    }
  
    //  RESPONSIVE ADJUSTMENTS 
    function handleResponsive() {
      // Additional responsive logic can be added here
    }
  
    window.addEventListener('resize', handleResponsive);
    handleResponsive();
  });










  // Games Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const platformFilterBtns = document.querySelectorAll('[data-platform]');
    const genreFilterBtns = document.querySelectorAll('[data-genre]');
    const priceRange = document.getElementById('priceRange');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Platform filter
    platformFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            platformFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            filterGames();
        });
    });
    
    // Genre filter
    genreFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            genreFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            filterGames();
        });
    });
    
    // Price filter
    priceRange.addEventListener('input', filterGames);
    
    function filterGames() {
        const selectedPlatform = document.querySelector('[data-platform].active').dataset.platform;
        const selectedGenre = document.querySelector('[data-genre].active').dataset.genre;
        const maxPrice = parseFloat(priceRange.value);
        
        gameCards.forEach(card => {
            const cardPlatform = card.dataset.platform;
            const cardGenre = card.dataset.genre;
            const cardPrice = parseFloat(card.dataset.price);
            
            const platformMatch = selectedPlatform === 'all' || cardPlatform.includes(selectedPlatform);
            const genreMatch = selectedGenre === 'all' || cardGenre === selectedGenre;
            const priceMatch = cardPrice <= maxPrice;
            
            if (platformMatch && genreMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Initialize filter
    filterGames();
});























// Accessories Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const categoryFilterBtns = document.querySelectorAll('[data-category]');
    const platformFilterBtns = document.querySelectorAll('[data-platform]');
    const priceRange = document.getElementById('priceRange');
    const priceDisplay = document.querySelector('.price-values span:last-child');
    const accessoryCards = document.querySelectorAll('.accessory-card');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    
    // Initialize cart from localStorage
    let cartItems = parseInt(localStorage.getItem('cartItems')) || 0;
    updateCartCount();
    
    // Initialize price display
    if (priceRange && priceDisplay) {
        priceDisplay.textContent = `£${priceRange.value}+`;
    }
    
    // Category filter
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            filterAccessories();
        });
    });
    
    // Platform filter
    platformFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            platformFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterAccessories();
        });
    });
    
    // Price range filter
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            if (priceDisplay) {
                priceDisplay.textContent = `£${this.value}+`;
            }
            filterAccessories();
        });
    }
    
    // Filter function
    function filterAccessories() {
        const selectedCategory = document.querySelector('[data-category].active').dataset.category;
        const selectedPlatform = document.querySelector('[data-platform].active').dataset.platform;
        const maxPrice = parseFloat(priceRange.value);
        
        accessoryCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardPlatform = card.dataset.platform;
            const cardPrice = parseFloat(card.dataset.price);
            
            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const platformMatch = selectedPlatform === 'all' || cardPlatform.includes(selectedPlatform);
            const priceMatch = cardPrice <= maxPrice;
            
            card.style.display = (categoryMatch && platformMatch && priceMatch) ? 'block' : 'none';
        });
    }
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get product name from card
            const productName = this.closest('.accessory-card').querySelector('h3').textContent;
            
            // Update cart
            cartItems++;
            updateCartCount();
            localStorage.setItem('cartItems', cartItems);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.disabled = true;
            
            // Show notification
            showToast(`${productName} added to cart`);
            
            // Reset button after delay
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Update cart count
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cartItems;
            cartCount.classList.add('pulse');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                cartCount.classList.remove('pulse');
            }, 500);
        }
    }
    
    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Initialize filters
    filterAccessories();
    
    // Update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

















// Reviews Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const ratingFilter = document.getElementById('rating-filter');
    const productFilter = document.getElementById('product-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const reviewCards = document.querySelectorAll('.review-card');
    const reviewForm = document.getElementById('review-form');
    const starInputs = document.querySelectorAll('.star-rating input');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Initialize cart count
    const cartCount = document.getElementById('cart-count');
    let cartItems = parseInt(localStorage.getItem('cartItems')) || 0;
    cartCount.textContent = cartItems;
    
    // Filter reviews
    function filterReviews() {
        const ratingValue = ratingFilter.value;
        const productValue = productFilter.value;
        
        reviewCards.forEach(card => {
            const cardRating = card.dataset.rating;
            const cardProduct = card.dataset.product;
            
            const ratingMatch = ratingValue === 'all' || cardRating === ratingValue;
            const productMatch = productValue === 'all' || cardProduct === productValue;
            
            card.style.display = (ratingMatch && productMatch) ? 'block' : 'none';
        });
    }
    
    // Event listeners for filters
    if (ratingFilter && productFilter) {
        ratingFilter.addEventListener('change', filterReviews);
        productFilter.addEventListener('change', filterReviews);
    }
    
    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            ratingFilter.value = 'all';
            productFilter.value = 'all';
            filterReviews();
        });
    }
    
    // Star rating interaction
    if (starInputs) {
        starInputs.forEach(star => {
            star.addEventListener('change', function() {
                const ratingValue = this.value;
                // You can store this value or use it for visual feedback
            });
        });
    }
    
    // Form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(reviewForm);
            const reviewData = {
                name: formData.get('name'),
                product: formData.get('product'),
                rating: formData.get('rating'),
                review: formData.get('review'),
                verified: formData.get('verified') === 'on'
            };
            
            // In a real app, you would send this to your server
            console.log('Review submitted:', reviewData);
            
            // Show success message
            alert('Thank you for your review!');
            reviewForm.reset();
        });
    }
    
    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize filters
    filterReviews();
    
    // Update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
























// Contact Page JavaScript
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz9P1C7czq8y0RWFraR3usgrIW8Pk7o_M",
  authDomain: "testcontactform-800f4.firebaseapp.com",
  databaseURL: "https://testcontactform-800f4-default-rtdb.firebaseio.com", 
  projectId: "testcontactform-800f4",
  storageBucket: "testcontactform-800f4.firebasestorage.app",
  messagingSenderId: "523642699439",
  appId: "1:523642699439:web:5ddb264e4cbc2d382bde5a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your database
const contactInfo = firebase.database().ref("Infos");

// Listen for form submit
document.getElementById("contactform").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("emailid").value;
    const message = document.getElementById("msgContent").value;
    const subject = document.getElementById("subject").value;

    // Save to Firebase
    saveContactInfo(name, email, message, subject);
    
    // Reset form
    document.getElementById("contactform").reset();
}

function saveContactInfo(name, email, message, subject) {
    const newContactInfo = contactInfo.push();
    
    newContactInfo.set({
        name: name,
        email: email,
        message: message,
        subject: subject,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    .then(() => {
        document.getElementById("form-status").textContent = "Message sent successfully!";
        document.getElementById("form-status").style.color = "green";
    })
    .catch((error) => {
        document.getElementById("form-status").textContent = "Error sending message: " + error.message;
        document.getElementById("form-status").style.color = "red";
    });
}

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();































document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.querySelector('.toggle-password');
    const rememberMe = document.getElementById('remember');
    const cartCount = document.getElementById('cart-count');

    // Initialize cart count
    function initCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }

    function clearError(element) {
        element.textContent = '';
        element.classList.remove('show');
    }

    // Load saved credentials if "Remember me" was checked
    function loadSavedCredentials() {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        const remember = localStorage.getItem('rememberMe') === 'true';

        if (remember && savedEmail && savedPassword) {
            emailInput.value = savedEmail;
            passwordInput.value = savedPassword;
            rememberMe.checked = true;
        }
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validate email
            if (!email) {
                showError(emailError, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(emailError, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(emailError);
            }

            // Validate password
            if (!password) {
                showError(passwordError, 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                showError(passwordError, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                clearError(passwordError);
            }

            if (isValid) {
                // Save credentials if "Remember me" is checked
                if (rememberMe.checked) {
                    localStorage.setItem('savedEmail', email);
                    localStorage.setItem('savedPassword', password);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                    localStorage.removeItem('rememberMe');
                }

                // Simulate login (in a real app, you would send to server)
                console.log('Login submitted:', { email, password });
                
                // Show success message (replace with actual login logic)
                alert('Login successful! Redirecting...');
                
                // Redirect to account page (simulated)
                setTimeout(() => {
                    window.location.href = 'account-dashboard.html';
                }, 1000);
            }
        });
    }

    // Initialize page
    initCartCount();
    loadSavedCredentials();

    // Update year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});














/// Cart Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                if (value > parseInt(input.min)) {
                    input.value = value - 1;
                    updateSubtotal(input);
                }
            } else if (this.classList.contains('plus')) {
                if (value < parseInt(input.max)) {
                    input.value = value + 1;
                    updateSubtotal(input);
                }
            }
        });
    });

    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const value = parseInt(this.value);
            const min = parseInt(this.min);
            const max = parseInt(this.max);
            
            if (isNaN(value) || value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
            
            updateSubtotal(this);
        });
    });

    // Update subtotal when quantity changes
    function updateSubtotal(input) {
        const item = input.closest('.cart-item');
        const price = parseFloat(item.querySelector('.item-price').textContent.replace('£', ''));
        const quantity = parseInt(input.value);
        const subtotal = item.querySelector('.item-subtotal');
        
        subtotal.textContent = `£${(price * quantity).toFixed(2)}`;
        updateCartTotal();
    }

    // Remove item from cart
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                this.closest('.cart-item').remove();
                updateCartTotal();
                
                // If no items left, show empty cart message
                if (document.querySelectorAll('.cart-item').length === 0) {
                    showEmptyCart();
                }
            }
        });
    });

    // Update cart total
    function updateCartTotal() {
        let subtotal = 0;
        
        document.querySelectorAll('.item-subtotal').forEach(element => {
            subtotal += parseFloat(element.textContent.replace('£', ''));
        });
        
        const tax = subtotal * 0.2; // 20% VAT
        const discount = subtotal * 0.1; // 10% discount
        const total = subtotal + tax - discount;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `£${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `£${tax.toFixed(2)}`;
        document.querySelector('.summary-row.discount span:last-child').textContent = `-£${discount.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `£${total.toFixed(2)}`;
        
        // Update cart count in header
        const itemCount = document.querySelectorAll('.cart-item').length;
        document.getElementById('cart-count').textContent = itemCount;
    }

    // Show empty cart state
    function showEmptyCart() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet. Start shopping to find amazing gaming products!</p>
                <a href="index.html" class="btn-shop">Start Shopping</a>
            </div>
        `;
    }

    // Apply coupon code
    document.querySelector('.btn-apply').addEventListener('click', function(e) {
        e.preventDefault();
        const couponCode = document.getElementById('coupon-code').value.trim();
        
        if (couponCode === 'MCHENRY10') {
            alert('Coupon applied successfully! 10% discount added.');
        } else {
            alert('Invalid coupon code. Please try again.');
        }
    });

    // Continue shopping button
    document.querySelector('.btn-continue').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Update cart button
    document.querySelector('.btn-update').addEventListener('click', function() {
        alert('Cart updated successfully!');
    });

    // Clear cart button
    document.querySelector('.btn-clear').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your entire cart?')) {
            document.querySelectorAll('.cart-item').forEach(item => item.remove());
            showEmptyCart();
        }
    });

    // Proceed to checkout
    document.querySelector('.btn-checkout').addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});





















// Registration Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const registrationForm = document.getElementById('registration-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const passwordRequirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        number: document.getElementById('req-number'),
        special: document.getElementById('req-special')
    };

    // Validate required field
    function validateField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);

        if (!field.value.trim()) {
            errorElement.textContent = errorMessage;
            field.classList.add('invalid');
            field.classList.remove('valid');
            return false;
        } else {
            errorElement.textContent = '';
            field.classList.add('valid');
            field.classList.remove('invalid');
            return true;
        }
    }

    // Validate email
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            errorElement.textContent = 'Email is required';
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        } else if (!emailRegex.test(email)) {
            errorElement.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        } else {
            errorElement.textContent = '';
            emailInput.classList.add('valid');
            emailInput.classList.remove('invalid');
            return true;
        }
    }

    // Validate terms checkbox
    function validateTerms() {
        const termsCheckbox = document.getElementById('terms');
        const errorElement = document.getElementById('terms-error');

        if (!termsCheckbox.checked) {
            errorElement.textContent = 'You must accept the terms and conditions';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    // Validate password
    function validatePassword() {
        const password = passwordInput.value;
        const errors = [];

        Object.values(passwordRequirements).forEach(req => {
            req.classList.remove('valid');
        });

        if (password.length >= 8) {
            passwordRequirements.length.classList.add('valid');
        } else {
            errors.push('Password must be at least 8 characters');
        }

        if (/[A-Z]/.test(password)) {
            passwordRequirements.uppercase.classList.add('valid');
        } else {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (/\d/.test(password)) {
            passwordRequirements.number.classList.add('valid');
        } else {
            errors.push('Password must contain at least one number');
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordRequirements.special.classList.add('valid');
        } else {
            errors.push('Password must contain at least one special character');
        }

        const errorElement = document.getElementById('password-error');
        if (errors.length > 0) {
            errorElement.textContent = errors[0];
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
        } else {
            errorElement.textContent = '';
            passwordInput.classList.add('valid');
            passwordInput.classList.remove('invalid');
        }

        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }

        return errors.length === 0;
    }

    // Validate confirm password
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorElement = document.getElementById('confirm-password-error');

        if (confirmPassword && password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
            return false;
        } else if (confirmPassword) {
            errorElement.textContent = '';
            confirmPasswordInput.classList.add('valid');
            confirmPasswordInput.classList.remove('invalid');
            return true;
        } else {
            errorElement.textContent = '';
            confirmPasswordInput.classList.remove('valid', 'invalid');
            return false;
        }
    }

    // Process registration
    function processRegistration() {
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        console.log('Registration data:', formData);
        alert('Registration successful! Welcome to McHenry Gaming.');

        registrationForm.reset();

        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });

        Object.values(passwordRequirements).forEach(req => {
            req.classList.remove('valid');
        });
    }

    // Handle form submission
    function handleFormSubmission(e) {
        e.preventDefault();

        const isFirstNameValid = validateField('first-name', 'First name is required');
        const isLastNameValid = validateField('last-name', 'Last name is required');
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsChecked = validateTerms();

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isTermsChecked
        ) {
            processRegistration();
        }
    }

    // Initialize form
    function initForm() {
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function () {
                const input = this.parentElement.querySelector('input');
                const icon = this.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.replace('fa-eye', 'fa-eye-slash');
                    this.setAttribute('aria-label', 'Hide password');
                } else {
                    input.type = 'password';
                    icon.classList.replace('fa-eye-slash', 'fa-eye');
                    this.setAttribute('aria-label', 'Show password');
                }
            });
        });

        if (passwordInput && confirmPasswordInput) {
            passwordInput.addEventListener('input', validatePassword);
            confirmPasswordInput.addEventListener('input', validateConfirmPassword);
        }

        if (registrationForm) {
            registrationForm.addEventListener('submit', handleFormSubmission);
        }
    }

    initForm();

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});














// Password toggle visibility
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Form validation
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const successMessage = document.getElementById('login-success');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    emailError.style.display = 'none';
    passwordError.style.display = 'none';
    emailInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
    
    let isValid = true;
    
    // Email validation
    if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.classList.add('input-error');
        isValid = false;
    }
    
    // Password validation
    if (!passwordInput.value || passwordInput.value.length < 6) {
        passwordError.style.display = 'block';
        passwordInput.classList.add('input-error');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        successMessage.style.display = 'block';
        
        // In a real application, you would submit to a server here
        // For demo, we'll redirect after a delay
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1500);
    }
});

// Social login buttons functionality
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function() {
        // In a real app, this would initiate OAuth flow
        alert(`Sign in with ${this.querySelector('span').textContent} would be implemented here`);
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();