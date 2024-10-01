import { useGeoPrivateOnMouseEventOutside } from './use-geo-private-on-mouse-event-outside';

export function useGeoOnClickOutside(a, b) {
  useGeoPrivateOnMouseEventOutside(a, b, 'click');
}
