import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}


@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, DatePickerModule, ToolbarModule, ToastModule, ConfirmDialogModule, DialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent {

  users: User[] = [];
  cols!: Column[];
  isDialogVisible: boolean = false;


  userForm = new FormGroup({
    username: new FormControl<string|null>('', [Validators.required]),
    firstName: new FormControl<string|null>('', [Validators.required]),
    lastName: new FormControl<string|null>('', [Validators.required]),
    dateOfBirth: new FormControl<Date|null>(null, [Validators.required]),
  });



  constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.initCols();
    this.loadData();
  }

  initCols() {
    // make it dynamic
    // get from the interface the field
    this.cols = [
      { field: "id", header: "ID"},
      { field: "username", header: "Username"},
      { field: "firstName", header: "First Name"},
      { field: "lastName", header: "Last Name"},
      { field: "dateOfBirth", header: "Date of Birth"},
      { field: "createdDate", header: "Created Date"},
      { field: "modifiedDate", header: "Modified Date"}
    ];
  }

  showDialog() {
    this.isDialogVisible = true; 
  }


  loadData() {
    this.userService.findAll().subscribe({
      next: (data) => {
        console.log("users", data);
        this.users = data;      
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  handleSubmit() {
    
    let {username, firstName, lastName, dateOfBirth} = this.userForm.value;
    console.log("handle submit");
    console.log(this.userForm.value);


    // verify that fields are filld
    if(username && firstName && lastName && dateOfBirth) {
      console.log("is valid");

      let newUser = {username, firstName, lastName, dateOfBirth};
      this.userService.create(newUser).subscribe({
        next: (data) => {
          console.log(data);
          this.loadData();
          this.isDialogVisible = false;

        },
        error: (err) => {
          console.log("error", err);
        }
      })
    }

  }


  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Danger Zone' + ", The is id: "+ id,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
          // this.handleDelete(id);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          this.userService.delete(id).subscribe({
            next: (data) => {
              console.log("DELETED");
              console.log(data);
              this.loadData();
            },
            error: (err) => {
              console.log("ERROR");
              console.log(err);
            }
          })

        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });

  }

  handleCancel() {
    this.isDialogVisible = false;
    this.userForm.reset();
  }
}
