import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  departamento: string;

  @IsString()
  curso: string;

  @IsOptional()
  // Esse campo vem do arquivo de upload e é setado no controller manualmente
  foto_perfil?: Uint8Array;
}