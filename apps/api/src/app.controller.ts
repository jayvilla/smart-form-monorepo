import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ZodValidationPipe } from './zod-validation.pipe';
import { UserFormSchema } from '@smart/schemas';
import type { UserFormInput } from '@smart/schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user-form')
  submitUserForm(
    @Body(new ZodValidationPipe(UserFormSchema)) body: UserFormInput,
  ) {
    return {
      message: 'User form submitted successfully',
      data: body,
    };
  }
}
