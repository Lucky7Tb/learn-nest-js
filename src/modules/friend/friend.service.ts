import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddFriendDTO } from './dto/add-friend.dto';

@Injectable()
export class FriendService {
	constructor(
		private readonly prismaService: PrismaService
	) {}

	async getAllFriend(authToken: string) {
		const [ user ] = await this.prismaService.users.findMany({
			select: {
				id: true,
			},
			where: {
				token: authToken
			}
		});

		const friendData = await this.prismaService.friends.findMany({
			where: {
				user_id: user.id
			},
			include: {
				user_friend: {
					select: {
						username: true,
						photo_profile: true,
						unique_id: true,
					}
				},
			},
		});

		return friendData;
	}

	async searchFriend(unique_id: string) {
		const friendData = await this.prismaService.users.findUnique({
			select: {
				id: true,
				username: true,
				photo_profile: true,
				unique_id: true,
			},
			where: {
				unique_id: unique_id
			}
		});

		return friendData;
	}

	async getFriendRecommendedSong(id: number) {
		return await this.prismaService.songs.findMany({
			select: {
				song_name: true,
				song_url: true,
			},
			where: {
				user_id: id,
				song_is_recommended: true	
			}
		});
	}

	async addFriend(authToken: string, data: AddFriendDTO) {
		const [user] = await this.prismaService.users.findMany({
			select: {
				id: true,
			},
			where: {
				token: authToken
			}
		});

		const friendData = await this.prismaService.friends.createMany({
			data: [
				{
					user_id: user.id,
					user_friend_id: data.friend_id
				},
				{
					user_id: data.friend_id,
					user_friend_id: user.id
				}
			]
		});

		return friendData;
	}
}
