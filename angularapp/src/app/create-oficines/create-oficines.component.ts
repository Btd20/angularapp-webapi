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
      nomOficina: ['', Validators.required]
    });
  }

  createOficina(): void {
    if (this.oficinaForm.valid) {
      const newOficina = {
        nomOficina: this.oficinaForm.value.nomOficina.trim()
      };
      this.dialogRef.close(newOficina);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
