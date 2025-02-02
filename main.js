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
            buscar: ''  // Añadimos la variable para la búsqueda
        }
    },
    methods: {
        eliminarAlumno(alumno) {
            if (confirm(`¿Está seguro de eliminar el alumno ${alumno.nombre}?`)) {
                localStorage.removeItem(alumno.codigo);
                this.listarAlumnos();
            }
        },
        verAlumno(alumno) {
            this.codigo = alumno.codigo;
            this.nombre = alumno.nombre;
            this.direccion = alumno.direccion;
            this.telefono = alumno.telefono;
            this.email = alumno.email;
            this.municipio = alumno.municipio;
            this.estado = alumno.estado;
            this.fechaNacimiento = alumno.fechaNacimiento;
            this.sexo = alumno.sexo;
        },
        guardarAlumno() {
            let alumno = {
                codigo: this.codigo,
                nombre: this.nombre,
                direccion: this.direccion,
                telefono: this.telefono,
                email: this.email,
                municipio: this.municipio,
                estado: this.estado,    
                fechaNacimiento: this.fechaNacimiento,
                sexo: this.sexo
            };
            localStorage.setItem(this.codigo, JSON.stringify(alumno));
            this.listarAlumnos();
            this.nuevoAlumno(); // Limpia los campos después de guardar
        },
        listarAlumnos() {
            this.alumnos = [];
            for (let i = 0; i < localStorage.length; i++) {
                let clave = localStorage.key(i),
                    valor = localStorage.getItem(clave);
                this.alumnos.push(JSON.parse(valor));
            }
        },
       buscarAlumno() {
    if (this.buscar.trim() === '') {
        this.listarAlumnos(); // Si no hay término de búsqueda, mostramos todos los alumnos
    } else {
        this.alumnos = this.alumnos.filter(alumno => 
            alumno.codigo.includes(this.buscar) || 
            alumno.direccion.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.email.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.telefono.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.municipio.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.estado.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.sexo.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.nombre.toLowerCase().includes(this.buscar.toLowerCase()) ||
            alumno.fechaNacimiento.toLowerCase().includes(this.buscar.toLowerCase()) 
        );
            }
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
        }
    },
    created() {
        this.listarAlumnos();
    }
}).mount('#app');
