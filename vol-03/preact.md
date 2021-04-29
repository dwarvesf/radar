## What is Preact
A JS library developed on React structure, with the same API, component and virtual DOM integration. Thanks to the light bundle size (3kb), the Preact-based website is faster in rendering and boosting the user experience. The next level for React alternative and the smallest library in size so far.

## How it works
Providing the same APIs and mechanism as React, Preact can be used directly in the browser and doesn't require any build or tools. Using `preact-compat` in Webpack/ Browserify, developers create an alias to achieve 100% compatibility with React.

### The CLI
We can run preact CLI locally in the terminal on your computer. It will help you to initialize, develop, and maintain Preact applications. First, install it using NPM:

`$ npm install -g preact-cli`

### The Alias
```
{
"resolve": {
"alias": {
"react": "preact-compat",
"react-dom": "preact-compat"
}
}
}
```

This aims to acknowledge the build tool to replace anywhere using react, with Preact.

## Preact vs React
Walking through some comparison, the notable differences between these twos can be the synthetic event system and native browser event

- Events don't bubble through <Portal> components

- The clear "x" button for `<input type="search">` does not fire an `input` event in IE11 - use `onSearch` instead.

- Use `onInput` instead `onChange` for `<input>` elements (only if preact/compat is not used)

- Use `onDblClick` instead of `onDoubleClick` (only if `preact/compat` is not used)

The other main difference is that Preact follows the DOM specification more closely. An example of this is the ability to use `class` instead of `className`.

Normally, an application can be composed form different libraries. In case the codebase from the 3rd library belongs to the incompatible section, the conflicts might happen.

## Benefit Stage
Development

## When to use
A significant advantage of switching to Preact from React is the smaller bundle size that helps the app to load faster - this can be a key requirement for some projects. The current projects we’re bootstrapping with Preact contains:
- Artzy
- Aharooms
- WeGo Coffee