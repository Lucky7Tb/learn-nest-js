import { IsNotEmpty, IsNumber } from "class-validator";

export class AddFriendDTO{
	@IsNotEmpty()
	@IsNumber()
	friend_id: number
}