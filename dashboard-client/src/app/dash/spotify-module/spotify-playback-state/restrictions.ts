export class Restrictions {
    
    private reason: string;

    public constructor(reason: string) {
        this.reason = reason;
    }

    public getReason(): string {
        return this.reason;
    }

    public setReason(reason: string) {
        this.reason = reason;
    }
}