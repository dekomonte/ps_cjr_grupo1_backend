import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';

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

  async remove(id: number, senhaAtual: string) {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    
    if (user.senha !== senhaAtual) {
      throw new UnauthorizedException('Senha atual incorreta');
    }
    
    await this.prisma.usuario.delete({ where: { id } });
    return { message: 'Usuário excluído com sucesso' };
  }
  
  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { email, senha },
    });
      
    if (!usuario) throw new Error("Email ou senha inválidos");
    
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      'seuSegredoUltraSecreto',
      { expiresIn: '1h' }
    );

    console.log("TOKEN GERADO PARA O USUÁRIO:", token); //debuggg
    
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      curso: usuario.curso,
      departamento: usuario.departamento,
      foto_perfil: usuario.foto_perfil
      ? Buffer.from(usuario.foto_perfil).toString('base64')
      : null,
      token,
    };
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.usuario.findUnique({ where: { id } });
    
    if (!user) throw new NotFoundException('Usuário não encontrado');
    
    if (data.senha) {
      if (!data.senhaAtual) {
        throw new UnauthorizedException('Senha atual é obrigatória para alterar a senha');
      }
      if (user.senha !== data.senhaAtual) {
        throw new UnauthorizedException('Senha atual incorreta');
      }
    }
    
    const updatedData: any = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      curso: data.curso,
      departamento: data.departamento,
      ...(data.foto_perfil !== undefined && { foto_perfil: Buffer.from(data.foto_perfil) }),
    };

    return this.prisma.usuario.update({
      where: { id },
      data: updatedData,
    });
  }

  generateSimpleToken(user: any): string {
    const tokenPayload = {
      id: user.id,
      email: user.email,
      timestamp: Date.now(),
    };
    const json = JSON.stringify(tokenPayload);
    return Buffer.from(json).toString('base64');
  }
}