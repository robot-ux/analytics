import { getClientId } from './clientId';

type IHitTypes = {
  version: string;
  hitType: string;
  documentHostname: string;
  documentLocationUrl: string;
  documentPath: string;
  documentTitle: string;
  documentReferrer: string;
  screenResolution: string;
  userLanguage: string;

  trackId?: string;
  clientId?: string;

  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
};

const hitTypeMapping: IHitTypes = {
  version: 'v',
  hitType: 't',
  documentHostname: 'dh',
  documentLocationUrl: 'dl',
  documentPath: 'dp',
  documentTitle: 'dt',
  documentReferrer: 'dr',
  screenResolution: 'sr',
  userLanguage: 'ul',

  trackId: 'tid',
  clientId: 'cid',

  eventCategory: 'ec',
  eventAction: 'ea',
  eventLabel: 'el',
};

const getDefaultHitTypes = (): IHitTypes => {
  const {
    screen: { width, height },
    navigator: { language },
    location: { hostname, pathname, href },
  } = window;

  return {
    version: '1',
    hitType: 'event',
    documentHostname: hostname,
    documentLocationUrl: href,
    documentPath: pathname,
    documentTitle: document.title,
    documentReferrer: document.referrer,
    screenResolution: `${width}x${height}`,
    userLanguage: language,
  };
};

const compressKeys = (types: IHitTypes): object => {
  const res: { [k: string]: string } = {};

  Object.keys(types).forEach((k) => {
    const key = hitTypeMapping[k as keyof IHitTypes] || '';

    res[key] = types[k as keyof IHitTypes] || '';
  });

  return res;
};

const url = 'https://www.google-analytics.com/collect';

const post = (data: { [k: string]: any }, callback?: Function) => {
  const req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      callback && callback(req.response);
    }
  };

  const arr: Array<string> = [];
  Object.keys(data).forEach((k: string) => {
    arr.push(`${k}=${data[k]}`);
  });
  req.send(arr.join('&'));
};

export const trackView = ({ uuid, clientId }: { uuid: string; clientId: string }) => {
  post(
    compressKeys({
      ...getDefaultHitTypes(),
      hitType: 'pageview',
      trackId: uuid,
      clientId: clientId || getClientId(),
    }),
  );
};

export const trackEvent = ({
  uuid,
  eventAction,
  eventLabel,
  eventCategory,
  clientId,
}: {
  uuid: string;
  eventAction: string;
  eventLabel: string;
  clientId: string;
  eventCategory: string;
}) => {
  post(
    compressKeys({
      ...getDefaultHitTypes(),
      hitType: 'event',
      trackId: uuid,
      eventCategory: eventCategory || 'v0.0.0',
      eventAction,
      eventLabel,
      clientId: clientId || getClientId(),
    }),
  );
};
