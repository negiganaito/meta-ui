import JSResource from '@meta-core/relay/js-resource';

export const BusinessContentManagerSeriesCreateOrEditSeriesDialogEntryPoint = {
  root: JSResource('BusinessContentManagerSeriesCreateOrEditSeriesDialogEntryPoint', () =>
    import(/* webpackPrefetch: true */ '@BusinessContentManagerSeriesCreateOrEditSeriesDialogEntryPoint'),
  ),

  getPreloadProps: () => {
    return {};
  },
};
