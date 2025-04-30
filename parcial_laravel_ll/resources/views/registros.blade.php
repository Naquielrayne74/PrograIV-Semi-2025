<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registros de Usuarios</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

</head>
<body>

<div class="container mt-5">
    <h1>Registros de Usuarios</h1>

    <form id="formAgregar" method="POST" action="{{ route('usuarios.store') }}">
        @csrf
        <div class="row mb-3">
            <div class="col">
                <input type="text" name="fullname" class="form-control" placeholder="Nombre completo" required>
            </div>
            <div class="col">
                <input type="date" name="birthdate" class="form-control" required>
            </div>
            <div class="col">
                <select name="gender" class="form-control" required>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                </select>
            </div>
            <div class="col">
                <input type="email" name="email" class="form-control" placeholder="Correo" required>
            </div>
            <div class="col">
                <input type="password" name="password" class="form-control" placeholder="Contraseña" required>
            </div>
            <div class="col">
                <button type="submit" class="btn btn-success">Agregar</button>
            </div>
        </div>
    </form>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Nombre completo</th>
                <th>Fecha nacimiento</th>
                <th>Género</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaUsuarios">
            @foreach($usuarios as $usuario)
            <tr id="fila-{{ $usuario->id }}">
                <td>{{ $usuario->fullname }}</td>
                <td>{{ $usuario->birthdate }}</td>
                <td>{{ $usuario->gender }}</td>
                <td>{{ $usuario->email }}</td>
                <td>
                    <button class="btn btn-warning btnEditar" data-id="{{ $usuario->id }}">Editar</button>
                    <form method="POST" action="{{ route('usuarios.destroy', $usuario->id) }}" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-danger" onclick="return confirm('¿Seguro de eliminar?')">Eliminar</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

<script src="{{ asset('js/registros.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="{{ asset('public/js/registros.js') }}"></script>

</body>
</html>
