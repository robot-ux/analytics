const _getCommonPayload = () => {
  const {
    screen: { width, height },
    navigator: { language },
    location: { hostname, pathname, search },
  } = window;
  const url = `${pathname}${search}`;
  const referrer = document.referrer;
  const screen = `${width}x${height}`;
  const key = 'umami.cache';
  const cache = sessionStorage.getItem(key);

  return {
    screen,
    language,
    hostname,
    cache,
    url,
    referrer,
  };
};

const post = (url: string, data: object, callback: Function) => {
  const req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json');

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      callback && callback(req.response);
    }
  };

  req.send(JSON.stringify(data));
};

type ICollectOptions = {
  reportUri: string;
  uuid: string;
};

const collect = (type: string, params: any, options: ICollectOptions) => {
  const key = 'umami.cache';
  const reportUri = options.reportUri || '';

  const payload = {
    ..._getCommonPayload(),
    website: options.uuid,
    ...params,
  };

  post(
    `${reportUri}/api/collect`,
    {
      type,
      payload,
    },
    (res: string) => sessionStorage.setItem(key, res),
  );
};

export const trackView = (options: ICollectOptions) => collect('pageview', {}, options);

export const trackEvent = (
  {
    type,
    value = 'custom',
  }: {
    type: string;
    value: string;
  },
  options: ICollectOptions,
) =>
  collect(
    'event',
    {
      event_type: type,
      event_value: value,
    },
    options,
  );
