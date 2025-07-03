import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentarioService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateComentarioDto) {
    return this.prisma.comentarios.create({ data });
  }

  findAll() {
    return this.prisma.comentarios.findMany({
      include: {
        usuario: true,
        avaliacao: true,
      },
    });
  }

  async findOne(id: number) {
    const comentario = await this.prisma.comentarios.findUnique({
      where: { id },
      include: {
        usuario: true,
        avaliacao: true,
      },
    });
    if (!comentario) throw new NotFoundException('Comentário não encontrado');
    return comentario;
  }

  update(id: number, data: UpdateComentarioDto) {
    return this.prisma.comentarios.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.comentarios.delete({ where: { id } });
  }
}
