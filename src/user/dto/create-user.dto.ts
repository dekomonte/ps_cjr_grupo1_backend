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
  foto_perfil?: Uint8Array;
}