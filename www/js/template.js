var displayCategory = function (data) {

	if (catStyle == '0') {

		var list = document.getElementById('infinite_category_list');
		var html = '';

		$.each(data, function (key, val) {

			html += '<ons-row class="stic-cat-row list relative">';
			html += '<ons-col onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name) + "'" + '   )">';
			html += '<div class="stic-cat-img" style="background-image: url(' + "'" + val.photo_url + "'" + ')" no-repeat center center;"></div>';
			html += '</div>';
			html += '<div class="stic-cat-name">';
			html += '<span>' + val.category_name + '</span>';
			if ($.isArray(val.dish_list)) {
				html += '<div class="equal_table">';
				$.each(val.dish_list, function (d_key, d_val) {
					html += '<div class="col"><span><img class="rounded_image rounded_small" src="' + d_val + '"></span></div>';
				});
				html += '</div>';
			}
			html += '</div>';
			html += '</ons-col>';
			html += '</ons-row>';

			var newItem = ons.createElement(html);
			list.appendChild(newItem);
			html = '';

		});

		initImageLoaded();

	}

	if (catStyle == '1') {

		var list = document.getElementById('infinite_category');
		var t = '';

		$.each(data, function (key, val) {

			t += '<ons-row class="stic-cat-row">';
			t += '<ons-col onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name) + "'" + '   )">';
			t += '<div class="stic-cat-img" style="background-image: url(' + "'" + val.photo_url + "'" + ')" no-repeat center center;"></div>';
			t += '</div>';
			t += '<div class="stic-cat-name">';
			t += '<span>' + val.category_name + '</span>';
			if ($.isArray(val.dish_list)) {
				t += '<div class="equal_table">';
				$.each(val.dish_list, function (d_key, d_val) {
					t += '<div class="col"><span><img class="rounded_image rounded_small" src="' + d_val + '"></span></div>';
				});
				t += '</div>';
			}
			t += '</div>';
			t += '</ons-col>';
			t += '</ons-row>';

			var newItem = ons.createElement(t);
			list.appendChild(newItem);
			t = '';

		});

		initImageLoaded();

	}

	if (catStyle == '2') {

		var list = document.getElementById('infinite_category_carousel');
		var key_size;
		var t = '';

		$.each(data, function (key, val) {

			t += '<ons-carousel-item class="stic-cat-item" onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name) + "'" + '   )">';
			t += '<div>';
			t += '<div class="stic-cat-img" style="background-image: url(' + "'" + val.photo_url + "'" + ')" no-repeat center center;"></div>';
			t += '</div>';
			t += '<div class="stic-cat-name">';
			t += '<span>' + val.category_name + '</span>';
			if ($.isArray(val.dish_list)) {
				t += '<div class="equal_table">';
				$.each(val.dish_list, function (d_key, d_val) {
					t += '<div class="col"><span><img class="rounded_image rounded_small" src="' + d_val + '"></span></div>';
				});
				t += '</div>';
			}
			t += '</div>';
			t += '</ons-carousel-item>';

			var newItem = ons.createElement(t);
			list.appendChild(newItem);
			t = '';

			key_size = key;
			return key < 8;

		});

		if (key_size >= 8) {

			t += '<ons-carousel-item class="stic-cat-last" onclick="showPageNormal(\'search_category.html\')">';
			t += '<div style="height:inherit;">';
			t += '<div class="back"></div>';
			t += '<div class="name-box">';
			t += '<span class="trn">See more</span><ons-icon icon="chevron-circle-right" size="15px"></ons-icon>';
			t += '</div>';
			t += '</div>';
			t += '</ons-carousel-item>';

			var newItem = ons.createElement(t);
			list.appendChild(newItem);
			t = '';

		}

		initImageLoaded();

	}
};


var displayItem = function (data, cat_id) {
	var list = document.getElementById('infinite_item');

	website_hide_foodprice = isHidePrice();

	if (itemStyle == '1') {

		var t = '';
		$.each(data, function (key, val) {

			t += '<ons-list-item tappable class="stic-list-item pad15" onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + cat_id + "'" + ')">';
			t += '<ons-row>';

			t += '<ons-col class="stic-item">';
			t += '<span class="list-title">' + val.item_name + '</span>';
			t += '<p class="stic-small">' + val.item_description + '</p>';

			if (!website_hide_foodprice) {
				if ($.isArray(val.prices)) {
					$.each(val.prices, function (price_key, price_val) {
						size = '';
						if (!empty(price_val.size)) {
							size = price_val.size;
						}
						if (price_val.discount_price > 0.0001) {
							t += '<div class="price">';
							// t+='<span class="stic-size">'+ size +'</span>';
							t += '<span class="stic-price">' + price_val.formatted_price + '</span>';
							t += '<span class="stic-price-final">' + price_val.formatted_discount_price + '</span>';
							t += '</div>';
						} else {
							t += '<div class="price">';
							// t+='<span class="stic-size">'+ size +'</span>';
							t += '<span class="stic-price-final">' + price_val.formatted_price + '</span>';
							t += '</div>';
						}
					});
				}
			}

			t += '<div class="stic-dish">';
			if ($.isArray(val.icon_dish)) {
				$.each(val.icon_dish, function (d_key, d_val) {
					t += '<div class="col"><span><img class="rounded_image rounded_small" src="' + d_val + '"></span></div>';
				});
			}
			t += '</div>';

			t += '</ons-col>';

			if (!empty(val.photo)) {
				t += '<ons-col width="100px">';
				t += '<img class="rounded_image" src="' + val.photo + '">';
				t += '</ons-col>';
			}

			t += '</ons-row>';
			t += '</ons-list-item>';

			var newItem = ons.createElement(t);
			list.appendChild(newItem);
			t = '';
		});

		initImageLoaded();

	}

	if (itemStyle == '2') {

		var t = '';
		$.each(data, function (key, val) {

			t += '<ons-list-item tappable class="stic-list-item col pad15" onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + cat_id + "'" + ')">';
			t += '<ons-row>';

			t += '<ons-col class="stic-item">';

			if (!empty(val.photo)) {
				t += '<ons-col>';
				t += '<img class="rounded_image img" src="' + val.photo + '">';
				t += '</ons-col>';
			} else {
				t += '<ons-col>';
				t += '<img class="rounded_image img" src="images/header.png">';
				t += '</ons-col>';
			}

			t += '<span class="list-title">' + val.item_name + '</span>';
			t += '<p class="stic-small">' + val.item_description + '</p>';

			if (!website_hide_foodprice) {
				if ($.isArray(val.prices)) {
					$.each(val.prices, function (price_key, price_val) {
						size = '';
						if (!empty(price_val.size)) {
							size = price_val.size;
						}
						if (price_val.discount_price > 0.0001) {
							t += '<div class="price">';
							// t+='<span class="stic-size">'+ size +'</span>';
							t += '<span class="stic-price">' + price_val.formatted_price + '</span>';
							t += '<span class="stic-price-final">' + price_val.formatted_discount_price + '</span>';
							t += '</div>';
						} else {
							t += '<div class="price">';
							// t+='<span class="stic-size">'+ size +'</span>';
							t += '<span class="stic-price-final">' + price_val.formatted_price + '</span>';
							t += '</div>';
						}
					});
				}
			}

			t += '<div class="stic-dish">';
			if ($.isArray(val.icon_dish)) {
				$.each(val.icon_dish, function (d_key, d_val) {
					t += '<div class="col"><span><img class="rounded_image rounded_small" src="' + d_val + '"></span></div>';
				});
			}
			t += '</div>';

			t += '</ons-col>';

			t += '</ons-row>';
			t += '</ons-list-item>';

			var newItem = ons.createElement(t);
			list.appendChild(newItem);
			t = '';
		});

		initImageLoaded();


	}

};


var displayItemDetails = function (data, cart_data) {

	website_hide_foodprice = isHidePrice();

	var html = '';
	if (!empty(cart_data.qty)) {
		$(".item_qty").val(cart_data.qty);
		$(".add_to_cart").html(t("UPDATE CART"));
		html += '<input type="hidden" name="row" value="' + cart_data.row + '">';
	}

	//html+='<div class="item_preview" style="background-image: url('+ addslashes(data.photo) +')"  ></div>';
	if (!empty(data.photo)) {
		html += '<div class="item_preview" style="background-image: url(' + "'" + addslashes(data.photo) + "'" + ')"  >';
		html += '<div class="dim_background h200">';
		html += '</div>';
		html += '</div>';
	} else {
		html += '<div class="item_preview h150" style="background-image: url(\'./images/header.png\')">';
		html += '<div class="dim_background h150">';
		html += '</div>';
		html += '</div>';
	}

	html += '<div class="wrap stic-item-wrap">';

	html += '<div class="stic-rest-name">';
	html += '<h3>' + data.item_name + '</h3>';
	if ($.isArray(data.dish_list)) {
		$.each(data.dish_list, function (d_key, d_val) {
			html += '<img class="rounded_image rounded_small" src="' + d_val + '">';
		});
	}
	html += '</div>';

	html += '<input type="hidden" name="item_id" value="' + data.item_id + '">';
	html += '<input type="hidden" name="two_flavors" class="two_flavors" value="' + data.two_flavors + '">';

	if (data.multiple_price == "") {
		if ($.isArray(data.prices)) {
			if (data.two_flavors != 2) {
				html += '<input type="hidden" name="price" value="' + data.prices[0].price + '">';
			}
			if (!website_hide_foodprice) {
				size = '';
				if (!empty(data.prices[0].size)) {
					size = data.prices[0].size;
				}
				if (data.prices[0].discount_price > 0.0001) {
					html += '<div class="price stic-single-price"><span class="stic-capitalize">' + size + '</span><span class="stic-price">' + data.prices[0].formatted_price + '</span><span class="stic-price-final">' + data.prices[0].formatted_discount_price + '</span></div>';
				} else {
					html += '<div class="price stic-single-price"><span class="stic-capitalize">' + size + '</span><span class="stic-price-final">' + data.prices[0].formatted_price + '</span></div>';
				}
			}
		}
	}

	html += '<p class="stic-small f15">' + data.item_description + '</p>';

	html += '</div>';

	/*MULTIPLE PRICE*/
	if (!website_hide_foodprice) {
		if (data.multiple_price == 1) {
			html += '<ons-list modifier="list_grey">';
			html += '<ons-list-header>Valor</ons-list-header>';
			if ($.isArray(data.prices)) {
				$.each(data.prices, function (price_key, price_val) {
					//html+='<ons-list-item>'+ price_val.formatted_price +'</ons-list-item>';	 

					value_price = price_val.price + "|" + price_val.size + "|" + price_val.size_id;

					selected = '';
					if (!empty(cart_data.price)) {
						if (value_price == cart_data.price) {
							selected = 'checked';
						}
					} else {
						if (price_key <= 0) {
							selected = 'checked';
						} else {
							selected = '';
						}
					}

					html += '<ons-list-item tappable>';
					html += '<label class="left">';
					html += '<ons-radio name="price" input-id="price-' + price_key + '" value="' + value_price + '"  ' + selected + ' ></ons-radio>';
					html += '</label>';

					if (price_val.discount_price > 0.0001) {
						html += '<label for="price-' + price_key + '" class="center"><span class="stic-capitalize">' + price_val.size + '</span><div class="stic-div-right"><span class="stic-price">' + price_val.formatted_price + '</span><span class="stic-price-final">' + price_val.formatted_discount_price + '</span></div></label>';
					} else {
						html += '<label for="price-' + price_key + '" class="center"><span class="stic-capitalize">' + price_val.size + '</span><span class="stic-price-final stic-div-right">' + price_val.formatted_price + '</span></label>';
					}


					html += '</ons-list-item>';
				});
			}
			html += '</ons-list>';
		}
	}

	/*SPECIAL INSTRUCTIONS*/
	html += '<ons-list modifier="list_grey">';
	html += '<ons-list-header>' + t("Special Request") + '</ons-list-header>';
	html += '</ons-list>';

	notes_value = !empty(cart_data.notes) ? cart_data.notes : '';
	html += '<div class="wrap">';
	html += '<textarea name="notes" class="stic-field textarea textarea--transparent full_width" rows="2" placeholder="' + t("Your preferences or request") + '.." >' + notes_value + '</textarea>';
	html += '</div>';

	/*COOKING REF*/
	if (!empty(data.cooking_ref)) {
		html += '<ons-list modifier="list_grey">';
		html += '<ons-list-header>' + t('Cooking Preference') + '</ons-list-header>';
		$.each(data.cooking_ref, function (cooking_ref_key, cooking_ref_val) {

			selected = '';
			if (!empty(cart_data.cooking_ref)) {
				if (cooking_ref_val == cart_data.cooking_ref) {
					selected = 'checked';
				}
			}

			html += '<ons-list-item tappable>';
			html += '<label class="left">';
			html += '<ons-radio name="cooking_ref" value="' + cooking_ref_val + '" input-id="cooking_ref-' + cooking_ref_key + '" ' + selected + ' ></ons-radio>';
			html += '</label>';
			html += '<label for="cooking_ref-' + cooking_ref_key + '" class="center">' + cooking_ref_val + '</label>';
			html += '</ons-list-item>';

		});
		html += '</ons-list>';
	}

	/*INGREDIENTS*/
	if (!empty(data.ingredients)) {
		html += '<ons-list modifier="list_grey">';
		html += '<ons-list-header>' + t('Ingredients') + '</ons-list-header>';
		$.each(data.ingredients, function (ingredients_key, ingredients_val) {
			html += '<ons-list-item tappable>';

			selected = '';
			if (!empty(cart_data.ingredients)) {
				$.each(cart_data.ingredients, function (cart_ingredients_key, cart_ingredients_val) {
					if (cart_ingredients_val == ingredients_val) {
						selected = 'checked';
					}
				});
			}

			html += '<label class="left">';
			html += '<ons-checkbox  name="ingredients[]" value="' + ingredients_val + '" input-id="ingredients-' + ingredients_key + '"  ' + selected + ' ></ons-checkbox>';
			html += '</label>';
			html += '<label for="ingredients-' + ingredients_key + '" class="center">' + ingredients_val + '</label>';

			html += '</ons-list-item>';
		});
		html += '</ons-list>';
	}

	/*ADDDON*/
	if ($.isArray(data.addon_item)) {
		$.each(data.addon_item, function (addon_key, addon_val) {

			if (!empty(addon_val.require_addons)) {
				if (addon_val.require_addons >= 2) {
					html += '<input type="hidden" name="require_addons" class="require_addons" data-subcat_id="' + addon_val.subcat_id + '" ' +
						'data-subcat_name="' + addon_val.subcat_name + '" ' +
						'data-multi_option="' + addon_val.multi_option + '" ' +
						'data-multi_option_val="' + addon_val.multi_option_val + '" ' +
						'value="' + '' + '" ' +
						'/>';
				}
			}

			html += '<ons-list modifier="list_grey">';
			html += '<ons-list-header>' + addon_val.subcat_name + '</ons-list-header>';

			if ($.isArray(addon_val.sub_item)) {
				$.each(addon_val.sub_item, function (subitem_key, subitem_val) {

					switch (addon_val.multi_option) {
						case "one":
							html += priceRadio(addon_val.subcat_id, subitem_val, cart_data, addon_val.two_flavor_position);
							break;

						case "multiple":
							html += priceCheckbox(addon_val.subcat_id, subitem_val, cart_data);
							break;

						case "custom":
							html += priceCheckboxCustom(addon_val.subcat_id, addon_val.multi_option_val, subitem_val, cart_data);
							break;

					}
				});
			}

			html += '</ons-list>';
		});
	}


	return html;
};

/*SINGLE*/
var priceRadio = function (cat_id, data, cart_data, two_flavor_position) {

	hide_price = isHidePrice();

	//field_name = "subitem_"+cat_id;
	field_name = "sub_item[" + cat_id + "][]";
	item_value = data.sub_item_id + "|" + data.price + "|" + data.sub_item_name + "|" + two_flavor_position;

	selected = '';
	if (!empty(cart_data)) {
		if (!empty(cart_data.sub_item)) {
			$.each(cart_data.sub_item[cat_id], function (cart_data_key, cart_data_val) {
				if (item_value == cart_data_val) {
					selected = 'checked';
				}
			});
		}
	}

	if (hide_price) {
		data.pretty_price = '';
	}

	html = '';
	html += '<ons-list-item tappable>';

	html += '<label class="left">';
	html += '<ons-radio class="item_addon_' + cat_id + ' two_flavor_position_' + two_flavor_position + ' " name="' + field_name + '" value="' + item_value + '" input-id="addon-' + cat_id + data.sub_item_id + '" ' + selected + ' ></ons-radio>';
	html += '</label>';
	html += '<label for="addon-' + cat_id + data.sub_item_id + '" class="center">' + data.sub_item_name + '<span class="spacer"></span>' + data.pretty_price + '</label>';

	html += '</ons-list-item>';

	return html;
};

/*CUSTOM*/
var priceCheckboxCustom = function (cat_id, limited_value, data, cart_data) {

	hide_price = isHidePrice();

	//field_name = "subitem_"+cat_id;
	field_name = "sub_item[" + cat_id + "][]";
	item_value = data.sub_item_id + "|" + data.price + "|" + data.sub_item_name;

	if (hide_price) {
		data.pretty_price = '';
	}

	selected = '';
	if (!empty(cart_data)) {
		if (!empty(cart_data.sub_item)) {
			$.each(cart_data.sub_item[cat_id], function (cart_data_key, cart_data_val) {
				if (item_value == cart_data_val) {
					selected = 'checked';
				}
			});
		}
	}

	html = '';
	html += '<ons-list-item tappable>';

	html += '<label class="left">';
	html += '<ons-checkbox name="' + field_name + '" class="subitem_custom item_addon_' + cat_id + '" data-limited="' + limited_value + '" data-id="' + cat_id + '" value="' + item_value + '" input-id="addon-' + cat_id + data.sub_item_id + '" ' + selected + ' ></ons-checkbox>';
	html += '</label>';
	html += '<label for="addon-' + cat_id + data.sub_item_id + '" class="center">' + data.sub_item_name + '<span class="spacer"></span>' + data.pretty_price + '</label>';

	html += '</ons-list-item>';

	return html;
};

/*MULTIPLE*/
var priceCheckbox = function (cat_id, data, cart_data) {

	hide_price = isHidePrice();

	//field_name = "subitem_"+cat_id;
	field_name = "sub_item[" + cat_id + "][]";
	item_value = data.sub_item_id + "|" + data.price + "|" + data.sub_item_name;


	selected = '';
	qty = 1;
	if (!empty(cart_data)) {
		if (!empty(cart_data.sub_item)) {
			$.each(cart_data.sub_item[cat_id], function (cart_data_key, cart_data_val) {
				dump("cart_data_val =>" + cat_id);
				dump(cart_data_val);
				if (item_value == cart_data_val) {
					selected = 'checked';
					qty = cart_data.addon_qty[cat_id][cart_data_key];
				}
			});
		}
	}

	if (hide_price) {
		data.pretty_price = '';
	}

	html = '';
	html += '<ons-list-item tappable modifier="qty_center">';

	html += '<label class="left">';
	html += '<ons-checkbox class="item_addon_' + cat_id + '"  name="' + field_name + '" value="' + item_value + '" input-id="addon-' + cat_id + data.sub_item_id + '"  ' + selected + ' ></ons-checkbox>';
	html += '</label>';
	html += '<label for="addon-' + cat_id + data.sub_item_id + '" class="center">' + data.sub_item_name + '<span class="spacer"></span>' + data.pretty_price + '</label>';

	//html+='<div class="right"><ons-input id="qty" modifier="transparent" value="1" placeholder="Qty" ></ons-input></div>';

	html += '<div class="right" style="width:140px;">';
	html += '<ons-row class="quantity_wrap">';
	html += '<ons-col >';
	html += '<ons-button modifier="quiet" class="full_width" onclick="minusQty( $(this) )" ><ons-icon icon="md-minus" size="15px" ></ons-icon></ons-button>';
	html += '</ons-col>';

	html += '<ons-col>';
	html += '<ons-input name="addon_qty[' + cat_id + '][]" class="addon_qty numeric_only" id="addon_qty" modifier="transparent" value="' + qty + '"  ></ons-input>';
	html += '</ons-col>';

	html += '<ons-col >';
	html += '<ons-button modifier="quiet" class="full_width" onclick="addQty( $(this) )" ><ons-icon icon="md-plus" size="15px"></ons-icon></ons-button>';
	html += '</ons-col>';
	html += '</ons-row>  ';
	html += '</div>';


	html += '</ons-list-item>';

	return html;
};


/*DISPLAY CART DETAILS*/
var displayCartDetails = function (datas) {
	data = datas.data;
	dump(data);
	var html = '<ons-list class="stic-float-wrap">';

	html += '<div class="stic-order">';
	html += '<span>' + t("Your order") + '</span>';
	html += '<ons-button class="stic-right stic-uppercase clear-btn" modifier="quiet" onclick="confirmClearCart();" >' + t("CLEAR CART") + '</ons-button>';
	html += '</div>';

	if (!empty(data.item)) {
		$.each(data.item, function (item_key, item_val) {
			html += '<ons-list-item tappable modifier="nodivider" >';
			html += '<div class="left" onclick="itemDetails(' + "'" + item_val.item_id + "'," + "'" + item_val.category_id + "'," + "'" + item_key + "'" + ')" ><span class="notification stic">' + item_val.qty + '</span></div>';

			html += '<div class="center" onclick="itemDetails(' + "'" + item_val.item_id + "'," + "'" + item_val.category_id + "'," + "'" + item_key + "'" + ')">';
			html += '<span class="full_width">' + item_val.item_name + '</span>';
			if (item_val.discount > 0) {
				price_used = item_val.discounted_price;
				html += '<div class="left stic-small"><span class="stic-capitalize">' + item_val.size_words + ' </span><span class="line_tru">' + prettyPrice(item_val.normal_price) + ' </span><span class="stic-black">' + prettyPrice(item_val.discounted_price) + '</span></div>';
			} else {
				price_used = number_format(item_val.normal_price, 2, '.', '');
				html += '<div class="left stic-small"><span class="stic-capitalize">' + item_val.size_words + ' </span><span class="stic-black">' + prettyPrice(item_val.normal_price) + '</span></div>';
			}
			html += '</div>';

			html += '<div class="right"><ons-button class="stic-remove" modifier="quiet" onclick="removeCartItem( ' + item_key + ' )" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button></div>';
			html += '</ons-list-item>';

			html += '<ons-list-item modifier="nodivider normal_list" >';
			html += '<div class="right">' + prettyPrice(parseFloat(price_used) * parseFloat(item_val.qty)) + '</div>';
			html += '</ons-list-item>';

			/*COOKING REF*/
			if (!empty(item_val.cooking_ref)) {
				html += '<ons-list-item modifier="nodivider normal_list" >';
				html += item_val.cooking_ref;
				html += '</ons-list-item>';
			}

			/*NOTES*/
			if (!empty(item_val.order_notes)) {
				html += '<ons-list-item modifier="nodivider normal_list" >';
				html += item_val.order_notes;
				html += '</ons-list-item>';
			}

			/*INGREDIENTS*/
			if (!empty(item_val.ingredients)) {
				html += '<ons-list-item modifier="nodivider normal_list" >';
				html += '<div class="left">Ingredients :</div>';
				ingredients_list = '';
				$.each(item_val.ingredients, function (ingredients_key, ingredients_val) {
					ingredients_list += ingredients_val + ',';
				});
				html += '<div class="center">' + ingredients_list + '</div>';
				html += '</ons-list-item>';
			}

			/*SUB ITEM*/
			if (!empty(item_val.new_sub_item)) {
				$.each(item_val.new_sub_item, function (new_sub_item_key, new_sub_item_val) {
					html += '<ons-list-item modifier="nodivider normal_list" >';
					html += '<ons-list-header style="padding-left:0;"><span class="list-item__subtitle">' + new_sub_item_key + '</span></ons-list-header>';
					$.each(new_sub_item_val, function (new_sub_item_val_key, new_sub_item_val_val) {
						dump(new_sub_item_val_val);
						html += '<ons-row>';
						html += '<ons-col vertical-align="center" width="70px" >' + new_sub_item_val_val.addon_qty + 'x' + prettyPrice(new_sub_item_val_val.addon_price) + '</ons-col>';
						html += '<ons-col vertical-align="center" >' + new_sub_item_val_val.addon_name + '</ons-col>';
						html += '<ons-col vertical-align="center" class="text_right" width="40px" >' + prettyPrice(parseFloat(new_sub_item_val_val.addon_qty) * parseFloat(new_sub_item_val_val.addon_price)) + '</ons-col>';
						html += '</ons-row>';
					});
					html += '</ons-list-item>';
				});
			}

			html += '<ons-list-item modifier="divider" >';
			html += '</ons-list-item>';

		});

	} else {
		dump('no row');
	}

	/*EURO TAX*/
	var is_apply_tax = false;
	if (!empty(datas.is_apply_tax)) {
		if (datas.is_apply_tax == 1) {
			is_apply_tax = true;
		}
	}
	/*END EURO TAX*/

	/*CHECK IF THERE IS APPLY VOUCHER*/
	less_voucher = 0;

	if (!is_apply_tax) {
		if (!empty(data.total.less_voucher)) {
			less_voucher = parseFloat(data.total.less_voucher);
			if (less_voucher > 0.0001) {
				remove_voucher = '<ons-button modifier="quiet" onclick="removeVoucher()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
				voucher_percentage = '';
				if (!empty(data.total.voucher_type)) {
					voucher_percentage = "<span class=\"spacer\"></span>" + data.total.voucher_type;
				}
				html += twoColumn(t('Less Voucher') + voucher_percentage + "<span class=\"spacer\"></span>" + remove_voucher, "(" + prettyPrice(less_voucher) + ")");
			}
		}
	}


	if (!is_apply_tax) {
		if (!empty(data.total.discounted_amount)) {
			discounted_amount = parseFloat(data.total.discounted_amount);
			discount_percentage = parseFloat(data.total.merchant_discount_amount);
			if (discounted_amount > 0.0001) {
				html += twoColumn(t('Discount') + '<span class=\"spacer\"></span>' + discount_percentage + "%<span class=\"spacer\"></span>", "(" + prettyPrice(discounted_amount) + ")");
			}
		}
	}

	/*CHECK IF POINTS IS APPLIED*/
	if (!is_apply_tax) {
		if (!empty(data.total.pts_redeem_amt_orig)) {
			remove_pts = '<ons-button modifier="quiet" onclick="removePoints()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
			html += twoColumn(t('Points Discount') + "<span class=\"spacer\"></span>" + remove_pts, "(" + prettyPrice(data.total.pts_redeem_amt_orig) + ")");
		}
	}


	if (!is_apply_tax) {
		html += twoColumn(t('Sub Total'), prettyPrice(data.total.subtotal));
	}

	/*APPLY VOUCHER*/
	if (less_voucher > 0.0001) {

	} else {
		html += voucherColumn();
	}

	has_tips = false;
	if (!empty(data.total.tips)) {
		if (data.total.tips > 0.0001) {
			has_tips = true;
		}
	}

	/*TIPS*/
	if (has_tips == false) {
		html += tipColumn(datas.tip_list);
	}

	/*POINTS ADDON*/
	if (datas.points_enabled == 1 || datas.points_enabled == "1") {

		if (datas.cart_details.points_apply > 0) {
			html += '<div class="points_wrap">';
			if (!empty(datas.pts_label_earn)) {
				html += '<p class="green_label" style="margin-top:0;margin-bottom:0;">' + datas.pts_label_earn + '</p>';
			}
			html += '</div>';
		} else {
			html += '<div class="points_wrap">';
			if (!empty(datas.pts_label_earn)) {
				html += '<p class="green_label" style="margin-top:0;margin-bottom:0;">' + datas.pts_label_earn + '</p>';
			}
			if (empty(datas.pts_disabled_redeem)) {
				if (datas.available_points > 0) {
					html += '<ons-list-item modifier="nodivider">';
					html += '<div class="left"><ons-input type="number" id="redeem_points" class="redeem_points numeric_only" modifier="underbar" placeholder="' + t('Redeem Points') + '" float></ons-input></div>';
					html += '<div class="right"><ons-button modifier="quiet quiet_green" onclick="redeemPoints()">' + t("REDEEM") + '</ons-button></div>';
					html += '</ons-list-item>';
				}
			}
			if (!empty(datas.available_points_label)) {
				if (datas.available_points > 0) {
					html += '<p class="green_label" style="margin-top:0;">' + datas.available_points_label + '</p>';
				}
			}
			html += '</div>';
		}
	}
	/*END POINTS ADDON*/


	/*SMS ORDER VERIFICATION*/
	/*if(settings = AppSettings()){
   	  	 if(settings.order_verification=="2"){
   	  	 	html+='<ons-list-item modifier="nodivider">';
			   html+='<div class="left"><ons-input id="order_sms_code" class="order_sms_code" modifier="underbar" placeholder="Enter Code" float></ons-input></div>';
			   html+='<div class="right"><ons-button modifier="quiet quiet_green" onclick="verifyOrderSMS()">APPLY</ons-button></div>';
			html+='</ons-list-item>';
			
			html+='<ons-list-item modifier="nodivider">';
			   html+='<div class="left small">This merchant has required SMS verification before you can place your order.</div>';
			   html+='<div class="right"><ons-button modifier="quiet quiet_green" onclick="getSMSCode()">GET SMS</ons-button></div>';
			html+='</ons-list-item>';
   	  	 }   	  	 
   	} */

	if (!empty(data.total.delivery_charges)) {
		if (data.total.delivery_charges > 0.0001) {
			html += twoColumn(t('Delivery Fee'), prettyPrice(data.total.delivery_charges));
		}
	}

	if (!empty(data.total.merchant_packaging_charge)) {
		if (data.total.merchant_packaging_charge > 0.0001) {
			html += twoColumn(t('Packaging'), prettyPrice(data.total.merchant_packaging_charge));
		}
	}

	if (!is_apply_tax) {
		if (!empty(data.total.taxable_total)) {
			if (data.total.taxable_total > 0.0001) {
				html += twoColumn(t('Tax') + " " + (data.total.tax * 100) + "%", prettyPrice(data.total.taxable_total));
			}
		}
	}


	/*EURO TAX*/
	if (is_apply_tax) {

		if (!empty(data.total.pts_redeem_amt_orig)) {
			remove_pts = '<ons-button modifier="quiet" onclick="removePoints()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
			html += twoColumn(t('Points Discount') + "<span class=\"spacer\"></span>" + remove_pts, "(" + prettyPrice(data.total.pts_redeem_amt_orig) + ")");
		}

		if (has_tips) {
			remove_tips = '<ons-button modifier="quiet" onclick="removeTip()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
			html += twoColumn(t('Tips') + " " + data.total.tips_percent + "<span class=\"spacer\"></span>" + remove_tips, prettyPrice(data.total.tips));
		}

		if (!empty(data.total.less_voucher)) {
			less_voucher = parseFloat(data.total.less_voucher);
			if (less_voucher > 0.0001) {
				remove_voucher = '<ons-button modifier="quiet" onclick="removeVoucher()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
				voucher_percentage = '';
				if (!empty(data.total.voucher_type)) {
					voucher_percentage = "<span class=\"spacer\"></span>" + data.total.voucher_type;
				}
				html += twoColumn(t('Less Voucher') + voucher_percentage + "<span class=\"spacer\"></span>" + remove_voucher, "(" + prettyPrice(less_voucher) + ")");
			}
		}

		if (!empty(data.total.discounted_amount)) {
			discounted_amount = parseFloat(data.total.discounted_amount);
			discount_percentage = parseFloat(data.total.merchant_discount_amount);
			if (discounted_amount > 0.0001) {
				html += twoColumn(t('Discount') + '<span class=\"spacer\"></span>' + discount_percentage + "%<span class=\"spacer\"></span>", "(" + prettyPrice(discounted_amount) + ")");
			}
		}

		html += twoColumn(t('Sub Total'), prettyPrice(data.total.subtotal));
		html += twoColumn(t('Tax') + " " + (data.total.tax * 100) + "%", prettyPrice(data.total.taxable_total));
	}
	/*END EURO TAX*/

	if (!is_apply_tax) {
		if (has_tips) {
			remove_tips = '<ons-button modifier="quiet" onclick="removeTip()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
			html += twoColumn(t('Tips') + " " + data.total.tips_percent + "<span class=\"spacer\"></span>" + remove_tips, prettyPrice(data.total.tips));
		}
	}

	$(".cart_total_value").val('');

	if (!empty(data.total.total)) {
		if (data.total.total > 0) {
			html += twoColumn("<span class=\"bold\">" + t('Total') + "</span>", "<span class=\"stic-simple-price bold\">" + prettyPrice(data.total.total)) + "</span>";
			$(".cart_total").html(prettyPrice(data.total.total));
			$(".cart_total_value").val(prettyPrice(data.total.total));
			$(".cart_total_value_raw").val(data.total.total);
			$(".cart_sub_total").val(data.total.subtotal);
		}
	}

	/*MIN ORDER TABLE*/
	if (!empty(datas.cart_details.min_delivery_order)) {
		$(".min_delivery_order").val(datas.cart_details.min_delivery_order);
	} else {
		$(".min_delivery_order").val('');
	}

	/*LIST THE SERVICES OFFER BY MERCHANT*/
	/*services = datas.services;
	if(!empty(services)){		
		$.each( services, function( services_key, services_val ) {
			html+='<ons-list-item tappable modifier="nodivider">';
			  html+='<label class="left">';
		        html+='<ons-radio name="transaction_type" input-id="transaction_type_'+services_key+'" value="'+services_key+'" ></ons-radio>';
		      html+='</label>';
		      html+='<label for="transaction_type_'+services_key+'" class="center">';
		        html+= services_val;
		      html+='</label>';
		    html+='</ons-list-item>';
		});
	}*/


	services = datas.services;

	dump(services);
	selected_services = datas.transaction_type;
	selected_delivery_date = '';
	selected_delivery_time = '';

	selected_delivery_address = t('Enter address');

	selected_delivery_date = datas.default_delivery_date;
	default_delivery_date_pretty = datas.default_delivery_date_pretty;

	delivery_date_set = getStorage("delivery_date_set");
	delivery_date_set_pretty = getStorage("delivery_date_set_pretty");
	if (!empty(delivery_date_set)) {
		selected_delivery_date = delivery_date_set;
	} else {
		setStorage("delivery_date_set", selected_delivery_date);
	}
	if (!empty(delivery_date_set_pretty)) {
		default_delivery_date_pretty = delivery_date_set_pretty;
	}

	delivery_time_set = getStorage("delivery_time_set");
	if (!empty(delivery_time_set)) {
		selected_delivery_time = delivery_time_set;
	}


	$(".transaction_type").val(selected_services);
	$(".delivery_date").val(selected_delivery_date);

	var delivery_date_list_label = '';
	var delivery_time_list_label = '';

	switch (datas.transaction_type) {
		case "delivery":
			delivery_date_list_label = t('Delivery Date');
			delivery_time_list_label = t('Delivery Time');
			break;

		case "coleta":
			delivery_date_list_label = t('Coleta Date');
			delivery_time_list_label = t('Coleta Time');
			break;

		case "coleta_retorno":
			delivery_date_list_label = t('Coleta Date');
			delivery_time_list_label = t('Coleta Time');
			break;

		case "pre_coleta":
			delivery_date_list_label = t('Pre Coleta Date');
			delivery_time_list_label = t('Pre Coleta Time');
			break;

		case "pre_coleta_retorno":
			delivery_date_list_label = t('Pre Coleta Date');
			delivery_time_list_label = t('Pre Coleta Time');
			break;

		case "prestacao_servico":
			delivery_date_list_label = t('Servico Date');
			delivery_time_list_label = t('Servico Time');
			break;

		case "pickup":
			delivery_date_list_label = t('Pickup Date');
			delivery_time_list_label = t('Pickup Time');
			break;

		case "dinein":
			delivery_date_list_label = t('Dinein Date');
			delivery_time_list_label = t('Dinein Time');
			break;
	}


	html += '<ons-list-header modifier="list_title_grey" class="stic-list-title">' + t('Options') + '</ons-list-header>';

	html += '<ons-list-item modifier="chevron longdivider" tappable onclick="showTransactionList()" >';
	html += '<div class="left">' + t('Transaction Type') + '</div>';
	html += '<div class="right"><span class="stic-small-upper list-item__subtitle transaction_type_label">' + t(services[selected_services]) + '</span></div>';
	html += '</ons-list-item>';

	html += '<ons-list-item tappable modifier="chevron longdivider" onclick="showDeliveryDateList()" >';
	html += '<div class="left">' + delivery_date_list_label + '</div>';
	html += '<div class="right"><span class="stic-small-upper list-item__subtitle delivery_date_label">' + default_delivery_date_pretty + '</span></div>';
	html += '</ons-list-item>';

	html += '<ons-list-item tappable modifier="chevron longdivider" onclick="showDeliveryTime()" >';
	html += '<div class="left">' + delivery_time_list_label + '</div>';
	html += '<div class="right"><span class="stic-small-upper list-item__subtitle delivery_time_label">' + selected_delivery_time + '</span></div>';
	html += '</ons-list-item>';

	if (datas.transaction_type == "delivery") {

		if (datas.checkout_stats.is_pre_order != 1) {
			html += '<ons-list-item>';
			html += '<div class="center">';
			html += t("Delivery Asap");
			html += '</div>';
			html += '<div class="right">';
			html += '<ons-switch id="delivery_asap" class="delivery_asap" value="1" onclick="setAsap()"></ons-switch>';
			html += '</div>';
			html += '</ons-list-item>';
		}

		if (!empty(datas.cart_details)) {
			if (!empty(datas.cart_details.street)) {
				selected_delivery_address = datas.cart_details.street;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.city;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.state;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.zipcode;
				$(".delivery_address").val(selected_delivery_address);
			}
		}

		//html+='<ons-list-item tappable modifier="chevron longdivider" onclick="showPage(\'address_form.html\')" >';	
		html += '<ons-list-item tappable modifier="chevron longdivider" class="stic-delivery" onclick="initAddress()" >';
		html += '<div class="left">' + t("Delivery Address") + '</div>';
		html += '<div class="right text-right"><span class="stic-small-upper list-item__subtitle delivery_address_label concat-text">' + selected_delivery_address + '</span></div>';
		html += '</ons-list-item>';
	} else 	if (datas.transaction_type == "coleta" || datas.transaction_type == "coleta_retorno") {

		if (!empty(datas.cart_details)) {
			if (!empty(datas.cart_details.street)) {
				selected_delivery_address = datas.cart_details.street;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.city;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.state;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.zipcode;
				$(".delivery_address").val(selected_delivery_address);
			}
		}

		//html+='<ons-list-item tappable modifier="chevron longdivider" onclick="showPage(\'address_form.html\')" >';	
		html += '<ons-list-item tappable modifier="chevron longdivider" class="stic-delivery" onclick="initAddress()" >';
		html += '<div class="left">' + t("Coleta Address") + '</div>';
		html += '<div class="right text-right"><span class="stic-small-upper list-item__subtitle delivery_address_label concat-text">' + selected_delivery_address + '</span></div>';
		html += '</ons-list-item>';
	} else 	if (datas.transaction_type == "pre_coleta" || datas.transaction_type == "pre_coleta_retorno") {

		if (!empty(datas.cart_details)) {
			if (!empty(datas.cart_details.street)) {
				selected_delivery_address = datas.cart_details.street;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.city;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.state;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.zipcode;
				$(".delivery_address").val(selected_delivery_address);
			}
		}

		//html+='<ons-list-item tappable modifier="chevron longdivider" onclick="showPage(\'address_form.html\')" >';	
		html += '<ons-list-item tappable modifier="chevron longdivider" class="stic-delivery" onclick="initAddress()" >';
		html += '<div class="left">' + t("Pre Coleta Address") + '</div>';
		html += '<div class="right text-right"><span class="stic-small-upper list-item__subtitle delivery_address_label concat-text">' + selected_delivery_address + '</span></div>';
		html += '</ons-list-item>';
	} else 	if (datas.transaction_type == "prestacao_servico") {

		if (!empty(datas.cart_details)) {
			if (!empty(datas.cart_details.street)) {
				selected_delivery_address = datas.cart_details.street;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.city;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.state;
				selected_delivery_address += " ";
				selected_delivery_address += datas.cart_details.zipcode;
				$(".delivery_address").val(selected_delivery_address);
			}
		}

		//html+='<ons-list-item tappable modifier="chevron longdivider" onclick="showPage(\'address_form.html\')" >';	
		html += '<ons-list-item tappable modifier="chevron longdivider" class="stic-delivery" onclick="initAddress()" >';
		html += '<div class="left">' + t("Servico Address") + '</div>';
		html += '<div class="right text-right"><span class="stic-small-upper list-item__subtitle delivery_address_label concat-text">' + selected_delivery_address + '</span></div>';
		html += '</ons-list-item>';
	}


	html += '</ons-list>';
	return html;
};

var twoColumn = function (label, value) {
	var html = '<ons-list-item modifier="nodivider">';
	html += '<div class="left">' + label + '</div>';
	html += '<div class="right">' + value + '</div>';
	html += '</ons-list-item>';
	return html;
};

var voucherColumn = function () {

	if (settings = AppSettings()) {
		if (settings.merchant_enabled_voucher != "yes") {
			return '';
		}
	}

	var html = '<ons-list-item modifier="nodivider">';
	html += '<div class="left"><ons-input id="voucher_name" class="stic-field voucher_name" modifier="underbar" placeholder="' + t('Enter voucher here') + '" float></ons-input></div>';
	html += '<div class="right"><ons-button class="stic-small-button p1" modifier="quiet" onclick="applyVoucher()">' + t("Apply") + '</ons-button></div>';
	html += '</ons-list-item>';
	return html;
};

tipColumn = function (data) {

	if (settings = AppSettings()) {
		if (settings.merchant_enabled_tip != "2") {
			return '';
		}
	}

	merchant_tip_default = '';
	if (settings = AppSettings()) {
		merchant_tip_default = settings.merchant_tip_default;
	}

	var tip_list = '';
	tip_list += '<ons-icon class="stic-drop-down" icon="caret-down" size="20px"></ons-icon>';
	tip_list += '<ons-select id="tips" class="tips">';
	if (!empty(data)) {
		$.each(data, function (key, val) {
			selected = '';
			if (key == merchant_tip_default) {
				selected = 'selected';
			}
			tip_list += '<option value="' + key + '" ' + selected + ' >' + val + '</option>';
		});
	}
	tip_list += '</ons-select>';


	var html = '<ons-list-item modifier="nodivider">';
	html += '<div class="left relative">' + tip_list + '</div>';
	html += '<div class="right"><ons-button class="stic-small-button p1" modifier="quiet" onclick="applyTips()">' + t("Add Tips") + '</ons-button></div>';
	html += '</ons-list-item>';
	html += '<div style="padding: 0px 0px 0px 0px; font-size: 10px; margin: 0px 5px 0px 5px; text-align: center; color: darkviolet;" class="trn">' + t("Description Tips") + '</div>';
	return html;
}

var displayList = function (data, transaction_type) {
	var html = '';
	html += '<ons-list>';
	$.each(data, function (key, val) {
		if (transaction_type == "delivery_time") {
			html += '<ons-list-item tappable modifier="longdivider" onclick="setFieldValue(' + "'" + transaction_type + "'," + "'" + val + "','" + addslashes(val) + "'" + ' )" ><div class="center">' + val + '</div></ons-list-item>';
		} else {
			html += '<ons-list-item tappable modifier="longdivider" onclick="setFieldValue(' + "'" + transaction_type + "'," + "'" + key + "','" + addslashes(val) + "'" + ' )" ><div class="center">' + t(val) + '</div></ons-list-item>';
		}
	});
	html += '</ons-list>';
	return html;
};


var displayPaymentList = function (data) {
	var html = '';
	html += '<ons-list>';
	$.each(data, function (key, val) {
		html += '<ons-list-item tappable modifier="longdivider" >';
		html += '<label class="left">';
		html += '<ons-radio name="payment_provider" class="payment_provider" input-id="payment_provider-' + key + '" value="' + val.payment_code + '"  ></ons-radio>';
		html += '</label>';

		html += '<label for="payment_provider-' + key + '" class="center">' + val.payment_name + '</label>';

		html += '</ons-list-item>';
	});
	html += '</ons-list>';
	return html;
};

var ccLIst = function (data) {
	var html = '';
	html += '<ons-list modifier="list_menu">';
	$.each(data, function (key, val) {
		html += '<ons-list-item modifier="longdivider" tappable onclick="cardsAction(' + "'" + val.id + "'," + "'" + "cc" + "'" + ' )"  >';
		html += val.card;
		html += '</ons-list-item>';
	});
	html += '</ons-list>';
	return html;
};


var addressList = function (data) {
	var html = '';
	html += '<ons-list modifier="list_menu">';
	$.each(data, function (key, val) {
		html += '<ons-list-item style="padding-right: 0" modifier="longdivider" tappable onclick="cardsAction(' + "'" + val.id + "'," + "'" + "address" + "'" + ' )"  >';
		html += '<div class="left concat_text">' + val.address + '</div>';
		if (val.as_default == 2) {
			html += '<div class="right"><ons-icon icon="md-check" class="color_green" size="15px" ></ons-icon></div>';
		} else {
			html += '<div class="right"></div>';
		}

		html += '</ons-list-item>';
	});
	html += '</ons-list>';
	return html;
};


var displayOrders = function (data) {
	var list = document.getElementById('infinite_orders');
	var html = '';
	$.each(data, function (key, val) {
		html += '<ons-list-item tappable class="stic-list-item" style="padding-bottom: 15px;" onclick="orderAction(' + val.order_id + ',' + val.show_cancel_order + ',' + val.add_review + ' )">';
		/*html+='<div class="inner" style="padding:0 15px;"><h3>'+ val.transaction_type + '<span class="spacer"></span>' + '#'+ val.order_id +'</h3></div>';*/

		html += '<div class="inner equal_table" style="padding:0 15px;">';
		html += '<div class="col"><h3 class="stic-capitalize">' + val.transaction_type + '<span class="spacer"></span>' + '#' + val.order_id + '</h3></div>';
		if (!empty(val.rating)) {
			html += '<div class="stic_orders col">';
			html += '<ons-icon class="stic-gold f15" icon="star"></ons-icon>';
			html += '<span class="notification notification--material stic-gold stic-rating">' + val.rating + '</span>'
			html += '</div>'
		}
		html += '</div>';

		html += '<div class="inner">';
		html += '<div class="equal_table full_width">';
		//html+='<div class="col col-1-1 small">' + val.placed + '<br/>' + val.payment_type +  '</div>';
		html += '<div class="stic-small stic-black">' + val.placed;
		html += '<br/>' + val.payment_type;
		if (!empty(val.cancel_status)) {
			html += '<br/><span class="stic-uppercase">' + val.cancel_status + '</span>';
		}
		html += '</div>';

		html += '<div class="stic-booking-status" >';
		html += '<span class="badge_rounded">' + val.status + '</span>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		html += '<div class="stic-order-value">';
		html += '<span>' + val.total + '</span>';
		html += '</div>';

		html += '</ons-list-item>';

		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html = '';

	});
};

var formatOrder = function (data) {
	var html = '<ons-list class="stic-list" modifier="order_list">';
	$.each(data, function (key, val) {
		html += '<ons-list-item modifier="longdivider">';
		html += '<div class="left">' + val.label + ' :</div>';
		html += '<div class="right">' + val.value + '</div>';
		html += '</ons-list-item>';
	});
	html += '</ons-list>';
	return html;
};

displayReviews = function (data) {
	var list = document.getElementById('infinite_reviews');
	var html = '';
	$.each(data, function (key, val) {
		html += '<ons-list-item class="stic-list-item pad15">';

		html += '<div class="stic-avatar left">';
		html += '<span>';
		html += '<img class="list-item__thumbnail" src="' + val.avatar + '">';
		html += '</span>';
		html += '</div>';

		html += '<div class="center">';
		html += '<span class="list-item__title ">' + val.review + '</span>';
		html += '<span class="list-item__subtitle">' + val.date + '</span>';

		if ($.isArray(val.reply)) {
			$.each(val.reply, function (reply_key, reply_val) {
				html += '<span class="list-item__subtitle color_green indent">' + reply_val.reply_from + '</span>';
				html += '<span class="list-item__subtitle small indent">' + reply_val.date + '</span>';
				html += '<span class="list-item__subtitle indent small">' + reply_val.review + '</span>';
			});
		}

		if (val.can_edit == 1) {
			html += '<span class="list-item__subtitle">';
			html += '<ons-button modifier="quiet" class="" onclick="showEditForm(' + val.id + ')" ><ons-icon icon="md-edit" size="15px"></ons-icon></ons-button>';
			html += '<ons-button modifier="quiet" class="" onclick="reviewConfirmDelete(' + val.id + ')" ><ons-icon icon="md-delete" class="red_color" size="15px"></ons-icon></ons-button>';
			html += '</span>';
		}

		html += '</div>';

		html += '<div class="right">';
		html += '<ons-icon class="stic-gold f15" icon="star"></ons-icon>';
		html += '<span class="notification notification--material stic-gold stic-rating">' + val.rating + '</span>'
		html += '</div>';

		html += '</ons-list-item>';

		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html = '';

	});

	initImageLoaded();

};

gallery = function (data) {
	var html = ' <ons-carousel fullscreen swipeable auto-scroll overscrollable id="carousel">';
	$.each(data, function (key, val) {

		html += '<ons-carousel-item style="background-image: url(' + val + '); background-size:cover;" >';
		html += '</ons-carousel-item>';

	});
	html += '</ons-carousel>';
	return html;
};


displayPromo = function (data) {
	var html = '';

	html += '<div class="stic-carousel-margin">';
	html += '<ons-carousel swipeable auto-scroll auto-scroll-ratio="0.1" overscrollable id="stic-offer" class="stic-carousel">';

	if ($.isArray(data.offer)) {
		$.each(data.offer, function (offer_key, offer_val) {
			html += '<ons-carousel-item class="stic-offer-item">';
			html += '<div class="stic-offer-div">';
			html += '<ons-row class="stic-offer-row">';
			html += '<ons-col class="stic-gift">';
			html += '<img src="images/gift.svg">';
			html += '</ons-col>';
			html += '<ons-col class="stic-promo">';
			html += '<p class="trn bold">Offer</p>';
			html += '<span>' + offer_val + '</span>';
			html += '</ons-col>';
			html += '</ons-row>';
			html += '</div>';
			html += '</ons-carousel-item>';
		});
	}

	if ($.isArray(data.voucher)) {
		$.each(data.voucher, function (voucher_key, voucher_val) {
			html += '<ons-carousel-item class="stic-offer-item">';
			html += '<div class="stic-offer-div">';
			html += '<ons-row class="stic-offer-row">';
			html += '<ons-col class="stic-gift">';
			html += '<img src="images/gift.svg">';
			html += '</ons-col>';
			html += '<ons-col class="stic-promo">';
			html += '<p class="trn bold">Voucher</p>';
			html += '<span>' + voucher_val + '</span>';
			html += '</ons-col>';
			html += '</ons-row>';
			html += '</div>';
			html += '</ons-carousel-item>';
		});
	}

	if (!empty(data.free_delivery)) {
		html += '<ons-carousel-item class="stic-offer-item">';
		html += '<div class="stic-offer-div">';
		html += '<ons-row class="stic-offer-row">';
		html += '<ons-col class="stic-gift">';
		html += '<img src="images/gift.svg">';
		html += '</ons-col>';
		html += '<ons-col class="stic-promo">';
		html += '<p class="trn bold">Promo</p>';
		html += '<span>' + data.free_delivery + '</span>';
		html += '</ons-col>';
		html += '</ons-row>';
		html += '</div>';
		html += '</ons-carousel-item>';
	}

	html += '</ons-carousel>';
	html += '</div>';

	$(".offer_wrap").html(html);
};

displayBooking = function (data) {

	var list = document.getElementById('infinite_bookhistory');
	var html = '';
	$.each(data, function (key, val) {
		html += '<ons-list-item tappable class="stic-list-item">';
		html += '<div class="inner" style="padding:0 15px;"><h3>' + val.booking_id + '</h3></div>';
		html += '<div class="inner">';
		html += '<div class="equal_table full_width">';
		html += '<div class="stic-small stic-black">' + val.date + '<br/>' + val.guest + '</div>';
		html += '<div class="stic-booking-status" >';
		html += '<span class="badge_rounded">' + val.status + '</span>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		html += '<div class="inner">'
		html += '<p class="stic-black">' + val.notes + '</p>';
		html += '</div>';

		html += '</ons-list-item>';

		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html = '';

	});

};


fillAddressBook = function (data) {
	var html = '';
	html += '<ons-icon class="stic-drop-down" icon="caret-down" size="20px"></ons-icon>';
	html += '<ons-select name="addressbook_id" id="addressbook_id" class="mb10 full_width addressbook_id" required>';
	$.each(data, function (key, val) {
		html += '<option value="' + val.id + '">' + val.address + '</option>';
	});
	html += '</ons-select>';
	return html;
};

profileMenu = function (islogin) {
	var html = '';
	if (islogin == 1) {

		html += '<ons-list modifier="list_menu">';

		html += '<ons-list-item modifier="chevron" tappable onclick="showPage(\'settings_menu.html\')" >';
		html += '<div class="left"><ons-icon icon="md-settings" size="22px"></ons-icon></div>';
		html += '<div class="center">' + t('Settings') + '</div>';
		html += '</ons-list-item>';

		html += '<ons-list-item modifier="chevron" tappable>';
		html += '<div class="left"><ons-icon icon="md-help-outline" size="22px"></ons-icon></div>';
		html += '<div class="center">' + t('Help') + '</div>';
		html += '</ons-list-item>';

		html += '</ons-list>';

	} else {

		html += '<ons-list modifier="list_menu">';

		html += '<ons-list-item modifier="chevron" tappable onclick="showPage(\'settings_menu.html\')" >';
		html += '<div class="left"><ons-icon icon="md-settings" size="22px"></ons-icon></div>';
		html += '<div class="center">' + t('Settings') + '</div>';
		html += '</ons-list-item>';

		html += '<ons-list-item modifier="chevron" tappable>';
		html += '<div class="left"><ons-icon icon="md-help-outline" size="22px"></ons-icon></div>';
		html += '<div class="center">' + t('Help') + '</div>';
		html += '</ons-list-item> ';

		html += '</ons-list>';

		html += '<div class="wrap top100">';
		html += '<p class="small make_center" >' + t('Get your first order, sign up now!') + '</p>';

		html += '<div class="field_wrap">';
		html += '<ons-button modifier="green_button" class="full_width" onclick="initSignup()" >';
		html += 'SIGN UP';
		html += '</ons-button>';
		html += '</div>';

		html += '<div class="center_text_line">' + t('Already have account?') + '</div>';

		html += '<div class="field_wrap">';
		html += '<ons-button modifier="quiet quiet_green no_shadow" class="full_width button_nopadding" onclick="initLogin()" > ';
		html += t('LOG IN');
		html += '</ons-button> ';
		html += '</div>';

		html += '</div>';
	}
	return html;
};


displaySelectCC = function (data) {

	html = '';
	html += '<ons-list modifier="list_menu">';

	x = 1;

	$.each(data, function (key, val) {
		html += '<ons-list-item tappable>';
		html += '<label class="left">';
		html += '<ons-radio name="cc_id" value="' + val.id + '" input-id="cc_id_' + x + '" class="cc_id"  ></ons-radio>';
		html += '</label>';
		html += '<label for="cc_id_' + x + '" class="center">' + val.card + '</label>';
		html += '</ons-list-item>';
		x++;
	});

	html += '</ons-list>';
	return html;
};

displayCards = function (data) {

	html = '';
	html += '<ons-list modifier="list_menu">';

	x = 1;

	$.each(data, function (key, val) {
		html += '<ons-list-item tappable>';

		html += '<label class="left">';
		html += '<ons-radio name="cc_name" value="' + val.payment_name + '" input-id="cc_name_' + x + '" class="cc_name"  ></ons-radio>';
		html += '</label>';
		html += '<label for="cc_name_' + x + '" class="center">' + val.payment_name + '</label>';

		html += '<div class="right"><img class="list-item__thumbnail" src="' + val.payment_logo + '"></div>';

		html += '</ons-list-item>';
		x++;
	});

	html += '</ons-list>';
	return html;

};

fillMobilePrefix = function (data) {
	html = '';
	html += '<ons-list>';
	html += '<ons-list-header>' + t('Select your country code') + '</ons-list-header>';

	$.each(data, function (key, val) {
		html += '<ons-list-item tappable modifier="longdivider" onclick="setPrefix(' + "'+" + val.code + "'" + ')">';
		html += '<div class="left ">+' + val.code + '</div>';
		html += '<div class="center ">' + val.name + '</div>';
		html += '</ons-list-item>';
	});
	html += '</ons-list>';
	$(".mobilecode_list").html(html);
};

displayNotification = function (data) {
	var list = document.getElementById('infinite_notification');
	var html = '';
	$.each(data, function (key, val) {
		html += '<ons-list-item tappable class="stic-list-item pad15" >';

		html += '<div class="list-item__title" style="max-width=70%">';
		html += val.push_title;
		html += '</div>';
		html += '<div class="list-item__subtitle">';
		html += val.push_message;
		html += '</div>';

		html += '<div class="stic-date list-item__label">' + val.date_created + '</div>';

		html += '</ons-list-item>';

		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html = '';

	});
};


pointsList = function (data, div_name) {
	var html = '<ons-list>';
	$.each(data, function (key, val) {
		html += '<ons-list-item>';
		html += '<div class="center">';
		html += '<span class="list-item__title">' + val.date + '</span>';
		html += '<span class="list-item__subtitle">' + val.label + '</span>';
		html += '</div>';
		//html+='<div class="right"><span class="notification notification__green">' + val.points  + '</span></div>';
		html += '<div class="right"><span class="notification__green notification notification--material">' + val.points + '</span></div>';
		html += '</ons-list-item>';
	});
	html += '</ons-list>';

	$(div_name).html(html);
};


CategoryListSmall = function (data, element_id) {
	if (data.length <= 0) {
		return;
	}

	var list = document.getElementById(element_id);
	var html = '';

	$.each(data, function (key, val) {
		html += '<ons-list-item tappable  onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name_orig) + "'" + '   )">';
		html += '<div class="left">';
		if (!empty(val.photo_url)) {
			html += '<img class="list-item__thumbnail" src="' + val.photo_url + '">';
		} else {
			html += '<img class="list-item__thumbnail" src="./images/header.png">';
		}
		html += '</div>';
		html += '<div class="center">';
		html += '<span class="list-item__title">' + val.category_name + '</span>';
		html += '<span class="list-item__subtitle">' + val.item_found + '</span>';
		html += '</div>';
		html += '</ons-list-item>';

		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html = '';
	});
};

ItemListSmall = function (data, element_id) {
	if (data.length <= 0) {
		return;
	}

	var list = document.getElementById(element_id);
	var html = '';

	$.each(data, function (key, val) {
		html += '<ons-list-item tappable  onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + val.category_id + "'" + ')">';
		html += '<div class="left">';
		if (!empty(val.photo_url)) {
			html += '<img class="list-item__thumbnail" src="' + val.photo_url + '">';
		} else {
			html += '<img class="list-item__thumbnail" src="./images/header.png">';
		}
		html += '</div>';
		html += '<div class="center">';
		html += '<span class="list-item__title">' + val.item_name + '</span>';
		html += '<span class="list-item__subtitle">' + val.item_description + '</span>';
		html += '</div>';
		html += '</ons-list-item>';

		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html = '';
	});
};

displayHistory = function (data) {

	var list = document.getElementById('history_list');

	var t = '';
	$.each(data, function (key, val) {
		t += '<ons-list-item>';
		t += '<div class="center">';
		t += '<span class="list-item__title">' + val.status + '</span>';
		t += '<span class="list-item__subtitle">' + val.date + '</span>';
		t += '<span class="list-item__subtitle">' + val.remarks + '</span>';
		t += '</div>';
		t += '</ons-list-item>';

		var newItem = ons.createElement(t);
		list.appendChild(newItem);
		t = '';
	});

};

fillPages = function (data) {
	if (data.length <= 0) {
		return;
	}
	var list = document.getElementById('about_us_list');

	var t = '';
	$.each(data.data, function (key, val) {
		t += '<ons-list-item modifier="chevron" tappable class="menu_privacy_policy" onclick="showCustomPage(' + val.page_id + ');">';
		t += '<div class="left"><ons-icon icon="' + val.icon + '" size="22px"></ons-icon></div>';
		t += '<div class="center"><span class="trn">' + val.title + '</span></div>';
		t += '</ons-list-item>';

		var newItem = ons.createElement(t);
		list.appendChild(newItem);
		t = '';

	});
};

profileMenu = function (is_login) {
	var t = '';

	if (is_login) {

		if (settings = AppSettings()) {
			if (settings.disabled_cc_management != "yes") {
				t += '<ons-list-item modifier="chevron" class="" tappable onclick="showPage(\'creditcard_list.html\')" >';
				t += '<div class="left"><ons-icon icon="md-card" size="22px"></ons-icon></div>';
				t += '<div class="center trn">Your credit cards</div>';
				t += '</ons-list-item>';
			}
		}

		t += '<ons-list-item modifier="chevron" class="" tappable  onclick="showPage(\'addressbook_list.html\')" >';
		t += '<div class="left"><ons-icon icon="md-pin-drop" size="22px"></ons-icon></div>';
		t += '<div class="center trn">Your address book</div>';
		t += '</ons-list-item>';

		t += '<ons-list-item modifier="chevron"  class="" tappable  onclick="showPage(\'booking_history.html\')" >';
		t += '<div class="left"><ons-icon icon="md-receipt" size="22px"></ons-icon></div>';
		t += '<div class="center trn">Booking history</div>';
		t += '</ons-list-item>';

		if (settings = AppSettings()) {
			if (settings.has_pts == 1) {
				t += '<ons-list-item modifier="chevron" tappable  onclick="showPage(\'points_main.html\')" >';
				t += '<div class="left"><ons-icon icon="md-flash" size="22px"></ons-icon></div>';
				t += '<div class="center trn">Your Points</div>';
				t += '</ons-list-item>';
			}
		}

		t += '<ons-list-item modifier="chevron" tappable onclick="showPage(\'settings_menu.html\')" >';
		t += '<div class="left"><ons-icon icon="md-settings" size="22px"></ons-icon></div>';
		t += '<div class="center trn">Settings</div>';
		t += '</ons-list-item>';

	} else {

		setStorage("next_step", 'home_page');
		$(".profile_name").html('');

		t += '<ons-list-item modifier="chevron" tappable onclick="showPage(\'settings_menu.html\')" >';
		t += '<div class="left"><ons-icon icon="md-settings" size="22px"></ons-icon></div>';
		t += '<div class="center trn">Settings</div>';
		t += '</ons-list-item>';

		t += '<ons-list-item modifier="chevron" tappable onclick="initLogin()" class=""  >';
		t += '<div class="left"><ons-icon icon="md-key" size="22px"></ons-icon></div>';
		t += '<div class="center trn">Log in</div>';
		t += '</ons-list-item>';

		t += '<ons-list-item modifier="chevron" tappable onclick="initSignup()" class=""  >';
		t += '<div class="left"><ons-icon icon="md-account-o" size="22px"></ons-icon></div>';
		t += '<div class="center trn">Sign up</div>';
		t += '</ons-list-item>';
	}

	$("#profile_menu_list").html(t);
};


addButtonReview = function (enabled) {
	var t = '';

	t += '<ons-button modifier="quiet quiet_green no_shadow" class="stic-bottom-button stic-absolute" onclick="showPage(\'add_review.html\')" >';
	t += '<span class="trn">Add Review</span>';
	t += '</ons-button>';

	if (enabled) {
		$(".review_wrap").after(t);
	}

};