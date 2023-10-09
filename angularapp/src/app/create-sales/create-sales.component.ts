import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
  styleUrls: ['./create-sales.component.css']
})
export class CreateSalesComponent implements OnInit {

  salesForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateSalesComponent>,private salesService: SalesService) { }

  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      nomPais: ['',Validators.required],
      nomCiutat: ['', Validators.required],
      nomOficina: ['',Validators.required],
      nomSala: ['', Validators.required], 
      capacitat: ['', [Validators.required, Validators.min(1)]]
    });
  }

  createOficina(): void {
    if (this.salesForm.valid) {
      const nomPais = this.salesForm.get('nomPais')?.value;
      const nomCiutat = this.salesForm.get('nomCiutat')?.value;
      const nomOficina = this.salesForm.get('nomOficina')?.value;
      const nomSala = this.salesForm.get('nomSala')?.value;
      const capacitat = this.salesForm.get('capacitat')?.value;

      console.log('Dades de la sala abans de tancar:', { nomPais, nomCiutat, nomOficina, nomSala, capacitat });

      //tanca la finestra i envia les dades
      this.dialogRef.close({ nomPais, nomCiutat, nomOficina, nomSala, capacitat});
    }
  }



  cancel(): void {
    // tanca la finestra sense enviar dades, obviament
    this.dialogRef.close();
  }


}
