import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { createWriteStream } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { join } from 'path';
import { GraphqlAuthGuard } from 'src/guard/graphql-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from './user.service';
import { UserResponse } from './dto/user-response.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => UserResponse)
  async updateProfile(
    @Args('fullName') fullName: string,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: FileUpload,
    @Context() context: { req: Request },
  ) {
    const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;
    const userId = context.req.user.sub;

    return this.userService.updateProfile(userId, fullName, imageUrl);
  }

  private async storeImageAndGetUrl(file: FileUpload) {
    const { createReadStream, fieldName } = file;
    const uniqueFileName = `${uuidv4()}_${fieldName}`;
    const imagePath = join(process.cwd(), 'public', uniqueFileName);
    const imageUrl = `${process.env.APP_URL}/${uniqueFileName}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));

    return imageUrl;
  }
}
