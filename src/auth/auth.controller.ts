// auth.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getAuth(): string {
    return 'Auth Controller';
  }
}