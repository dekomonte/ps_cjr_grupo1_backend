import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  usuarioID: number;

  @IsInt()
  avaliacaoID: number;

  @IsString()
  @IsNotEmpty()
  conteudo: string;
}