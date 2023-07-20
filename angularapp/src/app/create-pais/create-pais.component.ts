import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-pais',
  templateUrl: './create-pais.component.html',
  styleUrls: ['./create-pais.component.css']
})
export class CreatePaisComponent implements OnInit {
  paisForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreatePaisComponent>) { }

  ngOnInit(): void {
    this.paisForm = this.formBuilder.group({
      nomPais: ['', Validators.required]
    });
  }

  createPais(): void {
    if (this.paisForm.valid) {
      const nomPais = this.paisForm.get('nomPais')?.value;

      this.dialogRef.close({ nomPais });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
