 import {<%= elementClass %>} from '../<%= elementName %>.js';
 import {expect, fixture, html} from '@open-wc/testing';
 
describe('<%= elementClass %>', () => {
  let el: <%= elementClass %>;

  beforeEach(() => {
    el = await fixture(html`<<%=elementName%>></<%=elementName%>>);
  });
  
});