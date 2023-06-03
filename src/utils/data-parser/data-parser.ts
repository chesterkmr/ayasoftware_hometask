export abstract class IDataParser {
  abstract parse<TResult extends object>(payload: string): TResult;
}
