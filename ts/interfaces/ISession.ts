export interface ISession {
    nombre: string;
    email: string;
    phone: string;
    isAdmin: boolean;
}

export class Session implements ISession {
    public nombre: string = '';
    public email: string = '';
    public phone: string = '';
    public isAdmin: boolean = true;

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
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

    getIsAdmin(): boolean {
        return this.isAdmin;
    }
}