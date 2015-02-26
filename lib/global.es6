safari.application.addEventListener('message', function(e) {
  if (e.name !== 'getSettings') return;
  e.target.page.dispatchMessage('postSettings', {
    Google:     safari.extension.settings.Google     ,
    Yahoo:      safari.extension.settings.Yahoo      ,
    Bing:       safari.extension.settings.Bing       ,
    DuckDuckGo: safari.extension.settings.DuckDuckGo ,
    FocusOn:    safari.extension.settings.FocusOn
  });
}, false);
