import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ciutat',
  templateUrl: './create-ciutat.component.html',
  styleUrls: ['./create-ciutat.component.css']
})
export class CreateCiutatComponent implements OnInit {
  ciutatForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateCiutatComponent>) { }

  ngOnInit(): void {
    this.ciutatForm = this.formBuilder.group({
      nomPais: ['', Validators.required],
      nomCiutat: ['', Validators.required]
    });
  }

  createCiutat(): void {
    if (this.ciutatForm.valid) {
      const nomPais = this.ciutatForm.get('nomPais')?.value;
      const nomCiutat = this.ciutatForm.get('nomCiutat')?.value;

      //tanca la finestra i envia les dades
      this.dialogRef.close({ nomPais, nomCiutat });
    }
  }



  cancel(): void {
    // tanca la finestra sense enviar dades, obviament
    this.dialogRef.close();
  }
}
