import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsListComponent } from './components/contracts-list/contracts-list.component';
import { BookingSearchComponent } from './components/booking-search/booking-search.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';

const routes: Routes = [
  {path:"contracts", component:ContractsListComponent, children:[
    {path:"create", component:ContractFormComponent},
    {path:"edit/:contractId", component:ContractFormComponent}
  ]},
  {path:"booking-search",component:BookingSearchComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
