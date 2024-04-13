import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from 'src/user/dto/user-response.dto';

@ObjectType()
export class LoginResponse {
  @Field(() => UserResponse)
  user: UserResponse;
}
