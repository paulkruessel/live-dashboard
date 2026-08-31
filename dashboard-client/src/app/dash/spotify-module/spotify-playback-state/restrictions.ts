import { RestrictionReason } from "../spotify-types";

export class Restrictions {
    
    private reason: RestrictionReason;

    public constructor(reason: RestrictionReason) {
        this.reason = reason;
    }

    public getReason(): RestrictionReason {
        return this.reason;
    }

    public setReason(reason: RestrictionReason): void {
        this.reason = reason;
    }
}