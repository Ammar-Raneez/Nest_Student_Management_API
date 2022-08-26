/* eslint-disable prettier/prettier */
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsInput } from './assign-students.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
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

  // Returns an array of LessonType
  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  // When we query students - additionally make it possible to query their fields
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
