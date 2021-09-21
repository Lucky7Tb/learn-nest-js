import { Controller, Get, UseGuards, Headers, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { AuthenticatedGuard } from "src/guard/auth/authenticated.guard";
import { AddFriendDTO } from './dto/add-friend.dto';
import { FriendService } from './friend.service';

import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiBody
} from '@nestjs/swagger';

@ApiTags('Friend')
@Controller('friend')
export class FriendController {
	
	constructor(
		private readonly friendService: FriendService
	) {}
	
	@UseGuards(AuthenticatedGuard)
	@Get()
	async getAllFriend(
		@Headers('x-auth-token') authToken: string
	) {
		const friendData = await this.friendService.getAllFriend(authToken);

		return {
			data: friendData,
			message: 'Berhasil mengambil data teman'
		};
	}
	
	@UseGuards(AuthenticatedGuard)
	@Get('search')
	async searchFriend(
		@Query('unique_id') unique_id: string
	) {
		if (!unique_id) {
			return {
				statusCode: 400,
				data: [],
				message: 'unique_id harus diisi'
			}
		}

		const friendData = await this.friendService.searchFriend(unique_id);

		return {
			statusCode: 200,
			data: friendData,
			message: 'Berhasil mengambil data teman'
		};
	}

	@UseGuards(AuthenticatedGuard)
	@Post()
	async addFriend(
		@Headers('x-auth-token') authToken: string,
		@Body() data: AddFriendDTO
	) {
		await this.friendService.addFriend(authToken, data);

		return {
			statusCode: 200,
			data: [],
			message: 'Berhasil menambah teman'
		};
	}

	@UseGuards(AuthenticatedGuard)
	@Get(':id/song')
	async getFriendRecommendedSong(
		@Param('id', ParseIntPipe) id: number
	) {
		const songFriendRecommendedSong = await this.friendService.getFriendRecommendedSong(id);

		return {
			statusCode: 200,
			data: songFriendRecommendedSong,
			message: 'Berhasil mengambil lagu'
		};
	}
}
