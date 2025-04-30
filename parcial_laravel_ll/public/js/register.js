document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita el comportamiento por defecto del formulario.
  
      const fullname = document.getElementById('fullname').value;
      const birthdate = document.getElementById('birthdate').value;
      const gender = document.getElementById('gender').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
  
      // Validación de campos
      if (!fullname || !birthdate || !gender || !email || !password || !confirmPassword) {
        alert("Por favor, complete todos los campos.");
        return;
      }
  
      // Validar contraseñas
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }
  
      // Crear objeto de datos a enviar
      const data = {
        fullname: fullname,
        birthdate: birthdate,
        gender: gender,
        email: email,
        password: password,
      };
  
      // Enviar los datos al servidor (aquí se puede usar AJAX, Fetch o Axios)
      fetch('/ruta-del-endpoint-de-registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          // Si el registro es exitoso
          if (data.success) {
            alert("Registro exitoso");
            window.location.href = "/login"; // Redirigir al login
          } else {
            alert("Error en el registro: " + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Hubo un problema al procesar tu solicitud.');
        });
    });
  });
  