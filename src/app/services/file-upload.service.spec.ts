import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FileUploadService } from './file-upload.service';
import { User } from '../models/user.model';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let user: User

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileUploadService]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('updateFile: ', () => {

    let blob = new Blob([""], { type: 'png' });
    blob["lastModifiedDate"] = "";
    blob["name"] = "filename";

    let fakeF = <File>blob;

    const id = '1'

    expect(service.updateFile(fakeF, 'users', id)).toBeTruthy()
  })
});
