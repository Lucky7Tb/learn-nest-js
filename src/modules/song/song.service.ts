import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(
    createSongDto: CreateSongDto,
    authToken: string
  ) {
    const [ user ] = await this.prismaService.users.findMany({
      select: {
        id: true
      },
      where: {
        token: authToken
      }
    });

    return await this.prismaService.songs.create({
      data: {
        ...createSongDto,
        users: {
          connect: {
            id: user.id
          }
        }
      }
    })
  }

  findAll(
    search: string,
    authToken: string
  ) {
    return this.prismaService.songs.findMany({
      select: {
        id: true,
        song_name: true,
        song_url: true,
        song_is_recommended: true
      },
      where: {
        song_name: {
          contains: search
        },
        users: {
          token: authToken
        }
      },
      orderBy: {
        id: 'desc'
      }
    });
  }
  
  findOne(id: number) {
    return this.prismaService.songs.findUnique({
      select: {
        id: true,
        song_name: true,
        song_url: true,
        song_is_recommended: true
      },
      where: {
        id: id
      },
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    return await this.prismaService.songs.update({
      data: {
        ...updateSongDto,
        updated_at: new Date()
      },
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    return await this.prismaService.songs.delete({
      where: {
        id
      }
    })
  }
}
