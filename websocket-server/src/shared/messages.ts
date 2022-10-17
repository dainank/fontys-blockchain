export type UUID = string;

// TODO: introduce stronger typing based on type literals.
export interface Message {
  correlationId: UUID;
  type: string;
  payload?: any;
}

// TODO: find out whether request / response prefixes can be generated with mapped types.
export enum MessageTypes {
  GetLongestChainRequest  = 'GET_LONGEST_CHAIN_REQUEST',
  GetLongestChainResponse = 'GET_LONGEST_CHAIN_RESPONSE',
  NewBlockRequest         = 'NEW_BLOCK_REQUEST',
  NewBlockAnnouncement    = 'NEW_BLOCK_ANNOUNCEMENT'
}
