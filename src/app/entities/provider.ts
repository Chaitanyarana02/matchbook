export interface Provider{
    Id:string;
    DUNS:string,
    companyName:string,
    streetNo?:number,
    streetName?:string,
    City?:string,
    State?:string,
    Postal?:string;
    Role?:string;
    Status?:string;
    MatchType?:string
}