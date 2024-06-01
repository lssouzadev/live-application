import { Server } from 'socket.io'

import { Injectable, OnModuleInit } from '@nestjs/common'
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
@Injectable()
@WebSocketGateway(6666, {
	reconnection: true,
	reconnectAttempts: 1000,
	reconnectDelay: 1000,
	reconnectInterval: 10000,
	transports: ['websocket'],
	auth: {
		type: 'client',
	},
})
export class ClientService implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server
	constructor() {}

	onModuleInit() {
		console.log('Requesting POSTs List')
		this.server.emit('transmit', {
			event: 'getPosts',
			payload: {
				limit: 3,
			},
		})
	}

	@SubscribeMessage('setPosts')
	handleSetPosts(@MessageBody() payload) {
		console.log('Setting posts:', payload)
	}

	handleConnection() {
		console.log('Connected to server!')
	}

	handleDisconnect() {
		console.log('Disconnected from server!')
	}
}
