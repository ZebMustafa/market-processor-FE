import { BehaviorSubject, Subject } from "rxjs";

export class SharedDataService {
    public editDataDetails: any = [];
    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.editDataDetails);
    currentMessage = this.messageSource.asObservable();
    
    shareReceivedMessage(message: any) {
        console.log("Message Received:");
        console.log(message);
        this.messageSource.next(message)
    }
}