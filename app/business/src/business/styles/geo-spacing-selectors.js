import { GeoPrivateDefaultSpacingGeneratedStyles } from './geo-private-default-spacing-generated-styles';

function getContainerInternalSpacing(relation, positions) {
  switch (relation) {
    case 'page':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.containerInternalPageSpacingStyles[position],
      );
    case 'component':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.containerInternalComponentSpacingStyles[position],
      );
  }
}

function getContainerExternalSpacing(relation, positions) {
  switch (relation) {
    case 'related':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.containerExternalRelatedSpacingStyles[position],
      );
    case 'unrelated':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.containerExternalUnrelatedSpacingStyles[position],
      );
    case 'section':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.containerExternalSectionSpacingStyles[position],
      );
  }
  return null;
}

function getComponentFineSpacing(positions, offsets) {
  const fineSpacing = positions.map(
    (position) => GeoPrivateDefaultSpacingGeneratedStyles.componentFineSpacingStyles[position],
  );
  const fineSpacingOffsets = offsets.map(
    (offset) => GeoPrivateDefaultSpacingGeneratedStyles.componentFineSpacingOffsetStyles[offset],
  );
  return [...fineSpacing, ...fineSpacingOffsets];
}

function getComponentNormalSpacing(positions, offsets) {
  const normalSpacing = positions.map(
    (position) => GeoPrivateDefaultSpacingGeneratedStyles.componentNormalSpacingStyles[position],
  );
  const normalSpacingOffsets = offsets.map(
    (offset) => GeoPrivateDefaultSpacingGeneratedStyles.componentNormalSpacingOffsetStyles[offset],
  );
  return [...normalSpacing, ...normalSpacingOffsets];
}

function getComponentCoarseSpacing(positions, offsets) {
  const coarseSpacing = positions.map(
    (position) => GeoPrivateDefaultSpacingGeneratedStyles.componentCoarseSpacingStyles[position],
  );
  const coarseSpacingOffsets = offsets.map(
    (offset) => GeoPrivateDefaultSpacingGeneratedStyles.componentCoarseSpacingOffsetStyles[offset],
  );
  return [...coarseSpacing, ...coarseSpacingOffsets];
}

function getComponentExternalSpacing(relation, positions) {
  switch (relation) {
    case 'related':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.componentExternalRelatedSpacingStyles[position],
      );
    case 'unrelated':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.componentExternalUnrelatedSpacingStyles[position],
      );
  }
  return null;
}

function getContentExternalSpacing(relation, positions) {
  switch (relation) {
    case 'heading':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.contentExternalHeadingSpacingStyles[position],
      );
    case 'paragraph':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.contentExternalParagraphSpacingStyles[position],
      );
    case 'section':
      return positions.map(
        (position) => GeoPrivateDefaultSpacingGeneratedStyles.contentExternalSectionSpacingStyles[position],
      );
  }
  return null;
}

function getControlNormalSpacing(positions) {
  return positions.map((position) => GeoPrivateDefaultSpacingGeneratedStyles.controlNormalSpacingStyles[position]);
}

function getControlFineSpacing(positions) {
  return positions.map((position) => GeoPrivateDefaultSpacingGeneratedStyles.controlFineSpacingStyles[position]);
}

function getControlCoarseSpacing(positions) {
  return positions.map((position) => GeoPrivateDefaultSpacingGeneratedStyles.controlCoarseSpacingStyles[position]);
}

function getInputSpacing(positions) {
  return positions.map((position) => GeoPrivateDefaultSpacingGeneratedStyles.inputSpacingStyles[position]);
}

// eslint-disable-next-line complexity
function selectSpacing({ bounds, context, relation, positions = ['vertical', 'horizontal'], offsets = [], target }) {
  switch (context) {
    case 'container':
      if (bounds === 'internal' && (relation === 'page' || relation === 'component')) {
        return getContainerInternalSpacing(relation, positions);
      }
      if (bounds === 'external' && (relation === 'related' || relation === 'unrelated' || relation === 'section')) {
        return getContainerExternalSpacing(relation, positions);
      }
      break;
    case 'component':
      if (bounds === 'internal') {
        switch (target) {
          case 'fine':
            return getComponentFineSpacing(positions, offsets);
          case 'coarse':
            return getComponentCoarseSpacing(positions, offsets);
          default:
            return getComponentNormalSpacing(positions, offsets);
        }
      }
      if (bounds === 'external' && (relation === 'related' || relation === 'unrelated')) {
        return getComponentExternalSpacing(relation, positions);
      }
      break;
    case 'content':
      if (['heading', 'paragraph', 'section'].includes(relation)) {
        return getContentExternalSpacing(relation, positions);
      }
      break;
    case 'control':
      if (bounds === 'internal') {
        switch (target) {
          case 'fine':
            return getControlFineSpacing(positions);
          case 'coarse':
            return getControlCoarseSpacing(positions);
          default:
            return getControlNormalSpacing(positions);
        }
      }
      break;
    case 'input':
      if (bounds === 'internal') {
        return getInputSpacing(positions);
      }
      break;
  }
  return null;
}

function getLayoutContainerExternalSpacing(relation, directions) {
  switch (relation) {
    case 'related':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutContainerExternalRelatedSpacingStyles[direction],
      );
    case 'unrelated':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutContainerExternalUnrelatedSpacingStyles[direction],
      );
    case 'section':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutContainerExternalSectionSpacingStyles[direction],
      );
  }
  return null;
}

function getLayoutComponentExternalSpacing(relation, directions) {
  switch (relation) {
    case 'related':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutComponentExternalRelatedSpacingStyles[direction],
      );
    case 'unrelated':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutComponentExternalUnrelatedSpacingStyles[direction],
      );
  }
  return null;
}

function getLayoutContentExternalSpacing(relation, directions) {
  switch (relation) {
    case 'heading':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutContentExternalHeadingSpacingStyles[direction],
      );
    case 'paragraph':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutContentExternalParagraphSpacingStyles[direction],
      );
    case 'section':
      return directions.map(
        (direction) => GeoPrivateDefaultSpacingGeneratedStyles.layoutContentExternalSectionSpacingStyles[direction],
      );
  }
  return null;
}

function selectLayoutSpacing({ context, relation, direction }) {
  let directions = [];
  switch (direction) {
    case 'vertical-reverse':
      directions.push('bottom');
      break;
    case 'vertical':
      directions.push('top');
      break;
    case 'horizontal-reverse':
      directions.push('start');
      break;
    case 'horizontal':
    default:
      directions.push('end');
      break;
  }

  switch (context) {
    case 'container':
      if (['related', 'unrelated', 'section'].includes(relation)) {
        return getLayoutContainerExternalSpacing(relation, directions);
      }
      break;
    case 'component':
      if (['related', 'unrelated'].includes(relation)) {
        return getLayoutComponentExternalSpacing(relation, directions);
      }
      break;
    case 'content':
      if (['heading', 'paragraph', 'section'].includes(relation)) {
        return getLayoutContentExternalSpacing(relation, directions);
      }
      break;
  }
  return null;
}

export const GeoSpacingSelectors = {
  selectSpacing,
  selectLayoutSpacing,
};
