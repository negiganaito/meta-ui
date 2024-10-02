export function getItemRoleFromCompositeRole(type) {
  switch (type) {
    case 'grid':
      return 'row';
    case 'listbox':
      return 'option';
    case 'list':
      return 'listitem';
    case 'radiogroup':
      return 'radio';
    case 'row':
      return 'gridcell';
    case 'tablist':
      return 'tab';
  }
  return null;
}
