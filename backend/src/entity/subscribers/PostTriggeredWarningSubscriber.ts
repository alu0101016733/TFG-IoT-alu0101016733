import { Logger } from '@nestjs/common';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { TriggeredWarning } from '../TriggeredWarning';
import { TriggeredWarningView } from '../views/TriggeredWarningView';
import { InternalWebsocketConnection } from 'src/utilities/InternalWebsocketConnection';

@EventSubscriber()
// @ts-ignore
export class PostTriggeredWarningSubscriber
  implements EntitySubscriberInterface<TriggeredWarning>
{
  private websocket = undefined;
  private logger: Logger = new Logger('PostInsertWarning');

  constructor() {
    this.websocket = new InternalWebsocketConnection('alert');
  }
  /**
   * Indicates that this subscriber only listen to History events.
   */
  listenTo() {
    return TriggeredWarning;
  }

  /**
   * Called before post insertion.
   */
  async afterInsert(event: InsertEvent<TriggeredWarning>) {
    this.logger.log('Triggered warning was inserted');

    let result = await event.manager
      .createQueryBuilder(TriggeredWarningView, 'warning')
      .where('warningId = :wid', { wid: event.entity.warningId })
      .where('historyId = :hid', { hid: event.entity.historyId })
      .getOne();
    // send data over websockets
    this.websocket.send(
      JSON.stringify({
        event: 'broadcastToEveryone',
        data: result,
      }),
    );
  }
}
