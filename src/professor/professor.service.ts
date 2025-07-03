import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProfessorDto) {
    return this.prisma.professor.create({ data });
  }

  findAll() {
    return this.prisma.professor.findMany({
      include: {
        disciplina: true,
        avaliacao: true,
      },
    });
  }

  async findOne(id: number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id },
      include: {
        disciplina: true,
        avaliacao: true,
      },
    });
    if (!professor) throw new NotFoundException('Professor não encontrado');
    return professor;
  }

  update(id: number, data: UpdateProfessorDto) {
    return this.prisma.professor.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.professor.delete({ where: { id } });
  }
}
