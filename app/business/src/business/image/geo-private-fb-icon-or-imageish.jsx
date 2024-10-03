import { TintableIconSource } from '@meta-core/image/tintable-icon-source';
import stylex from '@stylexjs/stylex';

import { GeoIcon } from './geo-icon';

const styles = stylex.create({
  deprecatedIcon: {
    display: 'inline-flex',
  },
});

export function GeoPrivateFBIconOrImageish({ icon, ...props }) {
  return icon instanceof TintableIconSource ? (
    <GeoIcon {...props} icon={icon} />
  ) : (
    <div className={stylex(styles.deprecatedIcon, props.xstyle)}>{icon}</div>
  );
}
