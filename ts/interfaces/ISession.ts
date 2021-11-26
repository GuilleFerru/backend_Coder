export interface ISession {
    nombre: string;
    email: string;
    phone: string;
}

export class Session implements ISession {
    public nombre: string = '';
    public email: string = '';
    public phone: string = '';

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    
    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    getNombre(): string {
        return this.nombre;
    }

    getEmail(): string {
        return this.email;
    }

    getPhone(): string {
        return this.phone;
    }
}