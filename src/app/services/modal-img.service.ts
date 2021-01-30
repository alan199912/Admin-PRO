import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_ulr;

@Injectable({
  providedIn: 'root',
})
export class ModalImgService {
  public type: 'users' | 'doctors' | 'hospitals';
  public id: string;
  public img: string;
  private _hideModal: boolean = true;

  public newImg: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'noimg'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}
