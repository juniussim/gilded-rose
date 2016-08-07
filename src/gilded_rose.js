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
	items.forEach(update_inventory);

	function update_inventory(item){
		switch (item.name) {
			case "Sulfuras, Hand of Ragnaros":
				break;
			case "Aged Brie":
				if (item.quality < 50) {
					item.quality += 1;
				}
				item.sell_in -= 1;
				break;
			case "Backstage passes to a TAFKAL80ETC concert":
				if (item.quality < 50) {
					item.quality += 1;
					if (item.sell_in < 11 && item.quality < 50) {
						item.quality += 1;
					}
					if (item.sell_in < 6 && item.quality < 50) {
						item.quality += 1;
					}
				}
				if (item.sell_in <= 0) {
					item.quality = 0;
				}
				item.sell_in -= 1;
				break;
			case "Conjured":
				update_normal(2);
				item.sell_in -= 1;
				break;
			default:
				// if today the product is supposed to be sold but it is not and the quality is greater than 0
				update_normal();
				item.sell_in -= 1;
		}
		
		function update_normal(times){
			times = times || 1;
			if (item.sell_in <= 0 && item.quality > 0) {
				item.quality -= times * 2;
			// else if the quality is greater than 0
			} else if (item.quality > 0) {
				item.quality -= times;
			}
		}
	}

}



module.exports = {
  Item: Item,
  update_quality: update_quality,
};
