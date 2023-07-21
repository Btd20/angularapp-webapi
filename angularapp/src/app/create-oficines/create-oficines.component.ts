import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-oficina',
  templateUrl: './create-oficines.component.html',
  styleUrls: ['./create-oficines.component.css']
})
export class CreateOficinesComponent implements OnInit {
  oficinaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateOficinesComponent>
  ) { }

  ngOnInit(): void {
    this.oficinaForm = this.formBuilder.group({
      nomPais: ['', Validators.required],
      nomCiutat: ['', Validators.required],
      nomOficina: ['', Validators.required]
    });
  }

  createOficina(): void {
    if (this.oficinaForm.valid) {
      const nomPais = this.oficinaForm.get('nomPais')?.value;
      const nomCiutat = this.oficinaForm.get('nomCiutat')?.value;
      const nomOficina = this.oficinaForm.get('nomOficina')?.value;

      //tanca la finestra i envia les dades
      this.dialogRef.close({ nomPais, nomCiutat, nomOficina });
    }
  }



  cancel(): void {
    // tanca la finestra sense enviar dades, obviament
    this.dialogRef.close();
  }
}
