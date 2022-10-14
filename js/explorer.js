(() => {
  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options.url, xhr);
      xhr.open(options.method || "GET", fixedUrl, true, options.username, options.password);
      if (options.headers) {
        try {
          for (var i = 0, header; (header = options.headers[i]) != null; i++) {
            xhr.setRequestHeader(header.field, header.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header2) {
            return header2.length > 0;
          }).map(function(header2) {
            var i2 = header2.indexOf(":");
            return mkHeader(header2.substring(0, i2))(header2.substring(i2 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options.responseType;
      xhr.withCredentials = options.withCredentials;
      xhr.timeout = options.timeout;
      xhr.send(options.content);
      return function(error3, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f(g(x))(g(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    return function(fa) {
      return function(f) {
        return map(dictFunctor)(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label) {
    return function(rec) {
      return rec[label];
    };
  };
  var unsafeSet = function(label) {
    return function(value2) {
      return function(rec) {
        var copy = {};
        for (var key in rec) {
          if ({}.hasOwnProperty.call(rec, key)) {
            copy[key] = rec[key];
          }
        }
        copy[label] = value2;
        return copy;
      };
    };
  };

  // output/Data.Semigroup/index.js
  var append = function(dict) {
    return dict.append;
  };
  var semigroupFn = function(dictSemigroup) {
    return {
      append: function(f) {
        return function(g) {
          return function(x) {
            return append(dictSemigroup)(f(x))(g(x));
          };
        };
      }
    };
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Apply/index.js
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    return function(a) {
      return function(b) {
        return apply(dictApply)(map(dictApply.Functor0())($$const(identity(categoryFn)))(a))(b);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    return function(f) {
      return function(a) {
        return apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(/[\0-\x1F\x7F"\\]/g, function(c, i) {
      switch (c) {
        case '"':
        case "\\":
          return "\\" + c;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k = i + 1;
      var empty4 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty4;
    }) + '"';
  };
  var cons = function(head4) {
    return function(tail2) {
      return [head4].concat(tail2);
    };
  };
  var intercalate = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showRecordFieldsNil = {
    showRecordFields: function(v) {
      return function(v1) {
        return [];
      };
    }
  };
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        return {
          show: function(record) {
            var v = showRecordFields(dictShowRecordFields)($$Proxy.value)(record);
            if (v.length === 0) {
              return "{}";
            }
            ;
            return intercalate(" ")(["{", intercalate(", ")(v), "}"]);
          }
        };
      };
    };
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    return function(dictShowRecordFields) {
      return function(dictShow) {
        return {
          showRecordFields: function(v) {
            return function(record) {
              var tail2 = showRecordFields(dictShowRecordFields)($$Proxy.value)(record);
              var key = reflectSymbol(dictIsSymbol)($$Proxy.value);
              var focus = unsafeGet(key)(record);
              return cons(intercalate(": ")([key, show(dictShow)(focus)]))(tail2);
            };
          }
        };
      };
    };
  };

  // output/Data.Generic.Rep/index.js
  var Inl = /* @__PURE__ */ function() {
    function Inl2(value0) {
      this.value0 = value0;
    }
    ;
    Inl2.create = function(value0) {
      return new Inl2(value0);
    };
    return Inl2;
  }();
  var Inr = /* @__PURE__ */ function() {
    function Inr2(value0) {
      this.value0 = value0;
    }
    ;
    Inr2.create = function(value0) {
      return new Inr2(value0);
    };
    return Inr2;
  }();
  var Product = /* @__PURE__ */ function() {
    function Product3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Product3.create = function(value0) {
      return function(value1) {
        return new Product3(value0, value1);
      };
    };
    return Product3;
  }();
  var Argument = function(x) {
    return x;
  };
  var to = function(dict) {
    return dict.to;
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity(categoryFn));
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map(functorMaybe)(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v) {
    if (v instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var unwrap = coerce;
  var under = function() {
    return function() {
      return function(v) {
        return coerce();
      };
    };
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce();
          };
        };
      };
    };
  };

  // output/Affjax.RequestHeader/index.js
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value = function(v) {
    if (v instanceof Accept) {
      return unwrap()(v.value0);
    }
    ;
    if (v instanceof ContentType) {
      return unwrap()(v.value0);
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
  };
  var name = function(v) {
    if (v instanceof Accept) {
      return "Accept";
    }
    ;
    if (v instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
  };

  // output/Affjax.ResponseFormat/index.js
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v) {
    if (v instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v instanceof Blob2) {
      return "blob";
    }
    ;
    if (v instanceof Document2) {
      return "document";
    }
    ;
    if (v instanceof Json2) {
      return "text";
    }
    ;
    if (v instanceof $$String2) {
      return "text";
    }
    ;
    if (v instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
  };
  var toMediaType2 = function(v) {
    if (v instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json = /* @__PURE__ */ function() {
    return new Json2(identity(categoryFn));
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity(categoryFn));
  }();

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    return function(f) {
      return function(g) {
        return function(a) {
          return bindFlipped(dictBind)(f)(g(a));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    return function(f) {
      return function(g) {
        return function(a) {
          return bind(dictBind)(f(a))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a) {
    return maybe(new Left(a))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map(functorEither)(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e) {
      return function(v) {
        return new Left(e);
      };
    })(function(a) {
      return function(f) {
        return f(a);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();
  var altEither = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return v1;
        }
        ;
        return v;
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    return function(f) {
      return function(a) {
        return bind(dictMonad.Bind1())(f)(function(f$prime) {
          return bind(dictMonad.Bind1())(a)(function(a$prime) {
            return pure(dictMonad.Applicative0())(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };
  var monoidFn = function(dictMonoid) {
    return {
      mempty: function(v) {
        return mempty(dictMonoid);
      },
      Semigroup0: function() {
        return semigroupFn(dictMonoid.Semigroup0());
      }
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name3, moduleName, init3) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init3();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Effect.Exception/foreign.js
  function message(e) {
    return e.message;
  }

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    return function(a) {
      return catchError(dictMonadError)(map(dictMonadError.MonadThrow0().Monad0().Bind1().Apply0().Functor0())(Right.create)(a))(function() {
        var $21 = pure(dictMonadError.MonadThrow0().Monad0().Applicative0());
        return function($22) {
          return $21(Left.create($22));
        };
      }());
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var not = function(dict) {
    return dict.not;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var showTuple = function(dictShow) {
    return function(dictShow1) {
      return {
        show: function(v) {
          return "(Tuple " + (show(dictShow)(v.value0) + (" " + (show(dictShow1)(v.value1) + ")")));
        }
      };
    };
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Effect.Class/index.js
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    return {
      map: function(f) {
        return mapExceptT(map(dictFunctor)(map(functorEither)(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    return {
      bind: function(v) {
        return function(k) {
          return bind(dictMonad.Bind1())(v)(either(function() {
            var $89 = pure(dictMonad.Applicative0());
            return function($90) {
              return $89(Left.create($90));
            };
          }())(function(a) {
            var v1 = k(a);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $91 = pure(dictMonad.Applicative0());
        return function($92) {
          return ExceptT($91(Right.create($92)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    return {
      throwError: function() {
        var $101 = pure(dictMonad.Applicative0());
        return function($102) {
          return ExceptT($101(Left.create($102)));
        };
      }(),
      Monad0: function() {
        return monadExceptT(dictMonad);
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    return function(dictMonad) {
      return {
        alt: function(v) {
          return function(v1) {
            return bind(dictMonad.Bind1())(v)(function(rm) {
              if (rm instanceof Right) {
                return pure(dictMonad.Applicative0())(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind(dictMonad.Bind1())(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure(dictMonad.Applicative0())(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure(dictMonad.Applicative0())(new Left(append(dictSemigroup)(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT(dictMonad.Bind1().Apply0().Functor0());
        }
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var runExcept = /* @__PURE__ */ function() {
    var $0 = unwrap();
    return function($1) {
      return $0(runExceptT($1));
    };
  }();

  // output/Data.Argonaut.Core/foreign.js
  function id(x) {
    return x;
  }
  var jsonNull = null;
  function stringify(j) {
    return JSON.stringify(j);
  }
  function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j) {
    if (j == null)
      return isNull3();
    else if (typeof j === "boolean")
      return isBool(j);
    else if (typeof j === "number")
      return isNum(j);
    else if (typeof j === "string")
      return isStr(j);
    else if (Object.prototype.toString.call(j) === "[object Array]")
      return isArr(j);
    else
      return isObj(j);
  }

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty = {};
  function runST(f) {
    return f();
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value2) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value2);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value2) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value2;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail2) {
        return new Cons3(head4, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var unconsImpl = function(empty4) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty4({}) : next(xs[0])(xs.slice(1));
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to3) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to3 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to3 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to3);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to3) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to3) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  function copyImpl(xs) {
    return function() {
      return xs.slice();
    };
  }
  var thaw = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to3) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to3 - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
      if (to3 - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to3);
      i = from3;
      j = mid;
      k = from3;
      while (i < mid && j < to3) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to3) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Array.ST/index.js
  var withArray = function(f) {
    return function(xs) {
      return function __do() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = function(a) {
    return pushAll([a]);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty2 = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    return function(f) {
      return bimap(dictBifunctor)(f)(identity(categoryFn));
    };
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    return {
      append: function(v) {
        return function(v1) {
          return disj(dictHeytingAlgebra)(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj(dictHeytingAlgebra);
      }
    };
  };

  // output/Data.Monoid.Endo/index.js
  var Endo = function(x) {
    return x;
  };
  var semigroupEndo = function(dictSemigroupoid) {
    return {
      append: function(v) {
        return function(v1) {
          return compose(dictSemigroupoid)(v)(v1);
        };
      }
    };
  };
  var monoidEndo = function(dictCategory) {
    return {
      mempty: identity(dictCategory),
      Semigroup0: function() {
        return semigroupEndo(dictCategory.Semigroupoid0());
      }
    };
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    return function(dictFoldable) {
      return function(f) {
        return foldr(dictFoldable)(function() {
          var $316 = applySecond(dictApplicative.Apply0());
          return function($317) {
            return $316(f($317));
          };
        }())(pure(dictApplicative)(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    return function(dictFoldable) {
      return flip(traverse_(dictApplicative)(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldMapDefaultR = function(dictFoldable) {
    return function(dictMonoid) {
      return function(f) {
        return foldr(dictFoldable)(function(x) {
          return function(acc) {
            return append(dictMonoid.Semigroup0())(f(x))(acc);
          };
        })(mempty(dictMonoid));
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    return function(dictHeytingAlgebra) {
      return alaF()()()()(Disj)(foldMap(dictFoldable)(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map2) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map2(array1)(f(array[bot]));
                  case 2:
                    return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map2(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Const/index.js
  var Const = function(x) {
    return x;
  };
  var functorConst = {
    map: function(f) {
      return function(m) {
        return m;
      };
    }
  };
  var applyConst = function(dictSemigroup) {
    return {
      apply: function(v) {
        return function(v1) {
          return append(dictSemigroup)(v)(v1);
        };
      },
      Functor0: function() {
        return functorConst;
      }
    };
  };
  var applicativeConst = function(dictMonoid) {
    return {
      pure: function(v) {
        return mempty(dictMonoid);
      },
      Apply0: function() {
        return applyConst(dictMonoid.Semigroup0());
      }
    };
  };

  // output/Data.Traversable/index.js
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    return function(dictApplicative) {
      return traverse(dictTraversable)(dictApplicative)(identity(categoryFn));
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      return traverseArrayImpl(apply(dictApplicative.Apply0()))(map(dictApplicative.Apply0().Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Data.Array/index.js
  var uncons = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var singleton2 = function(a) {
    return [a];
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    return function(dictMonoid) {
      return function(f) {
        return foldrWithIndex(dictFoldableWithIndex)(function(i) {
          return function(x) {
            return function(acc) {
              return append(dictMonoid.Semigroup0())(f(i)(x))(acc);
            };
          };
        })(mempty(dictMonoid));
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $167 = foldr(foldableArray)(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $168 = mapWithIndex(functorWithIndexArray)(Tuple.create);
        return function($169) {
          return $167($168($169));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $170 = foldl(foldableArray)(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $171 = mapWithIndex(functorWithIndexArray)(Tuple.create);
        return function($172) {
          return $170($171($172));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndexDefault = function(dictTraversableWithIndex) {
    return function(dictApplicative) {
      return function(f) {
        var $64 = sequence(dictTraversableWithIndex.Traversable2())(dictApplicative);
        var $65 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0())(f);
        return function($66) {
          return $64($65($66));
        };
      };
    };
  };
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };
  var traversableWithIndexArray = {
    traverseWithIndex: function(dictApplicative) {
      return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
    },
    FunctorWithIndex0: function() {
      return functorWithIndexArray;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexArray;
    },
    Traversable2: function() {
      return traversableArray;
    }
  };

  // output/Foreign.Object.ST/foreign.js
  var deleteImpl = function(k) {
    return function(m) {
      return function() {
        delete m[k];
        return m;
      };
    };
  };

  // output/Foreign.Object/index.js
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var $$delete = function(k) {
    return mutate(deleteImpl(k));
  };

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f) {
      return function(g) {
        return g(def)(f);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ function() {
    return verbJsonType(Nothing.value)(Just.create);
  }();
  var jsonEmptyObject = /* @__PURE__ */ id(empty);
  var caseJsonString = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
      };
    };
  };
  var toString = /* @__PURE__ */ toJsonType(caseJsonString);
  var caseJsonObject = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonNumber = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), f, $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonArray = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), f, $$const(d), j);
      };
    };
  };
  var toArray = /* @__PURE__ */ toJsonType(caseJsonArray);
  var caseJson = function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return function(e) {
            return function(f) {
              return function(json2) {
                return _caseJson(a, b, c, d, e, f, json2);
              };
            };
          };
        };
      };
    };
  };

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail2, succ, s) {
    try {
      return succ(JSON.parse(s));
    } catch (e) {
      return fail2(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Data.String.Common/foreign.js
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/JSURI/foreign.js
  function toRFC3896(input) {
    return input.replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }
  var _encodeFormURLComponent = function encode(fail2, succeed, input) {
    try {
      return succeed(toRFC3896(encodeURIComponent(input)).replace(/%20/g, "+"));
    } catch (err) {
      return fail2(err);
    }
  };

  // output/JSURI/index.js
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Data.FormURLEncoded/index.js
  var toArray2 = function(v) {
    return v;
  };
  var encode2 = /* @__PURE__ */ function() {
    var encodePart = function(v) {
      if (v.value1 instanceof Nothing) {
        return encodeFormURLComponent(v.value0);
      }
      ;
      if (v.value1 instanceof Just) {
        return apply(applyMaybe)(map(functorMaybe)(function(key) {
          return function(val) {
            return key + ("=" + val);
          };
        })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
    };
    var $16 = map(functorMaybe)(joinWith("&"));
    var $17 = traverse(traversableArray)(applicativeMaybe)(encodePart);
    return function($18) {
      return $16($17(toArray2($18)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET = /* @__PURE__ */ function() {
    function GET2() {
    }
    ;
    GET2.value = new GET2();
    return GET2;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST = /* @__PURE__ */ function() {
    function POST2() {
    }
    ;
    POST2.value = new POST2();
    return POST2;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v) {
    return v;
  };
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };
  var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton4 = function(dictPlus) {
    return function(a) {
      return new NonEmpty(a, empty2(dictPlus));
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_chunksAcc) {
      return function($copy_v) {
        var $tco_var_chunksAcc = $copy_chunksAcc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(chunksAcc, v) {
          if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
            $tco_var_chunksAcc = new Cons(v, chunksAcc);
            $copy_v = v.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v1) {
            if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
              return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
            }
            ;
            if (v1 instanceof Cons && v1.value1 instanceof Nil) {
              return new Cons(f(v1.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v1) {
            return function($copy_acc) {
              var $tco_var_v1 = $copy_v1;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v1, acc) {
                if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v1 = v1.value1;
                  $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                  return;
                }
                ;
                $tco_done1 = true;
                return acc;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b) {
        var rev = function() {
          var go = function($copy_acc) {
            return function($copy_v) {
              var $tco_var_acc = $copy_acc;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(acc, v) {
                if (v instanceof Nil) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v instanceof Cons) {
                  $tco_var_acc = new Cons(v.value0, acc);
                  $copy_v = v.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $copy_v);
              }
              ;
              return $tco_result;
            };
          };
          return go(Nil.value);
        }();
        var $205 = foldl(foldableList)(flip(f))(b);
        return function($206) {
          return $205(rev($206));
        };
      };
    },
    foldl: function(f) {
      var go = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go;
    },
    foldMap: function(dictMonoid) {
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $207 = append(dictMonoid.Semigroup0())(acc);
          return function($208) {
            return $207(f($208));
          };
        })(mempty(dictMonoid));
      };
    }
  };
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr(foldableList)(Cons.create)(ys)(xs);
      };
    }
  };
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append(semigroupList)(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: /* @__PURE__ */ append(semigroupList),
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith()(msg);
    });
  };

  // output/Data.List.NonEmpty/index.js
  var singleton5 = /* @__PURE__ */ function() {
    var $169 = singleton4(plusList);
    return function($170) {
      return NonEmptyList($169($170));
    };
  }();
  var head = function(v) {
    return v.value0;
  };

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _12, _22, _3) {
      this.tag = tag;
      this._1 = _12;
      this._2 = _22;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_12, _22, _3) {
        return new Aff2(tag, _12, _22, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error3) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function runSync(left2, right2, eff) {
      try {
        return right2(eff());
      } catch (error3) {
        return left2(error3);
      }
    }
    function runAsync(left2, eff, k) {
      try {
        return eff(k)();
      } catch (error3) {
        k(left2(error3))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size3 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size3 !== 0) {
          size3--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size3 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size3) % limit] = cb;
          size3++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error3) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step2 = aff;
      var fail2 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run4(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step2 = bhead(step2);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail2 = util.left(e);
                step2 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step2)) {
                status = RETURN;
                fail2 = step2;
                step2 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step2 = util.fromRight(step2);
              }
              break;
            case CONTINUE:
              switch (step2.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step2._2;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step2 = util.right(step2._1);
                  } else {
                    status = STEP_BIND;
                    step2 = step2._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step2 = runSync(util.left, util.right, step2._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step2 = runAsync(util.left, step2._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step2 = result2;
                        run4(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail2 = util.left(step2._1);
                  step2 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step2._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step2._1) {
                    tmp.run();
                  }
                  step2 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step2 = sequential2(util, supervisor, step2._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step2 = interrupt || fail2 || step2;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail2) {
                      status = CONTINUE;
                      step2 = attempt._2(util.fromLeft(fail2));
                      fail2 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step2 = util.fromRight(step2);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail2 === null) {
                      result = util.fromRight(step2);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step2 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail2), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step2 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail2) {
                      step2 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                    } else {
                      step2 = attempt._1.completed(util.fromRight(step2))(attempt._2);
                    }
                    fail2 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail2), attempts, interrupt);
                    status = CONTINUE;
                    step2 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step2 = attempt._1;
                    fail2 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step2));
                }
              }
              joins = null;
              if (interrupt && fail2) {
                setTimeout(function() {
                  throw util.fromLeft(fail2);
                }, 0);
              } else if (util.isLeft(step2) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step2);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join3) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join3.rethrow;
            join3.handler(step2)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join3;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error3, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error3);
              status = COMPLETED;
              step2 = interrupt;
              run4(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error3)), attempts, interrupt);
                }
                status = RETURN;
                step2 = null;
                fail2 = null;
                run4(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step2 = null;
                fail2 = null;
              }
          }
          return canceler;
        };
      }
      function join2(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run4(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join2,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run4(runTick);
              });
            } else {
              run4(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error3, par2, cb2) {
        var step2 = par2;
        var head4 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step2.tag) {
              case FORKED:
                if (step2._3 === EMPTY) {
                  tmp = fibers[step2._1];
                  kills2[count++] = tmp.kill(error3, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head4 === null) {
                  break loop;
                }
                step2 = head4._2;
                if (tail2 === null) {
                  head4 = null;
                } else {
                  head4 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step2 = step2._2;
                break;
              case APPLY:
              case ALT:
                if (head4) {
                  tail2 = new Aff2(CONS, head4, tail2);
                }
                head4 = step2;
                step2 = step2._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join2(result, head4, tail2) {
        var fail2, step2, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail2 = result;
          step2 = null;
        } else {
          step2 = result;
          fail2 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head4 === null) {
              cb(fail2 || step2)();
              return;
            }
            if (head4._3 !== EMPTY) {
              return;
            }
            switch (head4.tag) {
              case MAP:
                if (fail2 === null) {
                  head4._3 = util.right(head4._1(util.fromRight(step2)));
                  step2 = head4._3;
                } else {
                  head4._3 = fail2;
                }
                break;
              case APPLY:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (fail2) {
                  head4._3 = fail2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail2 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join2(fail2, null, null);
                      } else {
                        join2(fail2, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step2 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head4._3 = step2;
                }
                break;
              case ALT:
                lhs = head4._1._3;
                rhs = head4._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail2 = step2 === lhs ? rhs : lhs;
                  step2 = null;
                  head4._3 = fail2;
                } else {
                  head4._3 = step2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step2 === lhs ? head4._2 : head4._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join2(step2, null, null);
                      } else {
                        join2(step2, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail2 === null) {
              head4 = null;
            } else {
              head4 = tail2._1;
              tail2 = tail2._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join2(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run4() {
        var status = CONTINUE;
        var step2 = par;
        var head4 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step2.tag) {
                  case MAP:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                    step2 = step2._2;
                    break;
                  case APPLY:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  case ALT:
                    if (head4) {
                      tail2 = new Aff2(CONS, head4, tail2);
                    }
                    head4 = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step2;
                    step2 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step2)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head4 === null) {
                  break loop;
                }
                if (head4._1 === EMPTY) {
                  head4._1 = step2;
                  status = CONTINUE;
                  step2 = head4._2;
                  head4._2 = EMPTY;
                } else {
                  head4._2 = step2;
                  step2 = head4;
                  if (tail2 === null) {
                    head4 = null;
                  } else {
                    head4 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step2;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error3, cb2) {
        interrupt = util.left(error3);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error3, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run4();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value2) {
          return Aff.Pure(f(value2));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right2, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right2()));
          return function() {
            return Aff.Sync(function() {
              return right2(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Data.Profunctor/index.js
  var dimap = function(dict) {
    return dict.dimap;
  };
  var rmap = function(dictProfunctor) {
    return function(b2c) {
      return dimap(dictProfunctor)(identity(categoryFn))(b2c);
    };
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name3, moduleName, init3) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init3();
      state2 = 2;
      return val;
    };
  };
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 21 - line 409, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 20 - line 404, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 397, column 12 - line 399, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = /* @__PURE__ */ function() {
    var $39 = $$void(functorEffect);
    return function($40) {
      return $39(launchAff($40));
    };
  }();
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeAff)(unit));

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v) {
    return makeAff(function(k) {
      return function __do() {
        var v1 = v(function($4) {
          return k(Left.create($4))();
        }, function($5) {
          return k(Right.create($5))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do2() {
              v1(e, function($6) {
                return k2(Left.create($6))();
              }, function($7) {
                return k2(Right.create($7))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Foreign/foreign.js
  function tagOf(value2) {
    return Object.prototype.toString.call(value2).slice(8, -1);
  }
  var isArray = Array.isArray || function(value2) {
    return Object.prototype.toString.call(value2) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };

  // output/Data.Int/index.js
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();

  // output/Foreign/index.js
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return function(value1) {
        return new TypeMismatch3(value0, value1);
      };
    };
    return TypeMismatch3;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v) {
    if (v instanceof ForeignError) {
      return v.value0;
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "Error at array index " + (show(showInt)(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "Error at property " + (show(showString)(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $115 = throwError(monadThrowExceptT(dictMonad));
    return function($116) {
      return $115(singleton5($116));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    return function(tag) {
      return function(value2) {
        if (tagOf(value2) === tag) {
          return pure(applicativeExceptT(dictMonad))(unsafeFromForeign(value2));
        }
        ;
        if (otherwise) {
          return fail(dictMonad)(new TypeMismatch(tag, tagOf(value2)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value2.constructor.name]);
      };
    };
  };

  // output/Affjax/index.js
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v2) {
        if (v2 === "") {
          return pure(applicativeExceptT(monadIdentity))(jsonEmptyObject);
        }
        ;
        return either(function() {
          var $51 = fail(monadIdentity);
          return function($52) {
            return $51(ForeignError.create($52));
          };
        }())(pure(applicativeExceptT(monadIdentity)))(jsonParser(v2));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged(monadIdentity)("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob2) {
          return unsafeReadTagged(monadIdentity)("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x) {
            return alt(altExceptT(semigroupNonEmptyList)(monadIdentity))(unsafeReadTagged(monadIdentity)("Document")(x))(alt(altExceptT(semigroupNonEmptyList)(monadIdentity))(unsafeReadTagged(monadIdentity)("XMLDocument")(x))(unsafeReadTagged(monadIdentity)("HTMLDocument")(x)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped(bindExceptT(monadIdentity))(function($53) {
            return req.responseFormat.value0(parseJSON($53));
          })(unsafeReadTagged(monadIdentity)("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged(monadIdentity)("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure(applicativeExceptT(monadIdentity))(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v2) {
        if (v2 instanceof ArrayView) {
          return new Right(v2.value0(unsafeToForeign));
        }
        ;
        if (v2 instanceof Blob) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof Document) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof $$String) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormData) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map(functorMaybe)(unsafeToForeign)(encode2(v2.value0)));
        }
        ;
        if (v2 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any(foldableArray)(heytingAlgebraBoolean)(on(eq(eqString))(name)(mh.value0))(hs)) {
            return snoc(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map(functorMaybe)(ContentType.create)(bindFlipped(bindMaybe)(toMediaType)(reqContent)))(addHeader(map(functorMaybe)(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v2) {
        return {
          method: print(req.method),
          url: req.url,
          headers: map(functorArray)(function(h) {
            return {
              field: name(h),
              value: value(h)
            };
          })(headers(req.content)),
          content: v2,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map(functorMaybe)(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content) {
        return mapFlipped(functorAff)($$try(monadErrorAff)(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content)))))(function(v2) {
          if (v2 instanceof Right) {
            var v1 = runExcept(fromResponse(v2.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head(v1.value0), v2.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                body: v1.value0,
                headers: v2.value0.headers,
                status: v2.value0.status,
                statusText: v2.value0.statusText
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(function() {
              var message2 = message(v2.value0);
              var $38 = message2 === "AffjaxTimeoutErrorMessageIdent";
              if ($38) {
                return TimeoutError.value;
              }
              ;
              var $39 = message2 === "AffjaxRequestFailedMessageIdent";
              if ($39) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v2.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v = extractContent(req.content.value0);
        if (v instanceof Right) {
          return send(toNullable(new Just(v.value0)));
        }
        ;
        if (v instanceof Left) {
          return pure(applicativeAff)(new Left(new RequestContentError(v.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var printError = function(v) {
    if (v instanceof RequestContentError) {
      return "There was a problem with the request content: " + v.value0;
    }
    ;
    if (v instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v.value0);
    }
    ;
    if (v instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v.constructor.name]);
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();
  var get = function(driver2) {
    return function(rf) {
      return function(u) {
        return request(driver2)({
          method: defaultRequest.method,
          url: u,
          headers: defaultRequest.headers,
          content: defaultRequest.content,
          username: defaultRequest.username,
          password: defaultRequest.password,
          withCredentials: defaultRequest.withCredentials,
          responseFormat: rf,
          timeout: defaultRequest.timeout
        });
      };
    };
  };

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url) {
      return url || "/";
    }
  };

  // output/Affjax.Web/index.js
  var get2 = /* @__PURE__ */ get(driver);

  // output/Data.Argonaut.Aeson.Helpers/index.js
  var Mode = /* @__PURE__ */ function() {
    function Mode2(value0) {
      this.value0 = value0;
    }
    ;
    Mode2.create = function(value0) {
      return new Mode2(value0);
    };
    return Mode2;
  }();
  var isSingleConstructor_Sum = {
    isSingleConstructor: function(v) {
      return false;
    }
  };
  var isSingleConstructor_Constructor = {
    isSingleConstructor: function(v) {
      return true;
    }
  };
  var isSingleConstructor = function(dict) {
    return dict.isSingleConstructor;
  };
  var areAllConstructorsNullary_Product = {
    areAllConstructorsNullary: function(v) {
      return false;
    }
  };
  var areAllConstructorsNullary_Argument = {
    areAllConstructorsNullary: function(v) {
      return false;
    }
  };
  var areAllConstructorsNullary = function(dict) {
    return dict.areAllConstructorsNullary;
  };
  var areAllConstructorsNullary_Constructor = function(dictAreAllConstructorsNullary) {
    return {
      areAllConstructorsNullary: function(v) {
        return areAllConstructorsNullary(dictAreAllConstructorsNullary)($$Proxy.value);
      }
    };
  };
  var areAllConstructorsNullary_Sum = function(dictAreAllConstructorsNullary) {
    return function(dictAreAllConstructorsNullary1) {
      return {
        areAllConstructorsNullary: function(v) {
          return areAllConstructorsNullary(dictAreAllConstructorsNullary)($$Proxy.value) && areAllConstructorsNullary(dictAreAllConstructorsNullary1)($$Proxy.value);
        }
      };
    };
  };

  // output/Data.Argonaut.Decode.Error/index.js
  var TypeMismatch2 = /* @__PURE__ */ function() {
    function TypeMismatch3(value0) {
      this.value0 = value0;
    }
    ;
    TypeMismatch3.create = function(value0) {
      return new TypeMismatch3(value0);
    };
    return TypeMismatch3;
  }();
  var UnexpectedValue = /* @__PURE__ */ function() {
    function UnexpectedValue2(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedValue2.create = function(value0) {
      return new UnexpectedValue2(value0);
    };
    return UnexpectedValue2;
  }();
  var AtIndex = /* @__PURE__ */ function() {
    function AtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtIndex2.create = function(value0) {
      return function(value1) {
        return new AtIndex2(value0, value1);
      };
    };
    return AtIndex2;
  }();
  var AtKey = /* @__PURE__ */ function() {
    function AtKey2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtKey2.create = function(value0) {
      return function(value1) {
        return new AtKey2(value0, value1);
      };
    };
    return AtKey2;
  }();
  var Named = /* @__PURE__ */ function() {
    function Named2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Named2.create = function(value0) {
      return function(value1) {
        return new Named2(value0, value1);
      };
    };
    return Named2;
  }();
  var MissingValue = /* @__PURE__ */ function() {
    function MissingValue2() {
    }
    ;
    MissingValue2.value = new MissingValue2();
    return MissingValue2;
  }();
  var printJsonDecodeError = function(err) {
    var go = function(v) {
      if (v instanceof TypeMismatch2) {
        return "  Expected value of type '" + (v.value0 + "'.");
      }
      ;
      if (v instanceof UnexpectedValue) {
        return "  Unexpected value " + (stringify(v.value0) + ".");
      }
      ;
      if (v instanceof AtIndex) {
        return "  At array index " + (show(showInt)(v.value0) + (":\n" + go(v.value1)));
      }
      ;
      if (v instanceof AtKey) {
        return "  At object key '" + (v.value0 + ("':\n" + go(v.value1)));
      }
      ;
      if (v instanceof Named) {
        return "  Under '" + (v.value0 + ("':\n" + go(v.value1)));
      }
      ;
      if (v instanceof MissingValue) {
        return "  No value was found.";
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Decode.Error (line 37, column 8 - line 43, column 44): " + [v.constructor.name]);
    };
    return "An error occurred while decoding a JSON value:\n" + go(err);
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    };
    function finalCell(head4) {
      return new ConsCell(head4, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply2) {
      return function(map2) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply2(map2(consList)(f(x)))(ys);
          };
          var go = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last3 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go(buildFrom(last3, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map2(finalCell)(f(array[array.length - 1]));
            var result = go(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map2(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Data.Argonaut.Decode.Decoders/index.js
  var decodeString = /* @__PURE__ */ function() {
    return caseJsonString(new Left(new TypeMismatch2("String")))(Right.create);
  }();
  var decodeNumber = /* @__PURE__ */ function() {
    return caseJsonNumber(new Left(new TypeMismatch2("Number")))(Right.create);
  }();
  var decodeJArray = /* @__PURE__ */ function() {
    var $22 = note(new TypeMismatch2("Array"));
    return function($23) {
      return $22(toArray($23));
    };
  }();
  var decodeInt = /* @__PURE__ */ composeKleisliFlipped(bindEither)(/* @__PURE__ */ function() {
    var $54 = note(new TypeMismatch2("Integer"));
    return function($55) {
      return $54(fromNumber($55));
    };
  }())(decodeNumber);
  var decodeArray = function(decoder) {
    return composeKleisliFlipped(bindEither)(function() {
      var $59 = lmap(bifunctorEither)(Named.create("Array"));
      var $60 = traverseWithIndex(traversableWithIndexArray)(applicativeEither)(function(i) {
        var $62 = lmap(bifunctorEither)(AtIndex.create(i));
        return function($63) {
          return $62(decoder($63));
        };
      });
      return function($61) {
        return $59($60($61));
      };
    }())(decodeJArray);
  };
  var decodeTuple = function(decoderA) {
    return function(decoderB) {
      return function(json2) {
        var f = function(v) {
          if (v.length === 2) {
            return apply(applyEither)(map(functorEither)(Tuple.create)(decoderA(v[0])))(decoderB(v[1]));
          }
          ;
          return new Left(new TypeMismatch2("Tuple"));
        };
        return bind(bindEither)(decodeArray(Right.create)(json2))(f);
      };
    };
  };

  // output/Record/index.js
  var insert3 = function(dictIsSymbol) {
    return function() {
      return function() {
        return function(l) {
          return function(a) {
            return function(r) {
              return unsafeSet(reflectSymbol(dictIsSymbol)(l))(a)(r);
            };
          };
        };
      };
    };
  };

  // output/Data.Argonaut.Decode.Class/index.js
  var gDecodeJsonNil = {
    gDecodeJson: function(v) {
      return function(v1) {
        return new Right({});
      };
    }
  };
  var gDecodeJson = function(dict) {
    return dict.gDecodeJson;
  };
  var decodeRecord = function(dictGDecodeJson) {
    return function() {
      return {
        decodeJson: function(json2) {
          var v = toObject(json2);
          if (v instanceof Just) {
            return gDecodeJson(dictGDecodeJson)(v.value0)($$Proxy.value);
          }
          ;
          if (v instanceof Nothing) {
            return new Left(new TypeMismatch2("Object"));
          }
          ;
          throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 103, column 5 - line 105, column 46): " + [v.constructor.name]);
        }
      };
    };
  };
  var decodeJsonString = {
    decodeJson: decodeString
  };
  var decodeJsonInt = {
    decodeJson: decodeInt
  };
  var decodeJsonField = function(dict) {
    return dict.decodeJsonField;
  };
  var gDecodeJsonCons = function(dictDecodeJsonField) {
    return function(dictGDecodeJson) {
      return function(dictIsSymbol) {
        return function() {
          return function() {
            return {
              gDecodeJson: function(object) {
                return function(v) {
                  var fieldName = reflectSymbol(dictIsSymbol)($$Proxy.value);
                  var fieldValue = lookup(fieldName)(object);
                  var v1 = decodeJsonField(dictDecodeJsonField)(fieldValue);
                  if (v1 instanceof Just) {
                    return bind(bindEither)(lmap(bifunctorEither)(AtKey.create(fieldName))(v1.value0))(function(val) {
                      return bind(bindEither)(gDecodeJson(dictGDecodeJson)(object)($$Proxy.value))(function(rest) {
                        return new Right(insert3(dictIsSymbol)()()($$Proxy.value)(val)(rest));
                      });
                    });
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return new Left(new AtKey(fieldName, MissingValue.value));
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 127, column 5 - line 134, column 44): " + [v1.constructor.name]);
                };
              }
            };
          };
        };
      };
    };
  };
  var decodeJson = function(dict) {
    return dict.decodeJson;
  };
  var decodeJsonTuple = function(dictDecodeJson) {
    return function(dictDecodeJson1) {
      return {
        decodeJson: decodeTuple(decodeJson(dictDecodeJson))(decodeJson(dictDecodeJson1))
      };
    };
  };
  var decodeFieldId = function(dictDecodeJson) {
    return {
      decodeJsonField: function(j) {
        return map(functorMaybe)(decodeJson(dictDecodeJson))(j);
      }
    };
  };
  var decodeArray2 = function(dictDecodeJson) {
    return {
      decodeJson: decodeArray(decodeJson(dictDecodeJson))
    };
  };

  // output/Data.Argonaut.Decode.Generic/index.js
  var decodeRepArgsArgument = function(dictDecodeJson) {
    return {
      decodeRepArgs: function(js) {
        return bind(bindEither)(note(new TypeMismatch2("NonEmptyArray"))(uncons(js)))(function(v) {
          return map(functorEither)(function($66) {
            return function(v1) {
              return {
                init: v1,
                rest: v.tail
              };
            }(Argument($66));
          })(decodeJson(dictDecodeJson)(v.head));
        });
      }
    };
  };
  var decodeRepArgs = function(dict) {
    return dict.decodeRepArgs;
  };
  var decodeRepArgsProduct = function(dictDecodeRepArgs) {
    return function(dictDecodeRepArgs1) {
      return {
        decodeRepArgs: function(js) {
          return bind(bindEither)(decodeRepArgs(dictDecodeRepArgs)(js))(function(v) {
            return bind(bindEither)(decodeRepArgs(dictDecodeRepArgs1)(v.rest))(function(v1) {
              return pure(applicativeEither)({
                init: new Product(v.init, v1.init),
                rest: v1.rest
              });
            });
          });
        }
      };
    };
  };

  // output/Data.Argonaut.Aeson.Decode.Generic/index.js
  var toJsonArrayProduct = /* @__PURE__ */ caseJson(/* @__PURE__ */ $$const(/* @__PURE__ */ singleton2(jsonNull)))(function($93) {
    return singleton2(id($93));
  })(function($94) {
    return singleton2(id($94));
  })(function($95) {
    return singleton2(id($95));
  })(/* @__PURE__ */ identity(categoryFn))(function($96) {
    return singleton2(id($96));
  });
  var toJsonArray = /* @__PURE__ */ caseJson(/* @__PURE__ */ $$const(/* @__PURE__ */ singleton2(jsonNull)))(function($97) {
    return singleton2(id($97));
  })(function($98) {
    return singleton2(id($98));
  })(function($99) {
    return singleton2(id($99));
  })(function($100) {
    return singleton2(id($100));
  })(function($101) {
    return singleton2(id($101));
  });
  var decodingErr = function(name3) {
    return function(msg) {
      return new Named("When decoding a " + name3, msg);
    };
  };
  var decodeAeson$prime = function(dict) {
    return dict["decodeAeson'"];
  };
  var decodeAesonConstructor = function(dictDecodeRepArgs) {
    return function(dictIsSymbol) {
      return function(dictAreAllConstructorsNullary) {
        return function(dictIsSingleConstructor) {
          return function(dictDecodeAeson$prime) {
            return {
              decodeAeson: function(o) {
                return function(thing) {
                  var mode = new Mode({
                    "_Mode_ConstructorIsSingle": isSingleConstructor(dictIsSingleConstructor)($$Proxy.value),
                    "_Mode_ConstructorsAreAllNullary": areAllConstructorsNullary(dictAreAllConstructorsNullary)($$Proxy.value)
                  });
                  return decodeAeson$prime(dictDecodeAeson$prime)(mode)(o)(thing);
                };
              }
            };
          };
        };
      };
    };
  };
  var decodeAesonSum = function(dictDecodeAeson$prime) {
    return function(dictAreAllConstructorsNullary) {
      return function(dictIsSingleConstructor) {
        return {
          decodeAeson: function(o) {
            return function(thing) {
              var mode = new Mode({
                "_Mode_ConstructorIsSingle": isSingleConstructor(dictIsSingleConstructor)($$Proxy.value),
                "_Mode_ConstructorsAreAllNullary": areAllConstructorsNullary(dictAreAllConstructorsNullary)($$Proxy.value)
              });
              return decodeAeson$prime(dictDecodeAeson$prime)(mode)(o)(thing);
            };
          }
        };
      };
    };
  };
  var decodeAesonSum$prime = function(dictDecodeAeson$prime) {
    return function(dictDecodeAeson$prime1) {
      return {
        "decodeAeson'": function(mode) {
          return function(o) {
            return function(j) {
              return alt(altEither)(map(functorEither)(Inl.create)(decodeAeson$prime(dictDecodeAeson$prime)(mode)(o)(j)))(map(functorEither)(Inr.create)(decodeAeson$prime(dictDecodeAeson$prime1)(mode)(o)(j)));
            };
          };
        }
      };
    };
  };
  var decodeAeson = function(dict) {
    return dict.decodeAeson;
  };
  var genericDecodeAeson = function(dictGeneric) {
    return function(dictDecodeAeson) {
      return function(o) {
        var $102 = map(functorEither)(to(dictGeneric));
        var $103 = decodeAeson(dictDecodeAeson)(o);
        return function($104) {
          return $102($103($104));
        };
      };
    };
  };
  var checkTag = function(tagFieldName) {
    return function(expectedTag) {
      return composeKleisli(bindEither)(function() {
        var $105 = note(new Named(show(showString)(tagFieldName) + " property is missing", MissingValue.value));
        var $106 = lookup(tagFieldName);
        return function($107) {
          return $105($106($107));
        };
      }())(composeKleisli(bindEither)(function() {
        var $108 = note(new TypeMismatch2(show(showString)(tagFieldName) + " property is not a string"));
        return function($109) {
          return $108(toString($109));
        };
      }())(function(actualTag) {
        var $38 = actualTag !== expectedTag;
        if ($38) {
          return new Left(new Named("'tag' property has an incorrect value", new TypeMismatch2(actualTag)));
        }
        ;
        return new Right(unit);
      }));
    };
  };
  var decodeAesonConstructorProduct$prime = function(dictIsSymbol) {
    return function(dictDecodeRepArgs) {
      return function(dictDecodeRepArgs1) {
        return {
          "decodeAeson'": function(mode) {
            return function(options) {
              return function(json2) {
                var name3 = reflectSymbol(dictIsSymbol)($$Proxy.value);
                return lmap(bifunctorEither)(decodingErr(name3))(function() {
                  var $39 = {
                    mode,
                    options
                  };
                  if ($39["mode"]["value0"]["_Mode_ConstructorIsSingle"] && !$39.options.tagSingleConstructors) {
                    return bind(bindEither)(decodeRepArgs(decodeRepArgsProduct(dictDecodeRepArgs)(dictDecodeRepArgs1))(caseJsonArray(singleton2(json2))(identity(categoryFn))(json2)))(function(v) {
                      return pure(applicativeEither)(v.init);
                    });
                  }
                  ;
                  return bind(bindEither)(note(new TypeMismatch2("expected an object"))(toObject(json2)))(function(objectJson) {
                    return discard(discardUnit)(bindEither)(checkTag($39.options.sumEncoding.value0.tagFieldName)(name3)(objectJson))(function() {
                      return bind(bindEither)(function() {
                        var v = lookup($39.options.sumEncoding.value0.contentsFieldName)(objectJson);
                        if (v instanceof Just) {
                          return decodeRepArgs(decodeRepArgsProduct(dictDecodeRepArgs)(dictDecodeRepArgs1))(toJsonArrayProduct(v.value0));
                        }
                        ;
                        if (v instanceof Nothing) {
                          return decodeRepArgs(decodeRepArgsProduct(dictDecodeRepArgs)(dictDecodeRepArgs1))(singleton2(id($$delete($39.options.sumEncoding.value0.tagFieldName)(objectJson))));
                        }
                        ;
                        throw new Error("Failed pattern match at Data.Argonaut.Aeson.Decode.Generic (line 135, column 27 - line 139, column 115): " + [v.constructor.name]);
                      }())(function(v) {
                        return pure(applicativeEither)(v.init);
                      });
                    });
                  });
                }());
              };
            };
          }
        };
      };
    };
  };
  var decodeGeneralCase = function(dictIsSymbol) {
    return function(dictDecodeRepArgs) {
      return function(mode) {
        return function(options) {
          return function(json2) {
            var name3 = reflectSymbol(dictIsSymbol)($$Proxy.value);
            var $56 = {
              mode,
              options
            };
            return bind(bindEither)(note(new TypeMismatch2("expected an object"))(toObject(json2)))(function(objectJson) {
              return discard(discardUnit)(bindEither)(checkTag($56.options.sumEncoding.value0.tagFieldName)(name3)(objectJson))(function() {
                return bind(bindEither)(function() {
                  var v = lookup($56.options.sumEncoding.value0.contentsFieldName)(objectJson);
                  if (v instanceof Just) {
                    return decodeRepArgs(dictDecodeRepArgs)(toJsonArray(v.value0));
                  }
                  ;
                  if (v instanceof Nothing) {
                    return decodeRepArgs(dictDecodeRepArgs)(singleton2(id($$delete($56.options.sumEncoding.value0.tagFieldName)(objectJson))));
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Argonaut.Aeson.Decode.Generic (line 166, column 27 - line 170, column 115): " + [v.constructor.name]);
                }())(function(v) {
                  return pure(applicativeEither)(v.init);
                });
              });
            });
          };
        };
      };
    };
  };
  var decodeAesonConstructor$prime = function(dictIsSymbol) {
    return function(dictDecodeRepArgs) {
      return {
        "decodeAeson'": function(mode) {
          return function(options) {
            return function(json2) {
              var name3 = reflectSymbol(dictIsSymbol)($$Proxy.value);
              return lmap(bifunctorEither)(decodingErr(name3))(function() {
                var $65 = {
                  mode,
                  options
                };
                if ($65["mode"]["value0"]["_Mode_ConstructorsAreAllNullary"]) {
                  return unsafeCrashWith("Unreachable: cannot have all nullary constructors and an `Argument` constructor at once.");
                }
                ;
                if ($65["mode"]["value0"]["_Mode_ConstructorIsSingle"] && !$65.options.tagSingleConstructors) {
                  return bind(bindEither)(decodeRepArgs(dictDecodeRepArgs)(caseJsonArray(singleton2(json2))(function($110) {
                    return singleton2(id($110));
                  })(json2)))(function(v) {
                    return pure(applicativeEither)(v.init);
                  });
                }
                ;
                return decodeGeneralCase(dictIsSymbol)(dictDecodeRepArgs)(mode)(options)(json2);
              }());
            };
          };
        }
      };
    };
  };

  // output/Data.Argonaut.Aeson.Options/index.js
  var TaggedObject = /* @__PURE__ */ function() {
    function TaggedObject2(value0) {
      this.value0 = value0;
    }
    ;
    TaggedObject2.create = function(value0) {
      return new TaggedObject2(value0);
    };
    return TaggedObject2;
  }();
  var defaultOptions = /* @__PURE__ */ function() {
    return {
      sumEncoding: new TaggedObject({
        tagFieldName: "tag",
        contentsFieldName: "contents"
      }),
      tagSingleConstructors: false,
      allNullaryToStringTag: true
    };
  }();

  // output/Data.Lens.Internal.Forget/index.js
  var Forget = function(x) {
    return x;
  };
  var profunctorForget = {
    dimap: function(f) {
      return function(v) {
        return function(v1) {
          return function($24) {
            return v1(f($24));
          };
        };
      };
    }
  };
  var strongForget = {
    first: function(v) {
      return function($25) {
        return v(fst($25));
      };
    },
    second: function(v) {
      return function($26) {
        return v(snd($26));
      };
    },
    Profunctor0: function() {
      return profunctorForget;
    }
  };
  var choiceForget = function(dictMonoid) {
    return {
      left: function(v) {
        return either(v)(mempty(monoidFn(dictMonoid)));
      },
      right: function(v) {
        return either(mempty(monoidFn(dictMonoid)))(v);
      },
      Profunctor0: function() {
        return profunctorForget;
      }
    };
  };
  var wanderForget = function(dictMonoid) {
    return {
      wander: function(f) {
        return function(v) {
          return alaF()()()()(Const)(f(applicativeConst(dictMonoid)))(v);
        };
      },
      Strong0: function() {
        return strongForget;
      },
      Choice1: function() {
        return choiceForget(dictMonoid);
      }
    };
  };

  // output/Data.Profunctor.Choice/index.js
  var right = function(dict) {
    return dict.right;
  };

  // output/Data.Profunctor.Strong/index.js
  var second = function(dict) {
    return dict.second;
  };
  var first = function(dict) {
    return dict.first;
  };

  // output/Data.Lens.Internal.Wander/index.js
  var wander = function(dict) {
    return dict.wander;
  };

  // output/Data.Lens.Iso/index.js
  var iso = function(f) {
    return function(g) {
      return function(dictProfunctor) {
        return function(pab) {
          return dimap(dictProfunctor)(f)(g)(pab);
        };
      };
    };
  };
  var coerced = function() {
    return function() {
      return function(dictProfunctor) {
        return iso(coerce())(coerce())(dictProfunctor);
      };
    };
  };

  // output/Data.Lens.Iso.Newtype/index.js
  var _Newtype = function() {
    return function() {
      return function(dictProfunctor) {
        return coerced()()(dictProfunctor);
      };
    };
  };

  // output/Data.Lens.Prism/index.js
  var prism = function(to3) {
    return function(fro) {
      return function(dictChoice) {
        return function(pab) {
          return dimap(dictChoice.Profunctor0())(fro)(either(identity(categoryFn))(identity(categoryFn)))(right(dictChoice)(rmap(dictChoice.Profunctor0())(to3)(pab)));
        };
      };
    };
  };
  var prism$prime = function(to3) {
    return function(fro) {
      return function(dictChoice) {
        return prism(to3)(function(s) {
          return maybe(new Left(s))(Right.create)(fro(s));
        })(dictChoice);
      };
    };
  };

  // output/KitchenSink.Blog.Advanced/index.js
  var HeaderMark = /* @__PURE__ */ function() {
    function HeaderMark2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    HeaderMark2.create = function(value0) {
      return function(value1) {
        return new HeaderMark2(value0, value1);
      };
    };
    return HeaderMark2;
  }();
  var ImageMark = /* @__PURE__ */ function() {
    function ImageMark2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ImageMark2.create = function(value0) {
      return function(value1) {
        return new ImageMark2(value0, value1);
      };
    };
    return ImageMark2;
  }();
  var TextualMark = /* @__PURE__ */ function() {
    function TextualMark2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TextualMark2.create = function(value0) {
      return function(value1) {
        return new TextualMark2(value0, value1);
      };
    };
    return TextualMark2;
  }();
  var TopicNode = /* @__PURE__ */ function() {
    function TopicNode2(value0) {
      this.value0 = value0;
    }
    ;
    TopicNode2.create = function(value0) {
      return new TopicNode2(value0);
    };
    return TopicNode2;
  }();
  var ArticleNode = /* @__PURE__ */ function() {
    function ArticleNode2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ArticleNode2.create = function(value0) {
      return function(value1) {
        return new ArticleNode2(value0, value1);
      };
    };
    return ArticleNode2;
  }();
  var ImageNode = /* @__PURE__ */ function() {
    function ImageNode2(value0) {
      this.value0 = value0;
    }
    ;
    ImageNode2.create = function(value0) {
      return new ImageNode2(value0);
    };
    return ImageNode2;
  }();
  var genericTopicGraph = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var genericSkyLineItem = {
    to: function(x) {
      if (x instanceof Inl) {
        return new HeaderMark(x.value0.value0, x.value0.value1);
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inl) {
        return new ImageMark(x.value0.value0.value0, x.value0.value0.value1);
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inr) {
        return new TextualMark(x.value0.value0.value0, x.value0.value0.value1);
      }
      ;
      throw new Error("Failed pattern match at KitchenSink.Blog.Advanced (line 96, column 1 - line 96, column 60): " + [x.constructor.name]);
    },
    from: function(x) {
      if (x instanceof HeaderMark) {
        return new Inl(new Product(x.value0, x.value1));
      }
      ;
      if (x instanceof ImageMark) {
        return new Inr(new Inl(new Product(x.value0, x.value1)));
      }
      ;
      if (x instanceof TextualMark) {
        return new Inr(new Inr(new Product(x.value0, x.value1)));
      }
      ;
      throw new Error("Failed pattern match at KitchenSink.Blog.Advanced (line 96, column 1 - line 96, column 60): " + [x.constructor.name]);
    }
  };
  var genericSkyLine = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var genericPathList = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var genericNode = {
    to: function(x) {
      if (x instanceof Inl) {
        return new TopicNode(x.value0);
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inl) {
        return new ArticleNode(x.value0.value0.value0, x.value0.value0.value1);
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inr) {
        return new ImageNode(x.value0.value0);
      }
      ;
      throw new Error("Failed pattern match at KitchenSink.Blog.Advanced (line 48, column 1 - line 48, column 46): " + [x.constructor.name]);
    },
    from: function(x) {
      if (x instanceof TopicNode) {
        return new Inl(x.value0);
      }
      ;
      if (x instanceof ArticleNode) {
        return new Inr(new Inl(new Product(x.value0, x.value1)));
      }
      ;
      if (x instanceof ImageNode) {
        return new Inr(new Inr(x.value0));
      }
      ;
      throw new Error("Failed pattern match at KitchenSink.Blog.Advanced (line 48, column 1 - line 48, column 46): " + [x.constructor.name]);
    }
  };
  var genericLinkInfo = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var genericImageInfo = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var decodeJsonSkyLineItem = {
    decodeJson: /* @__PURE__ */ genericDecodeAeson(genericSkyLineItem)(/* @__PURE__ */ decodeAesonSum(/* @__PURE__ */ decodeAesonSum$prime(/* @__PURE__ */ decodeAesonConstructorProduct$prime({
      reflectSymbol: function() {
        return "HeaderMark";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonString))(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeArray2(decodeJsonInt))))(/* @__PURE__ */ decodeAesonSum$prime(/* @__PURE__ */ decodeAesonConstructorProduct$prime({
      reflectSymbol: function() {
        return "ImageMark";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonString))(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonString)))(/* @__PURE__ */ decodeAesonConstructorProduct$prime({
      reflectSymbol: function() {
        return "TextualMark";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonInt))(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeArray2(decodeJsonInt))))))(/* @__PURE__ */ areAllConstructorsNullary_Sum(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Product))(/* @__PURE__ */ areAllConstructorsNullary_Sum(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Product))(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Product))))(isSingleConstructor_Sum))(defaultOptions)
  };
  var decodeJsonSkyLine = {
    decodeJson: /* @__PURE__ */ genericDecodeAeson(genericSkyLine)(/* @__PURE__ */ decodeAesonConstructor(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeArray2(decodeJsonSkyLineItem)))(gDecodeJsonNil)({
      reflectSymbol: function() {
        return "skylineItems";
      }
    })()())()))({
      reflectSymbol: function() {
        return "SkyLine";
      }
    })(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(isSingleConstructor_Constructor)(/* @__PURE__ */ decodeAesonConstructor$prime({
      reflectSymbol: function() {
        return "SkyLine";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeArray2(decodeJsonSkyLineItem)))(gDecodeJsonNil)({
      reflectSymbol: function() {
        return "skylineItems";
      }
    })()())()))))(defaultOptions)
  };
  var decodeJsonNode = {
    decodeJson: /* @__PURE__ */ genericDecodeAeson(genericNode)(/* @__PURE__ */ decodeAesonSum(/* @__PURE__ */ decodeAesonSum$prime(/* @__PURE__ */ decodeAesonConstructor$prime({
      reflectSymbol: function() {
        return "TopicNode";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonInt)))(/* @__PURE__ */ decodeAesonSum$prime(/* @__PURE__ */ decodeAesonConstructorProduct$prime({
      reflectSymbol: function() {
        return "ArticleNode";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonString))(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonInt)))(/* @__PURE__ */ decodeAesonConstructor$prime({
      reflectSymbol: function() {
        return "ImageNode";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(decodeJsonString)))))(/* @__PURE__ */ areAllConstructorsNullary_Sum(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(/* @__PURE__ */ areAllConstructorsNullary_Sum(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Product))(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))))(isSingleConstructor_Sum))(defaultOptions)
  };
  var decodeJsonLinkInfo = {
    decodeJson: /* @__PURE__ */ genericDecodeAeson(genericLinkInfo)(/* @__PURE__ */ decodeAesonConstructor(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(gDecodeJsonNil)({
      reflectSymbol: function() {
        return "linkURL";
      }
    })()())({
      reflectSymbol: function() {
        return "linkText";
      }
    })()())()))({
      reflectSymbol: function() {
        return "LinkInfo";
      }
    })(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(isSingleConstructor_Constructor)(/* @__PURE__ */ decodeAesonConstructor$prime({
      reflectSymbol: function() {
        return "LinkInfo";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(gDecodeJsonNil)({
      reflectSymbol: function() {
        return "linkURL";
      }
    })()())({
      reflectSymbol: function() {
        return "linkText";
      }
    })()())()))))(defaultOptions)
  };
  var decodeJsonImageInfo = {
    decodeJson: /* @__PURE__ */ genericDecodeAeson(genericImageInfo)(/* @__PURE__ */ decodeAesonConstructor(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(gDecodeJsonNil)({
      reflectSymbol: function() {
        return "imageURL";
      }
    })()())({
      reflectSymbol: function() {
        return "imageText";
      }
    })()())()))({
      reflectSymbol: function() {
        return "ImageInfo";
      }
    })(/* @__PURE__ */ areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(isSingleConstructor_Constructor)(/* @__PURE__ */ decodeAesonConstructor$prime({
      reflectSymbol: function() {
        return "ImageInfo";
      }
    })(/* @__PURE__ */ decodeRepArgsArgument(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString))(gDecodeJsonNil)({
      reflectSymbol: function() {
        return "imageURL";
      }
    })()())({
      reflectSymbol: function() {
        return "imageText";
      }
    })()())()))))(defaultOptions)
  };
  var _TopicNode = function(dictChoice) {
    var f = function(v) {
      if (v instanceof TopicNode) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    };
    return prism$prime(TopicNode.create)(f)(dictChoice);
  };
  var _TopicGraph = function(dictProfunctor) {
    return _Newtype()()(dictProfunctor);
  };
  var _PathList = function(dictProfunctor) {
    return _Newtype()()(dictProfunctor);
  };
  var _LinkInfo = function(dictProfunctor) {
    return _Newtype()()(dictProfunctor);
  };
  var _ImageNode = function(dictChoice) {
    var f = function(v) {
      if (v instanceof ImageNode) {
        return new Just(v.value0);
      }
      ;
      return Nothing.value;
    };
    return prism$prime(ImageNode.create)(f)(dictChoice);
  };
  var _ArticleNode = function(dictChoice) {
    var f = function(v) {
      if (v instanceof ArticleNode) {
        return new Just({
          a: v.value0,
          b: v.value1
        });
      }
      ;
      return Nothing.value;
    };
    return prism$prime(function(v) {
      return new ArticleNode(v.a, v.b);
    })(f)(dictChoice);
  };

  // output/Bridge/index.js
  var genericArticleInfos = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var _ArticleInfos = function(dictProfunctor) {
    return _Newtype()()(dictProfunctor);
  };

  // output/Data.Lens.Fold/index.js
  var foldMapOf = /* @__PURE__ */ under()()(Forget);
  var foldrOf = function(p) {
    return function(f) {
      return function(r) {
        var $75 = flip(unwrap())(r);
        var $76 = foldMapOf(p)(function($78) {
          return Endo(f($78));
        });
        return function($77) {
          return $75($76($77));
        };
      };
    };
  };
  var toListOf = function(p) {
    return foldrOf(p)(Cons.create)(Nil.value);
  };

  // output/Data.Lens.Getter/index.js
  var view = function(l) {
    return unwrap()(l(identity(categoryFn)));
  };
  var to2 = function(f) {
    return function(p) {
      var $3 = unwrap()(p);
      return function($4) {
        return $3(f($4));
      };
    };
  };

  // output/Data.Lens.Lens.Tuple/index.js
  var _2 = function(dictStrong) {
    return second(dictStrong);
  };
  var _1 = function(dictStrong) {
    return first(dictStrong);
  };

  // output/Data.Lens.Traversal/index.js
  var traversed = function(dictTraversable) {
    return function(dictWander) {
      return wander(dictWander)(function(dictApplicative) {
        return traverse(dictTraversable)(dictApplicative);
      });
    };
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Main/index.js
  var topicsGraphPath = "/json/topicsgraph.json";
  var sitePaths = "/json/paths.json";
  var fetchPaths = /* @__PURE__ */ bind(bindAff)(/* @__PURE__ */ get2(json)(sitePaths))(function(resp) {
    return pure(applicativeAff)(map(functorEither)(function(x) {
      return genericDecodeAeson(genericPathList)(decodeAesonConstructor(decodeRepArgsArgument(decodeArray2(decodeJsonString)))({
        reflectSymbol: function() {
          return "PathList";
        }
      })(areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(isSingleConstructor_Constructor)(decodeAesonConstructor$prime({
        reflectSymbol: function() {
          return "PathList";
        }
      })(decodeRepArgsArgument(decodeArray2(decodeJsonString)))))(defaultOptions)(x.body);
    })(resp));
  });
  var run3 = /* @__PURE__ */ bind(bindAff)(fetchPaths)(function(get5) {
    if (get5 instanceof Left) {
      return liftEffect(monadEffectAff)(log2("Error fetching Paths: " + printError(get5.value0)));
    }
    ;
    if (get5 instanceof Right && get5.value0 instanceof Left) {
      return liftEffect(monadEffectAff)(log2("Error decoding Paths: " + printJsonDecodeError(get5.value0.value0)));
    }
    ;
    if (get5 instanceof Right && get5.value0 instanceof Right) {
      return liftEffect(monadEffectAff)(for_(applicativeEffect)(foldableList)(toListOf(function() {
        var $25 = _PathList(profunctorForget);
        var $26 = traversed(traversableArray)(wanderForget(monoidEndo(categoryFn)));
        return function($27) {
          return $25($26($27));
        };
      }())(get5.value0.value0))(log2));
    }
    ;
    throw new Error("Failed pattern match at Main (line 75, column 3 - line 79, column 58): " + [get5.constructor.name]);
  });
  var fetchGraph = /* @__PURE__ */ bind(bindAff)(/* @__PURE__ */ get2(json)(topicsGraphPath))(function(resp) {
    return pure(applicativeAff)(map(functorEither)(function(x) {
      return genericDecodeAeson(genericTopicGraph)(decodeAesonConstructor(decodeRepArgsArgument(decodeRecord(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonTuple(decodeJsonString)(decodeJsonString))))(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonTuple(decodeJsonString)(decodeJsonNode))))(gDecodeJsonNil)({
        reflectSymbol: function() {
          return "nodes";
        }
      })()())({
        reflectSymbol: function() {
          return "edges";
        }
      })()())()))({
        reflectSymbol: function() {
          return "TopicGraph";
        }
      })(areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(isSingleConstructor_Constructor)(decodeAesonConstructor$prime({
        reflectSymbol: function() {
          return "TopicGraph";
        }
      })(decodeRepArgsArgument(decodeRecord(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonTuple(decodeJsonString)(decodeJsonString))))(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonTuple(decodeJsonString)(decodeJsonNode))))(gDecodeJsonNil)({
        reflectSymbol: function() {
          return "nodes";
        }
      })()())({
        reflectSymbol: function() {
          return "edges";
        }
      })()())()))))(defaultOptions)(x.body);
    })(resp));
  });
  var run1 = /* @__PURE__ */ bind(bindAff)(fetchGraph)(function(get5) {
    if (get5 instanceof Left) {
      return liftEffect(monadEffectAff)(log2("Error fetching TopicGraph: " + printError(get5.value0)));
    }
    ;
    if (get5 instanceof Right && get5.value0 instanceof Left) {
      return liftEffect(monadEffectAff)(log2("Error decoding TopicGraph: " + printJsonDecodeError(get5.value0.value0)));
    }
    ;
    if (get5 instanceof Right && get5.value0 instanceof Right) {
      return liftEffect(monadEffectAff)(function __do() {
        for_(applicativeEffect)(foldableArray)(view(function() {
          var $28 = _TopicGraph(profunctorForget);
          var $29 = to2(function(v) {
            return v.edges;
          });
          return function($30) {
            return $28($29($30));
          };
        }())(get5.value0.value0))(function(edge) {
          return log2(show(showTuple(showString)(showString))(edge));
        })();
        for_(applicativeEffect)(foldableList)(toListOf(function() {
          var $31 = _TopicGraph(profunctorForget);
          var $32 = to2(function(v) {
            return v.nodes;
          });
          var $33 = traversed(traversableArray)(wanderForget(monoidEndo(categoryFn)));
          var $34 = _1(strongForget);
          return function($35) {
            return $31($32($33($34($35))));
          };
        }())(get5.value0.value0))(log2)();
        for_(applicativeEffect)(foldableList)(toListOf(function() {
          var $36 = _TopicGraph(profunctorForget);
          var $37 = to2(function(v) {
            return v.nodes;
          });
          var $38 = traversed(traversableArray)(wanderForget(monoidEndo(categoryFn)));
          var $39 = _2(strongForget);
          var $40 = _ArticleNode(choiceForget(monoidEndo(categoryFn)));
          return function($41) {
            return $36($37($38($39($40($41)))));
          };
        }())(get5.value0.value0))(function() {
          var $42 = show(showRecord()()(showRecordFieldsCons({
            reflectSymbol: function() {
              return "a";
            }
          })(showRecordFieldsCons({
            reflectSymbol: function() {
              return "b";
            }
          })(showRecordFieldsNil)(showInt))(showString)));
          return function($43) {
            return log2($42($43));
          };
        }())();
        for_(applicativeEffect)(foldableList)(toListOf(function() {
          var $44 = _TopicGraph(profunctorForget);
          var $45 = to2(function(v) {
            return v.nodes;
          });
          var $46 = traversed(traversableArray)(wanderForget(monoidEndo(categoryFn)));
          var $47 = _2(strongForget);
          var $48 = _ImageNode(choiceForget(monoidEndo(categoryFn)));
          return function($49) {
            return $44($45($46($47($48($49)))));
          };
        }())(get5.value0.value0))(function() {
          var $50 = show(showString);
          return function($51) {
            return log2($50($51));
          };
        }())();
        return for_(applicativeEffect)(foldableList)(toListOf(function() {
          var $52 = _TopicGraph(profunctorForget);
          var $53 = to2(function(v) {
            return v.nodes;
          });
          var $54 = traversed(traversableArray)(wanderForget(monoidEndo(categoryFn)));
          var $55 = _2(strongForget);
          var $56 = _TopicNode(choiceForget(monoidEndo(categoryFn)));
          return function($57) {
            return $52($53($54($55($56($57)))));
          };
        }())(get5.value0.value0))(function() {
          var $58 = show(showInt);
          return function($59) {
            return log2($58($59));
          };
        }())();
      });
    }
    ;
    throw new Error("Failed pattern match at Main (line 55, column 3 - line 63, column 117): " + [get5.constructor.name]);
  });
  var articleInfosPath = "/json/features.cmark.json";
  var fetchArticleInfos = /* @__PURE__ */ bind(bindAff)(/* @__PURE__ */ get2(json)(articleInfosPath))(function(resp) {
    return pure(applicativeAff)(map(functorEither)(function(x) {
      return genericDecodeAeson(genericArticleInfos)(decodeAesonConstructor(decodeRepArgsArgument(decodeRecord(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonImageInfo)))(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonLinkInfo)))(gDecodeJsonCons(decodeFieldId(decodeJsonSkyLine))(gDecodeJsonNil)({
        reflectSymbol: function() {
          return "skyline";
        }
      })()())({
        reflectSymbol: function() {
          return "linkInfos";
        }
      })()())({
        reflectSymbol: function() {
          return "imageInfos";
        }
      })()())()))({
        reflectSymbol: function() {
          return "ArticleInfos";
        }
      })(areAllConstructorsNullary_Constructor(areAllConstructorsNullary_Argument))(isSingleConstructor_Constructor)(decodeAesonConstructor$prime({
        reflectSymbol: function() {
          return "ArticleInfos";
        }
      })(decodeRepArgsArgument(decodeRecord(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonImageInfo)))(gDecodeJsonCons(decodeFieldId(decodeArray2(decodeJsonLinkInfo)))(gDecodeJsonCons(decodeFieldId(decodeJsonSkyLine))(gDecodeJsonNil)({
        reflectSymbol: function() {
          return "skyline";
        }
      })()())({
        reflectSymbol: function() {
          return "linkInfos";
        }
      })()())({
        reflectSymbol: function() {
          return "imageInfos";
        }
      })()())()))))(defaultOptions)(x.body);
    })(resp));
  });
  var run22 = /* @__PURE__ */ bind(bindAff)(fetchArticleInfos)(function(get5) {
    if (get5 instanceof Left) {
      return liftEffect(monadEffectAff)(log2("Error fetching ArticleInfos: " + printError(get5.value0)));
    }
    ;
    if (get5 instanceof Right && get5.value0 instanceof Left) {
      return liftEffect(monadEffectAff)(log2("Error decoding ArticleInfos: " + printJsonDecodeError(get5.value0.value0)));
    }
    ;
    if (get5 instanceof Right && get5.value0 instanceof Right) {
      return liftEffect(monadEffectAff)(for_(applicativeEffect)(foldableList)(toListOf(function() {
        var $60 = _ArticleInfos(profunctorForget);
        var $61 = to2(function(v) {
          return v.linkInfos;
        });
        var $62 = traversed(traversableArray)(wanderForget(monoidEndo(categoryFn)));
        var $63 = _LinkInfo(profunctorForget);
        var $64 = to2(function(v) {
          return v.linkURL;
        });
        return function($65) {
          return $60($61($62($63($64($65)))));
        };
      }())(get5.value0.value0))(log2));
    }
    ;
    throw new Error("Failed pattern match at Main (line 67, column 3 - line 71, column 117): " + [get5.constructor.name]);
  });
  var main = /* @__PURE__ */ applySecond(applyEffect)(/* @__PURE__ */ log2("Hello, Purescript!"))(/* @__PURE__ */ launchAff_(/* @__PURE__ */ discard(discardUnit)(bindAff)(run1)(function() {
    return discard(discardUnit)(bindAff)(run22)(function() {
      return run3;
    });
  })));

  // <stdin>
  main();
})();
