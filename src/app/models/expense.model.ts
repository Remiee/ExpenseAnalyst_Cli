export class Expense {
  public id: string;
  public category: string;
  public userId: number;
  public amount: number;
  public comment: string;
  public spentAt: string;

  constructor(id: string, category: string, userId: number, amount: number, comment: string, spentAt: string) {
    this.id = id;
    this.category = category;
    this.userId = userId;
    this.amount = amount;
    this.comment = comment;
    this.spentAt = spentAt;
  }
}
