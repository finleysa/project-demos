import { Bar } from './bar/bar.model';
import { Subject } from 'rxjs/internal/Subject';

export interface ISortComponent {
    bars: Bar[];
    speed: number;
    cancelSort: boolean;
    readonly onDestroy: Subject<void>;

    sortSubscriptions(): void;
    sort(arr?: Bar[], low?: number, high?: number): Promise<any>;
    reset(num: number): void;
    allSorted(bars: Bar[]): void;
    ngOnDestroy(): void;
}
