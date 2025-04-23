import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Column } from '../../types/column';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { Message } from 'primeng/message';


import { ConfirmationService, MessageService } from 'primeng/api';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { userFormValidator } from '../../validations/user-form-validator.directive';


@Component({
  selector: 'app-users',
  imports: [CommonModule, JsonPipe, ReactiveFormsModule, Message, NavbarComponent, TableModule, ButtonModule, InputTextModule, DatePickerModule, ToolbarModule, ToastModule, ConfirmDialogModule, DialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent {

  // Services
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  cols!: Column[];

  // API states
  users = signal<User[]>([]);

  // UI states
  isDataLoaded = signal<boolean>(false);
  // form is invalid
  isFormInvalid = signal<boolean | null>(null);
  isFormSubmitted = signal<boolean>(false);
  isDialogVisible = signal<boolean>(false);

  // form action
  isUpdateForm = signal<boolean>(false);
  formTitle = computed<string>(() => this.isUpdateForm() ? "Update" : "Create")


  // Can add cross field validation
  userForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: [new Date(), Validators.required],
  }, { validators: userFormValidator });

  // Form Accessors
  get username() {
    return this.userForm.get("username");
  }

  get firstName() {
    return this.userForm.get("firstName");
  }

  get lastName() {
    return this.userForm.get("lastName");
  }

  get dateOfBirth() {
    return this.userForm.get("dateOfBirth");
  }



  constructor() {
    this.initCols();
    this.loadData();
  }


  // UI LOGIC
  showDialog(isUpdate: 'create' | 'update'): void {

    if(isUpdate === 'create') {
      this.isUpdateForm.set(false);
    }
    
    if(isUpdate === 'update'){
      this.isUpdateForm.set(true);
    }
    
    this.isDialogVisible.set(true);
  }

  hideDialog(): void {
    this.isDialogVisible.set(false);
  }

  handleCancel(): void {
    this.userForm.reset();
    this.hideDialog();
  }



  /**
   * Loading data from API
   */
  loadData(): void {

    this.isDataLoaded.set(false);

    this.userService.findAll().subscribe({
      next: (data) => {
        console.log("isDataLoaded: ", this.isDataLoaded());
        console.log("users", data);
        this.users.set(data);
        this.isDataLoaded.set(true);
        console.log("isDataLoaded: ", this.isDataLoaded());
      },
      error: (err) => {
        console.log(err);
        this.isDataLoaded.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while loading the data' });
      }
    });

  }




  handleSubmit() {
    console.log("handle submit");

    this.isFormSubmitted.set(false);

    // validation of form
    let { username, firstName, lastName, dateOfBirth } = this.userForm.value;


    console.log("form: ", this.userForm);

    // Null fields
    if (!username || !firstName || !lastName || !dateOfBirth) {
      this.isFormInvalid.set(true);
      return;
    }

    // Error in form level
    if (this.userForm.errors) {
      this.isFormInvalid.set(true);
      return;
    }


    // verify that fields are filled
    let newUser = { username, firstName, lastName, dateOfBirth };

    this.userService.create(newUser).subscribe({
      next: (data) => {

        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: "User created " + JSON.stringify(data),
          life: 3000
        });

        this.userForm.reset();
        this.hideDialog();
        this.loadData();
        this.isFormSubmitted.set(true);
      },
      error: (err) => {
        console.log("error", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message + " " + err.error.timestamp,
          life: 3000
        });
        this.isFormSubmitted.set(false);
      }
    })


  }

  toggleCreate(): void {
    this.isUpdateForm.set(false);
  }

  toggleEdit(): void {
    this.isUpdateForm.set(true);
  }


  handleEdit(): void {
    this.isFormSubmitted.set(false);
    this.isUpdateForm.set(true);

    // validation of form
    let { username, firstName, lastName, dateOfBirth } = this.userForm.value;


    console.log("form: ", this.userForm);

    // Null fields
    if (!username || !firstName || !lastName || !dateOfBirth) {
      this.isFormInvalid.set(true);
      return;
    }

    // Error in form level
    if (this.userForm.errors) {
      this.isFormInvalid.set(true);
      return;
    }


    // verify that fields are filled
    let newUser = { username, firstName, lastName, dateOfBirth };

    this.userService.create(newUser).subscribe({
      next: (data) => {

        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: "User created " + JSON.stringify(data),
          life: 3000
        });

        this.userForm.reset();
        this.hideDialog();
        this.loadData();
        this.isFormSubmitted.set(true);
      },
      error: (err) => {
        console.log("error", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message + " " + err.error.timestamp,
          life: 3000
        });
        this.isFormSubmitted.set(false);
      }
    })

  }


  confirmDelete(event: Event, user: User) {

    if (!user || !user.id) return;

    const id = user.id;

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Delete User',
      message: `Are you sure you want to delete "${user.username}"?`,
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



  initCols() {
    // make it dynamic
    // get from the interface the field
    this.cols = [
      { field: "id", header: "ID", type: "number" },
      { field: "username", header: "Username", type: "string" },
      { field: "firstName", header: "First Name", type: "string" },
      { field: "lastName", header: "Last Name", type: "string" },
      { field: "dateOfBirth", header: "Date of Birth", type: "date" },
      { field: "createdDate", header: "Created Date", type: "date" },
      { field: "modifiedDate", header: "Modified Date", type: "date" }
    ];
  }
}
