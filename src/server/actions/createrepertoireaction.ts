import { Action } from '../action';
import { Color } from '../../protocol/color';
import { CreateRepertoireRequest, CreateRepertoireResponse } from '../../protocol/actions';
import { DatabaseWrapper } from '../databasewrapper';

export class CreateRepertoireAction
    implements Action<CreateRepertoireRequest, CreateRepertoireResponse> {
  private database_: DatabaseWrapper;

  constructor(database: DatabaseWrapper) {
    this.database_ = database;
  }

  do(request: CreateRepertoireRequest, user: string):
      Promise<CreateRepertoireResponse> {
    return this.database_
        .createNewRepertoire({color: Color.WHITE, root: null}, user)
        .then(() => { return {}; });
  }
}
