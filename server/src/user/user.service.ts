import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: string, fullName: string, avatarUrl: string) {
    if (avatarUrl) {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: { fullName, avatarUrl },
      });
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { fullName },
    });
  }
}
