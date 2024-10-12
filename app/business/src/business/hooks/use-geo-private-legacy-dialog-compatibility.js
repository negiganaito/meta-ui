import { useEffect } from 'react';
import { Layer } from '@meta-core/utils/layer';

export const useGeoPrivateLegacyDialogCompatibility = (props) => {
  useEffect(() => {
    if (props) {
      let b;
      let c = document.createElement('div');
      let d = document.createElement('div');
      b = new Layer({}, c);
      b.setInsertParent(d).show();

      return function () {
        return b === null ? undefined : b.destroy();
      };
    }
  }, [props]);
};
