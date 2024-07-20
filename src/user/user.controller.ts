import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/Entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
  //inscription
  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  //connexion

  @Post('connexion')
  async connexion(@Body() user: User) {
    const resultat_de_connexion = await this.userService.connexion(user);

    return resultat_de_connexion;
  }

  // @Delete(':id')
  // remove(@Param('id') id: number): Promise<void> {
  //   return this.userService.remove( id);
  // }
}
