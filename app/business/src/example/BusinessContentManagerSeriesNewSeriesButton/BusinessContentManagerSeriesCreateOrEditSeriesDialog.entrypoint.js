import JSResource from '@meta-core/relay/js-resource';

export const BusinessContentManagerSeriesCreateOrEditSeriesDialogEntryPoint = {
  root: JSResource('BusinessContentManagerSeriesCreateOrEditSeriesDialog', () =>
    import(
      /* webpackPrefetch: true */ '@meta-example/BusinessContentManagerSeriesNewSeriesButton/BusinessContentManagerSeriesCreateOrEditSeriesDialog'
    ),
  ),

  getPreloadProps: () => {
    return {};
  },
};
