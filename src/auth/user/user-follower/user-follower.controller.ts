import { Controller } from '@nestjs/common';
import { Auth } from '../../auth.decorator';
import { Roles } from '../../role/role.guard';
import { RoleEnum } from '../../role/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { SuperController } from '../../../shared/super/super-controller';
import { UserFollower } from './user-follower.entity';
import { UserFollowerService } from './user-follower.service';
import {
  UserFollowerAddDto,
  UserFollowerDeleteDto,
  UserFollowerExistsDto,
} from './user-follower.dto';
import { RouteParamEnum } from '../../../shared/types/route-enums';

@ApiTags('User follower')
@Roles(RoleEnum.user)
@Auth()
@Controller('user-follower')
export class UserFollowerController extends SuperController<UserFollower>({
  entity: UserFollower,
  dto: {
    add: UserFollowerAddDto,
    exists: UserFollowerExistsDto,
    params: UserFollowerExistsDto,
    delete: UserFollowerDeleteDto,
  },
  idKey: RouteParamEnum.idUserFollower,
  relations: ['followed', 'follower'],
  excludeMethods: ['findAll'],
}) {
  constructor(private userFollowerService: UserFollowerService) {
    super(userFollowerService);
  }
}
