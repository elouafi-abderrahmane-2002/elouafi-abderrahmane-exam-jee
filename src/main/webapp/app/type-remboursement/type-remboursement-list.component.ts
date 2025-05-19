import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { TypeRemboursementService } from 'app/type-remboursement/type-remboursement.service';
import { TypeRemboursementDTO } from 'app/type-remboursement/type-remboursement.model';


@Component({
  selector: 'app-type-remboursement-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './type-remboursement-list.component.html'})
export class TypeRemboursementListComponent implements OnInit, OnDestroy {

  typeRemboursementService = inject(TypeRemboursementService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  typeRemboursements?: TypeRemboursementDTO[];
  navigationSubscription?: Subscription;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      confirm: $localize`:@@delete.confirm:Do you really want to delete this element? This cannot be undone.`,
      deleted: $localize`:@@typeRemboursement.delete.success:Type Remboursement was removed successfully.`    };
    return messages[key];
  }

  ngOnInit() {
    this.loadData();
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription!.unsubscribe();
  }
  
  loadData() {
    this.typeRemboursementService.getAllTypeRemboursements()
        .subscribe({
          next: (data) => this.typeRemboursements = data,
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  confirmDelete(id: number) {
    if (!confirm(this.getMessage('confirm'))) {
      return;
    }
    this.typeRemboursementService.deleteTypeRemboursement(id)
        .subscribe({
          next: () => this.router.navigate(['/typeRemboursements'], {
            state: {
              msgInfo: this.getMessage('deleted')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

}
