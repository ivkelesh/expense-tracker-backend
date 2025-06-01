import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JWT Strategy for passport authentication
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'yourSecretKey',
    });
  }

  /**
   * Validates the JWT payload
   * @param payload JWT payload
   * @returns User data
   */
  validate(payload: { sub: number; username: string }) {
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, username: payload.username };
  }
}
