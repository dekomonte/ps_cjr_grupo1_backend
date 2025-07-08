import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private prisma: PrismaService) {}

  async create(createAvaliacaoDto: CreateAvaliacaoDto, usuarioID: number) {
    const { professorID, disciplinaID, conteudo } = createAvaliacaoDto;

    return this.prisma.avaliacao.create({
      data: {
        professorID,
        disciplinaID,
        conteudo,
        usuarioID, // pegar do token
      },
    });
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

  async findByUsuario(usuarioID: number) {
    const avaliacoes = await this.prisma.avaliacao.findMany({
      where: { usuarioID },
      include: {
        usuario: true,
        professor: true,
        disciplina: true,
        comentarios: true,
      },
    });

    if (!avaliacoes || avaliacoes.length === 0) {
      throw new NotFoundException('Nenhuma avaliação encontrada para este usuário');
    }
    return avaliacoes;
  }
}