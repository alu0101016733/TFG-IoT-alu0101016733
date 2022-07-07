import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { History } from '../History';
import { TriggeredWarning } from '../TriggeredWarning';
import { Warning } from '../Warning';
import { Logger } from '@nestjs/common';
import { InternalWebsocketConnection } from 'src/utilities/InternalWebsocketConnection';
import { HistoryView } from '../views/HistoryView';

@EventSubscriber()
// @ts-ignore
export class PostHistorySubscriber
  implements EntitySubscriberInterface<History>
{
  private websocket = undefined;
  private logger: Logger = new Logger('PostInsertHistory');
  //private counter: number = 1;

  constructor() {
    this.websocket = new InternalWebsocketConnection('sensor');
  }
  /**
   * Indicates that this subscriber only listen to History events.
   */
  listenTo() {
    return History;
  }

  /**
   * Called before post insertion.
   */
  async afterInsert(event: InsertEvent<History>) {
    this.logger.log('history inserted');
    // https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md

    // check if warning was triggered
    const historyView = await event.manager
      .createQueryBuilder(HistoryView, 'warning')
      .where('id = :hid', { hid: event.entity.id })
      .getOne();

    // send data over websockets
    this.websocket.send(
      JSON.stringify({
        event: 'broadcastToEveryone',
        data: JSON.stringify(historyView),
      }),
    );

    // check if warning was triggered
    let result = await event.manager
      .createQueryBuilder(Warning, 'warning')
      .where('sensorId = :sid', { sid: event.entity.sensorId })
      .andWhere('max < :max', { max: event.entity.value })
      .orWhere('min > :min', { min: event.entity.value })
      .getMany();

    if (result.length > 0) {
      // websocket connection
      for (let i = 0; i < result.length; i++) {
        let inserted = await event.manager
          .createQueryBuilder()
          .insert()
          .into(TriggeredWarning)
          .values([{ warningId: result[i].id, historyId: event.entity.id }])
          .execute();
        //console.log(inserted);
        // inform user
      }
    }
  }
}
