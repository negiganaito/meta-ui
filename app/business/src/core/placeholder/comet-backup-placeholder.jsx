import { useCometPlaceholderImpl } from './use-comet-placeholder-impl';

export function CometBackupPlaceholder(props) {
  return useCometPlaceholderImpl({
    ...props, // eslint-disable-next-line camelcase
    unstable_avoidThisFallback: !0,
  });
}
