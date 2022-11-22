import { html, TemplateResult } from '../../../node_modules/lit-html/lit-html.js';
import { Transaction } from '../lib/blockchain-node.js';

export type Callback = () => void;

export interface Renderable<T> {
  requestRendering: Callback;
  render(data: T): TemplateResult;
}

export function titleize(text: string) {
  return text.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

export function formatTransactions(transactions: Transaction[]): string {
  return transactions.map(t =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
}

export function cryptoRandom(){
  // return a crypto generated number
  // between 0 and 1 (0 inclusive, 1 exclusive);
  // Mimics the Math.random function in range of results
  const array = new Uint32Array(1),
    max = Math.pow(2, 32), // normally the max is 2^32 -1 but we remove the -1
                           //  so that the max is exclusive
    randomValue = window.crypto.getRandomValues(array)[0] / max;

    return randomValue;
}

export function randomDelay(maxMilliseconds: number = 100): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), Math.floor(cryptoRandom() * Math.floor(maxMilliseconds)));
  });
}

export namespace UI {
  export function button(label: string, disabled: boolean = false) {
    return html`
      <button type="submit" ?disabled=${disabled} class="ripple">${label}</button>
    `;
  }

  export function formField(name: string, value: any, changeHandler: EventListener, disabled: boolean = false, type: 'text' | 'number' = 'text') {
    return html`
      <input name=${name}
             type=${type}
             .value=${value}
             @change=${changeHandler}
             ?disabled=${disabled}
             placeholder=${titleize(name)}
             autocomplete="off">
    `;
  }
}
