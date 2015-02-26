(function(doc, addEventListener){
  const RE = {
          Google:     /^http.?:\/\/www\.google\.[^/]*\/search/ ,
          Yahoo:      /^http.?:\/\/search\.yahoo\.com\/search/ ,
          Bing:       /^http.?:\/\/www\.bing\.com\/search/     ,
          DuckDuckGo: /^http.?:\/\/duckduckgo\.com\/\?/
        },
        searchInput = {
          Google:     d => d.querySelectorAll('input[type=text]')[0] ,
          Yahoo:      d => d.getElementById('yschsp')                ,
          Bing:       d => d.getElementById('sb_form_q')             ,
          DuckDuckGo: d => d.getElementById('search_form_input')
        },
        pageBody = {
          Google:     d => d.getElementById('rcnt')      ,
          Yahoo:      d => d.getElementById('main')      ,
          Bing:       d => d.getElementById('b_content') ,
          DuckDuckGo: d => d.getElementsByClassName('site-wrapper')[0]
        },
        url = doc.location.href.toLowerCase(),
        site = RE.Google.test(url)     ? 'Google'     :
               RE.Yahoo.test(url)      ? 'Yahoo'      :
               RE.Bing.test(url)       ? 'Bing'       :
               RE.DuckDuckGo.test(url) ? 'DuckDuckGo' :
               undefined;

  addEventListener('message', function(e) {
    if(e.name !== 'postSettings') return undefined;
    const settings = e.message;
    if ((site !== undefined) && settings[site]) {
      searchInput[site](doc).focus();
      if (settings.FocusOn === 'page') {
        const e = doc.createEvent('Events');
        e.initEvent('click', true, false);
        pageBody[site](doc).dispatchEvent(e);
      }
    }
  }, false);
})(document, safari.self.addEventListener.bind(safari.self));
safari.self.tab.dispatchMessage('getSettings');
