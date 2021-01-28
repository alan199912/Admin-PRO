import { environment } from "src/environments/environment";

const base_url = environment.base_ulr;
export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public id?: string
    ) {}

  get getImg(): string {


    if( this.img ) {
      return `${base_url}/uploads/users/${this.img}`;
    }

    // // this.img.includes('https')
    if( this.img !== undefined || this.img !== '' || this.img.includes('https')) {
      return this.img
    }

    return `${base_url}/uploads/users/noimg`;
  }
}
