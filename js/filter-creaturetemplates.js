"use strict";

class PageFilterCreatureTemplates extends PageFilter {
	constructor () {
		super();
		this._typeFilter = new Filter({
			header: "Type",
			items: [],
			displayFn: StrUtil.uppercaseFirst,
		});
		this._miscFilter = new Filter({
			header: "Miscellaneous",
			items: [],
			displayFn: StrUtil.uppercaseFirst,
		});
	}
	mutateForFilters (it) {
		it._fMisc = [];
		it._fSources = SourceFilter.getCompleteFilterSources(it);
		if (it.hasLore === true) it._fMisc.push("Has Lore")
		if (it.images) it._fMisc.push("Has Images")
	}

	addToFilters (it, isExcluded) {
		if (isExcluded) return;

		this._sourceFilter.addItem(it._fSources);
		this._miscFilter.addItem(it._fMisc);
		this._typeFilter.addItem(it.type);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._typeFilter,
			this._miscFilter,
		];
	}

	toDisplay (values, it) {
		return this._filterBox.toDisplay(
			values,
			it._fSources,
			it.type,
			it._fMisc,
		)
	}
}
