---
layout: page.11ty.cjs
title: <<%= elementName %>> ⌲ Home
---

# &lt;<%= elementName %>>

`<<%= elementName %>>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<<%= elementName %>>` is just an HTML element. You can it anywhere you can use HTML!

```html
<<%= elementName %>></<%= elementName %>>
```

  </div>
  <div>

<<%= elementName %>></<%= elementName %>>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<<%= elementName %>>` can be configured with attributed in plain HTML.

```html
<<%= elementName %> name="HTML"></<%= elementName %>>
```

  </div>
  <div>

<<%= elementName %> name="HTML"></<%= elementName %>>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<<%= elementName %>>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;<%= elementName %>&gt;</h2>
    <<%= elementName %> .name=${name}></<%= elementName %>>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;<%= elementName %>&gt;</h2>
<<%= elementName %> name="lit-html"></<%= elementName %>>

  </div>
</section>