import { Server, Socket } from 'socket.io'

import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'

@Injectable()
@WebSocketGateway(6666, { transports: ['websocket'], maxHttpBufferSize: 1e8 })
export class AppGateway {
	@WebSocketServer() server: Server

	constructor(private readonly eventEmitter: EventEmitter2) {}

	@SubscribeMessage('msgToClient')
	handleMessageToClient(client: Socket, payload: string): void {
		console.log('🚀 ~ AppGateway ~ handleMessageToClient ~ payload:', payload)
	}

	@SubscribeMessage('connection')
	handleConnection(client: Socket) {
		const { type } = client.handshake.auth
		if (type === 'client') client.join('client')
		if (type === 'worker') client.join('worker')
		console.log(`${type} connected`)
	}

	@SubscribeMessage('transmit')
	handleTransmit(
		client: Socket,
		_p: {
			event: string
			payload: any
		},
	): void {
		const { type } = client.handshake.auth
		const { event, payload } = _p

		const outputType = type === 'client' ? 'worker' : 'client'
		client.to(outputType).emit(event, payload)
		this.eventEmitter.emit(event, payload)
	}

	async emit(room: string, event: string, payload?: any) {
		return new Promise((resolve, reject) => {
			try {
				this.eventEmitter.once(event.replace('get', 'set'), (data) => {
					resolve(data)
				})

				this.server.to(room).emit(event, payload)
			} catch (error) {
				console.error(error)
				reject(error)
			}
		})
	}
}
