import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface PersistentReturnBase {
  unsubscribe: () => void;
}

export interface PersistentReturnObservable<T> extends PersistentReturnBase {
  observable$: Observable<T>;
}

export interface PersistentReturnSubject<T> extends PersistentReturnBase {
  observable$: BehaviorSubject<T>;
}

export interface PersistentCommonReturn<T> extends PersistentReturnBase {
  observable$: PersistentParam<T>;
}

export type PersistentParam<T> = Observable<T> | Subject<T>;
