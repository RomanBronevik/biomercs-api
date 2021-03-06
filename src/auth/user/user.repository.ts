import { EntityRepository, FindConditions, IsNull, Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserCredentialsDto, UserRegisterDto } from './user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(dto: UserRegisterDto): Promise<User> {
    const user = new User().extendDto(dto);
    user.salt = await genSalt();
    user.password = await hash(dto.password, user.salt);
    user.emailToken = await hash(dto.email, user.salt);
    return (await this.save(user)).removePasswordAndSalt();
  }

  async login(
    dto: UserCredentialsDto,
    ignorePasswordValidation?: boolean,
    ignoreEmailToken?: boolean
  ): Promise<User> {
    const { username, password, rememberMe } = dto;
    let where: FindConditions<User>[] = [{ username }, { email: username }];
    if (!ignoreEmailToken) {
      where = where.map(w => ({ ...w, emailToken: IsNull() }));
    }
    const user = await this.findOne({
      where,
      relations: [
        'userRoles',
        'userRoles.role',
        'userFollowed',
        'userFollowed.followed',
        'userFollowed.follower',
        'userFollowers',
        'userFollowers.follower',
        'userFollowers.followed',
      ],
      select: [...User.all, 'resetToken'],
    });
    const errorMessage = 'Login or password invalid';
    if (!user) {
      throw new UnauthorizedException(errorMessage);
    }
    if (!ignorePasswordValidation) {
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(errorMessage);
      }
    }
    const lastOnline = new Date();
    const update: Partial<User> = { lastOnline, rememberMe };
    if (!user.expired) {
      update.resetToken = null;
    }
    await this.update(user.id, update);
    user.lastOnline = lastOnline;
    user.rememberMe = rememberMe;
    return user;
  }
}
