import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-pais',
  templateUrl: './update-pais.component.html',
  styleUrls: ['./update-pais.component.css']
})
export class UpdatePaisComponent implements OnInit {
  paisForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.paisForm = this.formBuilder.group({
      nomPais: [this.data.nomPais, Validators.required]
    });
  }

  updatePais(): void {
    if (this.paisForm.valid) {
      const updatedData = {
        countryID: this.data.countryID, 
        nomPais: this.paisForm.value.nomPais 
      };
      this.dialogRef.close(updatedData);
    }
  }


  cancel(): void {
    this.dialogRef.close();
  }
}
