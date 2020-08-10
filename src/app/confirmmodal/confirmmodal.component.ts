import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmmodal',
  templateUrl: './confirmmodal.component.html',
  styleUrls: ['./confirmmodal.component.css']
})
export class ConfirmmodalComponent implements OnInit {
permission_denied : boolean;
  constructor(
    public dialogRef: MatDialogRef<ConfirmmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private router: Router) { }

  ngOnInit(): void {
  	if (this.dialogRef.componentInstance.data.name === 'permission_denied') {
      this.permission_denied = true;
    }
  }

  onNoClick(): void {
  	this.router.navigate(['login']);
    this.dialogRef.close();
  }
  closePermission(){
  	    this.dialogRef.close();

//   	    navigator.geolocation.getCurrentPosition(function(position) {
//     alert('allow');
// }, function() {
//     alert('deny');
// });

  }

}
