import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  studId: any;
  image: any;
  cardImageBase64: any;
  isImageSaved: any;
  selectedFile1: any;
  selectedFile2: any;
  img1 = false;
  sin1 = false;
  sign: any;
  upload: any;
  hasAdd = false;
  constructor(public avtive: ActivatedRoute, public student: StudentService, public fb: FormBuilder, public router: Router) {
    this.upload = this.fb.group({
      image: ['', Validators.required],
      sign: ['', Validators.required]
    })
    this.studId = this.avtive.snapshot.params.id
  }
  get T() { return this.upload.controls; }
  ngOnInit(): void {
  }
  document() {
    this.hasAdd = true;
    const docs = {
      avatar: this.image,
      sign: this.sign,
      userId: this.avtive.snapshot.params.id
    }
    if (this.img1 && this.sin1) {
      this.student.postUser('document', docs).then((res) => {
        this.router.navigate(['details/' + this.studId]);
        this.student.index.next(3);
      })
    }
  }

  fileChangeEvent(fileInput: any) {
    const image = fileInput.target.files[0];
    this.selectedFile1 = image;

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          if (this.selectedFile1) {
            const files = new FormData();
            files.append('files', this.selectedFile1)
            this.student
              .postUser('upload', files)
              .then((res) => {
                this.image = res.files[0];
                this.img1 = true;
              })
              .catch((error) => {
              });
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  fileChangeEvent1(fileInput: any) {
    const sign = fileInput.target.files[0];
    this.selectedFile2 = sign;

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      if (this.selectedFile2) {
        const files = new FormData();
        files.append('files', this.selectedFile2)
        this.student
          .postUser('upload', files)
          .then((res) => {
            console.log("res", res);
            this.sign = res.files[0];
            console.log(
              "image",
              this.sign
            );
            this.sin1 = true;
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    }
  }
  delete(check: boolean) {
    if (check) {
      this.image = null;
      this.img1 = false;
    }
    else {
      this.sign = null;
      this.sin1 = false;
    }
  }
}
