export class Bar {
    value: number;
    color: string;

    constructor() {
        this.color = ('#' + Math.floor(Math.random() * 16777215).toString(16));
        this.value = Math.floor(Math.random() * 99) + 1;
    }
}
