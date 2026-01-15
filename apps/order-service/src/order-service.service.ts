import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/orderRepository';
import { Repository } from 'typeorm';
import { OrderCreatedV1 } from '@lib/events';

@Injectable()
export class OrderServiceService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  async createOrder(order: OrderCreatedV1) {
    try {
      const orderEntity = this.orderRepository.create({
        eventId: order.eventId,
        name: order.payload.name,
        price: order.payload.price,
        quantity: order.payload.quantity,
      });
      await this.orderRepository.save(orderEntity);
      console.log(`Order created: ${orderEntity.eventId}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }
}
