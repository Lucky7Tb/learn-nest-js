
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response as Res } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

interface Response<T> {
	statusCode: number;
	data?: T;
	message?: string;
}

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
	catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Res>();

		let responseData: Response<Array<null>> = {
			statusCode: 500,
			data: [],
			message: 'Terjadi kesalahan pada server'
		};

		if (exception.code === 'P2025') {
			responseData = {
				...responseData,
				statusCode: 404,
				message: 'Error! Data tidak ada'
			}
		} 

		response
			.status(responseData.statusCode)
			.json(responseData);
	}
}
