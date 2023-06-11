export class Observer<ListenerType> {
  private listeners: Array<(params: ListenerType) => void>;

  constructor() {
    this.listeners = [];
  }

  public subscribe(listener: (params: ListenerType) => void): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: (params: ListenerType) => void): void {
    this.listeners = this.listeners.filter((elem) => elem !== listener);
  }

  public emit(params: ListenerType): void {
    this.listeners.forEach((listener) => listener(params));
  }
}
