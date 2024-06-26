import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { AppController } from './app.controller'
import { AppGateway } from './app.gateway'
import { AppService } from './app.service'

@Module({
	imports: [EventEmitterModule.forRoot()],
	controllers: [AppController],
	providers: [AppGateway, AppService],
})
export class AppModule {}
