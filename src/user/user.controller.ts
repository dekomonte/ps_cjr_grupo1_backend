import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto_perfil'))
  async create(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const createUserDto: CreateUserDto = {
      nome: body.nome?.toString(),
      email: body.email?.toString(),
      senha: body.senha?.toString(),
      curso: body.curso?.toString(),
      departamento: body.departamento?.toString(),
      foto_perfil: file ? new Uint8Array(file.buffer) : undefined,
    };

    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const { email, senha } = body;
    const user = await this.userService.login(email, senha);
    
    if (!user) {
      return { message: 'Credenciais inválidas' };
    }
    
    const token = this.userService.generateSimpleToken(user);
    
    return {
      message: 'Login realizado com sucesso',
      token,
      id: user.id,
      nome: user.nome,
      email: user.email,
      curso: user.curso,
      departamento: user.departamento,
      foto_perfil: user.foto_perfil,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto_perfil'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const updateUserDto: UpdateUserDto = {
      nome: body.nome?.toString(),
      email: body.email?.toString(),
      senha: body.senha?.toString(),
      senhaAtual: body.senhaAtual?.toString(),
      curso: body.curso?.toString(),
      departamento: body.departamento?.toString(),
      foto_perfil: file ? new Uint8Array(file.buffer) : undefined,
    };
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}