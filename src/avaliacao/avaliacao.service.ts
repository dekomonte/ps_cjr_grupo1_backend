import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAvaliacaoDto) {
    return this.prisma.avaliacao.create({ data });
  }

  findAll() {
    return this.prisma.avaliacao.findMany({
      include: {
        usuario: true,
        professor: true,
        disciplina: true,
        comentarios: true,
      },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { id },
      include: {
        usuario: true,
        professor: true,
        disciplina: true,
        comentarios: true,
      },
    });
    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');
    return avaliacao;
  }

  update(id: number, data: UpdateAvaliacaoDto) {
    return this.prisma.avaliacao.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.avaliacao.delete({ where: { id } });
  }
}
