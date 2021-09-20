import {
	Controller,
	Body,
	Post,
	Res,
	UnauthorizedException,
	UseInterceptors,
	UploadedFile,
	UseGuards,
	Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ignoreElements } from 'rxjs';
import { AuthenticatedGuard } from 'src/guard/auth/authenticated.guard';
import { GuestGuard } from 'src/guard/guest/guest.guard';
import { UploadFileHelper } from 'src/helpers/upload-file.helper';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) {}

	@UseGuards(GuestGuard)
	@Post('login')
	async login(
		@Body() credentials: LoginDTO,
	) {
		const userLoginData = await this.authService.doLogin(credentials);
		
		if (!userLoginData) {				
			throw new UnauthorizedException('Akun tidak ditemukan');
		}

		return {
			statusCode: 200,
			data: userLoginData,
			message: 'Berhasil login'
		};
	}

	@UseGuards(GuestGuard)
	@Post('register')
	@UseInterceptors(FileInterceptor('photo_profile', {
		limits: {
			fileSize: 1e6,
		},
		storage: diskStorage({
			destination: UploadFileHelper.fileSavePath,
			filename: UploadFileHelper.fileName
		})
	}))
	async register(
		@Body() registerData: RegisterDTO,
		@UploadedFile() photo_profile: Express.Multer.File
	) {

		const photoProfile: string = photo_profile !== undefined ? photo_profile.filename : 'avatar.png';

		registerData = {
			...registerData,
			photo_profile: photoProfile
		};

		const registerUserData = await this.authService.register(registerData);

		return {
			data: registerUserData,
			message: 'Berhasil registrasi'
		};
	}

	@UseGuards(AuthenticatedGuard)
	@Post('logout')
	async logout(
		@Headers('x-auth-token') tokenAuth,
	) {
		await this.authService.logout(tokenAuth);

		return {
			statusCode: 200,
			data: [],
			message: 'Berhasil logout'
		} 
	}
}
