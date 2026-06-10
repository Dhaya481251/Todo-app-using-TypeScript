export abstract class Task {
  constructor(
    public title: string,
    public extraInfo:string,
    public deadline: Date,
    public completed: boolean = false
  ) {}

  toggle(): void {
    this.completed = !this.completed;
  }

  abstract getDetails(): string;
}