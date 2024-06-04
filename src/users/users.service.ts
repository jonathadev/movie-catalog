// users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../movies/entities/user.entity'; // Importe a entidade User, se aplicável

@Injectable()
export class UsersService {
  private readonly users: User[] = []; // Declare um array de usuários, se aplicável

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id); // Implemente a lógica para encontrar um usuário pelo ID
  }
}