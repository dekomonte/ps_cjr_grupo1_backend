import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  nome?: string;
  email?: string;
  curso?: string;
  senhaAtual?: string;
  novaSenha?: string;
  confirmarSenha?: string;
  foto?: Buffer;
  foto_perfil?: Uint8Array;
}