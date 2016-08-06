var Item = require('../src/gilded_rose.js').Item;
var items = require('../src/gilded_rose.js').items;
var update_quality = require('../src/gilded_rose.js').update_quality;

describe("Gilded Rose", function() {

	before(function() {
		items.push(new Item('+5 Dexterity Vest', 10, 20));
		items.push(new Item('Aged Brie', 2, 0));
		items.push(new Item('Elixir of the Mongoose', 5, 7));
		items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
		items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
	});

  it("should foo", function() {
    items = [ new Item("foo", 0, 0) ];
    update_quality();
    expect(items[0].name).toEqual("foo");
  });

});
