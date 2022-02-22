import { BehaviorSubject, Subject } from "rxjs";

export class SharedDataService {
    public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.editDataDetails);
    currentMessage = this.messageSource.asObservable();
    
    shareReceivedMessage(message: string) {
        console.log("Messgae has been recieved");
        this.messageSource.next(message)
    }
}