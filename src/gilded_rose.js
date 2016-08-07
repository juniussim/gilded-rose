function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

// Types of items:
// 1.Regular items
// 2.Aged Brie
// 3.Backstage passes
// 4.Legendary item: Sulfuras

/* Rules
1. Quality for all items except Sulfuras cannot be negative or more than 50

For Normal items
- Quantity decreases 1:1
- Once sell_in date is less than 0, quality decreases at double the speed
- Quality cannot be negative (& cannot exceed 50, however no current tests test for that)

For Aged Brie
- Quality increases the older it gets 1:1
- Quality cannot exceed 50
- Quality also cannot be negative (so you cannot input negative value - the function does not handle it)

For Backstage Passes
- Quality increases the older it gets 1:1
- Once sell_in date 10 days or less, quality increase by 1:2
- Once sell_in date 5 days or less, quality increase by 1:3
- Once sell_in date 0, quality decreases to 0

For Sulfuras
- Quality does not change
- Sell_in date does not change

*/

// To get an overview, read the * comments

function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
		switch (items[i].name) {
			case "Sulfuras, Hand of Ragnaros":
				break;
			case "Aged Brie":
				if (items[i].quality < 50) {
					items[i].quality += 1;
				}
				items[i].sell_in -= 1;
				break;
			case "Backstage passes to a TAFKAL80ETC concert":
				if (items[i].quality < 50) {
					items[i].quality += 1;
					if (items[i].sell_in < 11 && items[i].quality < 50) {
						items[i].quality += 1;
					}
					if (items[i].sell_in < 6 && items[i].quality < 50) {
            items[i].quality += 1;
          }
				}

				items[i].sell_in -= 1;

				if (items[i].sell_in < 0) {
					items[i].quality = 0;
				}
				
				break;
			default:
				if (items[i].quality > 0) {
					items[i].quality -= 1;
				}
				items[i].sell_in -= 1;
				if (items[i].sell_in < 0) {
					if (items[i].quality > 0) {
						items[i].quality -= 1;
					}
				}
		}
	}
}

module.exports = {
  Item: Item,
  update_quality: update_quality,
};
