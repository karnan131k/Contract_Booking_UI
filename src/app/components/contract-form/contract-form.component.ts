import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/service/contract.service';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
  travelAgents: any;
  roomTypes: any;
  formRoom!: FormArray;
  saveResponse:any;
  editContractData:any;
  editContractId!: any;
  constructor(
    private builder: FormBuilder,
    private contractService: ContractService,
    private router: Router,
    private route:ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {
    this.getAllTravelAgents();
    this.getAllRoomTypes();
    //update the contract
    let currentUrl = this.router.url;
    console.log("currentUrl: "+currentUrl);
    if(currentUrl == "/contracts/create"){
      this.addHotel()
    }
    this.editContractId = this.route.snapshot.paramMap.get('contractId');
    console.log("edit contract id"); console.log(this.editContractId);
    if (this.editContractId != null) {
      // add hotel form group
      this.addHotel()
      this.contractService.getContractById(this.editContractId).subscribe(item => {
        this.editContractData = item;
        
        // add rooms form group
        if (this.editContractData.rooms != null) {
          for (let i = 0; i < this.editContractData.rooms.length; i++) {
            this.addRooms();
          }
        }
        this.contractForm.setValue({
          contractValidityEndDate: this.editContractData.contractValidityEndDate,
          contractValidityStartDate: this.editContractData.contractValidityStartDate,
          description: this.editContractData.description,
          markupValue: this.editContractData.markupValue,
          hotel: this.editContractData.hotel,
          rooms: this.editContractData.rooms,
          travelAgent: this.editContractData.travelAgent
        })
      });
    }
  }
  contractForm = this.builder.group({
    contractValidityEndDate: this.builder.control('', Validators.required),
    contractValidityStartDate: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    markupValue: this.builder.control('', Validators.required),
    hotel: this.builder.array([
    ]),
    rooms: this.builder.array([]),
    travelAgent: this.builder.control('', Validators.required)
  });


  getAllTravelAgents() {
    this.contractService.getAllTravelAgents().subscribe((response) => {
      this.travelAgents = response
      console.log(this.travelAgents)
    })
  }

  getAllRoomTypes() {
    this.contractService.getAllRoomTypes().subscribe((response) => {
      this.roomTypes = response
      console.log(this.roomTypes)
    })
  }

  redirecttolist() {
    this.router.navigate(['contracts'])
  }
  // get hotel detail
  get hotel() {
    return this.contractForm.get("hotel") as FormArray;
  }
  addHotel(){
    this.hotel.push(
      this.builder.group({
        hotelOwner: this.builder.control(''),
        hotelName: this.builder.control(''),
        description: this.builder.control(''),
        hotelAddress: this.builder.control(''),
        hotelContactNo: this.builder.control(''),
        hotelEmail: this.builder.control('')
      })
    );
  }
  // add rom details
  addRooms() {
    this.formRoom = this.contractForm.get("rooms") as FormArray;
    this.formRoom.push(this.GenerateRoom());
  }
  GenerateRoom(): FormGroup {
    return this.builder.group({
      roomType: this.builder.control(''),
      pricePerPerson: this.builder.control(''),
      noOfRooms: this.builder.control(''),
      maxAdults: this.builder.control(''),
    });
  }
  get rooms() {
    return this.contractForm.get("rooms") as FormArray;
  }
  removeRoom(index: number) {
    if (confirm('do you want to remove this variant?')) {
      this.formRoom = this.contractForm.get("rooms") as FormArray;
      this.formRoom.removeAt(index);
    }
  }
  SaveProduct() {
    if (this.contractForm.valid) {
      this.contractService.saveContract(this.contractForm.getRawValue()).subscribe((response)=>{
        this.saveResponse = response;
        if(this.saveResponse.result=="pass"){
          this.contractForm.reset();
          this.redirecttolist();
          alertify.success("Saved Success");
        }
      })
    }else{
      alert("Please enter valid data");
    }
  }
}
