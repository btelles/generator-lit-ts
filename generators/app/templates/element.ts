
import {LitElement, html, css} from 'lit';
import {customElement<% if (properties.length) { %>, property<% } %>} from 'lit/decorators.js';

/**
 * 
 */
@customElement('<%= elementName %>')
export class <%= elementClass %> extends LitElement {
  static styles = css`

  `;
  <% properties.forEach(p => { %>
    @property({type: <%= p.litType %>})
    <%= p.name %>: <%= p.tsType %>;
  <%})%>
  render() {
    return html`
      
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '<%= elementName %>': <%= elementClass %>;
  }
}