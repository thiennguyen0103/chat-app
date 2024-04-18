import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from 'src/user/dto/user-response.dto';

@ObjectType()
export class RegisterResponse {
  @Field(() => UserResponse, { nullable: true })
  user?: UserResponse;
}
