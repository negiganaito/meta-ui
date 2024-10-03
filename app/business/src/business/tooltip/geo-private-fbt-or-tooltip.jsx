export function GeoPrivateFbtOrTooltip({ children }) {
  if (!children) return null;

  // return GeoFbtUtils.isFbt(children) ? <GeoTooltip content={children} /> : children;

  return children;
}
