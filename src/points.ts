export class Points {
    total: number = 0; 


    constructor(total: number) {
        this.total = 0;
    }


    addPoints(points: number) {
        this.total += points;
    }
}