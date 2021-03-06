import { environment } from 'src/environments/environment';

const base_url = environment.base_ulr;
export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public id?: string
  ) {}

  get getImg(): string {
    if (!this.img) {
      return `${base_url}/uploads/users/noimg`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/noimg`;
    }
  }
}
