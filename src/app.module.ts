import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProfessorModule } from './professor/professor.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { ComentarioModule } from './comentario/comentario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    ProfessorModule,
    AvaliacaoModule,
    ComentarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}