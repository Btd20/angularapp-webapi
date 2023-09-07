import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-reserva',
  templateUrl: './create-reserva.component.html',
  styleUrls: ['./create-reserva.component.css']
})
export class CreateReservaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateReservaComponent>) { }
    ngOnInit(): void {
       
    }


}
