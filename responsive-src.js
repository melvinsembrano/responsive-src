"use strict";

(function (window) {

  var responsiveSrc = function responsiveSrc(el, options) {
    this.uri = new ResponsiveSrc.URI(el.src);
    el.style.width = "100%";

    // this is an element specific function and callable later to update the image widht when resized
    this.setSrc = function () {
      el.src = this.uri.getNewUrl({ w: el.width });
    };

    this.setSrc();
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

  window.ResponsiveSrc = responsiveSrc;
  window.ResponsiveSrc.URI = uri;

  if (window.jQuery !== undefined) {
    (function ($) {
      $.fn.responsiveSrc = function (options) {
        return this.each(function () {
          var resp = new ResponsiveSrc(this, options);
          if (options && options.active) {
            $(window).on("resize", function () {
              resp.setSrc();
            });
          }
        });
      };
    })(jQuery);
  }
})(window);
//# sourceMappingURL=responsive-src.js.map
