import { Request } from '@nestjs/common';

export interface RequestWithUser extends Request {
  user: {
    [key: string]: any;
  };
}
