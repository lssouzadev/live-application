import { Server } from 'socket.io'

import { Injectable, OnModuleInit } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
@Injectable()
@WebSocketGateway(6666, {
	reconnection: true,
	reconnectAttempts: 1000,
	reconnectDelay: 1000,
	reconnectInterval: 10000,
	transports: ['websocket'],
})
export class WorkerService implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server
	constructor() {}

	onModuleInit() {
		this.server.emit('msgToClient', 'Hello from WorkerService')
	}

	handleConnection() {
		console.log('Connected to server!')
	}

	handleDisconnect() {
		console.log('Disconnected from server!')
	}
}
