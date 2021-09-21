import { Controller, Get, Post, Body, Put, Param, Delete, Query, Headers, UseGuards, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { AuthenticatedGuard } from 'src/guard/auth/authenticated.guard';

import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
	ApiBody
} from '@nestjs/swagger';

@ApiTags('Song')
@UseGuards(AuthenticatedGuard)
@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  async create(
    @Body() songData: CreateSongDto,
    @Headers('x-auth-token') authToken: string
  ) {
    const newSongData = await this.songService.create(songData, authToken);

    return {
      data: newSongData,
      message: 'Berhasil menambah lagu'
    };
  }

  @Get()
  async findAll(
    @Headers('x-auth-token') authToken: string,
    @Query('search') search: string
  ) {    
    const songData = await this.songService.findAll(search, authToken);

    return {
      data: songData,
      message: 'Berhasil mengambil lagu'
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {    
    const songData = await this.songService.findOne(id);

    if(songData) {
      return {
        data: songData,
        message: 'Berhasil mengambil data'
      }
    }

    throw new NotFoundException('Error! data tidak ada');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto
  ) {
    const songUpdatedData = await this.songService.update(id, updateSongDto)
    return {
      data: songUpdatedData,
      message: 'Berhasil mengubah lagu'
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedSong = await this.songService.remove(id);
    return {
      data: deletedSong,
      message: 'Berhasil menghapus lagu'
    };
  }
}
