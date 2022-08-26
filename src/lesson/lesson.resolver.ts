/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssignStudentsInput } from './assign-students.input';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
  ){}

  @Query(() => LessonType)
  lesson(
    @Args('id') id: string,
  ) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('AssignStudentsInput') assignStudentsInput: AssignStudentsInput,
  ) {
    const { lessonId, studentIds } = assignStudentsInput;
    return this.lessonService.assignStudentsToLession(lessonId, studentIds);
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }
}
