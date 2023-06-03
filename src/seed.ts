import { NestFactory } from '@nestjs/core';
import { SeederModule } from 'src/features/seeder/seeder.module';
import { SeederService } from 'src/features/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  const seeder = app.get(SeederService);

  try {
    await seeder.seed();
    console.info('Seeding successfull.');
  } catch (error) {
    console.error('Seeding failed.Error ', error);
  } finally {
    await app.close();
  }
}

bootstrap();
