document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioRegistro');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Capturar los datos del formulario
        const formData = new FormData(form);

        try {
            const response = await fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                alert('Usuario registrado exitosamente');
                form.reset();
            } else {
                const errorData = await response.json();
                alert('Error al registrar: ' + (errorData.message || 'Error desconocido'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al conectar con el servidor');
        }
    });
});
