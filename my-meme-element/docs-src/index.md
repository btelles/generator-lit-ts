---
layout: page.11ty.cjs
title: <my-meme-element> ⌲ Home
---

# &lt;my-meme-element>

`<my-meme-element>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<my-meme-element>` is just an HTML element. You can it anywhere you can use HTML!

```html
<my-meme-element></my-meme-element>
```

  </div>
  <div>

<my-meme-element></my-meme-element>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<my-meme-element>` can be configured with attributed in plain HTML.

```html
<my-meme-element name="HTML"></my-meme-element>
```

  </div>
  <div>

<my-meme-element name="HTML"></my-meme-element>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<my-meme-element>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;my-meme-element&gt;</h2>
    <my-meme-element .name=${name}></my-meme-element>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;my-meme-element&gt;</h2>
<my-meme-element name="lit-html"></my-meme-element>

  </div>
</section>
