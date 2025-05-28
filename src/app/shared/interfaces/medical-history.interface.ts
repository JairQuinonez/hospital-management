export interface MedicalHistoryDTO {
    id_historia_clinica: number;
    pacientes_fk: number;
    medico_fk: number;
    fecha_historia: string; 
    diagnostico: string;
    tratamiento: string;
    fecha_insercion: string; 
    usuario_insercion: string;
    fecha_modificacion?: string | null;
    usuario_modificacion?: string | null;
}

export interface MedicalHistoryDTOResponse {
    historiaClinicaList: MedicalHistoryDTO[];
}

export interface MedicalHistoryRequestDTO {
    pacientes_fk: number;
    medico_fk: number;
    fecha_historia: string; 
    diagnostico: string;
    tratamiento: string;
}