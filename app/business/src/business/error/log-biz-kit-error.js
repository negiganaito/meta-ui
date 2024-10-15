import { BizKitConstants } from '@meta-business/utils/biz-kit-constants';
import { FBLogger } from '@meta-core/error/fb-logger';

export const logBizKitError = (param) => {
  FBLogger(BizKitConstants.BIZKIT_PROJECT_NAME).catching(param).mustfix(param.message);
};
