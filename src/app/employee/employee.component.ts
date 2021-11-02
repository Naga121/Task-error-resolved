import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  form: FormGroup;
  public employee: Employee[] = [];

  search: any;
  p: number = 1;

  constructor(private es: EmployeeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      eName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      skill: ['', Validators.required],
      yearExp: ['', Validators.required],
    });
    this.getData();
  }
  onPostData() {
    this.employee = this.form.value;
    this.es.postData(this.employee).subscribe(() => {
      this.form.reset();
      alert('Your data is posted');
      this.getData();
    });
  }
  getData() {
    this.es.getData().subscribe((data: Employee[]) => {
      console.log(data);
      this.employee = data;
    });
  }
  deleteData(obj) {
    if (confirm('Do you want delete') == true) {
      this.es.deletData(obj.id).subscribe(() => {
        alert('Your data is Deleted');
        this.getData();
      });
    }
  }
}
