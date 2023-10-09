import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-update-sala',
  templateUrl: './update-sala.component.html',
  styleUrls: ['./update-sala.component.css']
})
export class UpdateSalaComponent implements OnInit {
  salaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateSalaComponent>,
    private salesService: SalesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.salaForm = this.formBuilder.group({
      nomSala: [this.data.nomSala, Validators.required],
      capacitat: [this.data.capacitat, Validators.required]
    });
  }

  updateSala(): void {
    if (this.salaForm.valid) {
      const updatedData = {
        meetingRoomID: this.data.meetingRoomID,
        nomSala: this.salaForm.value.nomSala,
        capacitat: this.salaForm.value.capacitat,
        officeID: this.data.oficina.officeID,
        oficina: {
          officeID: this.data.oficina.officeID,
          nomOficina: this.data.oficina.nomOficina,
          ciutat: {
            cityID: this.data.oficina.ciutat.cityID,
            nomCiutat: this.data.oficina.ciutat.nomCiutat,
            pais: {
              countryID: this.data.oficina.ciutat.pais.countryID,
              nomPais: this.data.oficina.ciutat.pais.nomPais,
            },
          },
        },
      };
      this.dialogRef.close(updatedData);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
