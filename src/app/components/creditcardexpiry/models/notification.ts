export class Notification{
    cardName!:string;
    creditCard4digit!:string
    expiryMonth!:string;
    expiryYear!:string;
    notifyType!:string; //sms, email
    phoneNumber?:string;
    emailAddress?:string;
    remainderDays?:number[]; //array of 1, 10 days
    notes?:string;
}