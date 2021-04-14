## Umami Analytics

This library exports the [Umami](https://umami.is/docs/about) plugin for the analytics package &
standalone methods for any project to use to make it easier to interact with Umami Analytics.

### How to use

Below is an example of how to use the browser plugin.

#### Using npm:

```jsx
import Analytics from '@binance-chain/analytics';
import umamiAnalytics from '@binance-chain/analytics-plugin-umami';

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    umamiAnalytics({
      id: 'UA-1234567',
      domain: 'https://your.umami.domain/',
    }),
  ],
});

/* Track a page view */
analytics.page();

/* Track a custom event */
analytics.track('playedVideo', {
  category: 'Videos',
  label: 'Fall Campaign',
  value: 42,
});
```

#### Using script tag:

```html
<script src="../dist/umd/analytics-with-umami.min.js"></script>
<script type="text/javascript">
  var c = function (n, fns) {
    var _n = (window[n] = window[n] || {});
    for (var i = 0; i < fns.length; i++) {
      (function (_i) {
        var fn = fns[_i];
        _n[fn] ||
          (_n[fn] = function () {
            (_n[fn].q = _n[fn].q || []).push(arguments);
          });
      })(i);
    }
  };
  c('_analytics', ['init', 'track', 'page']);

  /* Initialize analytics */
  _analytics.init({
    id: '2455d925-489d-4d28-be36-ad43c144e6af',
    domain: 'http://localhost:3000',
  });

  _analytics.page();
</script>
```
