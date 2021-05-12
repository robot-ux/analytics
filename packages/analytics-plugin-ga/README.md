# Google Analytics

### How to use

Below is an example of how to use the browser plugin.

#### Using npm:

```jsx
import Analytics from '@bna/analytics';
import Ga from '@bna/analytics-plugin-ga';

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    Ga({
      id: 'UA-167308739-1',
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

/* export the instance for usage in your app */
export default analytics;
```
