!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t =
        'undefined' != typeof globalThis ? globalThis : t || self).snsWebSdk =
        e());
})(this, function () {
  'use strict';
  var t = function () {
    return (
      (t =
        Object.assign ||
        function (t) {
          for (var e, i = 1, n = arguments.length; i < n; i++)
            for (var o in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
          return t;
        }),
      t.apply(this, arguments)
    );
  };
  function e(t) {
    return t.endsWith('-v2') ? 2 : 1;
  }
  'function' == typeof SuppressedError && SuppressedError;
  var i = (function () {
      function i(t, e, i, n) {
        var o = this;
        (this.iframe = null),
          (this.iframeId = null),
          (this.sessionId = ''),
          (this.$container = null),
          (this.initialized = !1),
          (this.onMessage = function (t) {
            o.onSdkMessage(t);
          }),
          (this.baseUrl =
            t ||
            this.getCurrentBaseUrl('https://api.sumsub.com', e.accessToken)),
          (this.config = e),
          (this.config.packageVersion = this.getVersion()),
          (this.callbacks = i),
          (this.options = n);
      }
      return (
        (i.prototype.getVersion = function () {
          return '2.3.7';
        }),
        (i.prototype.getCurrentBaseUrl = function (t, e) {
          var i = ['_act-sbx-jwt-', '_act-jwt-'].find(function (t) {
            return e.startsWith(t);
          });
          if (i)
            for (
              var n = 0,
                o = e
                  .replace(i, '')
                  .replace('-v2', '')
                  .split('.')
                  .map(function (t) {
                    try {
                      return atob(t);
                    } catch (e) {
                      return t;
                    }
                  })
                  .map(function (t) {
                    try {
                      return JSON.parse(t);
                    } catch (e) {
                      return t;
                    }
                  });
              n < o.length;
              n++
            ) {
              var s = o[n];
              if (null == s ? void 0 : s.url) return s.url;
            }
          return t;
        }),
        (i.prototype.getIframeId = function () {
          if (2 === this.config.version)
            try {
              return btoa(this.config.accessToken);
            } catch (t) {
              return this.config.accessToken;
            }
          return String(Math.floor(1e8 * Math.random()));
        }),
        (i.prototype.launch = function (t) {
          this.options.addViewportTag && this.addViewportTag(),
            (this.iframe = this.createIframe(t)),
            (this.sessionId = ''),
            (this.iframeId = 'id_' + this.getIframeId()),
            this.iframe && this.config
              ? (this.registerEventListener(),
                (this.iframe.src = this.getIframeSrc()))
              : console.error(
                  'Idensic was not initialized since either provided element was not found in the DOM or invalid config',
                );
        }),
        (i.prototype.addViewportTag = function () {
          var t = document.getElementsByName('viewport');
          if (!t || 0 === t.length) {
            var e = document.createElement('meta');
            e.setAttribute('name', 'viewport'),
              e.setAttribute('content', 'width=device-width,user-scalable=yes'),
              document.head.appendChild(e);
          }
        }),
        (i.prototype.createIframe = function (t) {
          var e = 'string' == typeof t ? document.querySelector(t) : t;
          if (!e)
            return (
              console.error(
                'Provide a valid selector for the iframe container',
              ),
              null
            );
          this.$container = e;
          var i = document.createElement('iframe');
          for (
            i.width = '100%',
              i.scrolling = 'no',
              i.allow = 'camera; microphone; geolocation; clipboard-write',
              i.setAttribute('frameborder', '0');
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          return e.appendChild(i), i;
        }),
        (i.prototype.getIframeSrc = function () {
          var t = '?_=' + this.iframeId,
            e = 2 === this.config.version ? '/websdk' : '/idensic',
            i = this.baseUrl + e + '/websdk.html';
          return (
            2 === this.config.version &&
              this.config.theme &&
              (t += '&theme=' + this.config.theme),
            2 === this.config.version &&
              this.config.customizationName &&
              (t +=
                '&customizationName=' +
                encodeURIComponent(this.config.customizationName)),
            i + t
          );
        }),
        (i.prototype.registerEventListener = function () {
          window.addEventListener('message', this.onMessage);
        }),
        (i.prototype.onSdkMessage = function (e) {
          var i;
          if (this.baseUrl === e.origin) {
            var n = e.data;
            if (
              n.method &&
              ~n.method.indexOf('idCheck') &&
              (!this.sessionId || this.sessionId === n.sessionId) &&
              (null === (i = this.iframe) || void 0 === i
                ? void 0
                : i.contentWindow)
            ) {
              if (
                'idCheck.onReady' == n.method &&
                n.frameId === this.iframeId
              ) {
                this.sessionId = n.sessionId;
                var o = {
                  options: {adaptIframeHeight: this.options.adaptIframeHeight},
                };
                this.iframe.contentWindow.postMessage(
                  t(t({method: 'idCheck.init'}, this.config), o),
                  '*',
                );
              }
              if (
                ('idCheck.onInitialized' == n.method && (this.initialized = !0),
                'idCheck.onResize' == n.method &&
                  this.options.adaptIframeHeight &&
                  (this.iframe.style.height = n.height + 'px'),
                'idCheck.scrollTo' == n.method &&
                  this.options.adaptIframeHeight)
              )
                this.scrollTo(n.top);
              else {
                var s = n.method;
                delete n.method,
                  delete n.frameId,
                  delete n.sessionId,
                  'idCheck.onError' === s && 'invalid-token' === n.code
                    ? this.callExpirationHandler()
                    : 'idCheck.onError' === s &&
                      'function' == typeof this.callbacks.onError
                    ? this.callbacks.onError(n)
                    : 'function' == typeof this.callbacks.onMessage &&
                      this.callbacks.onMessage(s, n);
              }
            }
          }
        }),
        (i.prototype.callExpirationHandler = function () {
          var t = this,
            e = this.callbacks.expirationHandler;
          e.legacy
            ? e.handler(function (e) {
                return t.updateAccessTokenOrReinitialize(e);
              })
            : e.handler().then(
                function (e) {
                  return t.updateAccessTokenOrReinitialize(e);
                },
                function (e) {
                  null != e || (e = 'Failed to update access token'),
                    e.message && (e = e.message),
                    'string' != typeof e && (e = String(e)),
                    t.updateAccessToken(null, e);
                },
              );
        }),
        (i.prototype.updateAccessTokenOrReinitialize = function (t) {
          var i = e(t);
          if (this.iframe && !this.initialized && this.config.version != i)
            return (
              (this.sessionId = ''),
              (this.config.accessToken = t),
              (this.config.version = i),
              (this.baseUrl = this.getCurrentBaseUrl(this.baseUrl, t)),
              (this.iframeId = 'id_' + this.getIframeId()),
              void (this.iframe.src = this.getIframeSrc())
            );
          this.updateAccessToken(t);
        }),
        (i.prototype.scrollTo = function (t) {
          for (
            var e,
              i,
              n =
                null === (e = this.iframe) || void 0 === e
                  ? void 0
                  : e.parentElement;
            0 === (null == n ? void 0 : n.scrollTop) &&
            'BODY' !== (null == n ? void 0 : n.tagName);

          )
            n = null == n ? void 0 : n.parentElement;
          if (
            0 === (null == n ? void 0 : n.scrollTop) &&
            'BODY' === (null == n ? void 0 : n.tagName)
          ) {
            var o =
              (null === (i = this.iframe) || void 0 === i
                ? void 0
                : i.getBoundingClientRect().top) || 0;
            window.scrollTo({top: o + t, behavior: 'smooth'});
          } else null == n || n.scrollTo({top: t, behavior: 'smooth'});
        }),
        (i.prototype.updateAccessToken = function (t, e) {
          var i, n;
          null ===
            (n =
              null === (i = this.iframe) || void 0 === i
                ? void 0
                : i.contentWindow) ||
            void 0 === n ||
            n.postMessage(
              {method: 'idCheck.updateAccessToken', accessToken: t, error: e},
              '*',
            );
        }),
        (i.prototype.destroy = function () {
          for (
            window.removeEventListener('message', this.onMessage);
            this.$container && this.$container.firstChild;

          )
            this.$container.removeChild(this.$container.firstChild);
          this.$container = null;
        }),
        (i.prototype.navigateBack = function () {
          var t, e;
          null ===
            (e =
              null === (t = this.iframe) || void 0 === t
                ? void 0
                : t.contentWindow) ||
            void 0 === e ||
            e.postMessage({method: 'idCheck.callNavigationBack'}, '*');
        }),
        (i.prototype.setLanguage = function (t) {
          var e, i;
          null ===
            (i =
              null === (e = this.iframe) || void 0 === e
                ? void 0
                : e.contentWindow) ||
            void 0 === i ||
            i.postMessage(
              {method: 'idCheck.callSetLanguage', language: t},
              '*',
            );
        }),
        (i.prototype.setTheme = function (t) {
          var e, i;
          null ===
            (i =
              null === (e = this.iframe) || void 0 === e
                ? void 0
                : e.contentWindow) ||
            void 0 === i ||
            i.postMessage({method: 'idCheck.callSetTheme', theme: t}, '*');
        }),
        i
      );
    })(),
    n = (function () {
      function t(t, e) {
        if (
          ((this.config = null),
          (this.reusableConfig = null),
          (this.eventHandlers = {}),
          (this.anyEventHandler = null),
          (this.options = {adaptIframeHeight: !0, addViewportTag: !0}),
          'string' != typeof t)
        )
          throw new Error('Access token must be a string');
        if ('function' != typeof e)
          throw new Error('updateAccessToken callback is required');
        (this.accessToken = t), (this.updateAccessToken = e);
      }
      return (
        (t.prototype.onTestEnv = function () {
          return this;
        }),
        (t.prototype.withBaseUrl = function (t) {
          return (this.baseUrl = t), this;
        }),
        (t.prototype.withConf = function (t) {
          return (this.config = t), this;
        }),
        (t.prototype.withReusableKycConf = function (t) {
          return (this.reusableConfig = t), this;
        }),
        (t.prototype.withOptions = function (t) {
          return (
            t.hasOwnProperty('adaptIframeHeight') &&
              (this.options.adaptIframeHeight = t.adaptIframeHeight),
            t.hasOwnProperty('addViewportTag') &&
              (this.options.addViewportTag = t.addViewportTag),
            this
          );
        }),
        (t.prototype.on = function (t, e) {
          return (this.eventHandlers[t] = e), this;
        }),
        (t.prototype.onMessage = function (t) {
          return (this.anyEventHandler = t), this;
        }),
        (t.prototype.onNavigationUiControlsStateChanged = function (t) {
          return (
            (this.eventHandlers['idCheck.onNavigationUiControlsStateChanged'] =
              t),
            this
          );
        }),
        (t.prototype.build = function () {
          var t,
            n,
            o,
            s,
            r,
            a,
            c,
            d,
            l,
            h,
            u,
            f,
            p = this,
            g = e(this.accessToken);
          return new i(
            this.baseUrl,
            {
              version: g,
              theme:
                null === (t = this.config) || void 0 === t ? void 0 : t.theme,
              customizationName:
                null === (n = this.config) || void 0 === n
                  ? void 0
                  : n.customizationName,
              accessToken: this.accessToken,
              lang:
                null === (o = this.config) || void 0 === o ? void 0 : o.lang,
              email:
                null === (s = this.config) || void 0 === s ? void 0 : s.email,
              phone:
                null === (r = this.config) || void 0 === r ? void 0 : r.phone,
              country:
                null === (a = this.config) || void 0 === a ? void 0 : a.country,
              uiConf:
                null === (c = this.config) || void 0 === c ? void 0 : c.uiConf,
              i18n:
                null === (d = this.config) || void 0 === d ? void 0 : d.i18n,
              documentsByCountries:
                null === (l = this.config) || void 0 === l
                  ? void 0
                  : l.documentsByCountries,
              documentDefinitions:
                null === (h = this.config) || void 0 === h
                  ? void 0
                  : h.documentDefinitions,
              autoSelectDocumentDefinitions:
                null === (u = this.config) || void 0 === u
                  ? void 0
                  : u.autoSelectDocumentDefinitions,
              controlledNavigationBack:
                null === (f = this.config) || void 0 === f
                  ? void 0
                  : f.controlledNavigationBack,
              reusableConfig: this.reusableConfig,
            },
            {
              expirationHandler: {legacy: !1, handler: this.updateAccessToken},
              onMessage: function (t, e) {
                var i,
                  n = p.eventHandlers[t];
                n
                  ? n(e)
                  : null === (i = p.anyEventHandler) ||
                    void 0 === i ||
                    i.call(p, t, e);
              },
            },
            this.options,
          );
        }),
        t
      );
    })(),
    o = (function () {
      function t(t, e) {
        (this.debugEnabled = !1),
          (this.options = {adaptIframeHeight: !0, addViewportTag: !0}),
          (this.config = null),
          (this.reusableConfig = null),
          (this.accessToken = null),
          (this.expirationHandler = null),
          (this.baseUrl = t),
          (this.flowName = e);
      }
      return (
        (t.prototype.withAccessToken = function (t, e) {
          if (((this.accessToken = t), !e || 'function' != typeof e))
            throw new Error(
              'Invalid parameter, "expirationHandler" must be a function',
            );
          return (this.expirationHandler = e), this;
        }),
        (t.prototype.debug = function (t) {
          return (this.debugEnabled = t), this;
        }),
        (t.prototype.withOptions = function (t) {
          return (
            t.hasOwnProperty('adaptIframeHeight') &&
              (this.options.adaptIframeHeight = t.adaptIframeHeight),
            t.hasOwnProperty('addViewportTag') &&
              (this.options.addViewportTag = t.addViewportTag),
            this
          );
        }),
        (t.prototype.withConf = function (t) {
          return (this.config = t), this;
        }),
        (t.prototype.withReusableKycConf = function (t) {
          return (this.reusableConfig = t), this;
        }),
        (t.prototype.build = function () {
          var t, n, o, s, r, a, c, d, l, h, u, f, p;
          if (!this.accessToken || !this.expirationHandler)
            throw new Error(
              'Configure access token end the expiration handler before',
            );
          var g = e(this.accessToken);
          return new i(
            this.baseUrl,
            {
              version: g,
              theme:
                null === (t = this.config) || void 0 === t ? void 0 : t.theme,
              customizationName:
                null === (n = this.config) || void 0 === n
                  ? void 0
                  : n.customizationName,
              accessToken: this.accessToken,
              flowName: this.flowName,
              lang:
                null === (o = this.config) || void 0 === o ? void 0 : o.lang,
              email:
                null === (s = this.config) || void 0 === s ? void 0 : s.email,
              phone:
                null === (r = this.config) || void 0 === r ? void 0 : r.phone,
              country:
                null === (a = this.config) || void 0 === a ? void 0 : a.country,
              uiConf:
                null === (c = this.config) || void 0 === c ? void 0 : c.uiConf,
              i18n:
                null === (d = this.config) || void 0 === d ? void 0 : d.i18n,
              documentsByCountries:
                null === (l = this.config) || void 0 === l
                  ? void 0
                  : l.documentsByCountries,
              documentDefinitions:
                null === (h = this.config) || void 0 === h
                  ? void 0
                  : h.documentDefinitions,
              autoSelectDocumentDefinitions:
                null === (u = this.config) || void 0 === u
                  ? void 0
                  : u.autoSelectDocumentDefinitions,
              reusableConfig: this.reusableConfig,
            },
            {
              expirationHandler: {legacy: !0, handler: this.expirationHandler},
              onMessage:
                null === (f = this.config) || void 0 === f
                  ? void 0
                  : f.onMessage,
              onError:
                null === (p = this.config) || void 0 === p ? void 0 : p.onError,
            },
            {
              adaptIframeHeight: this.options.adaptIframeHeight,
              addViewportTag: this.options.addViewportTag,
              debug: this.debugEnabled,
            },
          );
        }),
        t
      );
    })();
  return {
    Builder: function (t, e) {
      return new o(t, e);
    },
    init: function (t, e) {
      return new n(t, e);
    },
  };
});
