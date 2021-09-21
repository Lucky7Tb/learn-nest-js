import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class RegisterDTO {
  
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
  
  photo_profile: string;
}
