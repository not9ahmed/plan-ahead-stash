import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PortfolioService } from '../../services/portfolio.service';
import { UserService } from '../../services/user.service';

import { Portfolio } from '../../models/portfolio';
import { User } from '../../models/user';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import { ConfirmationService, MessageService } from 'primeng/api';




interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, InputNumberModule, ToolbarModule, DatePickerModule, DialogModule, ConfirmDialogModule, ToastModule, SelectModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  providers: [ConfirmationService, MessageService]
})
export class PortfolioComponent {

  private formBuilder = inject(FormBuilder);

  cols: Column[] = [];

  portfolios = signal<Portfolio[]>([]);
  users = signal<User[]>([]);
  portfolio = signal<Portfolio | null>(null);
  isDialogVisible = signal<boolean>(false);
  isEditDialogVisible = signal<boolean>(false);
  editPortfolioId = signal<number>(999);

  // Form
  // portfolioForm = new FormGroup({
  //   name: new FormControl<string|null>('', [Validators.required]),
  //   description: new FormControl<string|null>('', [Validators.required]),
  //   userId: new FormControl<number|null>(null, [Validators.required])
  // })


  portfolioForm = this.formBuilder.group({
    name: ['', { validators: Validators.required }],
    description: ['', { validators: Validators.required }],
    userId: [-999, { validators: Validators.required }]
  },)





  constructor(private portfolioService: PortfolioService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.initCols();
    this.loadData();

  }


  loadData() {

    // find all portfolios
    this.portfolioService.findAll().subscribe({
      next: (data) => {
        console.log(data);
        this.portfolios.set(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observer completed');
      }
    });


    // find all users
    this.userService.findAll().subscribe({
      next: (data) => {
        console.log(data);
        this.users.set(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observer completed');
      }
    });

  }

  showDialog() {
    this.isDialogVisible.set(true);
  }

  // Reptitivie
  showEditDialog(id: number) {
    console.log("id:", id)


    // initalize the form
    // by first finding the portfolio from the list
    const portfolioCurrent = this.portfolios()
    .filter(el => el.id === id)[0];


    console.log("portfolioCurrent: ", portfolioCurrent)

    this.portfolioForm.setValue({
      name: portfolioCurrent.name,
      description: portfolioCurrent.description,
      userId: portfolioCurrent.user?.id!,
    })

    this.editPortfolioId.set(id);
    this.isEditDialogVisible.set(true);
  }


  showPortfolio(portfolio: Portfolio) {
    console.log("portfolio", portfolio);
  }

  confirmDelete(event: Event, id: number) {
    console.log("event", event);
    console.log("id", id);

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: `Deleting Portfolio ${id}`,
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

      // Callbacks to handle the accept & reject
      accept: () => {
        console.log("Accept called");

        // delete portfolio
        const deleteId: number = 9;
        this.portfolioService.delete(id).subscribe({
          next: (data) => {
            console.log("deleted");
            console.log(data);
            this.loadData();
          },
          error: (err) => {
            console.log("error");
            console.log(err);

          },
          complete: () => {
            console.log("complete");
          }
        })
      },
      reject: () => {
        console.log("Reject delete called");
      }
    });



  }

  handleSubmit() {

    console.log("portfolioForm", this.portfolioForm.value);
    let { name, description, userId } = this.portfolioForm.value;

    // create  portfolio
    // const portfolio: Portfolio = {
    //   name: "example of me creating",
    //   userId: 1
    // };

    // verfiy fields are valid
    if (name && description && userId) {

      const newPortfolio = { name, description, userId };

      this.portfolioService.create(newPortfolio).subscribe({

        // success delete
        next: (data) => {
          const portfolioCreated: Portfolio = data;
          console.log(portfolioCreated);

          // adding message to toaster
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: `Portfolio ${JSON.stringify(portfolioCreated)}`
          });

          this.portfolioForm.reset();
          this.loadData();
          this.isDialogVisible.set(false);

        },
        error: (err) => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: `Error Occurred ${JSON.stringify(err)}`
          });
        },
        complete: () => {
          console.log('complete called');
        }
      });
    }
  }


  handleEditSubmit() {

    console.log("id: ", this.editPortfolioId)
    console.log("portfolioForm", this.portfolioForm.value);
    let { name, description, userId } = this.portfolioForm.value;

    // create  portfolio
    // const portfolio: Portfolio = {
    //   name: "example of me creating",
    //   userId: 1
    // };

    // verfiy fields are valid
    if (name && description && userId && this.editPortfolioId()) {

      const newPortfolio = { name, description, userId };

      this.portfolioService.update(this.editPortfolioId(), newPortfolio).subscribe({

        // success delete
        next: (data) => {
          const portfolioCreated: Portfolio = data;
          console.log(portfolioCreated);

          // adding message to toaster
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: `Portfolio ${JSON.stringify(portfolioCreated)}`
          });

          this.portfolioForm.reset();
          this.loadData();
          this.isEditDialogVisible.set(false);

        },
        error: (err) => {
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: `Error Occurred ${JSON.stringify(err)}`
          });
        },
        complete: () => {
          console.log('complete called');
        }
      });
    }
  }


  handleCancel() {
    this.isDialogVisible.set(false);
    this.portfolioForm.reset();
  }



  initCols() {
    this.cols = [
      { field: "id", header: "ID" },
      { field: "name", header: "Name" },
      { field: "description", header: "Description" },
      { field: "user", header: "User" },
      { field: "createdDate", header: "Created Date" },
      { field: "modifiedDate", header: "Modified Date" },
    ];
  }
}
