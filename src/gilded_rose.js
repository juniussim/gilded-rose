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

// Rules
// 1.Quality for all items except Sulfuras cannot be negative or more than 50

// To get an overview, read the * comments

function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
		// if item name is not Aged Brie & Item is not a Backstage Pass to a ... concert
		// These items increases in quality as the sell_in date increases
		// * This section reduces the quality of regular items
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
			// quality of an item is never negative (we should throw an error if quality is negative instead of doing nothing)
			if (items[i].quality > 0) {
				// !with the exception of Sulfuras which quality never decreases
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality -= 1;
        }
      }
    } else {
			// * If it is either an Aged Brie or a Backstage pass
			// This ensure that quality would not be increase further than 50, if its 50, we just leave it as 50
      if (items[i].quality < 50) {
				// * we would increase the quality
        items[i].quality += 1;
				// if it is a concert backstage pass, we would have additional conditions
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
						// checking for quality not already being further than 50 before we increase it as quality could be greater than 50 after the first condition
						// !we can probably do some refactoring here, like maybe just reduce quality by 2 or 3 depending on the range
						if (items[i].quality < 50) {
              items[i].quality += 1;
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality += 1;
            }
          }
        }
      }
    }
		// If item is not sulfuras (the last category of item)
		//* For all item categories except for sulfuras, we would reduce the sell_in date
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in -= 1;
    } // Sulfuras sell_in date does not decrease then it shouldn't allowed to be negative


		//* For all items categories with sell_in date less than 0
    if (items[i].sell_in < 0) {
			// Only Normal items, Backstage passes and Sulfuras
      if (items[i].name != 'Aged Brie') {
				// Only Normal Items and Sulfuras
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
					// quality is above 0
					if (items[i].quality > 0) {
						//* normal items whose quality is above 0
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality -= 1;
            }
						//* Do nothing for Sulfuras
          }
				//* When sell_in is negative, set Backstage Passes quality to zero
        } else {
          items[i].quality = 0;
        }
				//* when sell_in date for Aged brie is negative, as long as quality not above 0, increase the quality
      } else {
        if (items[i].quality < 50) {
          items[i].quality += 1;
        }
      }
    }
  }
}

module.exports = {
  Item: Item,
  update_quality: update_quality,
};
