import store from 'src/store';

export const track = (page, lang) => {
  if (!window.gtag) return;

  window.gtag('config', 'UA-***', {
    page_path: `/${lang || store.getState().lang}/${page}`,
  });
  window.gtag('event', 'page_view');
};
