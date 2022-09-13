import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements OnInit {
  mbShowMessage:boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string},public dialogRef: MatDialogRef<RefillComponent>) { }

  ngOnInit(): void {
    this.mbShowMessage = false;
  }

  showMessage()
  {
    this.mbShowMessage= true;
    setTimeout(()=>
    {
      this.dialogRef.close();
    },800);
  }

}
