import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.input';
import { TokenPayload } from 'src/interface/token-payload.interface';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(AuthService.name);
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    let payload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!existingUser) {
      throw new BadRequestException('User no longer exists');
    }

    const expiresIn = 3600;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;

    const accessToken = this.jwtService.sign(
      {
        ...payload,
        exp: expiration,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      },
    );

    res.cookie('access_token', accessToken, { httpOnly: true });
    return { accessToken };
  }

  private async issueTokens(user: User, response: Response) {
    const payload: TokenPayload = {
      userName: user.fullName,
      sub: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '5m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true, expires });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });

    return { user, accessToken, refreshToken };
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async register(registerDto: RegisterDto, res: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException({ email: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullName: registerDto.fullName,
        password: hashedPassword,
        email: registerDto.email,
      },
    });

    return this.issueTokens(user, res);
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new BadRequestException({
        invalidCredentials: 'Invalid credentials',
      });
    }
    return this.issueTokens(user, response);
  }

  async logout(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return 'Successfully logged out';
  }
}
