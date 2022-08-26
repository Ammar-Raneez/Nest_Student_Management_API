/* eslint-disable prettier/prettier */
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsInput {
  @IsUUID()
  @Field(() => ID)
  lessonId: string;

  // Check if array of studentIds are all UUIDs
  @IsUUID('all', { each: true })
  @Field(() => [ID])
  studentIds: string[];
}