import { Body, Controller, Param, Patch } from '@nestjs/common';
import { Auth } from '../../auth.decorator';
import { Roles } from '../../role/role.guard';
import { RoleEnum } from '../../role/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { UserShowcaseService } from './user-showcase.service';
import { UpdatedByPipe } from '../../../shared/pipes/updated-by.pipe';
import { UserShowcaseUpdateDto } from './user-showcase.dto';
import { UserShowcase } from './user-showcase.entity';
import { RouteParamEnum } from '../../../shared/types/route-enums';

@ApiTags('User Showcase')
@Roles(RoleEnum.user)
@Auth()
@Controller('user-showcase')
export class UserShowcaseController {
  constructor(private userShowcaseService: UserShowcaseService) {}

  @Patch(`:${RouteParamEnum.idUserShowcase}`)
  async update(
    @Param(RouteParamEnum.idUserShowcase) idUserShowcase: number,
    @Body(UpdatedByPipe) dto: UserShowcaseUpdateDto
  ): Promise<UserShowcase> {
    return this.userShowcaseService.update(idUserShowcase, dto);
  }
}
