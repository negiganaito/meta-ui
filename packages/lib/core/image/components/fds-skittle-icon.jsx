import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { profilePhotoUtils } from '@meta-core/react-utils';
import stylex from '@stylexjs/stylex';

import { FDSIcon } from './fds-icon';

const iconSizes = {
  24: 16,
  36: 20,
  40: 24,
  48: 24,
  56: 24,
  60: 24,
};

// const iconSizes = iconSizes;

function getIconColor(color) {
  switch (color) {
    case 'gray':
      return 'primary';
    case 'white':
      return 'primary';
    case 'lightblue':
      return 'highlight';
    default:
      return 'white';
  }
}

export const FDSSkittleIcon = forwardRef(
  ({ color, disabled = false, icon, iconAria, iconBadge, iconBadgeAria, shape = 'circle', size }, ref) => {
    return jsx('div', {
      className: stylex(
        shape === 'circle' && styles.circle,
        shape === 'roundedRect' && styles.roundedRect,
        styles.skittle,
        colorStyles[color],
        sizeStyles[size],
      ),
      ref,
      children: [
        jsx(FDSIcon, {
          ...iconAria,
          color: disabled ? 'disabled' : getIconColor(color),
          icon,
          size: iconSizes[size],
        }),
        iconBadge &&
          jsx('div', {
            className: stylex(styles.r1),
            style: profilePhotoUtils.getBadgePosition(size / 2),
            children: jsx(FDSIcon, {
              ...iconBadgeAria,
              color: 'white',
              icon: iconBadge,
              size: 8,
            }),
          }),
      ],
    });
  },
);

const styles = stylex.create({
  circle: {
    borderRadius: '50%',
  },
  roundedRect: {
    borderRadius: '8px',
  },
  skittle: {
    alignItems: 'center',
    borderWidth: 0,
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
  },

  r1: {
    alignItems: 'center',
    backgroundColor: 'var(--accent)',
    borderColor: 'var(--card-background)',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
    display: 'flex',
    justifyContent: 'center',
    overflowX: 'hidden',
    overflowY: 'hidden',
    paddingTop: '2px',
    paddingRight: '2px',
    paddingBottom: '2px',
    paddingLeft: '2px',
    position: 'absolute',
  },
});

const colorStyles = stylex.create({
  accent: {
    backgroundColor: 'var(--accent)',
  },
  blue: {
    backgroundColor: 'var(--base-blue)',
  },
  cherry: {
    backgroundColor: 'var(--base-cherry)',
  },
  grape: {
    backgroundColor: 'var(--base-grape)',
  },
  gray: {
    backgroundColor: 'var(--secondary-button-background)',
  },
  green: {
    backgroundColor: 'var(--positive)',
  },
  lemon: {
    backgroundColor: 'var(--base-lemon)',
  },
  lightblue: {
    backgroundColor: 'var(--primary-deemphasized-button-background)',
  },
  lime: {
    backgroundColor: 'var(--base-lime)',
  },
  pink: {
    backgroundColor: 'var(--base-pink)',
  },
  red: {
    backgroundColor: 'var(--negative)',
  },
  seafoam: {
    backgroundColor: 'var(--base-seafoam)',
  },
  teal: {
    backgroundColor: 'var(--base-teal)',
  },
  tomato: {
    backgroundColor: 'var(--base-tomato)',
  },
  white: {
    backgroundColor: 'var(--always-white)',
  },
});

const sizeStyles = stylex.create({
  32: {
    height: '32px',
    width: '32px',
  },
  36: {
    height: '36px',
    width: '36px',
  },
  40: {
    height: '40px',
    width: '40px',
  },
  48: {
    height: '48px',
    width: '48px',
  },
  56: {
    height: '56px',
    width: '56px',
  },
  60: {
    height: '60px',
    width: '60px',
  },
});
