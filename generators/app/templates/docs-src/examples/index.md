---
layout: example.11ty.cjs
title: <<%= elementName %>> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: A basic example
---

<style>
  <%= elementName %> p {
    border: solid 1px blue;
    padding: 8px;
  }
</style>
<<%= elementName %>>
  <p>This is child content</p>
</<%= elementName %>>

<h3>CSS</h3>

```css
p {
  border: solid 1px blue;
  padding: 8px;
}
```

<h3>HTML</h3>

```html
<<%= elementName %>>
  <p>This is child content</p>
</<%= elementName %>>
```
