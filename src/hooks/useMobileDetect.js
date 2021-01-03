import { getUserAgent } from 'utils/userAgent';

export default function useMobileDetect() {
  const { type } = getUserAgent().device;

  return type === 'mobile';
}
