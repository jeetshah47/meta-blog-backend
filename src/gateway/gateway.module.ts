import { Module } from '@nestjs/common';
import { MouseGateway } from './gateway';

@Module({
  providers: [MouseGateway],
})
export class GateWayModule {}
