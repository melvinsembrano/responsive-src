"use strict";

(function (window) {
  var ResponsiveSrc = function ResponsiveSrc(el, options) {
    this.uri = new ResponsiveSrc.URI(el.src);
    el.src = this.uri.getNewUrl({ w: el.width });
    return this;
  };

  var uri = function uri(url) {
    this.parser = document.createElement("a");
    this.parser.href = url;
    return this;
  };

  uri.prototype.fullPath = function () {
    return this.parser.protocol + "//" + this.parser.host + this.parser.pathname;
  };

  uri.prototype.path = function () {
    return this.parser.pathname;
  };

  uri.prototype.queryString = function (args) {
    if (args) {
      var params = [];
      for (var a in args) {
        if (args[a]) {
          params.push(a + "=" + args[a]);
        } else {
          params.push(a);
        }
      }
      return "?" + params.join("&");
    } else {
      return this.parser.search;
    }
  };

  uri.prototype.getNewUrl = function (args) {
    return this.fullPath() + this.queryString(args);
  };

  window.ResponsiveSrc = ResponsiveSrc;
  window.ResponsiveSrc.URI = uri;

  if (window.jQuery !== undefined) {
    (function ($) {

      $.fn.responsiveSrc = function (options) {
        return this.each(function () {
          new ResponsiveSrc(this, options);
        });
      };
    })(jQuery);
  }
})(window);
//# sourceMappingURL=responsive-src.js.map
