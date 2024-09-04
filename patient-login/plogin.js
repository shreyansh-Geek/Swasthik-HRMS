//Toggle responsive menu for navigation tab
document.getElementById('navbar-toggle').addEventListener('click', function() {
    var navbarRight = document.querySelector('.navbar-right');
    navbarRight.classList.toggle('active');
    this.classList.toggle('active');
});


//Javascript for Authentication & Authorization
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // Function to handle sign-in
    function signIn(email, password) {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Successfully signed in
          const user = userCredential.user;
          console.log('User signed in:', user);

          // Redirect to patient dashboard after sign-in
          window.location.href = './patient-dashboard.html'; // Replace with your actual dashboard URL
        })
        .catch((error) => {
          console.error('Error signing in:', error.message);
          // Handle errors (e.g., show error message to user)
        });
    }

    // Handle sign-in button click
    document.getElementById('loginButton').addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      signIn(email, password);
    });
  });