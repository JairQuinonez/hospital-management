export interface UserDTO {
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'paciente' | 'doctor';
}

export interface UserDTOResponse {
    ID_USUARIO: number | null;
    NOMBRE: string;
    EMAIL: string;
    ROL: string;
    FECHA_INSERCION: string | null;
    USUARIO_INSERCION: string | null;
    FECHA_MODIFICACION: string | null;
    USUARIO_MODIFICACION: string | null;
    TABLABD: string;
    REGISTROS: string;
    status: boolean;

}

export interface ValdiateUserDTO {
    email: string;
    password: string;
}

export interface ValdiateUserDTOResponse {
  codreg: number;
  ID_USUARIO: number;
  NOMBRE: string;
  EMAIL: string;
  PASSWORD: string;
  ROL: string;
  mensaje: string;
  status: boolean;
}
