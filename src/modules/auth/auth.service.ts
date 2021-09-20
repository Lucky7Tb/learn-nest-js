import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { users } from '@prisma/client';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { compare } from 'bcrypt';
import { nanoid } from 'nanoid';
import { randomString } from 'src/helpers/random.helper';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService
	){}

	async doLogin(credentials: LoginDTO) {
		const { username, password } = credentials;
		const user: users = await this.prisma.users.findUnique({
			where: {
				username
			}
		});

		if (user) {
			const isMatch: boolean = await compare(password, user.password);
			if (isMatch) {				
				const token: string = nanoid();
				const data = await this.prisma.users.update({
					select: {
						id: true,
						token: true,
						username: true,
						unique_id: true
					},
					data: {
						token,
						updated_at: new Date()
					},
					where: {
						id: user.id
					}
				});
				return data;
			}

			return null;
		}

		return null;
	}

	async register(registerData: RegisterDTO) {
		const uniqueId = randomString(8);
		registerData.password = await hash(registerData.password, 10);

		if (registerData.photo_profile === null) {
			registerData.photo_profile = "avatar.png";
		}

		const registerUserData = await this.prisma.users.create({
			data: {
				...registerData,
				unique_id: uniqueId
			}
		})

		return registerUserData;
	}

	async logout(tokenAuth: string) {
		const data = await this.prisma.users.update({
			data: {
				token: null,
				updated_at: new Date()
			},
			where: {
				token: tokenAuth
			}
		});

		return data;
	}
}
