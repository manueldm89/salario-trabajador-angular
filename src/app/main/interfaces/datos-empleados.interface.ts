export interface Datosempleados {
    message: string;
    result:  Result[];
}

export interface Result {
    num_empleado:    number;
    nombre_empleado: string;
}
