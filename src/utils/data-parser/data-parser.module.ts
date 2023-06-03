import { Module } from '@nestjs/common';
import { SpaceIndentationsTreeParser } from 'src/utils/data-parser/parsers/space-indentations-tree/space-indentations-tree.parser';

const dataParserFactory = {
  useClass: SpaceIndentationsTreeParser,
  provide: 'DATA_PARSER',
};

@Module({
  providers: [dataParserFactory],
  exports: [dataParserFactory],
})
export class DataParserModule {}
