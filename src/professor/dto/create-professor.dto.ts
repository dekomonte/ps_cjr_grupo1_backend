import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsInt()
  disciplinaID: number;
}