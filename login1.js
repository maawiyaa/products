
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'maawiya' && password === 'maawiya') {
        window.location.href = 'products.html';
    } else {
        alert('Invalid username or password.');
    }
});

