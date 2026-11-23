// The three things that don't exist yet. Fill them in when they do; nothing else needs editing.
const SITE = {
  // The App Store link, once Waddles is live. Add Apple's campaign tags so App Store Connect can count
  // downloads from ads without any tracking in the app, e.g.
  //   https://apps.apple.com/app/id1234567890?pt=YOUR_PROVIDER_TOKEN&ct=whop-ads
  appStoreUrl: '',
  // Your Whop business ID (starts with biz_). The Whop Pixel loads only when this is set. It's needed
  // before Whop ads can point at this page, and the privacy policy already describes it.
  whopAccount: '',
};

(function () {
  // App Store buttons: live link when set, otherwise "Coming soon".
  for (const link of document.querySelectorAll('[data-app-store]')) {
    if (SITE.appStoreUrl) {
      link.href = SITE.appStoreUrl;
      link.addEventListener('click', () => window.whop && window.whop.track('app_store_click'));
    } else {
      link.textContent = 'Coming soon to the App Store';
      link.setAttribute('aria-disabled', 'true');
      link.removeAttribute('href');
    }
  }

  if (!SITE.whopAccount) return;
  // Whop Pixel, as given in Whop's docs (docs.whop.com/developer/ads/pixel). Website only, never in the app.
  !function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");
  window.whop.setScope(SITE.whopAccount);
  window.whop.track('page');
})();
