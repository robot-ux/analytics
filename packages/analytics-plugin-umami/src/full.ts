import analytics, { AnalyticsInstance } from 'analytics';
import umamiAnalyticsPlugin, { IUserConfig } from './browser';

let _analytics: AnalyticsInstance;

const init = (config: IUserConfig) =>
  (_analytics = analytics({
    app: 'analytics-umami-app',
    version: '100',
    plugins: [umamiAnalyticsPlugin(config)],
  }));

const _getParams = (methodType: string) => {
  const q = (window as any)._analytics[methodType]?.q;
  return q && q[0];
};

const pre = () => {
  const initP = _getParams('init');
  const pageP = _getParams('page');
  const trackP = _getParams('track') || [];

  if (!initP) return;

  init(initP[0]);
  pageP[0] || _analytics.page(...pageP);
  trackP[0] && _analytics.track(trackP[0], trackP[1], trackP[2], trackP[3]);
};

typeof (window as any)._analytics !== 'undefined' && pre();

export default {
  init,
  page: (...args: any) => _analytics.page(...args),
  track: (...args: any) => _analytics.track(args[0], args[1], args[2], args[3]),
};
