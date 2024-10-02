import Locale from 'fbjs/lib/Locale';

import { memoizeWithArgs } from './memoize-with-args';

const getBadgePosition = memoizeWithArgs(
  (size, isTop) => {
    isTop === void 0 && (isTop = false);
    let positionOffset = Math.sqrt(2 * size * size) - size;
    positionOffset = Math.round(Math.sqrt((positionOffset * positionOffset) / 2));

    if (isTop) {
      if (Locale.isRTL()) {
        return {
          left: positionOffset,
          top: positionOffset,
          transform: 'translate(-50%, -50%)',
        };
      } else {
        return {
          right: positionOffset,
          top: positionOffset,
          transform: 'translate(50%, -50%)',
        };
      }
    } else {
      if (Locale.isRTL()) {
        return {
          bottom: positionOffset,
          left: positionOffset,
          transform: 'translate(-50%, 50%)',
        };
      } else {
        return {
          bottom: positionOffset,
          right: positionOffset,
          transform: 'translate(50%, 50%)',
        };
      }
    }
  },
  (size, isTop) => {
    return String(isTop) + String(size);
  },
);

const getStoryRingSize = memoizeWithArgs(
  (diameter) => {
    switch (diameter) {
      case 24:
      case 32:
      case 36:
      case 40:
        return 2;
      case 48:
      case 56:
      case 60:
        return 3;
      case 132:
      default:
        return 4;
    }
  },
  (diameter) => {
    return String(diameter);
  },
);

const getBadgeSizeAndStrokeWidth = memoizeWithArgs(
  // eslint-disable-next-line complexity
  (diameter, badgeType) => {
    if (badgeType === 'availabilityBadge') {
      switch (diameter) {
        case 16:
        case 20:
        case 24:
          return [6, 1.5];
        case 28:
          return [7, 2];
        case 32:
        case 36:
          return [8, 2];
        case 40:
        case 44:
        case 48:
          return [9, 2];
        case 56:
        case 60:
          return [10, 2];
        case 72:
          return [12, 2];
        case 80:
        case 88:
          return [14, 2];
        case 96:
        case 100:
          return [15, 2];
        case 120:
        case 132:
        case 168:
          return [20, 4];
        default:
          return [8, 2];
      }
    }

    switch (diameter) {
      case 16:
      case 20:
      case 24:
        return [6, 1.5];
      case 28:
        return [7, 1.5];
      case 32:
        return [8, 2];
      case 36:
        return [9, 2];
      case 40:
        return [10, 2];
      case 44:
      case 48:
        return [12, 2];
      case 56:
        return [14, 2];
      case 60:
        return [15, 2];
      case 72:
        return [18, 2];
      case 80:
        return [20, 4];
      case 88:
        return [22, 4];
      case 96:
      case 100:
        return [24, 4];
      case 120:
      case 132:
        return [32, 4];
      case 168:
        return [41, 4];
      default:
        return [8, 2];
    }
  },
  (diameter, badgeType) => {
    return String(diameter) + badgeType;
  },
);

export const profilePhotoUtils = {
  getBadgePosition,
  getStoryRingSize,
  getBadgeSizeAndStrokeWidth,
};
