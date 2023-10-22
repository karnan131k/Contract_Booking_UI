import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {


  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:8080/';
  private _refreshrequired = new Subject<void>();
  get Refreshrequired() {
    return this._refreshrequired;
  }
  getAllContracts() {
    //return this.http.get(this.apiurl + 'api/hotel-booking/contracts');
    return of([
      {
          "contractId": 0,
          "contractValidityStartDate": "2023-12-31",
          "contractValidityEndDate": "2024-12-31",
          "description": "This ia a sampple description",
          "markupValue": 15.0,
          "hotelName": "Code Gen",
          "travelAgentName": "admin",
      }
  ]) 
  }

  getContractById(contractId: number) {
    return this.http.get(this.apiurl + 'api/hotel-booking/contracts?contractId=' + contractId);
  }

  getAllTravelAgents(){
    return of([
      {
        "travelAgentId":1,
        "travelAgentName":"User 1"
      },
      {
        "travelAgentId":2,
        "travelAgentName":"User 2"
      },
      {
        "travelAgentId":3,
        "travelAgentName":"User 3"
      }
    ])
  }
  getAllRoomTypes(){
    return of([
      {
        "roomTypeId":1,
        "roomTypeName":"Sea View"
      },
      {
        "roomTypeId":2,
        "roomTypeName":"Standard"
      }
    ]);
  }
  saveContract(inputData:any){
    
    // return this.http.post(this.apiurl + 'api/hotel-booking/contracts', inputData).pipe(
    //   tap(() => {
    //     this._refreshrequired.next();
    //   })
    // );
    return of([
      {
        "result":"pass"
      }
    ]).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    //console.log(inputData)
  }
}

// {
//   "contractId": 0,
//   "contractValidityEndDate": "2024-12-31",
//   "contractValidityStartDate": "2023-12-31",
//   "description": "This ia a sampple description",
//   "markupValue": 15.0,
//   "hotels": {
//       "hotelId": 0,
//       "hotelOwner": null,
//       "hotelName": "Code Gen",
//       "description": "Hotel Code Gen",
//       "hotelAddress": "Colombo",
//       "hotelContactNo": "0767039639",
//       "hotelEmail": "codegen@gmail.com"
//   },
//   "rooms": [
//       {
//           "roomId": 0,
//           "pricePerPerson": 35.0,
//           "noOfRooms": 15,
//           "maxAdults": 4,
//           "roomCost": 5.0
//       },
//       {
//           "roomId": 1,
//           "pricePerPerson": 55.0,
//           "noOfRooms": 20,
//           "maxAdults": 3,
//           "roomCost": 8.0
//       }
//   ],
//   "travelAgents": {
//       "travelAgentId": 0,
//       "travelAgentName": "admin",
//       "travelAgentEmail": "admin@gmail.com",
//       "travelAgentContactNo": "0767039765"
//   }
// }