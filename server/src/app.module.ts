import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { TokenService } from './token/token.service';

const pubSub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    },
  },
});

@Module({
  imports: [
    LoggerModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (
        configService: ConfigService,
        tokenService: TokenService,
      ) => ({
        context: ({ req, res }) => ({
          req,
          res,
          pubSub, // inject pubSub into context
        }),
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        onConnect: (connectionParams) => {
          const token = tokenService.extractToken(connectionParams);
          if (!token) {
            throw new Error('Token not provided');
          }

          const user = tokenService.validateToken(token);
          if (!user) {
            throw new Error('Invalid token');
          }

          return { user };
        },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        APP_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [TokenService],
})
export class AppModule {}
