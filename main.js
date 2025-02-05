const { createApp } = Vue;

createApp({
    data() {
        return {
            alumnos: [],
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: '',
            municipio: '',
            estado: '',
            fechaNacimiento: '',
            sexo: '',
            buscar: '',
            editando: false
        };
    },

    computed: {
        alumnosFiltrados() {
            return this.alumnos.filter(alumno => 
                alumno.nombre.toLowerCase().includes(this.buscar.toLowerCase()) || 
                alumno.codigo.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.direccion.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.telefono.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.email.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.municipio.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.estado.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.sexo.toLowerCase().includes(this.buscar.toLowerCase()) ||
                alumno.fechaNacimiento.toLowerCase().includes(this.buscar.toLowerCase())
            );
        }
    },
    methods: {
        guardarAlumno() {
            if (!this.codigo || !this.nombre || !this.direccion || !this.telefono ||
                !this.email || !this.municipio || !this.estado || !this.fechaNacimiento || !this.sexo) {
                alert("⚠️ Por favor, complete todos los campos antes de guardar.");
                return;
            }
            

            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                telefono: this.telefono,
                email: this.email,
                municipio: this.municipio,
                estado: this.estado,
                fechaNacimiento: this.fechaNacimiento,
                sexo: this.sexo,
            };

            localStorage.setItem(this.codigo, JSON.stringify(alumno));
            this.listarAlumnos();
            this.nuevoAlumno();
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i);
                let alumno = JSON.parse(localStorage.getItem(clave));
                if (alumno && alumno.codigo) {
                    this.alumnos.push(alumno);
                }
            }
        },
        eliminarAlumno(alumno) {
            if (confirm(`¿Está seguro de eliminar a ${alumno.nombre}?`)) {
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
            }
        },
        seleccionarAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.telefono = alumno.telefono;
            this.email = alumno.email;
            this.municipio = alumno.municipio;
            this.estado = alumno.estado;
            this.fechaNacimiento = alumno.fechaNacimiento;
            this.sexo = alumno.sexo;
            this.editando = true;
        },
        nuevoAlumno() {
            this.codigo = '';
            this.nombre = '';
            this.direccion = '';
            this.telefono = '';
            this.email = '';
            this.municipio = '';
            this.estado = '';
            this.fechaNacimiento = '';
            this.sexo = '';
            this.editando = false;
        }
        
        
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');