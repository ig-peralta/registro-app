import { Class } from "./interfaces/class.interface";

export function assertClass(obj: any): asserts obj is Class {
    const keys = Object.keys(obj);
    const requiredKeys = ['bloqueInicio', 'bloqueTermino', 'dia', 'horaFin', 'horaInicio', 'idAsignatura', 'nombreAsignatura', 'nombreProfesor', 'seccion', 'sede'];
    for (const key of requiredKeys) {
        if (!keys.includes(key)) {
            throw new Error(`Expected key ${key} not found`);
        }
    }
}