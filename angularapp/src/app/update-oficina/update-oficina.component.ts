import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-oficina',
  templateUrl: './update-oficina.component.html',
  styleUrls: ['./update-oficina.component.css']
})
export class UpdateOficinaComponent implements OnInit {
  oficinaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateOficinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.oficinaForm = this.formBuilder.group({
      nomOficina: [this.data.nomOficina, Validators.required]
    });
  }

  updateOficina(): void {
    if (this.oficinaForm.valid) {
      const updatedData = {
        officeID: this.data.officeID,
        nomOficina: this.oficinaForm.value.nomOficina,
        cityID: this.data.cityID,
        ciutat: { // Si te falta un field es esto mi rey.
          cityID: this.data.ciutat.cityID,
          nomCiutat: this.data.ciutat.nomCiutat,
          countryID: this.data.ciutat.countryID,
        },
        pais: {
          countryID: this.data.pais.countryID,
          nomPais: this.data.pais.nomPais
        }
      };
      this.dialogRef.close(updatedData);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
