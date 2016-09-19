'use strict';

describe('rightClick', function() {

  beforeEach(function() {
    browser.get('http://localhost:3001/spec/index.html');
  })

  it('should open the page', function() {
    expect(element(by.id('testDiv')).getCssValue('background-color'))
      .toBe('rgba(0, 128, 0, 1)');
  });

  it('should change color on right-click', function() {
    var el = element(by.id('testDiv'));
    browser.actions().mouseMove(el).perform();
    browser.actions().click(protractor.Button.RIGHT).perform();

    expect(el.getCssValue('background-color')).toBe(
      'rgba(0, 0, 255, 1)');
  });
});
