(() => {
  var e = {
      91: () => {
        var e, t, o;
        const n =
            null === (e = document) || void 0 === e
              ? void 0
              : e.querySelector("[data-btn]"),
          i =
            null === (t = document) || void 0 === t
              ? void 0
              : t.querySelector("[data-sidebar]"),
          s =
            null === (o = document) || void 0 === o
              ? void 0
              : o.querySelector("[data-body]");
        null == n ||
          n.addEventListener("click", () => {
            null == n || n.classList.toggle("btn--active"),
              null == i || i.classList.toggle("sidebar--active"),
              null == s || s.classList.toggle("body--active");
          });
      },
      598: () => {
        function e(e) {
          var t = !0,
            o = !1,
            n = null,
            i = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function s(e) {
            return !!(
              e &&
              e !== document &&
              "HTML" !== e.nodeName &&
              "BODY" !== e.nodeName &&
              "classList" in e &&
              "contains" in e.classList
            );
          }
          function d(e) {
            e.classList.contains("focus-visible") ||
              (e.classList.add("focus-visible"),
              e.setAttribute("data-focus-visible-added", ""));
          }
          function a(e) {
            t = !1;
          }
          function c() {
            document.addEventListener("mousemove", l),
              document.addEventListener("mousedown", l),
              document.addEventListener("mouseup", l),
              document.addEventListener("pointermove", l),
              document.addEventListener("pointerdown", l),
              document.addEventListener("pointerup", l),
              document.addEventListener("touchmove", l),
              document.addEventListener("touchstart", l),
              document.addEventListener("touchend", l);
          }
          function l(e) {
            (e.target.nodeName && "html" === e.target.nodeName.toLowerCase()) ||
              ((t = !1),
              document.removeEventListener("mousemove", l),
              document.removeEventListener("mousedown", l),
              document.removeEventListener("mouseup", l),
              document.removeEventListener("pointermove", l),
              document.removeEventListener("pointerdown", l),
              document.removeEventListener("pointerup", l),
              document.removeEventListener("touchmove", l),
              document.removeEventListener("touchstart", l),
              document.removeEventListener("touchend", l));
          }
          document.addEventListener(
            "keydown",
            function (o) {
              o.metaKey ||
                o.altKey ||
                o.ctrlKey ||
                (s(e.activeElement) && d(e.activeElement), (t = !0));
            },
            !0
          ),
            document.addEventListener("mousedown", a, !0),
            document.addEventListener("pointerdown", a, !0),
            document.addEventListener("touchstart", a, !0),
            document.addEventListener(
              "visibilitychange",
              function (e) {
                "hidden" === document.visibilityState && (o && (t = !0), c());
              },
              !0
            ),
            c(),
            e.addEventListener(
              "focus",
              function (e) {
                var o, n, a;
                s(e.target) &&
                  (t ||
                    ((n = (o = e.target).type),
                    ("INPUT" === (a = o.tagName) && i[n] && !o.readOnly) ||
                      ("TEXTAREA" === a && !o.readOnly) ||
                      o.isContentEditable)) &&
                  d(e.target);
              },
              !0
            ),
            e.addEventListener(
              "blur",
              function (e) {
                var t;
                s(e.target) &&
                  (e.target.classList.contains("focus-visible") ||
                    e.target.hasAttribute("data-focus-visible-added")) &&
                  ((o = !0),
                  window.clearTimeout(n),
                  (n = window.setTimeout(function () {
                    o = !1;
                  }, 100)),
                  (t = e.target).hasAttribute("data-focus-visible-added") &&
                    (t.classList.remove("focus-visible"),
                    t.removeAttribute("data-focus-visible-added")));
              },
              !0
            ),
            e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host
              ? e.host.setAttribute("data-js-focus-visible", "")
              : e.nodeType === Node.DOCUMENT_NODE &&
                (document.documentElement.classList.add("js-focus-visible"),
                document.documentElement.setAttribute(
                  "data-js-focus-visible",
                  ""
                ));
        }
        if ("undefined" != typeof window && "undefined" != typeof document) {
          var t;
          window.applyFocusVisiblePolyfill = e;
          try {
            t = new CustomEvent("focus-visible-polyfill-ready");
          } catch (e) {
            (t = document.createEvent("CustomEvent")).initCustomEvent(
              "focus-visible-polyfill-ready",
              !1,
              !1,
              {}
            );
          }
          window.dispatchEvent(t);
        }
        "undefined" != typeof document && e(document);
      },
    },
    t = {};
  function o(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var s = (t[n] = { exports: {} });
    return e[n](s, s.exports, o), s.exports;
  }
  (() => {
    "use strict";
    o(598);
    const e = {
      windowEl: window,
      documentEl: document,
      htmlEl: document.documentElement,
      bodyEl: document.body,
    };
    console.log(
      (() => {
        const t = navigator.userAgent || navigator.vendor || window.opera;
        return /android/i.test(t)
          ? (e.htmlEl.classList.add("page--android"), "Android")
          : /iPad|iPhone|iPod/.test(t) && !window.MSStream
          ? (e.htmlEl.classList.add("page--ios"), "iOS")
          : "unknown";
      })()
    ),
      o(91),
      new (class {
        constructor(e) {
          (this.options = Object.assign(
            { isOpen: () => {}, isClose: () => {} },
            e
          )),
            (this.modal = document.querySelector(".graph-modal")),
            (this.speed = 300),
            (this.animation = "fade"),
            (this._reOpen = !1),
            (this._nextContainer = !1),
            (this.modalContainer = !1),
            (this.isOpen = !1),
            (this.previousActiveElement = !1),
            (this._focusElements = [
              "a[href]",
              "input",
              "select",
              "textarea",
              "button",
              "iframe",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this._fixBlocks = document.querySelectorAll(".fix-block")),
            this.events();
        }
        events() {
          this.modal &&
            (document.addEventListener(
              "click",
              function (e) {
                const t = e.target.closest("[data-graph-path]");
                if (t) {
                  let e = t.dataset.graphPath,
                    o = t.dataset.graphAnimation,
                    n = t.dataset.graphSpeed;
                  return (
                    (this.animation = o || "fade"),
                    (this.speed = n ? parseInt(n) : 300),
                    (this._nextContainer = document.querySelector(
                      `[data-graph-target="${e}"]`
                    )),
                    void this.open()
                  );
                }
                e.target.closest(".js-modal-close") && this.close();
              }.bind(this)
            ),
            window.addEventListener(
              "keydown",
              function (e) {
                27 == e.keyCode && this.isOpen && this.close(),
                  9 == e.which && this.isOpen && this.focusCatch(e);
              }.bind(this)
            ),
            document.addEventListener(
              "click",
              function (e) {
                e.target.classList.contains("graph-modal") &&
                  e.target.classList.contains("is-open") &&
                  this.close();
              }.bind(this)
            ));
        }
        open(e) {
          if (
            ((this.previousActiveElement = document.activeElement), this.isOpen)
          )
            return (this.reOpen = !0), void this.close();
          (this.modalContainer = this._nextContainer),
            e &&
              (this.modalContainer = document.querySelector(
                `[data-graph-target="${e}"]`
              )),
            this.modalContainer.scrollTo(0, 0),
            this.modal.style.setProperty(
              "--transition-time",
              this.speed / 1e3 + "s"
            ),
            this.modal.classList.add("is-open"),
            (document.body.style.scrollBehavior = "auto"),
            (document.documentElement.style.scrollBehavior = "auto"),
            this.disableScroll(),
            this.modalContainer.classList.add("graph-modal-open"),
            this.modalContainer.classList.add(this.animation),
            setTimeout(() => {
              this.options.isOpen(this),
                this.modalContainer.classList.add("animate-open"),
                (this.isOpen = !0),
                this.focusTrap();
            }, this.speed);
        }
        close() {
          this.modalContainer &&
            (this.modalContainer.classList.remove("animate-open"),
            this.modalContainer.classList.remove(this.animation),
            this.modal.classList.remove("is-open"),
            this.modalContainer.classList.remove("graph-modal-open"),
            this.enableScroll(),
            (document.body.style.scrollBehavior = "auto"),
            (document.documentElement.style.scrollBehavior = "auto"),
            this.options.isClose(this),
            (this.isOpen = !1),
            this.focusTrap(),
            this.reOpen && ((this.reOpen = !1), this.open()));
        }
        focusCatch(e) {
          const t = this.modalContainer.querySelectorAll(this._focusElements),
            o = Array.prototype.slice.call(t),
            n = o.indexOf(document.activeElement);
          e.shiftKey &&
            0 === n &&
            (o[o.length - 1].focus(), e.preventDefault()),
            e.shiftKey ||
              n !== o.length - 1 ||
              (o[0].focus(), e.preventDefault());
        }
        focusTrap() {
          const e = this.modalContainer.querySelectorAll(this._focusElements);
          this.isOpen
            ? e.length && e[0].focus()
            : this.previousActiveElement.focus();
        }
        disableScroll() {
          let e = window.scrollY;
          this.lockPadding(),
            document.body.classList.add("disable-scroll"),
            (document.body.dataset.position = e),
            (document.body.style.top = -e + "px");
        }
        enableScroll() {
          let e = parseInt(document.body.dataset.position, 10);
          this.unlockPadding(),
            (document.body.style.top = "auto"),
            document.body.classList.remove("disable-scroll"),
            window.scrollTo({ top: e, left: 0 }),
            document.body.removeAttribute("data-position");
        }
        lockPadding() {
          let e = window.innerWidth - document.body.offsetWidth + "px";
          this._fixBlocks.forEach((t) => {
            t.style.paddingRight = e;
          }),
            (document.body.style.paddingRight = e);
        }
        unlockPadding() {
          this._fixBlocks.forEach((e) => {
            e.style.paddingRight = "0px";
          }),
            (document.body.style.paddingRight = "0px");
        }
      })();
  })();
})();
