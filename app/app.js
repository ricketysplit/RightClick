'use strict';

angular.module('sycRightClick', [])
  .directive('rightClick', function(rightClickOverlay, $document) {
    return {
      restrict: 'A',
      link: function($scope, $elem, $attr) {
        var overlay = new rightClickOverlay($elem, $attr.rightClick);

        $elem.bind('contextmenu', function(event) {
          event.preventDefault();
          overlay.destroy();
          $elem.css('background-color', 'blue');
          overlay.create(event);
        });

        $document.bind('click', function() {
          overlay.destroy();
        })
      }
    }
  })
  .service('rightClickOverlay', function($templateRequest, $document) {
    function rightClickOverlay(elem, template) {
      this.parent = elem;
      this.template = template;
    }

    function createOverlay() {
      var overlay = angular.element('<div></div>');
      overlay.css('position', 'fixed');
      overlay.css('width', '100%');
      overlay.css('height', '100%');
      overlay.css('top', 0);
      overlay.css('left', 0);
      overlay.css('z-index', '9999');
      return overlay;
    }

    rightClickOverlay.prototype.create = function(e) {
      var _this = this;
      console.log(e);
      console.log('Element', _this.parent);
      _this.overlay = createOverlay();
      _this.overlay.bind('click', function() {
        _this.destroy();
      });
      _this.overlay.bind('contextmenu', function(e) {
        e.preventDefault();
      });
      $document.find('body').append(_this.overlay);
      $templateRequest(_this.template).then(function(h) {
        var h = angular.element(h);
        h.css('position', 'absolute');
        h.css('top', e.pageY + 'px');
        h.css('left', e.pageX + 'px');
        _this.overlay.append(h);
      });
    }

    rightClickOverlay.prototype.destroy = function() {
      if (this.exists()) {
        this.overlay.remove();
      }
    }

    rightClickOverlay.prototype.exists = function() {
      var _this = this;
      return _this.overlay != undefined;
    }

    return rightClickOverlay;
  });
