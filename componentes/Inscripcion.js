const inscripcion = {
    data() {
        return {
            alumnos: [],
            filtroAlumnos: '',
            materias: [],
            materiaSeleccionada: null,
            nuevoAlumno: {
                codigo: '',
                nombre: '',
                email: '',
                direccion: '',
                telefono: '',
                fechanacimiento: '',
                sexo: ''
            }
        };
    },
    methods: {
        async listarAlumnos() {
            this.alumnos = await db.alumnos.toArray();
        },
        async listarMaterias() {
            this.materias = await db.materias.toArray();
        },
        async inscribirAlumno() {
            if (!this.nuevoAlumno.codigo || !this.nuevoAlumno.nombre || !this.materiaSeleccionada) {
                alertify.error("Todos los campos son obligatorios, incluida la selección de una materia.");
                return;
            }

            const existe = await db.alumnos.where('codigo').equals(this.nuevoAlumno.codigo).first();
            if (existe) {
                alertify.warning("Este alumno ya está registrado.");
                return;
            }

            await db.alumnos.put({ ...this.nuevoAlumno });
            await db.inscripciones.add({
                codigoAlumno: this.nuevoAlumno.codigo,
                codigoMateria: this.materiaSeleccionada.codigo
            });

            alertify.success("Alumno inscrito exitosamente en " + this.materiaSeleccionada.nombre);
            this.nuevoAlumno = { codigo: '', nombre: '', email: '', direccion: '', telefono: '', fechanacimiento: '', sexo: '' };
            this.materiaSeleccionada = null;
            this.listarAlumnos();
        },
        seleccionarMateria(materia) {
            this.materiaSeleccionada = materia;
        },
        seleccionarAlumno(alumno) {
            this.nuevoAlumno = { ...alumno }; // Rellenar los campos con los datos del alumno
            this.filtroAlumnos = ''; // Limpiar el filtro de búsqueda
        }
    },
    computed: {
        alumnosFiltrados() {
            return this.alumnos.filter(alumno =>
                alumno.nombre.toLowerCase().includes(this.filtroAlumnos.toLowerCase()) ||
                alumno.codigo.toLowerCase().includes(this.filtroAlumnos.toLowerCase())
            );
        }
    },
    created() {
        this.listarAlumnos();
        this.listarMaterias();
    },
    template: `
        <div class='container mt-4'>
            <h5 class="text-primary fw-bold">Buscar Alumno</h5>
            <input type='text' v-model='filtroAlumnos' class='form-control mb-3 shadow-sm' placeholder='Buscar por código o nombre'>

            <h5 class="mt-4 text-danger fw-bold">Lista de Alumnos</h5>
            <div class="table-responsive">
                <table class='table table-hover table-bordered shadow-sm'>
                    <thead class="table-danger">
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Fecha Nacimiento</th>
                            <th>Sexo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='alumno in alumnosFiltrados' :key='alumno.codigo' @click="seleccionarAlumno(alumno)">
                            <td>{{ alumno.codigo }}</td>
                            <td>{{ alumno.nombre }}</td>
                            <td>{{ alumno.email }}</td>
                            <td>{{ alumno.direccion }}</td>
                            <td>{{ alumno.telefono }}</td>
                            <td>{{ alumno.fechanacimiento }}</td>
                            <td>{{ alumno.sexo }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h5 class="mt-4 text-success fw-bold">Seleccionar Materia</h5>
            <ul class="list-group mb-3">
                <li v-for="materia in materias" :key="materia.codigo"
                    @click="seleccionarMateria(materia)"
                    :class="{'list-group-item': true, 'active': materiaSeleccionada && materiaSeleccionada.codigo === materia.codigo}">
                    {{ materia.nombre }} ({{ materia.uv }} UV)
                </li>
            </ul>

            <h5 class="mt-4 text-success fw-bold">Formulario de Inscripción</h5>
            <div class='form-group'>
                <input type='text' v-model='nuevoAlumno.codigo' class='form-control mb-2' placeholder='Código'>
                <input type='text' v-model='nuevoAlumno.nombre' class='form-control mb-2' placeholder='Nombre'>
                <input type='email' v-model='nuevoAlumno.email' class='form-control mb-2' placeholder='Email'>
                <input type='text' v-model='nuevoAlumno.direccion' class='form-control mb-2' placeholder='Dirección'>
                <input type='text' v-model='nuevoAlumno.telefono' class='form-control mb-2' placeholder='Teléfono'>
                <input type='date' v-model='nuevoAlumno.fechanacimiento' class='form-control mb-2' placeholder='Fecha de Nacimiento'>
                <select v-model='nuevoAlumno.sexo' class='form-control mb-2'>
                    <option value=''>Seleccionar Sexo</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                </select>
                <button class='btn btn-success shadow-sm' @click="inscribirAlumno">Inscribir</button>
            </div>
        </div>
    `
};
