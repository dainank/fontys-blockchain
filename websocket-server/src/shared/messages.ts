export type UUID = string; // code readability

// message object format
export interface Message {
  correlationId: UUID; // also string, see alias above
  type: string;
  payload?: any; // optional
}

// 4 message types accepted in our implementation
export enum MessageTypes {
  GetLongestChainRequest  = 'GET_LONGEST_CHAIN_REQUEST',
  GetLongestChainResponse = 'GET_LONGEST_CHAIN_RESPONSE',
  NewBlockRequest         = 'NEW_BLOCK_REQUEST',          // when mining starts
  NewBlockAnnouncement    = 'NEW_BLOCK_ANNOUNCEMENT'      // when mining complete
}
