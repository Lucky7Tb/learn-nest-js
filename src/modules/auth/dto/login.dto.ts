import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}
