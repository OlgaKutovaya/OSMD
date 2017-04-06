import { Message as PrimeNgMessage } from 'primeng/primeng';

export interface Message extends PrimeNgMessage {
  timeout?: number;
}
