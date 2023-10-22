import { HotelModel } from "./hotel.model";
import { RoomModel } from "./room.model";
import { TravelAgentModel } from "./travel-agent.model";

export interface ContractModel{
    contractId: number,
    contractValidityEndDate: Date,
    contractValidityStartDate: Date,
    description: string,
    markupValue: number,

    createdOn:Date;

    hotel:HotelModel;
    rooms: RoomModel[];
    travelAgent: TravelAgentModel;
    
}