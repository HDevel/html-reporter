'use strict';

module.exports = class HtmlReporter {
    constructor() {
        this._values = {
            extraItems: {},
            metaInfoExtenders: {},
            imagesSaver: require('./local-images-saver'),
            reportsSaver: null
        };
    }

    addExtraItem(key, value) {
        this._values.extraItems[key] = value;
    }

    get extraItems() {
        return this._values.extraItems;
    }

    addMetaInfoExtender(key, value) {
        this._values.metaInfoExtenders[key] = value;
    }

    get metaInfoExtenders() {
        return this._values.metaInfoExtenders;
    }

    set imagesSaver(imagesSaver) {
        this._values.imagesSaver = imagesSaver;
    }

    get imagesSaver() {
        return this._values.imagesSaver;
    }

    set reportsSaver(reportsSaver) {
        this._values.reportsSaver = reportsSaver;
    }

    get reportsSaver() {
        return this._values.reportsSaver;
    }

    get values() {
        return this._values;
    }
};
