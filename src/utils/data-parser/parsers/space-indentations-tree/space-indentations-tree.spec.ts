import { IDataParser } from 'src/features/data-parser/data-parser';
import { SpaceIndentationsTreeParser } from './space-indentations-tree.parser';

describe('SpaceIndendionsTree parser', () => {
  let parser: IDataParser;

  beforeEach(async () => {
    parser = new SpaceIndentationsTreeParser();
  });

  it('will not fail and give null output when input data is not provided', () => {
    expect(parser.parse('')).toBe(null);
  });

  it('will parse top level object', () => {
    const testPayload = `
    foo = bar
    bar = foo
    `;

    expect(parser.parse(testPayload)).toEqual({
      foo: 'bar',
      bar: 'foo',
    });
  });

  it('will parse nested object', () => {
    const testPayload = `data
        foo = bar
        bar = foo
        test
          nested = value
          more
            val = 123
    `;

    expect(parser.parse(testPayload)).toEqual({
      data: {
        foo: 'bar',
        bar: 'foo',
        test: {
          nested: 'value',
          more: {
            val: '123',
          },
        },
      },
    });
  });

  it('will parse data with empty array and provide result', () => {
    const testPayload = `items
      item`;

    expect(parser.parse(testPayload)).toEqual({
      items: [],
    });
  });

  it('will parse array and object with data on same level', () => {
    const testPayload = `array
      item
        array_item_1 = array_value_1
      item
        array_item_2 = array_value_2
object
  foo = bar
  fizz = bazz
    `;

    expect(parser.parse(testPayload)).toEqual({
      array: [
        { array_item_1: 'array_value_1' },
        { array_item_2: 'array_value_2' },
      ],
      object: {
        foo: 'bar',
        fizz: 'bazz',
      },
    });
  });
});
