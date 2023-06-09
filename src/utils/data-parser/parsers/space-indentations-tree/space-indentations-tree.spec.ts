import { IDataParser } from 'src/utils/data-parser/data-parser';
import { SpaceIndentationsTreeParser } from './space-indentations-tree.parser';

describe('SpaceIndendionsTree parser', () => {
  let parser: IDataParser;

  beforeEach(async () => {
    parser = new SpaceIndentationsTreeParser();
  });

  describe('when provided empty value', () => {
    it('will return null', () => {
      expect(parser.parse('')).toBe(null);
    });
  });

  test('parse top level object', () => {
    const testPayload = `
    foo = bar
    bar = foo
    `;

    expect(parser.parse(testPayload)).toEqual({
      foo: 'bar',
      bar: 'foo',
    });
  });

  test('parse nested object', () => {
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

  test('parse data with empty array and provide result', () => {
    const testPayload = `items
      item`;

    expect(parser.parse(testPayload)).toEqual({
      items: [],
    });
  });

  it('parse array and object with data on same level', () => {
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
