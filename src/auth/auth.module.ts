import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../shared/env/env';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user/user.controller';
import { UserLinkRepository } from './user/user-link/user-link.repository';
import { UserLinkService } from './user/user-link/user-link.service';
import { UserLinkController } from './user/user-link/user-link.controller';
import { RoleRepository } from './role/role.repository';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';
import { UserRoleRepository } from './user/user-role/user-role.repository';
import { UserRoleService } from './user/user-role/user-role.service';
import { UserRoleController } from './user/user-role/user-role.controller';
import { RequestService } from './user/request.service';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { UserFollowerService } from './user/user-follower/user-follower.service';
import { UserFollowerController } from './user/user-follower/user-follower.controller';
import { UserFollowerRepository } from './user/user-follower/user-follower.repository';
import { UserShowcaseService } from './user/user-showcase/user-showcase.service';
import { UserShowcaseController } from './user/user-showcase/user-showcase.controller';
import { UserShowcaseRepository } from './user/user-showcase/user-showcase.repository';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: environment.get('JWT_SECRET'),
      signOptions: {
        expiresIn: environment.get('JWT_EXPIRES_IN'),
      },
    }),
    TypeOrmModule.forFeature([
      UserRepository,
      UserLinkRepository,
      RoleRepository,
      UserRoleRepository,
      UserFollowerRepository,
      UserShowcaseRepository,
    ]),
    FileUploadModule,
  ],
  providers: [
    AuthService,
    RequestService,
    UserService,
    JwtStrategy,
    UserLinkService,
    RoleService,
    UserRoleService,
    UserFollowerService,
    UserShowcaseService,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule,
    UserService,
    RoleService,
    RequestService,
    UserRoleService,
    UserFollowerService,
    UserShowcaseService,
  ],
  controllers: [
    AuthController,
    UserController,
    UserLinkController,
    RoleController,
    UserRoleController,
    UserFollowerController,
    UserShowcaseController,
  ],
})
export class AuthModule {}
