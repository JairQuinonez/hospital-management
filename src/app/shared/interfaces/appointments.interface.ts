export interface AppointmentsDTO {
    id_cita_medica?: number | null;
    pacientes_fk: number;
    medico_fk: number;
    fecha_cita: string;
    estado_cita: string;
    fecha_insercion?: string | null;
    usuario_insercion?: string | null;
    fecha_modificacion?: string | null;
    usuario_modificacion?: string | null;
}

export interface AppointmentsDTOResponse {
    citaMedicaList: AppointmentsDTO[];
}


export interface Appointments {
    id: number;
    date: string;
    time: string;
    site: string;
    specialty: string;
    doctor: string;
    status: string;
}
export const SPECIALITY_OPTIONS = [
    { value: 'cardiologia', label: 'Cardiología' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'neurologia', label: 'Neurología' },
    { value: 'dermatologia', label: 'Dermatología' },
    { value: 'medicina_interna', label: 'Medicina Interna' },
    { value: 'urgencias', label: 'Urgencias' },
    { value: 'oncologia', label: 'Oncología' },
    { value: 'ginecologia', label: 'Ginecología' },
    { value: 'urologia', label: 'Urología' },
    { value: 'ortopedia', label: 'Ortopedia' },
    { value: 'cirugia', label: 'Cirugía' },
    { value: 'medicina_general', label: 'Medicina General' },
    { value: 'reumatologia', label: 'Reumatología' },
    { value: 'nefrologia', label: 'Nefrología' },
    { value: 'psiquiatria', label: 'Psiquiatría' },
    { value: 'pediatria_sin', label: 'Pediatría sin' }
];

export const SITE_OPTIONS = [
    { value: 'sur', label: 'Sur' },
    { value: 'norte', label: 'Norte' },
    { value: 'centro', label: 'Centro' },
    { value: 'urbano', label: 'Urbano' },
    { value: 'general', label: 'General' }
];

export const STATUS_OPTIONS = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'asignado', label: 'Asignado' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'finalizado', label: 'Finalizado' },
]

export const MONTH_OPTIONS = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
]

export const DAY_OPTIONS = [
    {value:'01', label: '01'},
    {value:'02', label: '02'},
    {value:'03', label: '03'},
    {value:'04', label: '04'},
    {value:'05', label: '05'},
    {value:'06', label: '06'},
    {value:'07', label: '07'},
    {value:'08', label: '08'},
    {value:'09', label: '09'},
    {value:'10', label: '10'},
    {value:'11', label: '11'},
    {value:'12', label: '12'},
    {value:'13', label: '13'},
    {value:'14', label: '14'},
    {value:'15', label: '15'},
    {value:'16', label: '16'},
    {value:'17', label: '17'},
    {value:'18', label: '18'},
    {value:'19', label: '19'},
    {value:'20', label: '20'},
    {value:'21', label: '21'},
    {value:'22', label: '22'},
    {value:'23', label: '23'},
    {value:'24', label: '24'},
    {value:'25', label: '25'},
    {value:'26', label: '26'},
    {value:'27', label: '27'},
    {value:'28', label: '28'},
    {value:'29', label: '29'},
    {value:'30', label: '30'},
    {value:'31', label: '31'},  
]   