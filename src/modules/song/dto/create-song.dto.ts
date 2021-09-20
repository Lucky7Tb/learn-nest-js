import { IsNotEmpty, IsUrl, IsBoolean, IsAscii } from "class-validator"

export class CreateSongDto {
	@IsNotEmpty()
	@IsAscii()
	song_name: string
	
	@IsNotEmpty()
	@IsUrl()
	song_url: string

	@IsNotEmpty()
	@IsBoolean()
	song_is_recommended: boolean
}
