import { Spinner } from 'spin.js';
import { refs } from './refs';

let opts = {
  lines: 13,
  length: 28,
  width: 7,
  radius: 32,
  scale: 1,
  corners: 1,
  color: 'teal',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute',
};

const spinner = new Spinner(opts).spin(refs.spinner);

export function spinnerPlay() {
  spinner.spin(refs.spinner);
  refs.spinner.classList.remove('is-hidden');
}
export function spinnerStop() {
  refs.spinner.classList.add('is-hidden');
  spinner.stop();
}
