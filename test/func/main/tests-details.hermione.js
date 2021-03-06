const {mkNestedSelector} = require('../utils');

describe('Test details', function() {
    it('should show details', function() {
        return this.browser
            .url('')
            .waitForVisible('.details')
            .click('.details__summary')
            .assertView('details content', '.details', {ignoreElements: [
                '.meta-info__item:nth-child(1)',
                '.meta-info__item:nth-child(4)'
            ]});
    });

    it('should prevent details summary overflow', function() {
        const selector = mkNestedSelector(
            '.section .section_status_error', // TODO: make selector to test by title
            '.error .details__summary'
        );

        return this.browser
            .waitForVisible(selector)
            .assertView('details summary', selector);
    });
});
