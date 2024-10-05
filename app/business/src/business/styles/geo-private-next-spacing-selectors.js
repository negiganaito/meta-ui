import { GeoPrivateNextSpacingGeneratedStyles } from './geo-private-next-spacing-generated-styles';

function h(a, b) {
  switch (a) {
    case 'page':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.containerInternalPageSpacingStyles[a];
      });
    case 'component':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.containerInternalComponentSpacingStyles[a];
      });
  }
}

function i(a, b) {
  switch (a) {
    case 'related':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.containerExternalRelatedSpacingStyles[a];
      });
    case 'unrelated':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.containerExternalUnrelatedSpacingStyles[a];
      });
    case 'section':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.containerExternalSectionSpacingStyles[a];
      });
  }
  return null;
}

function j(a, b) {
  a = a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.componentFineSpacingStyles[a];
  });
  b = b.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.componentFineSpacingOffsetStyles[a];
  });
  return [].concat(a, b);
}

function k(a, b) {
  a = a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.componentNormalSpacingStyles[a];
  });
  b = b.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.componentNormalSpacingOffsetStyles[a];
  });
  return [].concat(a, b);
}

function l(a, b) {
  a = a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.componentCoarseSpacingStyles[a];
  });
  b = b.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.componentCoarseSpacingOffsetStyles[a];
  });
  return [].concat(a, b);
}

function m(a, b) {
  switch (a) {
    case 'related':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.componentExternalRelatedSpacingStyles[a];
      });
    case 'unrelated':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.componentExternalUnrelatedSpacingStyles[a];
      });
  }
  return null;
}

function n(a, b) {
  switch (a) {
    case 'heading':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.contentExternalHeadingSpacingStyles[a];
      });
    case 'paragraph':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.contentExternalParagraphSpacingStyles[a];
      });
    case 'section':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.contentExternalSectionSpacingStyles[a];
      });
  }
  return null;
}

function o(a) {
  return a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.controlNormalSpacingStyles[a];
  });
}

function p(a) {
  return a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.controlFineSpacingStyles[a];
  });
}

function q(a) {
  return a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.controlCoarseSpacingStyles[a];
  });
}

function r(a) {
  return a.map((a) => {
    return GeoPrivateNextSpacingGeneratedStyles.inputSpacingStyles[a];
  });
}

// eslint-disable-next-line complexity
function selectSpacing(a) {
  const { bounds, context, relation, positions = ['vertical', 'horizontal'], offsets = [], target } = a;

  switch (context) {
    case 'container':
      switch (bounds) {
        case 'internal':
          if (relation === 'page' || relation === 'component') return h(relation, positions);
          break;
        case 'external':
          if (relation === 'related' || relation === 'unrelated' || relation === 'section')
            return i(relation, positions);
          break;
      }
      break;
    case 'component':
      switch (bounds) {
        case 'internal':
          switch (target) {
            case 'fine':
              return j(positions, offsets);
            case 'coarse':
              return l(positions, offsets);
            default:
              return k(positions, offsets);
          }
        case 'external':
          if (relation === 'related' || relation === 'unrelated') return m(relation, positions);
          break;
      }
      break;
    case 'content':
      if (relation === 'heading' || relation === 'paragraph' || relation === 'section') return n(relation, positions);
      break;
    case 'control':
      if (bounds === 'internal') {
        switch (target) {
          case 'fine':
            return p(positions);
          case 'coarse':
            return q(positions);
          default:
            return o(positions);
        }
      }
      break;
    case 'input':
      if (bounds === 'internal') return r(positions);
      break;
  }
  return null;
}

function s(a, b) {
  switch (a) {
    case 'related':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutContainerExternalRelatedSpacingStyles[a];
      });
    case 'unrelated':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutContainerExternalUnrelatedSpacingStyles[a];
      });
    case 'section':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutContainerExternalSectionSpacingStyles[a];
      });
  }
  return null;
}

function t(a, b) {
  switch (a) {
    case 'related':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutComponentExternalRelatedSpacingStyles[a];
      });
    case 'unrelated':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutComponentExternalUnrelatedSpacingStyles[a];
      });
  }
  return null;
}

function u(a, b) {
  switch (a) {
    case 'heading':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutContentExternalHeadingSpacingStyles[a];
      });
    case 'paragraph':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutContentExternalParagraphSpacingStyles[a];
      });
    case 'section':
      return b.map((a) => {
        return GeoPrivateNextSpacingGeneratedStyles.layoutContentExternalSectionSpacingStyles[a];
      });
  }
  return null;
}

function selectLayoutSpacing(a) {
  const { context, relation, direction } = a;
  const adjustedDirection = [direction === 'vertical' ? 'top' : 'end'];

  switch (context) {
    case 'container':
      if (relation === 'related' || relation === 'unrelated' || relation === 'section')
        return s(relation, adjustedDirection);
      break;
    case 'component':
      if (relation === 'related' || relation === 'unrelated') return t(relation, adjustedDirection);
      break;
    case 'content':
      if (relation === 'heading' || relation === 'paragraph' || relation === 'section')
        return u(relation, adjustedDirection);
      break;
  }
  return null;
}

export const GeoPrivateNextSpacingSelectors = {
  selectSpacing,
  selectLayoutSpacing,
};
