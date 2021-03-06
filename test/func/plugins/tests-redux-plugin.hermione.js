const {mkNestedSelector} = require('../utils');

describe('Test redux plugin', function() {
    it('should change plugin redux border color on click', async function() {
        const screenSelector = mkNestedSelector(
            '.section .section_status_error',
            '.section .section__body'
        );

        const clickSelector = mkNestedSelector(
            '.section .section_status_error',
            '.red-border.redux-border'
        );

        return this.browser
            .waitForVisible(screenSelector)
            .click(clickSelector)
            .assertView('redux plugin clicked', screenSelector);
    });
});
