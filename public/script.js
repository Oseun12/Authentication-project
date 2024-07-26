document.addEventListener('DOMContentLoaded', () => {
    const showToast = (text, type) => {
        let backgroundColor;
        if (type === 'success') {
            backgroundColor = 'navy blue';
        } else if (type === 'error') {
            backgroundColor = 'red';
        }

        Toastify({
            text: text,
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            backgroundColor: backgroundColor,
        }).showToast();
    };

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, role })
                });

                const data = await response.json();
                if (response.ok) {
                    showToast('Signup successful', 'success');
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                } else {
                    showToast(data.message || 'Signup failed', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('An error occurred during signup.', 'error');
            }
        });
    } else {
        console.error('Signup form not found');
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                if (response.ok) {
                    showToast('Login successful', 'success');
                    setTimeout(() => {
                        window.location.href = '/home.html';
                    }, 2000);
                } else {
                    showToast(data.message || 'Login failed', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showToast('An error occurred during login.', 'error');
            }
        });
    } else {
        console.error('Login form not found');
    }
});






// document.addEventListener('DOMContentLoaded', () => {
//     // Ensure Sonner is loaded correctly
//     const checkSonnerLoaded = setInterval(() => {
//         if (window.Sonner) {
//             clearInterval(checkSonnerLoaded);

//             const { toast } = window.Sonner;
            
//             // Signup form handler
//             const signupForm = document.getElementById('signup-form');
//             if (signupForm) {
//                 signupForm.addEventListener('submit', async (event) => {
//                     event.preventDefault();
//                     const username = document.getElementById('username').value;
//                     const password = document.getElementById('password').value;
//                     const role = document.getElementById('role').value;

//                     try {
//                         const response = await fetch('/signup', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify({ username, password, role })
//                         });

//                         const data = await response.json();
//                         if (response.ok) {
//                             toast.success('Signup successful');
//                             window.location.href = '/login.html';
//                         } else {
//                             toast.error(data.message);
//                         }
//                     } catch (error) {
//                         console.error('Error:', error);
//                         toast.error('An error occurred during signup.');
//                     }
//                 });
//             } else {
//                 console.error('Signup form not found');
//             }

//             // Login form handler
//             const loginForm = document.getElementById('login-form');
//             if (loginForm) {
//                 loginForm.addEventListener('submit', async (event) => {
//                     event.preventDefault();
//                     console.log('Login form submitted');
//                     const username = document.getElementById('username').value;
//                     const password = document.getElementById('password').value;

//                     try {
//                         const response = await fetch('/login', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify({ username, password })
//                         });

//                         const data = await response.json();
//                         if (response.ok) {
//                             toast.success('Login successful');
//                             window.location.href = '/home.html';
//                         } else {
//                             toast.error(data.message);
//                         }
//                     } catch (error) {
//                         console.error('Error:', error);
//                         toast.error('An error occurred during login.');
//                     }
//                 });
//             } else {
//                 console.error('Login form not found');
//             }
//         } else {
//             console.error('Sonner library is not loaded.');
//         }
//     }, 100);
// });
