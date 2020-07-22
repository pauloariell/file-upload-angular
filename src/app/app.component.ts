import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedFile: File = null;
  SelectedFileBase64 = 'await...';
  @ViewChild('filebase64TextArea') filebase64: ElementRef<HTMLInputElement>;

  ngOnInit() {}

  onFileSelected(event) {
    console.log(<File>event.target.files[0]);
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload(event) {
    const fd = new FormData();
    // fd.append(`file-${Date.now()}`, this.selectedFile, this.selectedFile.name);
    var FileB64Element = this.filebase64.nativeElement;

    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        this.SelectedFileBase64 = base64String;
        FileB64Element.innerHTML = this.SelectedFileBase64;
        //showing file converted to base64
        //document.getElementById('base64').value = base64String;
      };
    })(this.selectedFile);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(this.selectedFile);
  }
}
