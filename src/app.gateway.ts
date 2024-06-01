import { Server } from 'http'
import { Socket } from 'socket.io-client'

import { Injectable, Logger } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'

@Injectable()
@WebSocketGateway(6666, { transports: ['websocket'], maxHttpBufferSize: 1e8 })
export class AppGateway {
	@WebSocketServer() server: Server

	private logger: Logger = new Logger('AppGateway')

	@SubscribeMessage('msgToClient')
	handleMessageToClient(client: Socket, payload: string): void {
		console.log('🚀 ~ AppGateway ~ handleMessageToClient ~ payload:', payload)
	}

	@SubscribeMessage('connection')
	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`)
	}
}
