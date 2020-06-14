export class Bar {
    value: number;
    color: string;
    barStyle: { background: string; height: string; };

    constructor() {
        this.color = ('#' + Math.floor(Math.random() * 16777215).toString(16));
        this.value = Math.floor(Math.random() * 99) + 1;
        this.barStyle = { background: this.color, height: `${this.value}%` };
    }

    set sorted(val: boolean) {
        if (val) {
            this.barStyle = { background: 'red', height: `${this.value}%` };
        }
    }
}
