export class SearchParams {
  constructor(public category: string = '',
    public fromDate?: Date,
    public toDate?: Date) { }
}
