import {MyMemeElement} from './my-meme-element.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('MyMemeElement', () => {
  let el: MyMemeElement;

  beforeEach(async () => {
    el = await fixture(html`<my-meme-element></my-meme-element>`);
  });

  it('starts', async () => {
    expect(el).to.not.be.undefined;
  });

});