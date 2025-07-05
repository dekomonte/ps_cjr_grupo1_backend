import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value))
  nome: string;

  @IsEmail()
  @Transform(({ value }) => String(value))
  email: string;

  @IsString()
  @Transform(({ value }) => String(value))
  senha: string;

  @IsString()
  @Transform(({ value }) => String(value))
  departamento: string;

  @IsString()
  @Transform(({ value }) => String(value))
  curso: string;

  @IsOptional()
  foto_perfil?: Uint8Array;
}