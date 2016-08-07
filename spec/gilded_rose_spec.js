var Item = require('../src/gilded_rose.js').Item;
// var items = require('../src/gilded_rose.js').items;
var update_quality = require('../src/gilded_rose.js').update_quality;

describe("Gilded Rose", function() {
	var items = [];

	beforeEach(function() {
		// Item(name, sell_in date, quality)
		items.push(new Item('+5 Dexterity Vest', 10, 20));
		items.push(new Item('Aged Brie', 2, 0));
		items.push(new Item('Elixir of the Mongoose', 5, 7));
		items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
		items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
		items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
		// not necessary because test for the above backstage passes covers the below situation
		// items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
		items.push(new Item('Conjured',10,24));
	});

	afterEach(function(){
		items = [];
	});

	// Test Helpers
	function update_quality_times(number,items){
		var count = 0;
		while (count < number) {
			count ++;
			update_quality(items);
		}
	}

	it("Update Quality function is working for regular items", function() {
		// Initial sell_in date and quality
		expect(items[0].name).toEqual("+5 Dexterity Vest");
		expect(items[0].sell_in).toEqual(10);
		expect(items[0].quality).toEqual(20);
		// quality reduced at the same rate as the sell_in date 1:1
		update_quality_times(1,items);
		expect(items[0].sell_in).toEqual(9);
		expect(items[0].quality).toEqual(19);
		// sell_in date is reduced to 0
		update_quality_times(9,items);
		expect(items[0].sell_in).toEqual(0);
		expect(items[0].quality).toEqual(10);
		// quality reduced at double the rate since sell_in date is 0 now 1:2
		update_quality_times(1,items);
		expect(items[0].sell_in).toEqual(-1);
		expect(items[0].quality).toEqual(8);
		// quality of an item is never negative
		update_quality_times(6,items);
		expect(items[0].sell_in).toEqual(-7);
		expect(items[0].quality).toEqual(0);
	});

	it("Update Quality function is working for regular item 2", function() {
		// Initial sell_in date and quality
		expect(items[2].name).toEqual('Elixir of the Mongoose');
		expect(items[2].sell_in).toEqual(5);
		expect(items[2].quality).toEqual(7);
		// quality reduced at the same rate as the sell_in date 1:1
		update_quality_times(1,items);
		expect(items[2].sell_in).toEqual(4);
		expect(items[2].quality).toEqual(6);
		// sell_in date is reduced to 0
		update_quality_times(4,items);
		expect(items[2].sell_in).toEqual(0);
		expect(items[2].quality).toEqual(2);
		// quality reduced at double the rate since sell_in date is 0 now 1:2
		update_quality_times(1,items);
		expect(items[2].sell_in).toEqual(-1);
		expect(items[2].quality).toEqual(0);
		// quality of an item is never negative
		update_quality_times(6,items);
		expect(items[2].sell_in).toEqual(-7);
		expect(items[2].quality).toEqual(0);
	});

	it("Update Quality function is working for Aged Brie", function() {
		// Initial sell_in date and quality
		expect(items[1].name).toEqual('Aged Brie');
		expect(items[1].sell_in).toEqual(2);
		expect(items[1].quality).toEqual(0);
		// quality increased at the same rate as the sell_in date 1:1
		update_quality_times(1,items);
		expect(items[1].sell_in).toEqual(1);
		expect(items[1].quality).toEqual(1);
		// quality reaches maximum of 50
		update_quality_times(49,items);
		expect(items[1].sell_in).toEqual(-48);
		expect(items[1].quality).toEqual(50);
		// quality should not increase higher than 50
		update_quality_times(1,items);
		expect(items[1].sell_in).toEqual(-49);
		expect(items[1].quality).toEqual(50);
	});

	it("Update Quality function is working for Sulfuras", function() {
		// Initial sell_in date and quality
		expect(items[3].name).toEqual('Sulfuras, Hand of Ragnaros');
		expect(items[3].sell_in).toEqual(0);
		expect(items[3].quality).toEqual(80);
		// lengendary item sell_in date and quality never decreses
		update_quality_times(1,items);
		expect(items[3].sell_in).toEqual(0);
		expect(items[3].quality).toEqual(80);
		// additional test to confirm the above
		update_quality_times(10,items);
		expect(items[3].sell_in).toEqual(0);
		expect(items[3].quality).toEqual(80);
	});

	it("Update Quality function is working for Sulfuras (negative sell_in days)", function() {
		// Initial sell_in date and quality
		expect(items[4].name).toEqual('Sulfuras, Hand of Ragnaros');
		expect(items[4].sell_in).toEqual(-1);
		expect(items[4].quality).toEqual(80);
		// lengendary item sell_in date and quality never decreses from its intiial start date
		update_quality_times(1,items);
		expect(items[4].sell_in).toEqual(-1);
		expect(items[4].quality).toEqual(80);
		// additional test to confirm the above
		update_quality_times(10,items);
		expect(items[4].sell_in).toEqual(-1);
		expect(items[4].quality).toEqual(80);
	});

	it("Update Quality function is working for Back Stage Passes", function() {
		// Initial sell_in date and quality
		expect(items[5].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
		expect(items[5].sell_in).toEqual(15);
		expect(items[5].quality).toEqual(20);
		// quality increased at the same rate as the sell_in date 1:1
		update_quality_times(1,items);
		expect(items[5].sell_in).toEqual(14);
		expect(items[5].quality).toEqual(21);
		// sell_in date decreases to 10
		update_quality_times(4,items);
		expect(items[5].sell_in).toEqual(10);
		expect(items[5].quality).toEqual(25);
		// quality increases at double rate after 10 days 1:2
		update_quality_times(1,items);
		expect(items[5].sell_in).toEqual(9);
		expect(items[5].quality).toEqual(27);
		// sell_in date drecrease to 5
		update_quality_times(4,items);
		expect(items[5].sell_in).toEqual(5);
		expect(items[5].quality).toEqual(35);
		// quality increases at triple rate after 5 days 1:3
		update_quality_times(1,items);
		expect(items[5].sell_in).toEqual(4);
		expect(items[5].quality).toEqual(38);
		// sell_in date drecrease to 0
		update_quality_times(4,items);
		expect(items[5].sell_in).toEqual(0);
		expect(items[5].quality).toEqual(50);
		// quality drops to zero after concert
		update_quality_times(1,items);
		expect(items[5].sell_in).toEqual(-1);
		expect(items[5].quality).toEqual(0);
		update_quality_times(1,items);
		expect(items[5].sell_in).toEqual(-2);
		expect(items[5].quality).toEqual(0);
	});

	// this test checks that back stage passes quality never exceeds 50
	it("Update Quality function is working for Back Stage Passes", function() {
		// Initial sell_in date and quality
		expect(items[6].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
		expect(items[6].sell_in).toEqual(10);
		expect(items[6].quality).toEqual(49);
		// quality increases to 50 (which is the suppose maximum for any item)
		// not sure why we allowed sulfuras to exceed 50
		update_quality_times(1,items);
		expect(items[6].sell_in).toEqual(9);
		// supose to be 51 but because of maximum cap
		expect(items[6].quality).toEqual(50);
		// cap remains at 50
		update_quality_times(4,items);
		expect(items[6].sell_in).toEqual(5);
		expect(items[6].quality).toEqual(50);
		// quality increases at triple rate after 10 days 1:3
		update_quality_times(1,items);
		expect(items[6].sell_in).toEqual(4);
		expect(items[6].quality).toEqual(50);
		// sell_in date drecrease to 5
		update_quality_times(4,items);
		expect(items[6].sell_in).toEqual(0);
		expect(items[6].quality).toEqual(50);
		// quality drops to 0 after sell_in date passes
		update_quality_times(1,items);
		expect(items[6].sell_in).toEqual(-1);
		expect(items[6].quality).toEqual(0);
	});

	it("Update Quality function is working for regular items", function() {
		// Initial sell_in date and quality
		expect(items[7].name).toEqual("Conjured");
		expect(items[7].sell_in).toEqual(10);
		expect(items[7].quality).toEqual(24);
		// quality reduced at double the rate of the sell_in date 1:2
		update_quality_times(1,items);
		expect(items[7].sell_in).toEqual(9);
		expect(items[7].quality).toEqual(22);
		// sell_in date is reduced to 0
		update_quality_times(9,items);
		expect(items[7].sell_in).toEqual(0);
		expect(items[7].quality).toEqual(4);
		// quality reduced at double the rate since sell_in date is 0 now 1:4
		update_quality_times(1,items);
		expect(items[7].sell_in).toEqual(-1);
		expect(items[7].quality).toEqual(0);
		// quality of an item is never negative
		update_quality_times(3,items);
		expect(items[7].sell_in).toEqual(-4);
		expect(items[7].quality).toEqual(0);
	});

});
