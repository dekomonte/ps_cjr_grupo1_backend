/*import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // Prisma aceita Buffer direto em campos do tipo Bytes (bytea)
    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        curso: data.curso,
        departamento: data.departamento,
        foto_perfil: data.foto_perfil ? Buffer.from(data.foto_perfil) : null,
      },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      include: {
        avaliacao: true,
        comentarios: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        avaliacao: true,
        comentarios: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.usuario.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}*/

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        curso: data.curso,
        departamento: data.departamento,
        foto_perfil: data.foto_perfil ? Buffer.from(data.foto_perfil) : null,
      },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      include: {
        avaliacao: true,
        comentarios: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        avaliacao: true,
        comentarios: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.usuario.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }

  // LOGIN SIMPLES: busca pelo email e compara senha (sem criptografia ainda)
  async login(email: string, senha: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Usuário não encontrado');
    if (user.senha !== senha) throw new UnauthorizedException('Senha incorreta');

    return {
      mensagem: 'Login bem-sucedido!',
      id: user.id,
      nome: user.nome,
      email: user.email,
      curso: user.curso,
      departamento: user.departamento,
      foto_perfil: user.foto_perfil
      ? Buffer.from(user.foto_perfil).toString('base64')
      : null,
    };
  }
}

/*import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    let fotoBuffer: Buffer | null = null;

    if (data.foto_perfil) {
      // Remove o prefixo 'data:image/jpeg;base64,...' se existir
      const base64String = data.foto_perfil.replace(/^data:image\/\w+;base64,/, '');
      fotoBuffer = Buffer.from(base64String, 'base64');
    }

    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        curso: data.curso,
        departamento: data.departamento,
        foto_perfil: fotoBuffer,
      },
    });
  }

  async findAll() {
    const users = await this.prisma.usuario.findMany({
      include: {
        avaliacao: true,
        comentarios: true,
      },
    });

    return users.map(user => ({
      ...user,
      foto_perfil: user.foto_perfil
        ? `data:image/jpeg;base64,${user.foto_perfil.toString('base64')}`
        : null,
    }));
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        avaliacao: true,
        comentarios: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      curso: user.curso,
      departamento: user.departamento,
      foto_perfil: user.foto_perfil
        ? `data:image/jpeg;base64,${user.foto_perfil.toString('base64')}`
        : null,
      avaliacao: user.avaliacao,
      comentarios: user.comentarios,
    };
  }

  async update(id: number, data: UpdateUserDto) {
    let fotoBuffer: Buffer | undefined;

    if (data.foto_perfil) {
      const base64String = data.foto_perfil.replace(/^data:image\/\w+;base64,/, '');
      fotoBuffer = Buffer.from(base64String, 'base64');
    }

    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...data,
        foto_perfil: fotoBuffer ?? undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }

  async login(email: string, senha: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Usuário não encontrado');
    if (user.senha !== senha) throw new UnauthorizedException('Senha incorreta');

    return {
      mensagem: 'Login bem-sucedido!',
      id: user.id,
      nome: user.nome,
      email: user.email,
      curso: user.curso,
      departamento: user.departamento,
      foto_perfil: user.foto_perfil
        ? `data:image/jpeg;base64,${user.foto_perfil.toString('base64')}`
        : null,
    };
  }
}*/