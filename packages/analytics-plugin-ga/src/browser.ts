import { trackView, trackEvent } from './lib/ga';

export interface IUserConfig {
  id: string;
  clientId?: string;
  eventCategory?: string;
}

export default function gaAnalyticsPlugin(userConfig: IUserConfig) {
  // return object for analytics to use
  return {
    /* All plugins require a name */
    name: 'ga',
    /* Everything else below this is optional depending on your plugin requirements */
    config: {
      id: userConfig.id,
      clientId: userConfig.clientId,
      eventCategory: userConfig.eventCategory,
    },
    initialize: () => {},
    page: ({ config }: any) => {
      trackView({ uuid: config.id, clientId: config.clientId });
    },
    track: ({ payload, config }: any) => {
      trackEvent({
        uuid: config.id,
        clientId: config.clientId,
        eventAction: payload.event,
        eventLabel: JSON.stringify(payload.properties),
        eventCategory: config.eventCategory,
      });
    },
    identify: () => {},
    loaded: () => {
      return true;
    },
  };
}
