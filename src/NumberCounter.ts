import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('number-counter')
export class NumberCounter extends LitElement {
  @property({ type: Number })
  initial: number = 0;

  @property({ type: Number })
  final: number;

  @property({ type: Boolean })
  formatted: boolean = false;

  @property({ type: Number })
  duration: number = 3000;

  @property({ type: Number, attribute: 'step' })
  stepInterval: number = 32;

  @property({ type: Number })
  delay: number = 0;

  @property({ type: Boolean, reflect: true })
  paused: boolean = false;

  @property({ type: Boolean, attribute: 'pause-when-invisible' })
  pauseWhenInvisible: boolean = false;

  @property({ type: String, attribute: 'root-margin' })
  rootMargin: string = '0px';

  @state()
  currentValue: number = 0;

  @state()
  running: boolean = false;

  private _observer: IntersectionObserver = null;
  private _observerCallback: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!this.paused && !this.running) {
          this._start();
        }
      } else {
        if (this.running && this.pauseWhenInvisible) {
          this._stop();
        }
      }
    });
  };

  private _formatter: Intl.NumberFormat;

  private _interval = null;

  private _start = () => {
    this.running = true;
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    this._interval = setInterval(this._increase, this.stepInterval);
  };

  private _stop = () => {
    this.running = false;
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  };

  pause = () => {
    this._stop();
  };

  play = () => {
    this._start();
  };

  rewind = () => {
    this.currentValue = this.initial;
  };

  restart = () => {
    this.rewind();
    this._start();
  };

  private _increase = () => {
    const steps = this.duration / this.stepInterval;
    const step = Math.floor(Math.max((this.final - this.initial) / steps, 1));
    const current = this.currentValue + step;
    if (current > this.final) {
      this.currentValue = this.final;
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    } else {
      this.currentValue = current;
    }
  };

  private _getFormattedValue(value: number): number | string {
    if (this.formatted) {
      return this._formatter.format(value);
    }
    return value;
  }

  constructor() {
    super();
    this._formatter = Intl.NumberFormat(document.documentElement.lang);
  }

  connectedCallback() {
    super.connectedCallback();
    this.final = this.final || parseInt(this.innerHTML) || 100;
    this.innerHTML = '';

    this._observer =
      this._observer ||
      new IntersectionObserver(this._observerCallback, {
        rootMargin: this.rootMargin,
      });
    this._observer.observe(this);
  }

  disconnectedCallback() {
    this._observer?.unobserve(this);
    this._observer = null;
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    super.disconnectedCallback();
  }

  // disable the shadow DOM
  createRenderRoot() {
    return this;
  }

  render() {
    return html`${this._getFormattedValue(this.currentValue)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'number-counter': NumberCounter;
  }
}
