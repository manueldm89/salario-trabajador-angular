export interface Sueldo {
    message: string;
    result:  Result[];
}

export interface Result {
    sueldo_base:       string;
    adicional_entrega: string;
    bono:              string;
    isr:               string;
    vale_despensa:     string;
    total_sueldo:      string;
}
