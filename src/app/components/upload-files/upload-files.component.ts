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

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
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
      console.log(f);
    });

    this.selectedFiles = undefined;
  }


}
