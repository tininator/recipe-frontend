import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FileResponse {
  name: string;
  uri: string;
  type: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  upload(file: File, recipeid: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${recipeid}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadFile(file: File): Observable<FileResponse> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.http.post<FileResponse>(this.baseUrl + '/upload-file', formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
