import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService, FileResponse } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  @Output()
  public url: EventEmitter<string> = new EventEmitter<string>();

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  imgURL: any;
  public message2: string;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }


  selectFile(eventS) {
    if (eventS.length === 0) {
      return;
    }

    const mimeType = eventS[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message2 = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(eventS[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    }
    // this.selectedFiles = eventS.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    /* this.uploadService.upload(this.currentFile, this.recipeid).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      }); */

    this.uploadService.uploadFile(this.currentFile).subscribe((f: FileResponse) => {
      this.url.emit(f.uri);
    });

    this.selectedFiles = undefined;
  }


}
