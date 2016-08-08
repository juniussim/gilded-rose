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
	// Function execution
	items.forEach(update_item_quality);
}

// Callback declaration
function update_item_quality(item){
	var MAX_QUALITY = 50;
	var MIN_QUALITY = 0;

	switch (item.name) {
		case "Sulfuras, Hand of Ragnaros":
			break;
		case "Aged Brie":
			increase_quality();
			update_sell_in();
			break;
		case "Backstage passes to a TAFKAL80ETC concert":
			if (item.sell_in <= 0) {
				// quality drops to 0 after the concert
				item.quality = 0;
			}
			else if (item.sell_in <= 5) {
				// quality inc by 3 when there are 5 days or less
				increase_quality(3);
			}
			else if (item.sell_in <= 10) {
				// quality inc by 2 when there are 10 days or less
				increase_quality(2);
			}
			else if (item.sell_in > 10){
				// quality inc by 1 when sell_in > 10 days
				increase_quality();
			}
			update_sell_in();
			break;
		case "Conjured":
			// decrease quality by double the normal rate
			decrease_quality(2);
			update_sell_in();
			break;
		default:
			decrease_quality();
			update_sell_in();
	}

	// Further function declarations (closure)
	function increase_quality(unit){
		unit = unit || 1;
		item.quality += unit;
		item.quality = item.quality < MAX_QUALITY ? item.quality : MAX_QUALITY;
	}

	function decrease_quality(unit){
		unit = unit || 1;
		if (item.sell_in <= 0) {
			//decrease by twice if sell in is less than or eq to 0
			item.quality -= unit * 2;
		} else {
			item.quality -= unit;
		}
		//set the new dec val, but min 0
    item.quality = item.quality > 0 ? item.quality : MIN_QUALITY;
		// Old codes
		// if (item.quality > MIN_QUALITY) {
		// 	item.quality -= unit;
		// }
		// if (item.sell_in <= 0 && item.quality > MIN_QUALITY) {
		// 	item.quality -= unit;
		// }
	}

	function update_sell_in(){
		item.sell_in -= 1;
	}
}



module.exports = {
  Item: Item,
  update_quality: update_quality,
};
