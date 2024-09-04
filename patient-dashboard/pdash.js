//Javascript for Authentication & Authorization
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // Redirect to login page if not authenticated
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = './login.html'; // Replace with your actual login page URL
      }
    });
  });