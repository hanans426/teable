import type { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createServer from 'next';
import type { NextServer } from 'next/dist/server/next';
import * as appInterface from '../../app.interface';

@Injectable()
export class NextService implements OnModuleInit {
  public server!: NextServer;
  constructor(
    @Inject('APP_CONFIG') private config: appInterface.IAppConfig,
    private configService: ConfigService
  ) {}

  private async startNEXTjs() {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    try {
      this.server = createServer({
        dev: nodeEnv !== 'production',
        port: this.config.port,
        dir: this.config.dir,
        hostname: 'localhost',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  async onModuleInit() {
    await this.startNEXTjs();
  }
}