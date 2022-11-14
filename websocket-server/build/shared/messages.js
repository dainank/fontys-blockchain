"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 4 message types accepted in our implementation
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["GetLongestChainRequest"] = "GET_LONGEST_CHAIN_REQUEST";
    MessageTypes["GetLongestChainResponse"] = "GET_LONGEST_CHAIN_RESPONSE";
    MessageTypes["NewBlockRequest"] = "NEW_BLOCK_REQUEST";
    MessageTypes["NewBlockAnnouncement"] = "NEW_BLOCK_ANNOUNCEMENT"; // when mining complete
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
//# sourceMappingURL=messages.js.map