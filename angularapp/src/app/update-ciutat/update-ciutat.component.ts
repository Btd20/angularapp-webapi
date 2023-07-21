import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-ciutat',
  templateUrl: './update-ciutat.component.html',
  styleUrls: ['./update-ciutat.component.css']
})
export class UpdateCiutatComponent implements OnInit {
  ciutatForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCiutatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.ciutatForm = this.formBuilder.group({
      nomCiutat: [this.data.nomCiutat, Validators.required]
    });
  }

  updateCiutat(): void {
    if (this.ciutatForm.valid) {
      const updatedData = {
        cityID: this.data.cityID,
        nomCiutat: this.ciutatForm.value.nomCiutat,
        countryID: this.data.countryID,
        pais: { // Si te falta un field es esto mi rey.
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
