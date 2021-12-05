export interface ISession {
    nombre: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    avatar: string;
}

export class Session implements ISession {
    public nombre: string = '';
    public email: string = '';
    public phone: string = '';
    public avatar: string = '';
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

    setAvatar(avatar: string): void {
        this.avatar = avatar;
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

    getAvatar(): string {
        return this.avatar;
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }
}