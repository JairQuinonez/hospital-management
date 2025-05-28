export interface DorctorDTO {
  id_medico: number;
  usuario_fk: number;
  especialidad: string;
  nombre: string;
  fecha_insercion: string; 
  usuario_insercion: string;
  fecha_modificacion?: string | null;
  usuario_modificacion?: string | null;
}

export interface DoctorDTOResponse {
  MedicosList: DorctorDTO[];
}