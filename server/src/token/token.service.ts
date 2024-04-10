import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  extractToken(connectionParams: any): string | null {
    return connectionParams?.token || null;
  }

  validateToken(token: string): any {
    const refreshToken = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
    try {
      return verify(token, refreshToken);
    } catch (error) {
      return null;
    }
  }
}
