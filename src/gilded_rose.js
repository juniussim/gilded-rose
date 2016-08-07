// Types of items:
// 1.Regular items
// 2.Aged Brie
// 3.Backstage passes
// 4.Legendary item: Sulfuras

/* Rules
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

/*
Add in new category: conjured item
- "Conjured" items degrade in Quality twice as fast as normal items
- Quantity decreases 1:1
- Once sell_in date is less than 0, quality decreases at double the speed
- Quality cannot be negative (& cannot exceed 50, however no current tests test for that)
*/

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

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
				if (items[i].sell_in <= 0) {
					items[i].quality = 0;
				}
				items[i].sell_in -= 1;
				break;
			case "Conjured":
				if (items[i].sell_in <= 0 && items[i].quality > 0) {
					items[i].quality -= 4;
				// else if the quality is greater than 0
				} else if (items[i].quality > 0) {
					items[i].quality -= 2;
				}
				items[i].sell_in -= 1;
				break;
			default:
				// if today the product is supposed to be sold but it is not and the quality is greater than 0
				if (items[i].sell_in <= 0 && items[i].quality > 0) {
					items[i].quality -= 2;
				// else if the quality is greater than 0
				} else if (items[i].quality > 0) {
					items[i].quality -= 1;
				}
				items[i].sell_in -= 1;
		}
	}
}

module.exports = {
  Item: Item,
  update_quality: update_quality,
};
