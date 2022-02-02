# Example NPM package

This library allows developers to easily create an animated number counter.

## How to install

Install using `npm` or `yarn`

```npm2yarn
npm install --save @smartimpact-it/number-counter
```

## How to use

```html
<number-counter duration="3000">1500</number-counter>
```

If you want the number to be formatted as a number in the current language of the document, use the `formatted` attribute:

```html
<number-counter duration="3000" formatted>1500</number-counter>
```

If you want the animation to be paused whenever the element is hidden from the viewport, use the `pause-when-invisible` attribute:

```html
<number-counter duration="3000" pause-when-invisible>1500</number-counter>
```

## Available options

| Attribute              | Default value  | Description                                        |
| ---------------------- | -------------- | -------------------------------------------------- |
| `initial`              | `0`            | the initial number to start from                   |
| `final`                | the text value | the final number                                   |
| `formatted`            |                | whether to format the text (Intl.NumberFormat)     |
| `duration`             | `3000`         | the duration of the animation                      |
| `step`                 | `32`           | the interval between each increase (milliseconds). |
| `pause-when-invisible` | `false`        | whether to pause when out of view                  |
| `root-margin`          | `0px`          | the root margins for the IntersectionObserver.     |

## Available methods

The elements also have some useful methods:

| Method    | Description                              |
| --------- | ---------------------------------------- |
| `pause`   | Pause the animation.                     |
| `play`    | Resume the animation.                    |
| `rewind`  | Set the value back to the initial value. |
| `restart` | Restart the animation.                   |
