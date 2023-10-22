import { Component, OnInit, DoCheck } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractModel } from 'src/app/model/contrcat.model';
import { ContractService } from 'src/app/service/contract.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit,DoCheck{

  contractsDataList: any;
  displayedColumns: string[] = [
    'contractId', 
    'contractValidityStartDate', 
    'contractValidityEndDate', 
    'markupValue',
    'description',
    'hotelName',
    'travelAgentName',
    'action'
  ];
  isListing:boolean=false;
  
  constructor(
    private contrcatService:ContractService,
    private router:Router,
    
    )
  {}

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == "/contracts"){
      this.isListing=true;
    }else{
      this.isListing=false;
    }
  }

  ngOnInit(): void {
    this.LoadAllContracts();
    console.log(this.LoadAllContracts());

    this.contrcatService.Refreshrequired.subscribe(item=>{
      this.LoadAllContracts();
    });

  }
  LoadAllContracts(){
    this.contrcatService.getAllContracts().subscribe((respose=>{
      console.log("response");
      console.log(respose);
      this.contractsDataList= respose;
      console.log(this.contractsDataList[0]['contractValidityStartDate'])
      console.log(this.contractsDataList[0]['contractValidityEndDate'])
    }))
  }
  editContract(contractId:number){
    console.log(contractId);
    this.router.navigateByUrl("contracts/edit/" + contractId);
  }
  deleteContract(contractId:number){

  }

}
