var Item = require('../src/gilded_rose.js').Item;
var items = require('../src/gilded_rose.js').items;
var update_quality = require('../src/gilded_rose.js').update_quality;

describe("Gilded Rose", function() {

	beforeEach(function() {
		// Item(name, sell_in date, quality)
		items.push(new Item('+5 Dexterity Vest', 10, 20));
		items.push(new Item('Aged Brie', 2, 0));
		items.push(new Item('Elixir of the Mongoose', 5, 7));
		items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
		items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));

	});

	// Test Helpers
	function update_quality_times(number){
		var count = 0;
		while (count < number) {
			count ++;
			update_quality();
		}
	}

	it("Update Quality function is working for regular items", function() {
		// Initial sell_in date and quality
		expect(items[0].name).toEqual("+5 Dexterity Vest");
		expect(items[0].sell_in).toEqual(10);
		expect(items[0].quality).toEqual(20);
		// quality reduced at the same rate as the sell_in date 1:1
		update_quality_times(1);
		expect(items[0].sell_in).toEqual(9);
		expect(items[0].quality).toEqual(19);
		// sell_in date is reduced to 0
		update_quality_times(9);
		expect(items[0].sell_in).toEqual(0);
		expect(items[0].quality).toEqual(10);
		// quality reduced at double the rate since sell_in date is 0 now 1:2
		update_quality_times(1);
		expect(items[0].sell_in).toEqual(-1);
		expect(items[0].quality).toEqual(8);
		// quality of an item is never negative
		update_quality_times(6);
		expect(items[0].sell_in).toEqual(-7);
		expect(items[0].quality).toEqual(0);
	});

	// it("Update Quality function is working for Aged Brie", function() {
	// 	// Initial sell_in date and quality
	// 	expect(items[1].name).toEqual('Aged Brie');
	// 	expect(items[1].sell_in).toEqual(2);
	// 	expect(items[1].quality).toEqual(0);
	// 	// // quality reduced at the same rate as the sell_in date 1:1
	// 	// update_quality_times(1);
	// 	// expect(items[1].sell_in).toEqual(1);
	// 	// expect(items[1].quality).toEqual(1);
	// 	// // sell_in date is reduced to 0
	// 	// update_quality_times(9);
	// 	// expect(items[1].sell_in).toEqual(0);
	// 	// expect(items[1].quality).toEqual(10);
	// 	// // quality reduced at double the rate since sell_in date is 0 now 1:2
	// 	// update_quality_times(1);
	// 	// expect(items[1].sell_in).toEqual(-1);
	// 	// expect(items[1].quality).toEqual(8);
	// 	// // quality of an item is never negative
	// 	// update_quality_times(6);
	// 	// expect(items[1].sell_in).toEqual(-7);
	// 	// expect(items[1].quality).toEqual(0);
	// });



});
