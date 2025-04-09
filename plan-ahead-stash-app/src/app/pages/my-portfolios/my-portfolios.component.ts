import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Portfolio } from '../../models/portfolio';
import { User } from '../../models/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PortfolioService } from '../../services/portfolio.service';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-my-portfolios',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, InputNumberModule, ToolbarModule, DatePickerModule, DialogModule, ConfirmDialogModule, ToastModule, SelectModule, NavbarComponent],
  templateUrl: './my-portfolios.component.html',
  styleUrl: './my-portfolios.component.css',
  providers: [ConfirmationService, MessageService]
})
export class MyPortfoliosComponent {

  userId = signal<number>(-1);

  portfolios = signal<Portfolio[]>([]);
  portfolio?: Portfolio;
  cols: Column[] = [];
  isDialogVisible: boolean = false;
  isEditDialogVisible: boolean = false;

  editPortfolioId: number|null = null;

  portfolioForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    userId: new FormControl<number>(-1, [Validators.required])
  })


  constructor(private portfolioService: PortfolioService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    
    this.userId.set(1);
    this.initCols();
    this.loadData();
  }

  initCols() {
    this.cols = [
      { field: "id", header: "ID"},
      { field: "name", header: "Name"},
      { field: "description", header: "Description"},
      { field: "user", header: "User"},
      { field: "createdDate", header: "Created Date"},
      { field: "modifiedDate", header: "Modified Date"},
    ];
  }

  loadData() {
    
    // find all portfolios by user
    this.portfolioService.findAllByUserId(this.userId()).subscribe({
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


  }

  showDialog() {
    this.isDialogVisible = true;
  }

  // Reptitivie
  showEditDialog(id: number) {
    console.log("id:", id)


    // initalize the form
    // by first finding the portfolio from the list
    const portfolioCurrent = this.portfolios().filter(el => el.id === id)[0];


    console.log("portfolioCurrent: ", portfolioCurrent)

    this.portfolioForm.setValue({
      name: portfolioCurrent.name,
      description: portfolioCurrent.description,
      userId: this.userId(),
    })

    this.editPortfolioId = id;
    this.isEditDialogVisible = true;
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
    const { name, description } = this.portfolioForm.value;
    const formUserId = this.userId();

    // create  portfolio
    // const portfolio: Portfolio = {
    //   name: "example of me creating",
    //   userId: 1
    // };


    this.portfolioForm.setValue({
      name: name!,
      description: description!,
      userId: this.userId(),
    })

    console.log("portfolioForm after", this.portfolioForm.value);


    // verfiy fields are valid
    if(name && description) {

      const newPortfolio = { name, description, userId: this.userId() };

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
          this.isDialogVisible = false;

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
    if(name && description && userId && this.editPortfolioId) {

      const newPortfolio = { name, description, userId };

      this.portfolioService.update(this.editPortfolioId, newPortfolio).subscribe({
        
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
          this.isEditDialogVisible = false;

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
    this.isDialogVisible = false;
    this.portfolioForm.reset();
  }
}
