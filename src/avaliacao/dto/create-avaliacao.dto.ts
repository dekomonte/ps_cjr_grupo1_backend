import { IsInt, IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsInt()
  professorID: number;

  @IsInt()
  disciplinaID: number;

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}