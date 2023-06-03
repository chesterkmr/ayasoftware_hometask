import { Injectable } from '@nestjs/common';
import { IDataParser } from 'src/utils/data-parser/data-parser';

@Injectable()
export class SpaceIndentationsTreeParser implements IDataParser {
  parse<TResult extends object>(payload: string): TResult | null {
    if (!payload.length) return null;

    const root = {} as TResult;
    const stack: any[] = [];
    const lines = payload.split('\n');

    let prevIndentations = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = lines[i + 1];
      const isNextLineKey = this.isLineKey(nextLine);
      const trimmedLine = line.trim();
      if (trimmedLine === '') continue;
      const [key, value] = trimmedLine.split('=').map((item) => item.trim());

      const indendation = line.length - trimmedLine.length;

      let stackItem = stack[stack.length - 1];

      if (indendation < prevIndentations) {
        const popLevel = Math.abs((indendation - prevIndentations) / 2);

        for (let k = 0; k < popLevel; k++) {
          stackItem = stack.pop();
        }

        stackItem = stack[stack.length - 1];
      }

      prevIndentations = indendation;

      if (indendation === 0) {
        root[key] = isNextLineKey ? [] : {};
        stack.push(root[key]);
        continue;
      }

      if (key && value) {
        if (!stackItem) {
          root[key] = value;
        } else {
          stackItem[key] = value;
        }
        continue;
      }

      if (key && !value) {
        if (Array.isArray(stackItem)) {
          const arrayItem = {};

          if (this.isValueLine(nextLine)) {
            stackItem.push(arrayItem);
          }

          stack.push(arrayItem);
        } else {
          if (this.isValueLine(nextLine)) {
            stackItem[key] = {};

            stack.push(stackItem[key]);
          } else {
            stackItem[key] = [];

            stack.push(stackItem[key]);
          }
        }
      }
    }

    return root;
  }

  private isValueLine = (line: string): boolean => {
    return line ? line.includes('=') : false;
  };

  private isLineKey = (line: string): boolean => {
    return line ? !line.includes('=') : false;
  };
}
