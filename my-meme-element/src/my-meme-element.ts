
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * 
 */
@customElement('my-meme-element')
export class MyMemeElement extends LitElement {
  static styles = css`

  `;
  
    @property({type: String})
    me: string;
  
    @property({type: Number})
    you: number;
  
  render() {
    return html`
      
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-meme-element': MyMemeElement;
  }
}