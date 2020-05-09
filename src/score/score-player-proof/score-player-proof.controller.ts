import { Controller, Param, Post, UploadedFile } from '@nestjs/common';
import { Auth } from '../../auth/auth.decorator';
import { Roles } from '../../auth/role/role.guard';
import { RoleEnum } from '../../auth/role/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { ScorePlayerProofService } from './score-player-proof.service';
import { ScorePlayerProof } from './score-player-proof.entity';
import { UseFileUpload } from '../../file-upload/file-upload.decorator';
import { environment } from '../../shared/env/env';
import { FileType } from '../../file-upload/file-type.interface';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/user/user.entity';
import { RouteParamId } from '../../shared/types/route-enums';
import { SuperController } from '../../shared/super/super-controller';

@ApiTags('Score player proof')
@Roles(RoleEnum.user)
@Auth()
@Controller('score-player-proof')
export class ScorePlayerProofController extends SuperController<
  ScorePlayerProof
>({
  entity: ScorePlayerProof,
  dto: {
    add: ScorePlayerProof,
  },
  idKey: RouteParamId.idScorePlayerProof,
  excludeMethods: ['findAll'],
}) {
  constructor(private scorePlayerProofService: ScorePlayerProofService) {
    super(scorePlayerProofService);
  }

  @Post(`image/:${RouteParamId.idScorePlayer}`)
  @UseFileUpload({
    filesAllowed: environment.imageExtensionsAllowed,
  })
  uploadFile(
    @Param(RouteParamId.idScorePlayer) idScorePlayer: number,
    @UploadedFile('file') file: FileType,
    @GetUser() user: User
  ): Promise<ScorePlayerProof> {
    return this.scorePlayerProofService.uploadImage(idScorePlayer, file, user);
  }
}
