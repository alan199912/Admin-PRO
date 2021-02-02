import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_ulr;

@Pipe({
  name: 'img',
})
export class ImgPipe implements PipeTransform {
  transform(img: string, type: 'users' | 'doctors' | 'hospitals'): string {
    if (!img) {
      return `${base_url}/uploads/users/noimg`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${base_url}/uploads/${type}/${img}`;
    } else {
      return `${base_url}/uploads/${type}/noimg`;
    }
  }
}
