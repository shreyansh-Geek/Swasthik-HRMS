//Toggle responsive menu for navigation tab
document.getElementById('navbar-toggle').addEventListener('click', function() {
    var navbarRight = document.querySelector('.navbar-right');
    navbarRight.classList.toggle('active');
    this.classList.toggle('active');
});



//Javascript to confirm the password
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('psignupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordMatchMessage = document.getElementById('passwordMatchMessage');

    // Function to check if passwords match
    function validatePasswordMatch() {
        if (password.value !== confirmPassword.value) {
            passwordMatchMessage.style.display = 'block';
            return false;
        } else {
            passwordMatchMessage.style.display = 'none';
            return true;
        }
    }

    // Check passwords on input
    password.addEventListener('input', validatePasswordMatch);
    confirmPassword.addEventListener('input', validatePasswordMatch);

    // Prevent form submission if passwords do not match
    form.addEventListener('submit', (event) => {
        if (!validatePasswordMatch()) {
            event.preventDefault();
        }
    });
});


//Javascript to validate a 10-digit mobile number
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('psignupForm');
    const mobileNumber = document.getElementById('mobileNumber');
    const mobileNumberError = document.getElementById('mobileNumberError');

    // Regular expression to check if the mobile number is exactly 10 digits
    const mobileNumberPattern = /^\d{10}$/;

    // Function to validate mobile number
    function validateMobileNumber() {
        if (mobileNumberPattern.test(mobileNumber.value)) {
            mobileNumberError.style.display = 'none';
            return true;
        } else {
            mobileNumberError.style.display = 'block';
            return false;
        }
    }

    // Check mobile number on input
    mobileNumber.addEventListener('input', validateMobileNumber);

    // Prevent form submission if mobile number is not valid
    form.addEventListener('submit', (event) => {
        if (!validateMobileNumber()) {
            event.preventDefault();
        }
    });
});



//Javascript for Authentication & Authorization
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // Function to handle sign-up
    function signUp(email, password) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Successfully signed up
          const user = userCredential.user;
          console.log('User signed up:', user);

          // Redirect to patient dashboard after sign-up
          window.location.href = './patient-dashboard.html'; // Replace with your actual dashboard URL
        })
        .catch((error) => {
          console.error('Error signing up:', error.message);
          // Handle errors (e.g., show error message to user)
        });
    }

    // Handle sign-up button click
    document.getElementById('signupButton').addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      signUp(email, password);
    });
  });