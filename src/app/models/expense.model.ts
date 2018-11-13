export class Expense {
  constructor(public id: string,
    public category: string,
    public userId: number,
    public amount: number,
    public comment: string,
    public spentAt: string) { }
}
