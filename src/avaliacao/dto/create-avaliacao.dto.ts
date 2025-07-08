import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsInt()
  professorID: number;

  @IsInt()
  disciplinaID: number;

  @IsString()
  @IsNotEmpty()
  conteudo: string;
}