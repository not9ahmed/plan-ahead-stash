import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio } from '../../models/portfolio';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToolbarModule } from 'primeng/toolbar';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';




interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-portifolio',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, InputNumberModule, ToolbarModule, DatePickerModule, DialogModule, ConfirmDialogModule, ToastModule, SelectModule],
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.css',
  providers: [ConfirmationService, MessageService]
})
export class PortifolioComponent {

  portfolios: Portfolio[] = [];
  users: User[] = [];
  portfolio?: Portfolio;
  cols: Column[] = [];
  isDialogVisible: boolean = false;


  portfolioForm = new FormGroup({
    name: new FormControl<string|null>('', [Validators.required]),
    userId: new FormControl<number|null>(null, [Validators.required])
  })

  constructor(private portifolioService: PortfolioService, private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.initCols();
    this.loadData();

    // update portfolio
    // const updateId: number = 9;
    // const portfolioUpdated: Portfolio = {
    //   name: "example of me updating",
    //   userId: 1
    // };

    // portifolioService.update(updateId, portfolioUpdated).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log("complete");
    //   }
    // });


  }

  initCols() {
    this.cols = [
      { field: "id", header: "ID"},
      { field: "name", header: "Name"},
      { field: "user", header: "User"},
      { field: "createdDate", header: "Created Date"},
      { field: "modifiedDate", header: "Modified Date"},
    ];
  }

  loadData() {
    
    // find all portfolios
    this.portifolioService.findAll().subscribe({
      next: (data) => {
        console.log(data);
        this.portfolios = data;
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
        this.users = data;
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
        this.portifolioService.delete(id).subscribe({
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
    let { name, userId } = this.portfolioForm.value;

    // create  portfolio
    // const portfolio: Portfolio = {
    //   name: "example of me creating",
    //   userId: 1
    // };

    // verfiy fields are valid
    if(name && userId) {

      const newPortfolio = { name, userId };

      this.portifolioService.create(newPortfolio).subscribe({
        
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

  handleCancel() {
    this.isDialogVisible = false;
    this.portfolioForm.reset();
  }
}
