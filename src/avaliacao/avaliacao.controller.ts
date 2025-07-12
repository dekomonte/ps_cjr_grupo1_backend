import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.findOne(id);
  }

  @Get('usuario/:usuarioID')
  async findByUsuarioID(@Param('usuarioID', ParseIntPipe) usuarioID: number) {
    return this.avaliacaoService.findByUsuarioID(usuarioID);
  }

  @Post()
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    const usuarioID = 1; // TESTE!
    return this.avaliacaoService.create(createAvaliacaoDto, usuarioID);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.remove(id);
  }
}