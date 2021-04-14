import { trackView, trackEvent } from './umami';

export interface IUserConfig {
  id: string;
  reportUri: string;
}

export default function umamiAnalyticsPlugin(userConfig: IUserConfig) {
  // return object for analytics to use
  return {
    /* All plugins require a name */
    name: 'umami',
    /* Everything else below this is optional depending on your plugin requirements */
    config: {
      id: userConfig.id,
      reportUri: userConfig.reportUri,
    },
    initialize: () => {
      // load provider script to page
    },
    page: ({ config }: any) => {
      // call provider specific page tracking
      trackView({ uuid: config.id, reportUri: config.reportUri });
    },
    track: ({ payload, config }: any) => {
      // call provider specific event tracking
      trackEvent(
        {
          type: payload.event,
          value: JSON.stringify(payload.properties),
        },
        {
          uuid: config.id,
          reportUri: config.reportUri,
        },
      );
    },
    identify: () => {
      // call provider specific user identify method
    },
    loaded: () => {
      // return boolean so analytics knows when it can send data to third party
      return true;
    },
  };
}
