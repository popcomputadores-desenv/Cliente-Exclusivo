var displayCategory = function(data) {
	
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById('infinite_category');
	
	settings = AppSettings();
	
	menu_type = parseInt(settings.menu_type);	
	disabled_default_menu = settings.disabled_default_image;	
		
	var html='';
	x=1; xx=1; col = '';
	var total_data = parseInt(data.length)+0;
	
	$.each( data, function( key, val ) {
						
		switch(menu_type){
			
			case 2:
			
			  html+='<ons-list-item tappable modifier="item_big_thumbnail" onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name) + "'" + '   )" >';
				 			  					  
			  if(disabled_default_menu){
			  	  if(!empty(val.photo) && !empty(val.photo_url) ){
			  	  	  html+='<div class="left">';
					    html+='<div class="is-loading"><div class="spinner"></div><img class="list-item__thumbnail" src="'+ val.photo_url +'"></div>';
					  html+='</div>';			  	  
			  	  }			  
			  } else {
			  	    if(!empty(val.photo_url)){
						html+='<div class="left">';
						html+='<div class="is-loading"><div class="spinner"></div><img class="list-item__thumbnail" src="'+ val.photo_url +'"></div>';
						html+='</div>';			  
			  	    }	  
			  }
			  
			  html+='<div class="center">';
			    html+='<span class="list-item__title">'+ val.category_name +'</span>';
			    html+='<span class="list-item__subtitle">'+ val.category_description +'</span>';
			    			    
			      if($.isArray(val.dish_list)) {	       
			      	html+='<span class="list-item__subtitle">';
		               	html+='<div class="equal_table">';
		               	  $.each( val.dish_list, function( d_key, d_val ) {      	             
		                  html+='<div class="col"><span><img class="rounded_image rounded_small" src="'+d_val+'"></span></div>';
		               	  });
		               	html+='</div>';
	               	html+='</span>';    
	               }	       	           
			    
			  html+='</div>';
			html+='</ons-list-item>';
			
			break;
			
			case 3:
			
			  col+='<ons-col width="50%" vertical-align="top"  onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name) + "'" + '   )" >';
		
			  col+='<div class="inner_col">';
			  col+='<div class="banner">';
				  col +='<div class="is-loading medium-loader">'; 
				  col +='<div class="spinner"></div>';		
				  col +='<img class="hide" src="'+val.photo_url+'">';	      
				  col +='</div>'; 
				col+='<div class="header_bg" style="background-image: url('+ "'" + val.photo_url + "'" +')" ></div>';			
				col+='</div> ';
				
				col+='<span class="list-item__title">'+val.category_name+'</span>';
				col+='<span class="list-item__subtitle">'+ val.category_description +'</span>';
				
			  col+='</div>';
	          col+='</ons-col>';    
	          
	          if (x>=2){
	          	 x=0;
				 html+='<ons-list-item tappable modifier="nodivider list_column" >';
				 html+=col;
				 html+='</ons-list-item>';
				 col='';
				 
				 newItem = ons.createElement(html);
				 list.appendChild(newItem);
			     html='';
	          } else {
	          	  if(xx>=total_data){
				     html+='<ons-list-item tappable modifier="nodivider list_column" >';
					 html+=col;
					 html+='</ons-list-item>';
					 col='';
					 
					 newItem = ons.createElement(html);
					 list.appendChild(newItem);
				     html='';
				}
	          }
			
	          x++;	  	 
	          xx++;
	          
			break;
			
			default:
						
				html+='<ons-list-item tappable modifier="chevron" onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name) + "'" + '   )">';
		      html+='<ons-row>';
		           	           
		           html+='<ons-col>';
		             html+='<span class="list-item__title">'+val.category_name+'</span>';
		             html+='<span class="list-item__subtitle">'+val.category_description+'</span>';
		             	             
		               if($.isArray(val.dish_list)) {	       
		               	html+='<div class="equal_table">';
		               	  $.each( val.dish_list, function( d_key, d_val ) {      	             		                 
			                  html+='<div class="col">';
			                     html+='<span><img class="rounded_image rounded_small" src="'+d_val+'"></span>';
			                  html+='</div>';		                 		                  
		               	  });
		               	html+='</div>';
		               }	             
		             
		           html+='</ons-col>';
		           		           
		           
		      html+='</ons-row>';
		    html+='</ons-list-item>';    	    
			
			break;
		}
					   
		if(menu_type!=3){
		    var newItem = ons.createElement(html);
		    list.appendChild(newItem);	    
		    html='';	    
		}
	});			
	
	initImageLoaded();
	
};


var displayItem = function(data , cat_id) {
		
	
	var list = document.getElementById('infinite_item');
	
	website_hide_foodprice  = isHidePrice();
	
	settings = AppSettings();
	menu_type = parseInt(settings.menu_type);
	disabled_default_menu = settings.disabled_default_image;
		
	var html='';
	x=1; xx=1; col = '';
	var total_data = parseInt(data.length)+0;
	
	$.each( data, function( key, val ) {
		
		switch(menu_type){
			case 2:
			  html+='<ons-list-item class="stic-menu-2" tappable modifier="item_big_thumbnail" onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + cat_id +  "'" +  ')" >';
			  
			   if(disabled_default_menu){
			  	  if(!empty(val.photo) && !empty(val.photo_url) ){
			  	  	  html+='<div class="right">';
					    html+='<div class="is-loading small-loader"><div class="spinner"></div><img class="list-item__thumbnail" src="'+ val.photo_url +'"></div>';
					  html+='</div>';			  	  
			  	  }			  
			  } else {
			  	    if(!empty(val.photo_url)){
						html+='<div class="right">';
						html+='<div class="is-loading small-loader"><div class="spinner"></div><img class="list-item__thumbnail" src="'+ val.photo_url +'"></div>';
						html+='</div>';			  
			  	    }	  
			  }
			  
			  html+='<div class="center">';
			    html+='<span class="stic-bold list-item__title">'+ val.item_name +'</span>';
			    html+='<span class="stic-description list-item__subtitle concat_text">'+ val.item_description +'</span>';
			    
			    
			     if(!website_hide_foodprice){
		             if($.isArray(val.prices)) {	   
		             	html+='<span class="list-item__subtitle">';          	
		             	$.each( val.prices, function( price_key, price_val ) { 
		             		  size='';
		             		  if (!empty(price_val.size)){
		             		  	  size  = price_val.size;
		             		  }
		             		  if (price_val.discount_price>0.0001){
		             		  	  html+= '<div class="stic-price price">'+ size + '<span class="tag_discount">'+price_val.formatted_price+'</span>' + price_val.formatted_discount_price   +'</div>'
		             		  } else {
		             		  	  html+= '<div class="stic-price price">'+ size + '<span class="spacer">' + price_val.formatted_price +  '</span>' +  '</div>'
		             		  }		             		  
		             	});
		             	html+='</span>';
		             }
	             }
			    
	             	             
	               if($.isArray(val.icon_dish)) {
	               	  html+='<span class="list-item__subtitle">';  
	                  html+='<div class="equal_table">';
	               	  $.each( val.icon_dish, function( d_key, d_val ) {      	             
	                     html+='<div class="col"><span><img class="rounded_image rounded_small" src="'+d_val+'"></span></div>';
	               	  });
	               	  html+='</div>';
	                  html+='</span>';
	               }	             
			  
			   html+='</div>';
			  html+='</ons-list-item>';
			break;
			
			case 3:
			
			  col+='<ons-col width="50%" vertical-align="top" onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + cat_id +  "'" +  ')"  >';
		
			  
			  col+='<div class="inner_col">';
			  
			  col+='<div class="banner">';
				  col +='<div class="is-loading medium-loader">'; 
				  col +='<div class="spinner"></div>';		
				  col +='<img class="hide" src="'+val.photo_url+'">';	      
				  col +='</div>'; 
				col+='<div class="header_bg stic_item" style="background-image: url('+ "'" + val.photo_url + "'" +')" ></div>';			
				col+='</div> ';
				
				col+='<h4 class="stic-bold" style="font-size: 10px !important;">'+val.item_name+'</h4>';
				//col+='<p class="stic-description concat_text">'+ val.item_description +'</p>';
				
				col+='</div> ';
				
				if(!website_hide_foodprice){
		             if($.isArray(val.prices)) {	             	
		             	$.each( val.prices, function( price_key, price_val ) { 
		             		  size='';
		             		  if (!empty(price_val.size)){
		             		  	  size  = price_val.size;
		             		  }
		             		  if (price_val.discount_price>0.0001){
		             		  	  col+= '<div class="stic-price price">'+ size + '<span class="tag_discount">'+price_val.formatted_price+'</span>' + price_val.formatted_discount_price   +'</div>'
		             		  } else {
		             		  	  col+= '<div class="stic-price price">'+ size + '<span class="spacer">' + price_val.formatted_price +  '</span>' +  '</div>'
		             		  }		             		  
		             	});
		             }
	             }
				
	          col+='</ons-col>';    
	          
	          if (x>=2){
	          	 x=0;
				 html+='<ons-list-item class="stic-menu-3" tappable modifier="nodivider list_column" >';
				 html+=col;
				 html+='</ons-list-item>';
				 col='';
				 
				 newItem = ons.createElement(html);
				 list.appendChild(newItem);
			     html='';
	          } else {
	          	  if(xx>=total_data){
				     html+='<ons-list-item class="stic-menu-3" tappable modifier="nodivider list_column" >';
					 html+=col;
					 html+='</ons-list-item>';
					 col='';
					 
					 newItem = ons.createElement(html);
					 list.appendChild(newItem);
				     html='';
				}
	          }
			
	          x++;	  	 
	          xx++;
			
			break;
			
			default:
			
			  html+='<ons-list-item class="stic-menu-2" tappable modifier="item_big_thumbnail" onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + cat_id +  "'" +  ')" >';
			  
			  html+='<div class="center">';
			    html+='<span class="stic-bold list-item__title">'+ val.item_name +'</span>';
			    html+='<span class="stic-description list-item__subtitle concat_text">'+ val.item_description +'</span>';
			    
			    
			     if(!website_hide_foodprice){
		             if($.isArray(val.prices)) {	   
		             	html+='<span class="list-item__subtitle">';          	
		             	$.each( val.prices, function( price_key, price_val ) { 
		             		  size='';
		             		  if (!empty(price_val.size)){
		             		  	  size  = price_val.size;
		             		  }
		             		  if (price_val.discount_price>0.0001){
		             		  	  html+= '<div class="stic-price price">'+ size + '<span class="tag_discount">'+price_val.formatted_price+'</span>' + price_val.formatted_discount_price   +'</div>'
		             		  } else {
		             		  	  html+= '<div class="stic-price price">'+ size + '<span class="spacer">' + price_val.formatted_price +  '</span>' +  '</div>'
		             		  }		             		  
		             	});
		             	html+='</span>';
		             }
	             }
			    
	             	             
	               if($.isArray(val.icon_dish)) {
	               	  html+='<span class="list-item__subtitle">';  
	                  html+='<div class="equal_table">';
	               	  $.each( val.icon_dish, function( d_key, d_val ) {      	             
	                     html+='<div class="col"><span><img class="rounded_image rounded_small" src="'+d_val+'"></span></div>';
	               	  });
	               	  html+='</div>';
	                  html+='</span>';
	               }	             
			  
			   html+='</div>';
			  html+='</ons-list-item>';
		    			
			break;
		}
				    
		if(menu_type!=3){
		    var newItem = ons.createElement(html);
		    list.appendChild(newItem);	    
		    html='';	    
		}
	});			
	
	initImageLoaded();
};


var displayItemDetails = function(data, cart_data) {
	
	website_hide_foodprice = isHidePrice();
	
	var html='';	
	if (!empty(cart_data.qty)){
		$(".item_qty").val( cart_data.qty );
		$(".add_to_cart").html( t("Update cart") );
		html+='<input type="hidden" name="row" value="'+ cart_data.row +'">';
	}
	
	//html+='<div class="item_preview" style="background-image: url('+ addslashes(data.photo) +')"  ></div>';
	html+='<div class="item_preview" style="background-image: url('+ "'" + addslashes(data.photo) + "'" +')"  >';
	
	html+='<div class="banner">';
	  html +='<div class="is-loading large-loader">'; 
	   html +='<div class="spinner"></div>';		
	   html +='<img class="hide" src="'+   addslashes(data.photo)  +'">';	      
	  html +='</div>';   
	html +='</div>';   
	
	html+='</div>';
	
	html+='<div class="wrap">';	
	  html+= '<h3 class="mt15only">'+data.item_name+'</h3>';
	  
	  html+= '<input type="hidden" name="item_id" value="'+data.item_id+'">';
	  html+= '<input type="hidden" name="two_flavors" class="two_flavors" value="'+data.two_flavors+'">';
	  	  
	  if (data.multiple_price==""){
	  	 if($.isArray(data.prices)) {	  	 	
	  	 	if(data.two_flavors!=2){
	  	 	   html+='<input type="hidden" name="price" value="'+ data.prices[0].price +'">';
	  	 	}
	  	 	if(!website_hide_foodprice){
	  	 	   size ='';
	  	 	   if( !empty(data.prices[0].size) ){
	  	 	   	   size = data.prices[0].size;
	  	 	   }
	  	 	   if ( data.prices[0].discount_price>0.0001 ){
	  	 	   	   html+= '<div class="price mt10">'+ size +  '<span class="tag_discount" style="margin-left:0">' + data.prices[0].formatted_price + '</span>' +   data.prices[0].formatted_discount_price  +'</div>';
	  	 	   } else {
	  	 	   	   html+= '<div class="price mt10">'+ size +  '<span class="spacer">' + data.prices[0].formatted_price +'<span></div>';
	  	 	   }	  	       
	  	 	}
	  	 }
	  }
	  
	  html+='<p class="description">'+data.item_description+'</p>';
	  	  
       if($.isArray(data.dish_list)) {	       
       	  html+='<div class="equal_table">';
       	  $.each( data.dish_list, function( d_key, d_val ) {      	             
            html+='<div class="col"><span><img class="rounded_image rounded_small" src="'+d_val+'"></span></div>';
       	  });
       	  html+='</div>';
       }      
	  
	html+='</div>';
	
	/*MULTIPLE PRICE*/	
	if(!website_hide_foodprice){
	if (data.multiple_price==1){
		html+='<ons-list class="stic-multiple-price" modifier="list_grey">';
		    html+='<ons-list-header>Price</ons-list-header>';	    
		    if($.isArray(data.prices)) {
		    	$.each( data.prices, function( price_key, price_val ) {
		    		//html+='<ons-list-item>'+ price_val.formatted_price +'</ons-list-item>';	 
		    		
		    		value_price = price_val.price + "|"+ price_val.size +"|" +  price_val.size_id; 
		    		
		    		selected = '';
		    		if ( !empty(cart_data.price) ){
		    			if ( value_price ==  cart_data.price ){
		    				selected = 'checked';
		    			}
		    		} else {
		    			if(price_key<=0){
		    				selected = 'checked';
		    			} else {
		    				selected = '';
		    			}
		    		}
		    		   		
		    		html+='<ons-list-item tappable>';
		    		  html+='<label class="left">';
				        html+='<ons-radio name="price" input-id="price-'+price_key+'" value="'+ value_price +'"  '+selected+' ></ons-radio>';
				      html+='</label>';
				      
				      
				      
				      if ( price_val.discount_price>0.0001){
				      	 html+='<label for="price-'+price_key+'" class="center">' + price_val.size + '<div class="f-right"><span class="tag_discount">'+price_val.formatted_price+'</span>' +   price_val.formatted_discount_price + '</div></label>';
				      } else {
				         html+='<label for="price-'+price_key+'" class="center">' + price_val.size + '<div class="f-right"><span class="spacer"></span>' +  price_val.formatted_price + '</div></label>';
				      }
				      
				      
		    		html+='</ons-list-item>';
		    	});
		    }
		html+='</ons-list>';
	}
	}
	
	/*SPECIAL INSTRUCTIONS*/
	html+='<ons-list modifier="list_grey">';
	  html+='<ons-list-header>' +  t("Special Request")  + '</ons-list-header>';	    	  
	html+='</ons-list>';
		
	notes_value = !empty(cart_data.notes)?cart_data.notes:'';
	html+='<textarea name="notes" class="textarea textarea--transparent full_width" rows="2" placeholder="'+ t("Your preferences or request") +'.." >'+ notes_value  +'</textarea>';	
	
	/*COOKING REF*/
	if(!empty(data.cooking_ref)) {		
	   html+='<ons-list modifier="list_grey">';
	   html+='<ons-list-header>' + t('Cooking Preference') +  '</ons-list-header>';	    	  	
		$.each( data.cooking_ref, function( cooking_ref_key, cooking_ref_val ) {
			
			selected = '';
    		if ( !empty(cart_data.cooking_ref) ){
    			if ( cooking_ref_val ==  cart_data.cooking_ref ){
    				selected = 'checked';
    			}
    		}
			
			html+='<ons-list-item tappable>';
    		  html+='<label class="left">';
		        html+='<ons-radio name="cooking_ref" value="'+cooking_ref_val+'" input-id="cooking_ref-'+cooking_ref_key+'" '+  selected +' ></ons-radio>';
		      html+='</label>';
		      html+='<label for="cooking_ref-'+cooking_ref_key+'" class="center">' + cooking_ref_val + '</label>';
    		html+='</ons-list-item>';
			
		});
	   html+='</ons-list>';
	} 
	
	/*INGREDIENTS*/
	if(!empty(data.ingredients)) {
		html+='<ons-list modifier="list_grey">';
	    html+='<ons-list-header>' + t('Ingredients') + '</ons-list-header>';	    
	    $.each( data.ingredients, function( ingredients_key, ingredients_val ) {
	    	html+='<ons-list-item tappable>';
	    	
	    	 selected = '';
    		 if ( !empty(cart_data.ingredients) ){    			
    			$.each( cart_data.ingredients, function( cart_ingredients_key, cart_ingredients_val ) {
    				if ( cart_ingredients_val == ingredients_val ){
    					selected = 'checked';
    				}
    			});
    		 }
	    	
	    	  html+='<label class="left">';
		        html+='<ons-checkbox  name="ingredients[]" value="'+ingredients_val+'" input-id="ingredients-'+ingredients_key+'"  '+ selected +' ></ons-checkbox>';
		      html+='</label>';
		      html+='<label for="ingredients-'+ingredients_key+'" class="center">'+ingredients_val+'</label>';		      
	    	
	    	html+='</ons-list-item>';
	    });
	    html+='</ons-list>';	  	
	}
	
	
	enabled_addon_desc = false;
	if(settings = AppSettings()){
		enabled_addon_desc = settings.enabled_addon_desc;
	}
		
	
	/*ADDDON*/
	if($.isArray(data.addon_item)) {
		$.each( data.addon_item, function( addon_key, addon_val ) {
			
			if ( !empty(addon_val.require_addons) ){
          	   if( addon_val.require_addons >=2){	          	   	   
          	   	   html+= '<input type="hidden" name="require_addons" class="require_addons" data-subcat_id="'+ addon_val.subcat_id +'" '+
          	   	   'data-subcat_name="'+ addon_val.subcat_name +'" '+
          	   	   'data-multi_option="'+ addon_val.multi_option +'" '+
          	   	   'data-multi_option_val="'+ addon_val.multi_option_val +'" '+
          	   	   'value="'+ '' +'" '+
          	   	   '/>';
          	   }
            }
			
			html+='<ons-list modifier="list_grey">';
	        html+='<ons-list-header>'+addon_val.subcat_name+'</ons-list-header>';	
	        
	          if($.isArray(addon_val.sub_item)) {
	          	  $.each( addon_val.sub_item, function( subitem_key, subitem_val ) {
	          	  		          	  	  	       
	          	  	  dump("multi option=>"+ addon_val.multi_option);
	          	  	  switch(addon_val.multi_option)
	          	  	  {
	          	  	  	case "one":	          	  	  	 
	          	  	  	  html+= priceRadio(addon_val.subcat_id ,  subitem_val , cart_data , addon_val.two_flavor_position , enabled_addon_desc );
	          	  	  	break;
	          	  	  	
	          	  	  	case "multiple":
	          	  	  	  html+= priceCheckbox(addon_val.subcat_id ,  subitem_val , cart_data , enabled_addon_desc);
	          	  	  	break;
	          	  	  	
	          	  	  	case "custom":
	          	  	  	  html+= priceCheckboxCustom(addon_val.subcat_id , addon_val.multi_option_val,  subitem_val , cart_data, enabled_addon_desc);
	          	  	  	break;
	          	  	  	
	          	  	  }
	          	  });
	          }
	        
	        html+='</ons-list>';
		});
	}
	
	
	return html;
};

/*SINGLE*/
var priceRadio = function(cat_id,  data , cart_data, two_flavor_position, enabled_addon_desc) {
	
	hide_price = isHidePrice();
	
	//field_name = "subitem_"+cat_id;
	field_name = "sub_item["+cat_id+"][]";
	item_value = data.sub_item_id+"|"+data.price+"|"+data.sub_item_name + "|" + two_flavor_position;	
	
	selected = ''; 
	if(!empty(cart_data)){
		if(!empty(cart_data.sub_item)){ 
			$.each( cart_data.sub_item[cat_id], function( cart_data_key, cart_data_val ) {
				if (  item_value == cart_data_val) {
					selected = 'checked';			
				}
			});
		}
	}
	
	if(hide_price){
		data.pretty_price='';
	}
	
	html='';
	html+='<ons-list-item tappable>';
	    	
	  html+='<label class="left">';
        html+='<ons-radio class="item_addon_'+cat_id+' two_flavor_position_'+ two_flavor_position +' " name="'+field_name+'" value="'+item_value+'" input-id="addon-'+ cat_id + data.sub_item_id+'" '+ selected +' ></ons-radio>';
      html+='</label>';
      html+='<label for="addon-'+cat_id+data.sub_item_id+'" class="center">'+data.sub_item_name + '<span class="spacer"></span>' + data.pretty_price ;
            
      html+='</label>';		      
	
	html+='</ons-list-item>';
	
	if(enabled_addon_desc==1 && !empty(data.item_description)){
		html+='<ons-list-item>';
		 html+='<span class="list-item__subtitle">'+ data.item_description +'</span>';
		html+='</ons-list-item>';
	}	
	
	return html;
};

/*CUSTOM*/
var priceCheckboxCustom = function(cat_id, limited_value, data , cart_data , enabled_addon_desc) {
			
	hide_price = isHidePrice();
	
	//field_name = "subitem_"+cat_id;
	field_name = "sub_item["+cat_id+"][]";
	item_value = data.sub_item_id+"|"+data.price+"|"+data.sub_item_name;
	
	if(hide_price){
		data.pretty_price='';
	}	
	
	selected = ''; 
	if(!empty(cart_data)){
		if(!empty(cart_data.sub_item)){ 
			$.each( cart_data.sub_item[cat_id], function( cart_data_key, cart_data_val ) {
				if (  item_value == cart_data_val) {
					selected = 'checked';			
				}
			});
		}
	}
		
	html='';
	html+='<ons-list-item tappable>';
	    	
	  html+='<label class="left">';
        html+='<ons-checkbox name="'+field_name+'" class="subitem_custom item_addon_'+cat_id+'" data-limited="'+limited_value+'" data-id="'+cat_id+'" value="'+ item_value +'" input-id="addon-'+cat_id+data.sub_item_id+'" '+ selected +' ></ons-checkbox>';
      html+='</label>';
      html+='<label for="addon-'+cat_id+data.sub_item_id+'" class="center">'+data.sub_item_name + '<span class="spacer"></span>' + data.pretty_price ;
      
      /*if(enabled_addon_desc==1){
        html+='<span class="list-item__subtitle">'+ data.item_description +'</span>';
      }*/
      
      html+='</label>';      
	
	html+='</ons-list-item>';
	
	
   if(enabled_addon_desc==1 && !empty(data.item_description)){
		html+='<ons-list-item>';
		 html+='<span class="list-item__subtitle">'+ data.item_description +'</span>';
		html+='</ons-list-item>';
	}					  
	
	return html;
};

/*MULTIPLE*/
var priceCheckbox = function(cat_id, data , cart_data , enabled_addon_desc ) {

	hide_price = isHidePrice();

	//field_name = "subitem_"+cat_id;
	field_name = "sub_item["+cat_id+"][]";
	item_value = data.sub_item_id+"|"+data.price+"|"+data.sub_item_name;
	

	selected = ''; qty = 1;
	if(!empty(cart_data)){	
		if(!empty(cart_data.sub_item)){
			$.each( cart_data.sub_item[cat_id], function( cart_data_key, cart_data_val ) {
				dump("cart_data_val =>" + cat_id);
				dump(cart_data_val);
				if (  item_value == cart_data_val) {
					selected = 'checked';
					qty = cart_data.addon_qty[cat_id][cart_data_key];
				}			
			});
		}
	}
	
	if(hide_price){
	   data.pretty_price='';	
	}
	
	html='';
	html+='<ons-list-item tappable modifier="qty_center">';
	    	
	  html+='<label class="left">';
        html+='<ons-checkbox class="item_addon_'+cat_id+'"  name="'+field_name+'" value="'+ item_value +'" input-id="addon-'+cat_id+data.sub_item_id+'"  '+ selected +' ></ons-checkbox>';
      html+='</label>';
      html+='<label for="addon-'+cat_id+data.sub_item_id+'" class="center">'+data.sub_item_name + '<span class="spacer"></span>' + data.pretty_price +  '</label>';		      
      
      //html+='<div class="right"><ons-input id="qty" modifier="transparent" value="1" placeholder="Qty" ></ons-input></div>';
      
       html+='<div class="right" style="width:140px;">';
       html+='<ons-row class="quantity_wrap">';
         html+='<ons-col >';    
           html+='<ons-button modifier="quiet" class="full_width" onclick="minusQty( $(this) )" ><ons-icon icon="md-minus" size="15px" ></ons-icon></ons-button>';
         html+='</ons-col>';
         
         html+='<ons-col>';
            html+='<ons-input name="addon_qty['+ cat_id +'][]" class="addon_qty numeric_only" id="addon_qty" modifier="transparent" value="'+qty+'"  ></ons-input>';
         html+='</ons-col>';
         
         html+='<ons-col >';
           html+='<ons-button modifier="quiet" class="full_width" onclick="addQty( $(this) )" ><ons-icon icon="md-plus" size="15px"></ons-icon></ons-button>';
         html+='</ons-col>';
       html+='</ons-row>  ';
      html+='</div>';
      
	
	html+='</ons-list-item>';
	
	if(enabled_addon_desc==1 && !empty(data.item_description)){
		html+='<ons-list-item>';
		 html+='<span class="list-item__subtitle">'+ data.item_description +'</span>';
		html+='</ons-list-item>';
	}
	
	return html;
};


/*DISPLAY CART DETAILS*/
var displayCartDetails = function(datas){
	data = datas.data;	
	dump(data);

	var merchant_bg = getStorage("merchant_bg");

	var html='<div class="relative">';
    html+='<div class="cart_header" style="background-image:url('+merchant_bg+')"></div>';
	html+='</div>';

	html+='<div class="wrap">';
		html+='<h3 class="block trn">'+t("Order details")+'</h3>';
	html+='</div>';
	
	
	html+='<ons-list>';	
	if(!empty(data.item)) {		
		$.each( data.item, function( item_key, item_val ) {
			html+='<ons-list-item modifier="nodivider" class="mb10">';

				html+='<ons-row vertical-align="center">';
				   html+='<ons-col class="left" width="20px">';
				   		html+='<span class="notification green f15">'+ item_val.qty +'</span>';
				   html+='</ons-col>';
				   html+='<ons-col class="center bold darkblue f15" onclick="itemDetails('+ "'" + item_val.item_id +  "'," + "'" + item_val.category_id + "'," + "'" + item_key  + "'"   +')">';
				   		html+='<span>'+ item_val.item_name +'</span>';
				   html+='</ons-col>';
				   html+='<ons-col class="right text-right" width="20px">';
				   		html+='<ons-button class="pd0" modifier="quiet" onclick="removeCartItem( '+  item_key +' )" >';
				   			html+='<ons-icon class="remove" icon="md-close"></ons-icon>';
				   		html+='</ons-button>';
				   html+='</ons-col>';
				html+='</ons-row>';
			
				html+='<ons-row class="item-details-row" onclick="itemDetails('+ "'" + item_val.item_id +  "'," + "'" + item_val.category_id + "'," + "'" + item_key  + "'"   +')">';
				  if ( item_val.discount>0 ){
				  	price_used = item_val.discounted_price;

					  	html+='<ons-col class="left" width="20px">';
					  	html+='</ons-col>';

					  	html+='<ons-col class="center">';
					  		if(!empty(item_val.size_words)) {
				  				html+='<span class="mr5true">'+ item_val.size_words +'</span>';
					  		}
				  			html+='<span class="tag_discount">'+prettyPrice(item_val.normal_price)+'</span>';
				  			html+='<span>'+prettyPrice(item_val.discounted_price)+'</span>';
					  	html+='</ons-col>';

				  } else {			  	
				  	price_used = number_format(item_val.normal_price,2,'.','');

					  	html+='<ons-col class="left" width="20px">';
					  	html+='</ons-col>';

					  	html+='<ons-col class="center">';
				  			html+='<span class="mr5true">'+ item_val.size_words +'</span>';
				  			html+='<span>'+prettyPrice(item_val.normal_price)+'</span>';
					  	html+='</ons-col>';
				  }

				  html+='<ons-col class="right text-right" width="75px">';
				  		html+='<span>'+prettyPrice( parseFloat(price_used)*parseFloat(item_val.qty) )+'</span>';
				  html+='</ons-col>';

				html+='</ons-row>';

			html+='</ons-list-item>';
			
			/*COOKING REF*/			
			if (!empty(item_val.cooking_ref)){
				html+='<ons-list-item modifier="nodivider" class="receipt-min-row">';
					html+='<ons-col class="left" width="20px">';
					html+='</ons-col>';
					html+='<ons-col class="center">';
							html+='<span>'+t("Cooking Ref")+': '+item_val.cooking_ref+'</span>';
					html+='</ons-col>';
				html+='</ons-list-item>';
			}
			
			/*NOTES*/
			if (!empty(item_val.order_notes)){
				html+='<ons-list-item modifier="nodivider" class="receipt-min-row">';
					html+='<ons-col class="left" width="20px">';
					html+='</ons-col>';
					html+='<ons-col class="center">';
							html+='<span>'+t("Notes")+': '+item_val.order_notes+'</span>';
					html+='</ons-col>';
				html+='</ons-list-item>';
			}
			
			/*INGREDIENTS*/
			if (!empty(item_val.ingredients)){
				html+='<ons-list-item modifier="nodivider" class="receipt-min-row">';
					html+='<ons-col class="left" width="20px">';
					html+='</ons-col>';

					ingredients_list='';   
					$.each( item_val.ingredients, function( ingredients_key, ingredients_val ) {
						 ingredients_list+= ingredients_val+',';
					});

					html+='<ons-col class="center">';
							html+='<span>'+t("Ingredients")+': '+ingredients_list+'</span>';
					html+='</ons-col>';
				html+='</ons-list-item>';
			}
			
			/*SUB ITEM*/
			if (!empty(item_val.new_sub_item)){
				$.each( item_val.new_sub_item, function( new_sub_item_key, new_sub_item_val ) {
					html+='<ons-list-item modifier="nodivider normal_list" >';
					    html+='<ons-list-header style="padding-left:0;"><span class="list-item__subtitle">'+ new_sub_item_key +'</span></ons-list-header>';
					    $.each( new_sub_item_val , function( new_sub_item_val_key, new_sub_item_val_val ) {
					    	dump(new_sub_item_val_val);
					    	html+='<ons-row>';
					    	  html+='<ons-col vertical-align="center" width="70px" >'+ new_sub_item_val_val.addon_qty + 'x' + prettyPrice(new_sub_item_val_val.addon_price)  +'</ons-col>';
					    	  html+='<ons-col vertical-align="center" >'+ new_sub_item_val_val.addon_name  +'</ons-col>';
					    	  html+='<ons-col vertical-align="center" class="text_right" width="40px" >'+  prettyPrice(parseFloat(new_sub_item_val_val.addon_qty)*parseFloat(new_sub_item_val_val.addon_price))  +'</ons-col>';
					    	html+='</ons-row>';
					    });
					html+='</ons-list-item>';
				});
			}
			
		});
		
		
		html+='<ons-list-item modifier="nodivider" >';				  
		  html+='<div class="right">';
		  html+='<ons-button class="cc-btn" modifier="quiet small_button" onclick="confirmClearCart();" >';
		  	html+='<span class="darkblue bold">'+t("CLEAR CART")+'</span>';
		  	html+='</ons-button>';
		  html+='</div>';
	    html+='</ons-list-item>';
		
	} else {
		dump('no row');
	}	
	
	/*EURO TAX*/
	var is_apply_tax = false;	
	if(!empty(datas.is_apply_tax)){
		if(datas.is_apply_tax==1){
			is_apply_tax=true;
		}
	}
	/*END EURO TAX*/
	
	/*CHECK IF THERE IS APPLY VOUCHER*/
	less_voucher = 0;
	
	if(!is_apply_tax){
		if (!empty(data.total.less_voucher)){
			less_voucher = parseFloat(data.total.less_voucher);
			if(less_voucher>0.0001){
				remove_voucher = '<ons-button modifier="quiet" onclick="removeVoucher()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
				voucher_percentage = '';
				if( !empty(data.total.voucher_type)){
					voucher_percentage  = "<span class=\"spacer\"></span>" +  data.total.voucher_type;
				}
				html+= twoColumnBoldOnly( t('Less Voucher') + voucher_percentage +  "<span class=\"spacer\"></span>" +  remove_voucher ,  "("+prettyPrice(less_voucher)+")" );
			}
		}
	}
	
	
	if(!is_apply_tax){
		if (!empty(data.total.discounted_amount)){
			discounted_amount = parseFloat(data.total.discounted_amount);
			discount_percentage = parseFloat(data.total.merchant_discount_amount);
			if(discounted_amount>0.0001){
				html+= twoColumnBoldOnly( t('Discount') + '<span class=\"spacer\"></span>' + discount_percentage +  "%<span class=\"spacer\"></span>"  ,  "("+prettyPrice(discounted_amount)+")" );
			}
		}
	}
	
	/*CHECK IF POINTS IS APPLIED*/
	if(!is_apply_tax){
		if (!empty(data.total.pts_redeem_amt_orig)){
			remove_pts = '<ons-button modifier="quiet" onclick="removePoints()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
			html+= twoColumnBoldOnly( t('Points Discount') +  "<span class=\"spacer\"></span>" +  remove_pts ,  "("+prettyPrice(data.total.pts_redeem_amt_orig) +")" );
		}
	}
	
		
	if(!is_apply_tax){
	   html+= twoColumnBold( t('Sub Total') ,  prettyPrice(data.total.subtotal) );
	}

	services = datas.services;
	
	dump(services);
	selected_services = datas.transaction_type ;  	
	selected_delivery_date = '';
	selected_delivery_time='';

	selected_delivery_address = t('Please enter address here');
		
	selected_delivery_date = datas.default_delivery_date;
	default_delivery_date_pretty = datas.default_delivery_date_pretty;
	
	delivery_date_set = getStorage("delivery_date_set");
	delivery_date_set_pretty = getStorage("delivery_date_set_pretty");
	if(!empty(delivery_date_set)){
		selected_delivery_date = delivery_date_set;
	} else {
		setStorage("delivery_date_set",selected_delivery_date);
	}
	if(!empty(delivery_date_set_pretty)){
		default_delivery_date_pretty = delivery_date_set_pretty;
	}
	
	delivery_time_set = getStorage("delivery_time_set");
	if(!empty(delivery_time_set)){
		selected_delivery_time = delivery_time_set;
	}
		
	if(empty(selected_services)){			
		selected_services='delivery';
	}	
	
	$(".transaction_type").val( selected_services );
	$(".delivery_date").val( selected_delivery_date );
	
	var delivery_date_list_label = '';
	var delivery_time_list_label = '';
	
	switch (datas.transaction_type){
		case "delivery":
		  delivery_date_list_label = t('Delivery Date');
		  delivery_time_list_label = t('Delivery Time');
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
	
	
	html+='<ons-list-header>' + t('About the order') +'</ons-list-header>';	

	if ( datas.transaction_type == "delivery" ){
		
		if ( !empty(datas.cart_details)){
			if ( !empty(datas.cart_details.street)){
				selected_delivery_address = datas.cart_details.street;
				selected_delivery_address+=" ";
				selected_delivery_address+= datas.cart_details.city;
				selected_delivery_address+=" ";
				selected_delivery_address+= datas.cart_details.state;
				selected_delivery_address+=" ";
				selected_delivery_address+= datas.cart_details.zipcode;
				$(".delivery_address").val( selected_delivery_address );
			}
		}
		
		//html+='<ons-list-item tappable modifier="chevron longdivider" onclick="showPage(\'address_form.html\')" >';	
		html+='<ons-list-item tappable class="stic-options-list address" modifier="chevron longdivider" onclick="initAddress()" >';	
		  html+='<div class="left">' + t("Delivery Address")  +'</div>';
		   html+='<div class="right"> <span class="list-item__subtitle delivery_address_label concat-text">'+ selected_delivery_address +'</span></div>';
		html+='</ons-list-item>';
	}

	html+='<ons-list-item class="stic-options-list" modifier="chevron longdivider" tappable onclick="showTransactionList()" >';	
	   html+='<div class="left">'+ t('Transaction Type') +'</div>';
	   html+='<div class="right"><span class="list-item__subtitle transaction_type_label">'+ t(services[selected_services])  +'</span></div>';
	html+='</ons-list-item>';

	html+='<ons-list-item class="stic-options-list" tappable modifier="chevron longdivider" onclick="showDeliveryDateList()" >';	
	  html+='<div class="left">'+ delivery_date_list_label +'</div>';
	   html+='<div class="right"><span class="list-item__subtitle delivery_date_label">'+ default_delivery_date_pretty +'</span></div>';
	html+='</ons-list-item>';
	
	html+='<ons-list-item class="stic-options-list" tappable modifier="chevron longdivider" onclick="showDeliveryTime()" >';	
	  html+='<div class="left">' + delivery_time_list_label + '</div>';
	   html+='<div class="right"><span class="list-item__subtitle delivery_time_label">'+ selected_delivery_time +'</span></div>';
	html+='</ons-list-item>';	
	
	if (!empty(data.total.delivery_charges)){
		if(data.total.delivery_charges>0.0001){
		   html+= twoColumnBoldOnly( t('Delivery Fee') ,  prettyPrice(data.total.delivery_charges) );
		}
	}
	
	if (!empty(data.total.merchant_packaging_charge)){
		if(data.total.merchant_packaging_charge>0.0001){
		   html+= twoColumnBoldOnly( t('Packaging'),  prettyPrice(data.total.merchant_packaging_charge) );
		}
	}
	
	if(!is_apply_tax){
		if (!empty(data.total.taxable_total)){
			if(data.total.taxable_total>0.0001){
			   html+= twoColumnBoldOnly( t('Tax') + " " + (data.total.tax*100) + "%" ,  prettyPrice(data.total.taxable_total) );
			}
		}
	}

	html+='<div class="bborder2"></div>';
	
	/*APPLY VOUCHER*/
	if(less_voucher>0.0001){
		
	} else {
		html+= voucherColumn();	
	}	
	
	has_tips = false;
	if (!empty(data.total.tips)){
		if(data.total.tips>0.0001){
			has_tips=true;			
		}
	}
			
	/*TIPS*/
	if(has_tips==false){	
	   html+= tipColumn(datas.tip_list);
	}
		
	/*POINTS ADDON*/
	if( datas.points_enabled==1 || datas.points_enabled=="1"){
				
		if(datas.cart_details.points_apply>0){
			html+='<div class="points_wrap">';
				if (!empty(datas.pts_label_earn)){				
					html+='<p class="green_label" style="margin-top:0;margin-bottom:0;">'+ datas.pts_label_earn +'</p>';
				}		
			html+='</div>';
		} else {
			html+='<div class="points_wrap">';
			if (!empty(datas.pts_label_earn)){				
				html+='<p class="green_label" style="margin-top:0;margin-bottom:0;">'+ datas.pts_label_earn +'</p>';
			}		
			if (empty(datas.pts_disabled_redeem)){
				if(datas.available_points>0){
					html+='<ons-list-item modifier="nodivider">';
					   html+='<div class="left"><ons-input type="number" id="redeem_points" class="redeem_points numeric_only" modifier="underbar" placeholder="' + t('Redeem Points') + '" float></ons-input></div>';
					   html+='<div class="right"><ons-button modifier="quiet quiet_green" onclick="redeemPoints()">' + t("REDEEM") + '</ons-button></div>';
					html+='</ons-list-item>';
				}
			}
			if (!empty(datas.available_points_label)){						
				if(datas.available_points>0){
				    html+='<p class="green_label" style="margin-top:0;">'+ datas.available_points_label +'</p>';
				}
			}
			html+='</div>';
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
	
	/*EURO TAX*/
	if(is_apply_tax){
		
		if (!empty(data.total.pts_redeem_amt_orig)){
			remove_pts = '<ons-button modifier="quiet" onclick="removePoints()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
			html+= twoColumnBoldOnly( t('Points Discount') +  "<span class=\"spacer\"></span>" +  remove_pts ,  "("+prettyPrice(data.total.pts_redeem_amt_orig) +")" );
		}
		
		if(has_tips){
		   remove_tips = '<ons-button modifier="quiet" onclick="removeTip()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
		   html+= twoColumnBoldOnly( t('Tips') + " "+ data.total.tips_percent + "<span class=\"spacer\"></span>" + remove_tips ,  prettyPrice(data.total.tips) );		
		}
		
		if (!empty(data.total.less_voucher)){
			less_voucher = parseFloat(data.total.less_voucher);
			if(less_voucher>0.0001){
				remove_voucher = '<ons-button modifier="quiet" onclick="removeVoucher()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
				voucher_percentage = '';
				if( !empty(data.total.voucher_type)){
					voucher_percentage  = "<span class=\"spacer\"></span>" +  data.total.voucher_type;
				}
				html+= twoColumnBoldOnly( t('Less Voucher') + voucher_percentage +  "<span class=\"spacer\"></span>" +  remove_voucher ,  "("+prettyPrice(less_voucher)+")" );
			}
		}
		
		if (!empty(data.total.discounted_amount)){
			discounted_amount = parseFloat(data.total.discounted_amount);
			discount_percentage = parseFloat(data.total.merchant_discount_amount);
			if(discounted_amount>0.0001){
				html+= twoColumnBoldOnly( t('Discount') + '<span class=\"spacer\"></span>' + discount_percentage +  "%<span class=\"spacer\"></span>"  ,  "("+prettyPrice(discounted_amount)+")" );
			}
		}
		
		html+= twoColumnBoldOnly( t('Sub Total') ,  prettyPrice(data.total.subtotal) );
		html+= twoColumnBoldOnly( t('Tax') + " " + (data.total.tax*100) + "%" ,  prettyPrice(data.total.taxable_total) );
	}
	/*END EURO TAX*/
			
	if(!is_apply_tax){
		if(has_tips){		   
		   remove_tips = '<ons-button modifier="quiet" onclick="removeTip()" ><ons-icon class="remove" icon="md-close"></ons-icon></ons-button>';
		   html+= twoColumnBoldOnly( t('Tips') + " "+ data.total.tips_percent + "<span class=\"spacer\"></span>" + remove_tips ,  prettyPrice(data.total.tips) );		
		}
	}
	
	$(".cart_total_value").val('');
	
	/*MIN ORDER TABLE*/
	if(!empty(datas.cart_details.min_delivery_order)){
  	    $(".min_delivery_order").val( datas.cart_details.min_delivery_order );
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

	if (!empty(data.total.total)){
		if(data.total.total>0){
		   html+= twoColumnTotal( t('Total') ,  prettyPrice(data.total.total) );
		   $(".cart_total").html( prettyPrice(data.total.total) );
		   $(".cart_total_value").val(  prettyPrice(data.total.total) );
		   $(".cart_total_value_raw").val(  data.total.total );
		   $(".cart_sub_total").val(  data.total.subtotal );
		}
	}

	html+='<div class="hide_all">';
		html+='<ons-list-item class="stic-options-list" tappable modifier="chevron longdivider" onclick="showDeliveryDateList()" >';	
		  html+='<div class="left">'+ delivery_date_list_label +'</div>';
		   html+='<div class="right"><span class="list-item__subtitle delivery_date_label">'+ default_delivery_date_pretty +'</span></div>';
		html+='</ons-list-item>';
		html+='<ons-list-item class="stic-options-list" tappable modifier="chevron longdivider" onclick="showDeliveryTime()" >';	
		  html+='<div class="left">' + delivery_time_list_label + '</div>';
		   html+='<div class="right"><span class="list-item__subtitle delivery_time_label">'+ selected_delivery_time +'</span></div>';
		html+='</ons-list-item>';
		if ( datas.transaction_type == "delivery" ){
			if ( datas.checkout_stats.is_pre_order!=1){
				html+='<ons-list-item>';
			      html+='<div class="center">';
			        html+= t("Delivery Asap");
			      html+='</div>';
			      html+='<div class="right">';
			        html+='<ons-switch id="delivery_asap" class="delivery_asap" value="1" onclick="setAsap()"></ons-switch>';
			      html+='</div>';
			    html+='</ons-list-item>';
			}
		}
	html+='</div>';
	


	html+='</ons-list>';
	return html;
};

var twoColumn = function(label, value){
	var html='<ons-list-item modifier="nodivider">';
	   html+='<div class="left">'+ label +'</div>';
	   html+='<div class="right">'+ value +'</div>';
	html+='</ons-list-item>';
	return html;
};
var twoColumnBold = function(label, value){
	var html='<ons-list-item class="bborder2" modifier="nodivider">';
	   html+='<div class="left bold">'+ label +'</div>';
	   html+='<div class="right">'+ value +'</div>';
	html+='</ons-list-item>';
	return html;
};

var twoColumnBoldOnly = function(label, value){
	var html='<ons-list-item class="column-bold-only" modifier="nodivider">';
	   html+='<div class="left bold">'+ label +'</div>';
	   html+='<div class="right">'+ value +'</div>';
	html+='</ons-list-item>';
	return html;
};

var twoColumnTotal = function(label, value){
	var html='<ons-list-item class="stic-total-row" modifier="nodivider">';
	   html+='<div class="left bold">'+ label +'</div>';
	   html+='<div class="right">'+ value +'</div>';
	html+='</ons-list-item>';
	return html;
};

var voucherColumn = function(){
	
	if(settings = AppSettings()){
		if(settings.merchant_enabled_voucher!="yes"){
			return '';
		}
	}
	
	var html='<ons-list-header>' + t('Do you have a voucher?') +'</ons-list-header>';
		html+='<ons-list-item modifier="nodivider">';
		   html+='<ons-row class="stic-voucher-row" vertical-align="center" >';
			   html+='<ons-col class="left">';
			   		html+='<ons-input id="voucher_name" class="voucher_name" modifier="underbar" placeholder="' + t('Enter voucher here') + '" float></ons-input>';
			   	html+='</ons-col>';
			   	html+='<ons-col class="right text-right" width="75px">';
			   		html+='<ons-button class="stic-min-grey-btn" modifier="quiet" onclick="applyVoucher()">' + t("APPLY") +'</ons-button>';
			   	html+='</ons-col>';
		   	html+='</ons-row>';
		html+='</ons-list-item>';

	return html;
};

tipColumn = function(data){
	
	if(settings = AppSettings()){
		if(settings.merchant_enabled_tip!="2"){
			return '';
		}
	}
	
	merchant_tip_default = '';
	if(settings = AppSettings()){
		merchant_tip_default = settings.merchant_tip_default;
	}
		
	var tip_list='';
	 tip_list+='<ons-select id="tips" class="tips" style="width:170px;" >';
	    if(!empty(data)){
	      $.each( data, function( key, val ) {
	      	selected ='';
	      	if (key==merchant_tip_default){
	      		selected='selected';
	      	}
	      	tip_list+='<option value="'+key+'" '+selected+' >'+val+'</option>';
	      });	      	      
	    }
	 tip_list+='</ons-select>';
	 	 
	 var html='<ons-list-header>' + t('Would you like to tip?') +'</ons-list-header>';
	 	html+='<ons-list-item modifier="nodivider">';
	 	   html+='<ons-row class="stic-tips-row" vertical-align="center" >';
	 		   html+='<ons-col class="left">';
	 		   		html+=tip_list;
	 		   	html+='</ons-col>';
	 		   	html+='<ons-col class="right text-right" width="75px">';
	 		   		html+='<ons-button class="stic-min-grey-btn" modifier="quiet" onclick="applyTips()">' + t("APPLY") +'</ons-button>';
	 		   	html+='</ons-col>';
	 	   	html+='</ons-row>';
	 	html+='</ons-list-item>';

	return html;
}

var displayList = function(data, transaction_type ){
	var html='';
	html+='<ons-list modifier="is_rtl">';
	  $.each( data, function( key, val ) {
	  	 if (transaction_type=="delivery_time"){
	  	 	html+='<ons-list-item tappable modifier="longdivider" onclick="setFieldValue(' + "'" + transaction_type + "'," + "'" + val + "','" + addslashes(val) + "'"  + ' )" ><div class="center">'+ val +'</div></ons-list-item>';
	  	 } else {
	  	 	html+='<ons-list-item tappable modifier="longdivider" onclick="setFieldValue(' + "'" + transaction_type + "'," + "'" + key + "','" + addslashes(val) + "'"  + ' )" ><div class="center">'+ t(val) +'</div></ons-list-item>';
	  	 }	     
	  });
	html+='</ons-list>';
	return html;
};

/** Atualiza��o Master Hub (Endere�o por Localiza��o Bairro e Cidade) **/
var displayStateList = function (data, state_list) {
	var htm='';
	htm+='<ons-list>';
	$.each( data, function( key , val ) { 
		htm+='<input type="hidden" name="state_id" value="' + val.id + '">';
		htm += '<ons-list-item tappable modifier="longdivider" onclick="setFieldValue(' + "'" + state_list + "'," + "'" + val.id + "','" + addslashes(val.name) + "'" + ' )" ><div class="center" style="font-size: xx-large;">' + val.name + '</div></ons-list-item>';
	});
	htm+='</ons-list>';
	return htm;
};

var displayCityList = function (data, city_list) {
	var htm='';
	htm+='<ons-list>';
	$.each( data, function( key , val ) { 
		htm+='<input type="hidden" name="city_id" value="' + val.id + '">';
		htm += '<ons-list-item tappable modifier="longdivider" onclick="setFieldValue(' + "'" + city_list + "'," + "'" + val.id + "','" + addslashes(val.name) + "'" + ' )" ><div class="center">' + val.name + '</div></ons-list-item>';
	});
	htm+='</ons-list>';
	return htm;
};

var displayAreaList = function (data, area_list) {
	var htm='';
	htm+='<ons-list>';
	     htm+='<ons-list-header class="no-padding">';
	       htm+='<ons-row >';
             htm+='<ons-col>';
             htm+='<input type="text" name="search_area" class="search_area stic-small text-input text-input--transparent" placeholder="Escreva aqui o nome do bairro!" style="width: -webkit-fill-available;" value="">';
             htm+='</ons-col>';
           htm+='</ons-row >';  
	     htm+='</ons-list-header>';        
	
	$.each( data, function( key , val ) { 
		htm += '<ons-list-item tappable modifier="longdivider" onclick="setFieldValueBairro(' + "'" + area_list + "'," + "'" + val.area_id + "','" + addslashes(val.bairro) + "'," + "'" + val.city_id + "','" + addslashes(val.cidade) + "'," + "'" + val.state_id + "','" + addslashes(val.estado) + "'," + ' )" ><div class="center" >' + val.bairro + '</div><div class="stic-small2 right" >' + val.cidade + '</div></ons-list-item>';
	});
	htm+='</ons-list>';
	return htm;
};
/** Fim da atualiza��o **/

var displayPaymentList = function(data){
	var html='';
	html+='<ons-list>';
	  $.each( data, function( key, val ) {
	  	 html+='<ons-list-item class="pb0" tappable modifier="longdivider" >';
   		   html+='<label class="min34 left">';
	        html+='<ons-radio name="payment_provider" class="payment_provider" input-id="payment_provider-'+key+'" value="'+ val.payment_code +'"  ></ons-radio>';
	       html+='</label>';
	       
	       html+='<label for="payment_provider-'+key+'" class="center">' + val.payment_name + '</label>';
	       	  	   
	  	 html+='</ons-list-item>';
	  });
	html+='</ons-list>';
	return html;
};

var ccLIst = function(data, element){
	
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	var html='';
	$.each( data, function( key, val ) {
		
		html+='<ons-list-item tappable modifier="list_style_left chevron" onclick="cardsAction(' + "'" + val.id + "'," + "'" + "cc" + "'" + ' )" >';
			html+='<div class="left">';
				html+='<img src="lib/icons/credit-card.svg" onerror="this.src=\'credit-card.png\'">';
			html+='</div>';
			html+='<div class="center">';
	        	html+='<span class="list-item__title">'+val.card+'</span>';
	        	html+='<span class="list-item__subtitle">'+val.date_added+'</span>';
	      	html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	    
	});
		
};


var addressList = function(data, element){	
	
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	var html='';
	$.each( data, function( key, val ) {
		
		class_name='';
		if(val.as_default==2){
			class_name='color_green';
		}
		
		html+='<ons-list-item tappable modifier="list_style_left longdivider" onclick="cardsAction(' + "'" + val.id + "'," + "'" + "address" + "'" + ' )"  >';
	      html+='<div class="left min34">';
	        html+='<img src="lib/icons/home.svg" onerror="this.src=\'home.png\'">';
	        html+='</div>';
	      html+='<div class="center">';
	          html+='<span class="list-item__title" style="color: green;font-size: smaller;">'+val.location_name+'</span>';
	          html+='<span class="list-item__title">'+val.address+'</span>';
	          html+='<span class="list-item__subtitle" style="font-size: smaller;">'+val.date_added+'</span>';
	      html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	    
	});
};	


var displayOrders = function(data){
	var list = document.getElementById('infinite_orders');
	var html='';
	$.each( data, function( key, val ) {
		html+='<ons-list-item tappable onclick="orderAction(' + val.order_id +','+ val.show_cancel_order +','+ val.add_review +' )">'; 
		  /*html+='<div class="inner" style="padding:0 15px;"><h3>'+ val.transaction_type + '<span class="spacer"></span>' + '#'+ val.order_id +'</h3></div>';*/
		  
		  html+='<div class="inner equal_table" style="padding:0 15px;">';
		    html+='<div class="col"><h3>'+ val.transaction_type + '<span class="spacer"></span>' + '#'+ val.order_id +'</h3></div>';
		    if(!empty(val.rating)){
		       html+='<div class="col"><span class="notification notification--material blue_bg">'+val.rating+'</span></div>';
		    }
		  html+='</div>';
		  
		  html+='<div class="line"></div>';
		  
		  html+='<div class="inner">';
              html+='<div class="equal_table full_width">';
                //html+='<div class="col col-1-1 small">' + val.placed + '<br/>' + val.payment_type +  '</div>';
                html+='<div class="col col-1-1 small">' + val.placed ;
                html+='<br/>' + val.payment_type ;
                if (!empty(val.cancel_status)){
                	html+='<br/><span class="color_green">' + val.cancel_status + '</span>' ;
                }
                html+='</div>';
                
                html+='<div class="col col-2-2 text_right" >';
                  html+='<span class="badge_rounded">'+ val.status +'</span>';
                html+='</div>';
              html+='</div>';
           html+='</div>';
           
           html+='<div class="line"></div>';
           
            html+='<div class="inner">';
              html+='<div class="equal_table full_width">';
                 html+='<div class="col col-1-1"><b>' + t('Total') + '</b></div>';
                 html+='<div class="col col-2-2 text_right">';
                   html+='<ons-button modifier="green_button" >';
                   html+= val.total;
                   html+='</ons-button>';
                 html+='</div>';
              html+='</div>';
           html+='</div>';
		  
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	    
		
	});
};

var formatOrder = function(data){
	var html='<ons-list modifier="order_list">';
	html+='<ons-list-item modifier="nodivider">'; 
	  $.each( data, function( key, val ) {	  	  	  	    
	  	    html+='<ons-row>';
		      html+='<ons-col>'+ val.label +'</ons-col>';
		      if(!empty(val.value)){
		         html+='<ons-col>'+ val.value +'</ons-col>';
		      } else {
		      	 html+='<ons-col></ons-col>';
		      }
		    html+='</ons-row>'; 		      	  	  
	  });
	  html+='</ons-list-item>';
	html+='</ons-list>';
	return html;
};

displayReviews = function(data){
	var list = document.getElementById('infinite_reviews');
	var html='';
	$.each( data, function( key, val ) {
		html+='<ons-list-item>'; 
		
		 html+='<div class="left">';
		    html+='<span>';
		    html+='<div class="pending_el" style="height:40px;width: 40px;color: #ccc;border-radius:50%;" ></div>';
            html+='<img class="list-item__thumbnail" src="' + val.avatar + '">';
           html+='</span>'; 
         html+='</div>';
		
         html+='<div class="center">';
            html+='<span class="list-item__title ">'+ val.review +'</span>';
            html+='<span class="list-item__subtitle">' + val.date + '</span>';
            
            if($.isArray(val.reply)) {
            	$.each( val.reply, function( reply_key, reply_val ) {
            		html+='<span class="list-item__subtitle color_green indent">' + reply_val.reply_from + '</span>';
            		html+='<span class="list-item__subtitle small indent">'+ reply_val.date +'</span>';
            		html+='<span class="list-item__subtitle indent small">' + reply_val.review + '</span>';            		
            	});
            }
            
            if (val.can_edit==1){
            	html+='<span class="list-item__subtitle">';
            	  html+='<ons-button modifier="quiet" class="" onclick="showEditForm('+ val.id +')" ><ons-icon icon="md-edit" size="15px"></ons-icon></ons-button>';
            	  html+='<ons-button modifier="quiet" class="" onclick="reviewConfirmDelete('+ val.id +')" ><ons-icon icon="md-delete" class="red_color" size="15px"></ons-icon></ons-button>';
            	html+='</span>';
            }
            
         html+='</div>';
         
         html+='<div class="right">';
         html+= '<span class="notification notification--material blue_bg">'+ val.rating +'</span>'
         html+='</div>';
         
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';
		
	});	

	initImageLoaded();
	
};

gallery = function(data){
	var html=' <ons-carousel fullscreen swipeable auto-scroll overscrollable id="carousel">';
	$.each( data, function( key, val ) {
		
		html+='<ons-carousel-item style="background-image: url('+val+'); background-size:cover;" >';		            
	    html+='</ons-carousel-item>';
		
	});
	html+='</ons-carousel>';
	return html;
};



displayPromo = function(data){
	var html='';


		html+='<div class="stic-title">';
			html+='<ons-icon icon="gift"></ons-icon>';
       		html+='<div class="home-title">';
	   			html+='<span class="main trn">'+t('Offers & vouchers')+'</span>';
	   			html+='<br>';
           		html+='<span class="min trn">'+t('Get more discount with our promos')+'</span>';
	   		html+='</div>';
		html+='</div>';

	html+='<div class="stic-carousel-margin">';
		html+='<ons-carousel swipeable auto-scroll auto-scroll-ratio="0.1" overscrollable id="stic-offer" class="stic-carousel">';

			if($.isArray(data.offer)) {	       
		   	   $.each( data.offer  , function( offer_key, offer_val ) {   	   	   
					html+='<ons-carousel-item class="stic-offer-item">';
						html+='<div class="stic-offer-div">';
							html+='<ons-row class="stic-offer-row">';
								html+='<ons-col class="stic-off">';
			            			html+='<div>';
					               		html+='<img src="lib/icons/off.svg">';
			            			html+='</div>';
								html+='</ons-col>';
								html+='<ons-col class="stic-promo">';
				               		html+='<span>'+ offer_val +'</span>';
								html+='</ons-col>';
			            	html+='</ons-row>';
		            	html+='</div>';
					html+='</ons-carousel-item>';
		   	   });
			}    
			
			if($.isArray(data.voucher)) {	       
		   	   $.each( data.voucher  , function( voucher_key, voucher_val ) {   	   	   
					html+='<ons-carousel-item class="stic-offer-item">';
						html+='<div class="stic-offer-div">';
							html+='<ons-row class="stic-offer-row">';
								html+='<ons-col class="stic-off">';
			            			html+='<div>';
					               		html+='<img src="lib/icons/off.svg">';
			            			html+='</div>';
								html+='</ons-col>';
								html+='<ons-col class="stic-promo">';
				               		html+='<span>'+ voucher_val +'</span>';
								html+='</ons-col>';
			            	html+='</ons-row>';
		            	html+='</div>';
					html+='</ons-carousel-item>';
		   	   });
			}  
			
			if(!empty(data.free_delivery)){
				html+='<ons-carousel-item class="stic-offer-item">';
						html+='<div class="stic-offer-div">';
							html+='<ons-row class="stic-offer-row">';
								html+='<ons-col class="stic-off">';
			            			html+='<div>';
					               		html+='<img src="lib/icons/off.svg">';
			            			html+='</div>';								html+='</ons-col>';
								html+='<ons-col class="stic-promo">';
				               		html+='<span>'+ data.free_delivery +'</span>';
								html+='</ons-col>';
			            	html+='</ons-row>';
		            	html+='</div>';
				html+='</ons-carousel-item>';
			}
		
		html+='</ons-carousel>';
	html+='</div>';
	
    $(".offer_wrap").html( html );
};

displayBooking = function(data){
	
	var list = document.getElementById('infinite_bookhistory');
	var html='';
	$.each( data, function( key, val ) {
		html+='<ons-list-item tappable >'; 
		  html+='<div class="inner" style="padding:0 15px;"><h3>'+ val.booking_id +'</h3></div>';
		  html+='<div class="line"></div>';
		  
		  html+='<div class="inner">';
              html+='<div class="equal_table full_width">';
                html+='<div class="col col-1-1 small">' + val.date + '<br/>' + val.guest +  '</div>';
                html+='<div class="col col-2-2 text_right" >';
                  html+='<span class="badge_rounded">'+ val.status +'</span>';
                html+='</div>';
              html+='</div>';
           html+='</div>';
          
          html+='<div class="line"></div>';
            
          html+='<div class="inner">'
          html+='<p class="small">'+ val.notes +'</p>';
          html+='</div>';
           
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	    
		
	});
	    
};


fillAddressBook = function(data){
	var html='';
	html+='<ons-select name="addressbook_id" id="addressbook_id" class="full_width addressbook_id" required>';
	$.each( data, function( key, val ) {	
		 html+='<option value="'+ val.id +'">'+ val.address +'</option>';	
	});
	html+='</ons-select>'; 
	return html;
};

displaySelectCC = function(data){
	
	html='';
	html+='<ons-list modifier="list_menu">';
		
	x=1;
	
	$.each( data, function( key, val ) {
		html+='<ons-list-item tappable class="pb0">';	    
		  html+='<label class="min34 left">';
	        html+='<ons-radio name="cc_id" value="'+val.id+'" input-id="cc_id_'+x+'" class="cc_id"  ></ons-radio>';
	      html+='</label>';
	      html+='<label for="cc_id_'+x+'" class="center">'+val.card + '</label>';		      	
		html+='</ons-list-item>';
		x++;
	});
	
	html+='</ons-list>';
	return html;
};

displayCards = function(data){
	
	html='';
	html+='<ons-list modifier="list_menu">';
	
	x=1;
		
	$.each( data, function( key, val ) {
	html+='<ons-list-item tappable>';	    
	
	  html+='<label class="left">';
        html+='<ons-radio name="cc_name" value="'+val.payment_name+'" input-id="cc_name_'+x+'" class="cc_name"  ></ons-radio>';
      html+='</label>';
      html+='<label for="cc_name_'+x+'" class="center">'+val.payment_name + '</label>';		     
      
      html+='<div class="right"><img class="list-item__thumbnail" src="'+ val.payment_logo + '"></div>';
       	
	html+='</ons-list-item>';
	  x++;
	});
	
	html+='</ons-list>';
	return html;
	
};

fillMobilePrefix = function(data){	
	html='';
	html+='<ons-list>';
	html+='<ons-list-header>'+ t('Select your country code') +'</ons-list-header>';

	$.each( data  , function( key, val ) {
		html+='<ons-list-item tappable modifier="longdivider" onclick="setPrefix('+ "'+" + val.code + "'" +')">';
		  html+='<div class="left ">+'+ val.code +'</div>';
		  html+='<div class="center ">'+ val.name +'</div>';
		html+='</ons-list-item>';
	});
	html+='</ons-list>';
	$(".mobilecode_list").html(html);
};

displayNotification = function(data){
	var list = document.getElementById('infinite_notification');
	var html='';
	$.each( data, function( key, val ) {
		html+='<ons-list-item tappable  modifier="longdivider" >'; 
				
		 		  
	      html+='<div class="list-item__title">';
	        html+= val.push_title;
	      html+='</div>';
	      html+='<div class="list-item__subtitle">';
	        html+= val.push_message;
	      html+='</div>';
	      
	      
         html+='<div class="list-item__label">'+val.date_created+'</div>';
    

         
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';
		
	});		
};


pointsList = function(data,div_name){
	var html='<ons-list>';
	$.each( data, function( key, val ) {
		 html+='<ons-list-item>';
		  html+='<div class="center">';
		    html+='<span class="list-item__title">' + val.date  + '</span>';
		    html+='<span class="list-item__subtitle">' + val.label  + '</span>';
		  html+='</div>';
		  //html+='<div class="right"><span class="notification notification__green">' + val.points  + '</span></div>';
		  html+='<div class="right"><span class="notification__green notification notification--material">' + val.points  + '</span></div>';
		 html+='</ons-list-item>';
	});
	html+='</ons-list>';
	
	$(div_name).html( html );
};



CategoryListSmall = function(data, element_id){
	if (data.length<=0){
		return;
	}
	
	var list = document.getElementById( element_id );
	var html='';
		
	$.each( data  , function( key, val ) {
		html+='<ons-list-item tappable  onclick="loadItem(' + "'" + val.cat_id + "'," + "'" + addslashes(val.category_name_orig) + "'" + '   )">';
		  html+='<div class="left">';
		    html+='<img class="list-item__thumbnail" src="'+ val.photo_url +'">';
		  html+='</div>';
		  html+='<div class="center">';
		    html+='<span class="list-item__title">' + val.category_name + '</span>';
		    html+='<span class="list-item__subtitle">' + val.item_found + '</span>';
		  html+='</div>';
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	});	
};

ItemListSmall = function(data, element_id){
	if (data.length<=0){
		return;
	}
	
	var list = document.getElementById( element_id );
	var html='';
		
	$.each( data  , function( key, val ) {
		html+='<ons-list-item tappable  onclick="itemDetails(' + "'" + val.item_id + "', " + "'" + val.category_id +  "'" +  ')">';
		  html+='<div class="left">';
		    html+='<img class="list-item__thumbnail" src="'+ val.photo_url +'">';
		  html+='</div>';
		  html+='<div class="center">';
		    html+='<span class="list-item__title">' + val.item_name + '</span>';
		    html+='<span class="list-item__subtitle">' + val.item_description + '</span>';
		  html+='</div>';
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	});	
};

displayHistory = function( data ) {
	
	var list = document.getElementById('history_list');
	
	var html='';
	$.each( data, function( key, val ) {
		html+='<ons-list-item>';
	      html+='<div class="center">';
		    html+='<span class="list-item__title">'+ val.status +'</span>';
		    html+='<span class="list-item__subtitle">'+ val.date +'</span>';
		    html+='<span class="list-item__subtitle">'+ val.remarks +'</span>';
		  html+='</div>';
	    html+='</ons-list-item>';
	    
	    var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	 
	});
	
};

fillPages = function(data){	
	if (data.length<=0){
		return;
	}
	var list = document.getElementById('about_us_list');
	
	var html='';
	$.each( data.data  , function( key, val ) {		
		html+='<ons-list-item modifier="chevron" tappable class="menu_privacy_policy" onclick="showCustomPage('+ val.page_id +');">';
          html+='<div class="left"><ons-icon icon="'+ val.icon +'" size="22px"></ons-icon></div>';
          html+='<div class="center"><span class="trn">'+ val.title+'</span></div>';
        html+='</ons-list-item>';
        
        var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	  
		
	});
};

profileMenu = function(is_login){
	var html='';	
	if(is_login){
		
		 html+='<ons-list-item modifier="chevron" tappable onclick="showPage(\'settings_menu.html\')" >';
	        html+='<div class="left"><ons-icon icon="md-settings" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Settings") +'</div>';
	      html+='</ons-list-item>';
	      
		  if(settings = AppSettings()){
		  	if(settings.disabled_cc_management!="yes"){
		  		html+='<ons-list-item modifier="chevron" class="" tappable onclick="showPage(\'creditcard_list.html\')" >';
			      html+='<div class="left"><ons-icon icon="md-card" size="22px"></ons-icon></div>';
			      html+='<div class="center trn">'+ t("Your credit cards") +'</div>';
			    html+='</ons-list-item>';
		  	}
		  }
		
	      html+='<ons-list-item modifier="chevron" class="" tappable  onclick="showPage(\'addressbook_list.html\')" >';
	        html+='<div class="left"><ons-icon icon="md-pin-drop" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Your address book") +'</div>';
	      html+='</ons-list-item>';
	      
	      html+='<ons-list-item modifier="chevron"  class="" tappable  onclick="showPage(\'booking_history.html\')" >';
	        html+='<div class="left"><ons-icon icon="md-receipt" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Booking history") +'</div>';
	      html+='</ons-list-item>';
	      	      
	      if(settings){
	      	 if(settings.has_pts==1){
	      	 	html+='<ons-list-item modifier="chevron" tappable  onclick="showPage(\'points_main.html\')" >';
			        html+='<div class="left"><ons-icon icon="md-flash" size="22px"></ons-icon></div>';
			        html+='<div class="center trn">'+ t("Your Points") +'</div>';
			    html+='</ons-list-item>';
	      	 }
	      }
	      
	      html+='<ons-list-item modifier="chevron"  class="" tappable  onclick="showPage(\'favorites_item.html\')" >';
	        html+='<div class="left"><ons-icon icon="ion-android-favorite" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Favorites") +'</div>';
	      html+='</ons-list-item>';
	      
	      html+=setCustomePages(1);
	      
	      html+='<ons-list-item modifier="chevron" tappable onclick="logout();" >';
	        html+='<div class="left"><ons-icon icon="ion-log-out" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Log out") +'</div>';
	      html+='</ons-list-item>';
		
	} else {
		
		setStorage("next_step",'home_page');
		$(".profile_name").html('');
		
		html+='<ons-list-item modifier="chevron" tappable onclick="showPage(\'settings_menu.html\')" >';
	        html+='<div class="left"><ons-icon icon="md-settings" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Settings") +'</div>';
	    html+='</ons-list-item>';
	    
	    html+=setCustomePages(1);
	    
	    html+='<ons-list-item modifier="chevron" tappable onclick="initLogin()" class=""  >';
	        html+='<div class="left"><ons-icon icon="md-account-o" size="22px"></ons-icon></div>';
	        html+='<div class="center trn">'+ t("Log in") +'</div>';
	      html+='</ons-list-item>';	       
	             
	}
	
	$("#profile_menu_list").html( html );
};


addButtonReview = function(enabled){
		
	if(!enabled){
		$("ons-fab.fab_add_review").remove();
	}
	
};

tabbarMenu = function(){
	
	html='';
	
	html+='<ons-tabbar id="tabbar_bottom"  position="bottom" animation="slide" modifier="is_rtl">';
	    html+='<ons-tab id="tab-home" page="splitter.html" label="'+ t("Home") +'" icon="home" ></ons-tab>';
	    html+='<ons-tab id="tab-about" page="info.html" label="'+ t("About us") +'" icon="md-star" ></ons-tab> ';
	    html+='<ons-tab id="tab-orders" page="orders.html" label="'+ t("Orders") +'" icon="md-reorder" ></ons-tab>';
	    html+='<ons-tab id="tab-cart" page="cart_temp.html" label="'+ t("Cart") +'" icon="md-shopping-cart" class="tabb_cart" badge="" ></ons-tab>';
    html+='</ons-tabbar>';
  
    return html;
};

setFloatingCategory = function(element){
	
	dump("setFloatingCategory=>");
	
	html='';		
	var list = document.getElementById(element);
	
	data = getStorage("singleapp_merchant_category");	
	if(empty(data)){
		return;
	}
	
	current_page_id = onsenNavigator.topPage.id;	
	
	data = JSON.parse( data );
		
	if(!empty(data)){
		$.each( data  , function( key, val ) {
			
			if(current_page_id=="page_home"){
			   html+='<ons-list-item modifier="nodivider" tappable onclick="showItemPageFloating('+ clickFormat(val.cat_id+"|"+ val.category_name + "|" + "1") +')" >';
			} else {
			   html+='<ons-list-item modifier="nodivider" tappable onclick="showItemPageFloating('+ clickFormat(val.cat_id+"|"+  val.category_name + "|" + "2") +')"  >';
			}
		      html+='<div class="center">';
		      html+='<span class="list-item__title">'+ val.category_name +'</span>';
		      html+='<span class="list-item__subtitle">'+ val.item_count +'</span>';
		    html+='</div>';
		    html+='</ons-list-item>';
		    
		    var newItem = ons.createElement(html);
		    list.appendChild(newItem);
		    html='';
			
		});
	}
};

templateError = function(title, message){
	var html='';

	html+='<div class="template_error">';
	  html+='<div class="stic-center">';
	  html+='<img src="lib/icons/empty.svg">';
	   html+='<h4 class="trn">'+ title +'</h4>';
	   html+='<p class="small trn">'+ message +'</p>';
	  html+='</div>';
	html+='</div>';

	return html;
};

setPoints = function(element, data){	
	html=''; 
	var list = document.getElementById(element);
	
	$.each( data  , function( key, val ) {
		
		 html+='<ons-list-item tappable modifier="chevron list_style_left longdivider" onclick="showPointsDetails('+ clickFormat(val.label+"|"+val.point_type)  +')" >';
	      html+='<div class="left"><span class="notification notification__green">'+ val.value +'</span></div>';
	      html+='<div class="center">';
	          html+='<span class="list-item__title">'+val.label+'</span>';
	          //html+='<span class="list-item__subtitle">'+val.date_added+'</span>';
	      html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	});
};

setPointsDetails = function(element , data ){
	
	html=''; 
	var list = document.getElementById(element);
	
	$.each( data  , function( key, val ) {
		
		 html+='<ons-list-item  modifier="list_style_left longdivider"  >';
	      html+='<div class="left"><span class="notification notification__green">'+ val.points +'</span></div>';
	      html+='<div class="center">';
	          html+='<span class="list-item__title">'+val.label+'</span>';
	          html+='<span class="list-item__subtitle">'+val.date+'</span>';
	      html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	});
	
};

setFavoriteList = function(data, element){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	
	$.each( data  , function( key, val ) {
				
	   html+='<ons-list-item modifier="list_style_banner nodivider" tappable onclick="actionSheetFavorites('+ "'"+val.id+"'," + "'"+ val.merchant_id  + "'" +')" >';
	   html+='<div class="inner raty-medium">';
		   html+='<ons-row>';
		   html+='<ons-col>';
		   
			html +='<div class="is-loading medium-loader">'; 
			html +='<div class="spinner"></div>';		
			html +='<img class="hide" src="'+val.background_url+'">';	      
			html +='</div>'; 

		   
		     html+='<div class="banner" style="background-image: url('+ "'" + val.background_url + "'" +')" ></div>';
		     html+='<h5>'+ val.merchant_name +'</h5>';
		     html+='<p class="small">'+ val.date_added +'</p>';
		   
		     html+='<ons-row class="rating_wrap">';
			      html+='<ons-col width="95px"><div class="raty-stars" data-score="'+ val.rating.ratings +'"></div></ons-col>';
			      html+='<ons-col>'+ val.rating.review_count +'</ons-col>';
			  html+='</ons-row>';
		     
		   html+='</ons-col>';
		   html+='</ons-row>';   	  
	   html+='</div>';
	  html+='</ons-list-item> ';

		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	    
	});
				
};

fillBookingTabs = function(element, index){
	
	var list = document.getElementById( element );
	var html='';
	
	if(settings = AppSettings()){		
		$.each( settings.booking_tabs, function( key, val ) {
			
			is_selected='';
			if(key==index){
				is_selected='selected"';
			}
			
			html+='<ons-carousel-item class="'+ is_selected +'" onclick="SetBookingTab(' + clickFormat(key+"|"+val.tab) + ');" >'+ t(val.label) +'<ons-ripple color="#eee" background="#ffffff"></ons-ripple></ons-carousel-item>';
			var newItem = ons.createElement(html);
		    list.appendChild(newItem);
		    html='';
		});
		document.querySelector("#"+element).refresh();	
	}
};

setBookingList = function(element, data){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	
	$.each( data  , function( key, val ) {
		
        html+='<ons-list-item class="stic-booking-history" modifier="full_list list_style1">';

        	html+='<div class="stic-date-header">';
        		html+='<div class="main">';
        			html+='<p class="dot">·</p>';
        			html+='<p>'+val.stic_date_created+'</p>';
        		html+='</div>';
        		html+='<div class="min">';
        			html+='<span class="at">'+t("at")+' </span>';
        			html+='<span class="order-time">'+val.stic_time_created+'</span>';
        		html+='</div>';
        	html+='</div>';

        	html+='<div class="inner" onclick="showBookingDetails('+ val.booking_id + ')" modifier="quiet">';
        	html +='<ons-ripple modifier="material"></ons-ripple>';

        		html+='<ons-row class="pb10">';
        			html+='<ons-col width="50px" vertical-align="center" >';
        				html+='<div class="is-loading">'; 
        					html+='<div class="spinner"></div>';	
        					html+='<img class="thumbnail" src="' + val.logo +'">';
        				html+='</div>';
        			html+='</ons-col>';

        			html+='<ons-col vertical-align="center">';
        				html+='<h5>'+ val.merchant_name +'</h5>';
        				html+='<div class="stic-order-details">';
        					html+='<span class="small">'+t("Number of guests")+': '+val.number_guest+'</span>';
        					html+='<span class="small-dot"> · </span>';
        					html+='<span class="small">'+t("Booking ID")+'# '+val.booking_ref+'</span>';
        				html+='</div>';
        			html+='</ons-col>';
        		html+='</ons-row>';

        		html+='<div class="stic_grey_line"></div>';

        		html+='<ons-row class="review">';
        			html+='<ons-col>';
        				html+='<span>'+t("Your review")+'</span>';
        			html+='</ons-col>';
        			html+='<ons-col class="text-right" width="120px">';

        			if (empty(val.rating)) {
        				html+='<div class="raty-medium"><span class="color_green">'+t("Evaluate my reservation")+'</span></div>';
        			} else {
        				html+='<div class="raty-medium"><div class="raty-stars" data-score="'+ val.rating.ratings +'"></div></div>';
        			}

        			html+='</ons-col>';
        		html+='</ons-row>';

        	html+='</div>';

        html+='</ons-list-item> ';

		
		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	});
	
};

fillOrderTabs = function(element, index){
	
	var list = document.getElementById( element );
	var html='';
	
	if(settings = AppSettings()){		
		$.each( settings.order_tabs, function( key, val ) {
			
			is_selected='';
			if(key==index){
				is_selected='selected"';
			}
			
			html+='<ons-carousel-item class="'+ is_selected +'" onclick="SetOrderTab(' + clickFormat(key+"|"+val.tab) + ');" >'+val.label+'<ons-ripple color="#eee" background="#ffffff"></ons-ripple></ons-carousel-item>';
			var newItem = ons.createElement(html);
		    list.appendChild(newItem);
		    html='';
		});
		document.querySelector("#"+element).refresh();	
	}
};

setOrderList = function(element , data){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	
	$.each( data  , function( key, val ) {
		
		html+='<ons-list-item class="stic-order-history" modifier="full_list list_style1">';

			html+='<div class="stic-date-header">';
				html+='<div class="main">';
					html+='<p class="dot">·</p>';
					html+='<p>'+val.stic_date_created+'</p>';
				html+='</div>';
				html+='<div class="min">';
					html+='<span class="at">'+t("at")+' </span>';
					html+='<span class="order-time">'+val.stic_time_created+'</span>';
				html+='</div>';
			html+='</div>';

			html+='<div class="inner" onclick="actionSheetOrder('+ val.order_id+ ',' + val.add_review + ',' + val.add_cancel + ',' + val.add_track +  ')" modifier="quiet">';
			html +='<ons-ripple modifier="material"></ons-ripple>';

				html+='<ons-row class="pb10">';
					html+='<ons-col width="50px" vertical-align="center" >';
						html+='<div class="is-loading">'; 
							html+='<div class="spinner"></div>';	
							html+='<img class="thumbnail" src="' + val.logo +'">';
						html+='</div>';
					html+='</ons-col>';

					html+='<ons-col vertical-align="center">';
						html+='<h5>'+ val.merchant_name +'</h5>';
						html+='<div class="stic-order-details">';
							html+='<span class="small">'+t("Status")+': '+val.status+'</span>';
							html+='<span class="small-dot"> · </span>';
							html+='<span class="small">'+t("Order ID")+'# '+val.order_id+'</span>';
						html+='</div>';

						if(!empty(val.cancel_status)){
							html+='<p class="small">'+ val.cancel_status+'</p>';
						}
					html+='</ons-col>';
				html+='</ons-row>';

				html+='<div class="stic_grey_line"></div>';

				html+='<ons-row class="review">';
					html+='<ons-col>';
						html+='<span>'+t("Your review")+'</span>';
					html+='</ons-col>';
					html+='<ons-col class="text-right" width="120px">';

					if (empty(val.rating)) {
						html+='<div class="raty-medium"><span class="color_green2">'+t("Review my order")+'</span></div>';
					} else {
						html+='<div class="raty-medium"><div class="raty-stars" data-score="'+ val.rating +'"></div></div>';
					}

					html+='</ons-col>';
				html+='</ons-row>';

				html+='<div class="stic_grey_line"></div>';

				html+='<ons-row class="last" vertical-align="center" >';
					html+='<ons-col>';
						html+='<span>'+val.payment_type+'</span>';
					html+='</ons-col>';
					html+='<ons-col vertical-align="center" class="text-right" width="70px">';
						html+='<p class="price">'+val.total_w_tax+'</p>';
					html+='</ons-col>';
				html+='</ons-row>';

			html+='</div>';

		html+='</ons-list-item> ';
		
		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	});
	
};

setOrderHistory = function(element, data){		
	if (data.length<=0){
		return;
	}		
	var html='';
	
	html+='<ons-row>';
	html+='<ons-col width="65px" vertical-align="center" >';   
	 html+='<div class="is-loading">';
	   html+='<div class="spinner"></div>';
	   html+='<img class="thumbnail" src="'+ data.logo +'">';
	 html+='</div>';
	html+='</ons-col>';
	html+='<ons-col width="50%" vertical-align="center" >';
	html+='<h5>'+ data.merchant_name +'</h5>';
	html+='<p class="small print_trans">'+t("Status")+': '+ t(data.status) +'</p>';
	html+='<p class="small">'+t("Order ID")+': '+ data.order_id +'</p>';
	html+='</ons-col> ';
	html+='<ons-col vertical-align="center" >';
	  html+='<div class="raty-stars" data-score="'+ data.rating +'"></div>';
	html+='</ons-col>';
	html+='</ons-row>';
	$(element).html(html);
};

setOrderHistoryList = function(element, data){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	$.each( data  , function( key, val ) {
		
	    html+='<ons-list-item modifier="longdivider track_order_list" tappable >';
	      html+='<div class="left min34">';
	        html+='<ons-icon icon="ion-ios-circle-outline" class="list-item__icon"></ons-icon>';
	      html+='</div>';
	      html+='<div class="center">';
	        html+='<span class="list-item__title">'+ val.status +'</span>';
	        html+='<p class="list-item__subtitle small">'+ val.remarks +'</p>';
	        html+='<p class="list-item__subtitle small">'+ val.date +'</p>';
	      html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	});
};

setReviewList = function(element, data){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	$.each( data  , function( key, val ) {
		
	    html+='<ons-list-item modifier="longdivider review_style">';
	    html+='<ons-row>';
	      html+='<ons-col width="48px">';
	      
	       html+='<div class="is-loading xxsmall-loader">';
	         html+='<div class="spinner"></div>';
	         html+='<img class="small_avatar" src="'+val.avatar+'">';
	       html+='</div>';
	      
	      html+='</ons-col>';
	      html+='<ons-col width="160px">';
	        html+='<h5>'+val.customer_name+'</h5>';
	        html+='<p class="small-date">'+val.date_posted+'</p>';
	      html+='</ons-col>';
	      html+='<ons-col class="text-right" vertical-align="top">';
	        html+='<div class="raty-stars" data-score="'+val.rating+'"></div>';
	      html+='</ons-col>';
	    html+='</ons-row>';

	    html+='<p class="stic-review">'+val.review+'</p>';

	    html+='</ons-list-item>';   	
	    
	    var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	    		
	    if(val.reply.length>0){	    	
	    	$.each( val.reply  , function( key2, val2 ) {
	    		 html+='<ons-list-item modifier="longdivider review_style">';
			    html+='<ons-row>';
			      html+='<ons-col width="60px">';
			      
			       html+='<div class="is-loading xxsmall-loader">';
			         html+='<div class="spinner"></div>';
			         html+='<img class="small_avatar" src="'+val2.logo+'">';
			       html+='</div>';
			      
			      html+='</ons-col>';
			      html+='<ons-col width="160px">';
			        html+='<h5>'+val2.customer_name+'</h5>';
			        html+='<p class="small">'+val2.date_posted+'</p>';
			      html+='</ons-col>';
			      html+='<ons-col vertical-align="top">';			        
			      html+='</ons-col>';
			    html+='</ons-row>';
			    html+='<p>'+val2.review+'</p>';
			    html+='</ons-list-item>';  
			    
			    var newItem = ons.createElement(html);
			    list.appendChild(newItem);
			    html='';
	    	});
	    		    	
	    }
				
	});
};



setGetTask = function(element, data){		
	if (data.length<=0){
		return;
	}		
	var html='';
	
	html+='<ons-row>';
	html+='<ons-col width="65px" vertical-align="center" >';   
	 html+='<div class="is-loading">';
	   html+='<div class="spinner"></div>';
	   html+='<img class="thumbnail" src="'+ data.profile_photo +'">';
	 html+='</div>';
	html+='</ons-col>';
	html+='<ons-col width="50%" vertical-align="center" >';
	html+='<h5>'+ data.driver_name +'</h5>';
	html+='<p class="small">'+ data.driver_phone +'</p>';	
	html+='</ons-col> ';
	html+='<ons-col vertical-align="center" >';
	  html+='<div class="raty-stars" data-score="'+ data.rating +'"></div>';
	html+='</ons-col>';
	html+='</ons-row>';
	$(element).html(html);
};

alreadyRateTask = function(with_return, element, message, avatar , rating){
	
    var html='';	
	html+='<p>';
	html+='<div class="is-loading small-loader">';
	html+='<div class="spinner"></div>';
	html+='<img class="small_avatar medium" src="'+ avatar +'">';
	html+='</div>';
	html+= message;
	html+='<div class="raty-stars" data-score="'+ rating+'"></div>';
	
	html+='<div class="bottom_gap1"></div>';
	
	if(with_return){
		html+='<ons-button modifier="quiet_orange no_shadow" onclick="closeModalRating()">';          
		  html+='<span class="trn">'+t('CLOSE')+'</span>';
		html+='</ons-button>';	
	} else {
		html+='<ons-button modifier="quiet_orange no_shadow" onclick="initModal(false);">';          
	     html+='<span class="trn">'+t('CLOSE')+'</span>';
	    html+='</ons-button>';	
	}
	html+='</p>';
	$(element).html(html);    	
};

setNotification = function(element, data){
	if (data.length<=0){
		return;
	}		
	
	var list = document.getElementById( element );
	var html='';	
	
	$.each( data  , function( key, val ) {
		
	    html+='<ons-list-item modifier="longdivider notification_list" tappable onclick="notificationSheet('+val.id+')" >';	      
	      html+='<div class="center">';
	        html+='<span class="list-item__title">'+ val.push_title +'</span>';
	        html+='<p class="list-item__subtitle small">'+ val.push_message +'</p>';
	        html+='<p class="list-item__subtitle small">'+ val.date_created +'</p>';
	      html+='</div>';
	    html+='</ons-list-item>';	    
		
		var newItem = ons.createElement(html);
		list.appendChild(newItem);
		html='';
	});
};

setGallery = function(element, data){
	
	dump(data.length);
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	html=''; col = '';
	x=1; xx=1;
	
	var total_data = parseInt(data.length)+0;
	
	$.each(data, function(key, val){
				
		
		 col+='<ons-col width="50%" onclick="FullImageView( '+ "'" + val + "'" +' )" >';
	        col+='<div class="banner">';
	        
				col +='<div class="is-loading medium-loader">'; 
				col +='<div class="spinner"></div>';		
				col +='<img class="hide" src="'+ val +'">';	      
				col +='</div>'; 
	         
			      col+='<div class="header_bg" style="background-image: url('+ "'" + val + "'" +')"  ></div>';
			   col+='</div>';
	     col+='</ons-col>';
			 
		  
		if (x==2){
			x=0;
			 html+='<ons-list-item tappable modifier="nodivider gallery_list" >';
			 html+=col;
			 html+='</ons-list-item>';
			 col='';
			 
			 newItem = ons.createElement(html);
			 list.appendChild(newItem);
		     html='';
		} else {
			if(xx>=total_data){
				 html+='<ons-list-item tappable modifier="nodivider" >';
				 html+=col;
				 html+='</ons-list-item>';
				 col='';
				 
				 newItem = ons.createElement(html);
				 list.appendChild(newItem);
			     html='';
			}
		}
				
	    x++;	  	 
	    xx++;
		
	});
	
};

setSearchOrder = function(element, data){
	dump(data.length);
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById( element );
	var html='';
		
	$.each( data  , function( key, val ) {		
		html+='<ons-list-item tappable onclick="actionSheetOrder('+ val.order_id+ ',' + val.add_review + ',' + val.add_cancel + ',' + val.add_track +  ')" >';
		  html+='<div class="left">';		 
		    		
		    html+='<div style="padding:0; margin-right: 15px;">';
		    html+='<img class="list-item__thumbnail" src="'+ val.logo +'">';
		    html+='</div>';
		    
		  html+='</div>';
		  html+='<div class="center">';
		    html+='<span class="list-item__title">' + val.restaurant_name + '</span>';
		    html+='<span class="list-item__subtitle stic-subtitle">' + val.transaction + '</span>';
		    html+='<span class="list-item__subtitle">' + val.payment_type + '</span>';
		  html+='</div>';
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	});	
};



setSearchBooking = function(element, data){
	dump(data.length);
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById( element );
	var html='';
		
	$.each( data  , function( key, val ) {		
		html+='<ons-list-item tappable onclick="showBookingDetails('+ val.booking_id +')" >';
		  html+='<div class="left">';		 
		    		
		    html+='<div style="padding:0; margin-right: 15px;">';
		    html+='<img class="list-item__thumbnail" src="'+ val.logo +'">';
		    html+='</div>';
		    
		  html+='</div>';
		  html+='<div class="center">';
		    html+='<span class="list-item__title">' + val.restaurant_name + '</span>';
		    html+='<span class="list-item__subtitle stic-subtitle">'+t("Order ID")+': ' + val.booking_ref + '</span>';
		    html+='<span class="list-item__subtitle">'+t("Number of guests")+': ' + val.number_guest + '</span>';
		  html+='</div>';
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	});	
};

setBookingDetails = function(element_id, data){
	if (data.length<=0){
		return;
	}
	
	var list = document.getElementById( element_id );
	var html='';
		
	$.each( data  , function( key, val ) {
		
		html+='<ons-list-item modifier="longdivider">';
	      html+='<div class="center">';
	       html+='<span class="list-item__title">'+ val.label +'</span>';
	       html+='<span class="list-item__subtitle">'+ val.value +'</span>';
	     html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	});	
};


setlanguageList = function(element,data, selected_lang){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	
	current_page_id = onsenNavigator.topPage.id;	
	
	$.each( data  , function( key, val ) {

		is_selected = '';
		if(val==selected_lang){
			is_selected='color_green';
		}
		
	  if(current_page_id=="startup_language"){
	  	html+='<ons-list-item modifier="longdivider full_list" tappable onclick="setStartupLanguage('+ "'" + key + "'"  +')">';
	  } else {
	    html+='<ons-list-item modifier="longdivider full_list" tappable onclick="setLanguage('+ "'" + key + "'"  +')">';
	  }
	      html+='<div class="left">';
	        html+='<ons-icon icon="md-check" class="lightgray list-item__icon  '+is_selected+' "></ons-icon>';
	      html+='</div>';
	      html+='<div class="center">';
	        html+= val;
	      html+='</div>';
	  html+='</ons-list-item>';
	  
	  
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	    
	});	
};

socialLoginButton = function(element){
	
	var list = document.getElementById( element );
	var html='';
	
	if(settings = AppSettings()){
		social_button_enabled = 0;
		if(settings.singleapp_enabled_fblogin==1){
			social_button_enabled++;
		}			
		if(settings.singleapp_enabled_google==1){
			social_button_enabled++;
		}			
		
		if(social_button_enabled>=1){
		    html+='<ons-list-item modifier="nodivider">';
			html+='<p class="small make_center full_width">'+ t('or sign in with') +'</p>';
			html+='</ons-list-item>';
			var newItem = ons.createElement(html);
	        list.appendChild(newItem);
	        html='';
		}
						
		if(social_button_enabled>1){			
													        
	        html+='<ons-list-item modifier="nodivider">';
			  html+='<ons-row>';
			  
			    if(settings.singleapp_enabled_fblogin==1){
			    html+='<ons-col vertical-align="center"  > ';		  
			  	  html+='<ons-button modifier="large blue_button no_shadow" class="full_width" onclick="fbInit()" >';
               		 html+='<img class="stic-social-icon" src="lib/icons/facebook.svg" onerror="this.src=\'facebook.png\'">'; 			  
		             html+='<span class="trn">'+t("Facebook")+'</span>';
		           html+='</ons-button>'; 
			    html+='</ons-col>  ';
			    }
			    
			    html+='<ons-col vertical-align="center" width="10px"  >';    
			    html+='</ons-col>  ';
			    
			    if(settings.singleapp_enabled_google==1){
			    html+='<ons-col vertical-align="center"  > ';   
			  	  html+='<ons-button modifier="large blue_button no_shadow" class="full_width" onclick="LoginGoogle()" >';
               		 html+='<img class="stic-social-icon" src="lib/icons/google.svg" onerror="this.src=\'google.png\'">'; 			  
		             html+='<span class="trn">'+t("Google")+'</span>';
		           html+='</ons-button>'; 
			    html+='</ons-col>';
			    }
			    
			   html+='</ons-row>';
			html+='</ons-list-item>';
									
			var newItem = ons.createElement(html);
	        list.appendChild(newItem);
	        html='';
		} else if (social_button_enabled==1){
			
			if(settings.singleapp_enabled_fblogin==1){
				html+='<ons-list-item modifier="nodivider">';			  
				  	  html+='<ons-button modifier="large blue_button no_shadow" class="full_width" onclick="fbInit()" >';
                   		 html+='<img class="stic-social-icon" src="lib/icons/facebook.svg" onerror="this.src=\'facebook.png\'">';
			             html+='<span class="trn">'+t("Facebook")+'</span>';
			           html+='</ons-button>'; 			  
				html+='</ons-list-item>';
			}
			
			if(settings.singleapp_enabled_google==1){
				html+='<ons-list-item modifier="nodivider">';			  
				  	  html+='<ons-button modifier="large blue_button no_shadow" class="full_width" onclick="LoginGoogle()" >';
                   		 html+='<img class="stic-social-icon" src="lib/icons/google.svg" onerror="this.src=\'google.png\'">';
			             html+='<span class="trn">'+t("Google")+'</span>';
			           html+='</ons-button>'; 			  
				html+='</ons-list-item>';
			}
			
			var newItem = ons.createElement(html);
	        list.appendChild(newItem);
	        html='';
			
		}
	}
};

setGetRecentLocation = function(element, data){
	if (data.length<=0){
		return;
	}	
	var list = document.getElementById( element );
	var html='';
	
	$.each( data  , function( key, val ) {
		
		params = val.latitude+"|";
		params+= val.longitude+"|";
		params+= val.search_address+"|";
		params+= val.street+"|";
		params+= val.city+"|";
		params+= val.state+"|";
		params+= val.zipcode+"|";
		params+= val.country+"|";
		params+= val.location_name+"|";
		
		if(isLocation()){
			params+= val.state_id+"|";
			params+= val.city_id+"|";
			params+= val.area_id+"|";
			params+= val.country_id;
		}
		
		if(isLocation()){
		   html+='<ons-list-item tappable onclick="setRecentSearchLocation('+ clickFormat(params) +');"  >';
		} else {
		   html+='<ons-list-item tappable onclick="setRecentSearch('+ clickFormat(params) +');"  >';
		}
		  html+='<div class="left min34">';
		    html+='<ons-icon icon="redo" class="list-item__icon"></ons-icon>';
		  html+='</div>';
		  html+='<div class="center">';
		      html+='<span class="list-item__title">'+ val.search_address +'</span>';
		      html+='<span class="list-item__subtitle">'+ val.date_added +'</span>';
		  html+='</div>';
		html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);
	    html='';
	});	
};

setgetMerchantInfo = function(data){

    setStorage("merchant_bg", data.background_image);

	info ='<div class="relative">';
    	info+='<div class="cart_header" style="background-image:url('+data.background_image+')"></div>';
    	info+='<div class="stic-info-logo" style="background-image:url('+data.logo+')"></div>';
	info+='</div>';

	info+='<div class="wrap">';
		info+='<h3 class="stic-info-title">'+data.merchant_name+'</h3>';
	    
	    info+='<div class="info_rating_wrap" onclick="showPage(\'reviews.html\')">';
	    info+='<div class="rating_wrap">';
		      info+='<div width="95px"><div class="raty-stars" data-score="'+ data.ratings.ratings +'"></div></div>';
		      info+='<div class="stic-rating-score">('+ data.ratings.ratings +')</div>';
		      info+='<div class="stic-rating-count">'+ data.rating_text +'</div>';
		info+='</div>';
		info+='</div>';
		
	    info+= '<p class="stic-info-cuisine">'+data.cuisine+'</p>';
	info+='</div>';

    // info+= '<p class="small">'+data.rating_text+'</p>';

    info+= '<div class="bottom_gap2"></div>';

    $(".info_wrap").html( info );
    
     html='';
   if($.isArray( data.opening_hours )) {	        	   	  
   	  html+='<ons-list-title modifier="list_title_grey">' + t('Opening hours') +'</ons-list-title>';
   	  html+='<ons-list modifier="list_menu" class="stic-min-list">';
   	  $.each( data.opening_hours  , function( hour_key, hour_val ) {
   	  	  html+='<ons-list-item >';
   	  	    html+='<div class="center">'+ hour_val.day +'</div>';
   	  	    html+='<div class="right">'+ hour_val.hours +'</div>';	        	   	  	    
   	  	  html+='</ons-list-item>';
   	  });
   	  html+='</ons-list>';
   }
   
   if (!empty(data.payment_list)){
   	   html+='<ons-list-title modifier="list_title_grey">' + t('Payment methods') + '</ons-list-title>';
   	   html+='<ons-list modifier="list_menu" class="stic-min-list"">';
   	   $.each( data.payment_list  , function( pay_key, pay_val ) {   	   	   
   	   	   html+='<ons-list-item >';
   	   	   html+='<div class="left"><ons-icon icon="md-card" size="25px"></ons-icon></div>';	
   	  	    html+='<div class="center">'+ pay_val +'</div>';	        	   	  	    
   	  	  html+='</ons-list-item>';
   	   });
   	   html+='</ons-list>';
   }
   
   html+='<ons-list-title modifier="list_title_grey">' + t('Address') + '</ons-list-title>';
   
   html+='<div class="wrap">';
	   html+='<p class="stic-small-text">'+data.address+'</p>';	
	   if ( !empty(data.information) ){
	   	html+='<b><p class="stic-small-text mt20">' + data.information +'</p></b>';
	   }
   html+='</div>';

   html+='<div class="about_map mt20" id="about_map" onclick="showPage(\'map.html\')"></div>';
   
   $(".info_wrap2").html( html );	  
   
   setTimeout(function() {			   				  
   	  fillMapAddress('#about_map', false, data.latitude, data.lontitude );
   }, 100); 
   
};

setStartUpBanner = function(element){
	var list = document.getElementById( element );
	var html=''; pager='';
	x =0;
	$(".startup_banner_index").val(0);
	if(settings = AppSettings()){		
		$.each( settings.startup_banner_images, function( key, val ) {
			
			html+='<ons-carousel-item>';

				html+='<div class="stic-walkthrough-img" style="background-image: url('+ "'" + val + "'" +')" ></div>';

				if (key == 0 || key == "0") {
					html+='<div class="stic-walkthrough is_rtl">';
						html +='<h3 class="trn">'+ t('Find restaurants nearby') +'</h3>'; 
						html +='<p class="small trn">'+ t('Order delicious food from your favourite restaurants with a few clicks')+'</p>'; 
					html+='</div>';
		   		}

		   		if (key == 1 || key == "1") {
					html+='<div class="stic-walkthrough is_rtl">';
						html +='<h3 class="trn">'+ t('Secure and private') +'</h3>'; 
						html +='<p class="small trn">'+ t('Paying trought the app is easy, fast and safe. Here your info are private') +'</p>'; 
					html+='</div>';
		   		}

		   		if (key == 2 || key == "2") {
					html+='<div class="stic-walkthrough is_rtl">';
						html+='<div>';
							html +='<h3 class="trn">'+ t('We take it to you') +'</h3>'; 
							html +='<p class="small trn">'+ t('Get the order at home. You don\'t even have to get up off the couch') +'</p>'; 
						html+='</div>';

						html+='<div class="stic-start">';
							html+='<ons-button modifier="large normal_large to_orange" onclick="showPage(\'signup.html\')">';
								html+='<span class="trn">'+ t('Sign up') +'</span>';
							html+='</ons-button>';
			
							html+='<ons-button modifier="large normal_large to_neutral" onclick="showPage(\'login.html\')" >';
								html+='<span class="trn">'+ t('Sign in') +'</span>';
							html+='</ons-button>';	
						html+='</div>';
					html+='</div>';

					html+='<ons-button class="stic-skip" onclick="resetToPage(\'page_home.html\')" >';
						html+='<span class="trn">'+ t('Skip') +'</span>';
					html+='</ons-button>';
		   		}

            html+='</ons-carousel-item>';

			var newItem = ons.createElement(html);
	        list.appendChild(newItem);
	        html='';
	        
	        selected='';
	        if(x<=0){
	        	selected="active";
	        }
	        
	        pager+='<li class="c'+x+' '+selected+'"><div class="circle"></div></li>';
	        x++;
		});
		
		$(".startup_banner_paging .dots").html(pager);
		
	    setTimeout(function(){ 	    
	    	runStartUpBanner(false);
	    }, 1);
		
	}
};

fillFavorite = function(element, is_added){
	html='';
	if(is_added){
	   html+='<ons-toolbar-button onclick="RemoveFavorite()" >';
          html+='<ons-icon  icon="ion-android-favorite"  size="22px" class="orange_text" ></ons-icon>';
       html+='</ons-toolbar-button>';
	} else {
		html+='<ons-toolbar-button onclick="AddFavorite()" >';
          html+='<ons-icon icon="ion-android-favorite-outline"  size="22px" class="orange_text"></ons-icon>';
       html+='</ons-toolbar-button>';
	}	
	$(element).html(html);
};


var setItemFavoritesList = function(element, data){	
	
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	var html='';
	$.each( data, function( key, val ) {
		
		class_name='';
		if(val.as_default==2){
			class_name='color_green';
		}
		
		params = val.id+"|";
		params+=val.item_id+"|";
		params+=val.category_id;				
		
		 html+='<ons-list-item modifier="list_style_banner" ';
		 html+='tappable onclick="sheetItemFavoritesList('+ clickFormat(params)  +')"  >';
           html+='<div class="inner raty-medium">';
              html+='<ons-row>';
                  html+='<ons-col width="60px">';                    
                    
                    html +='<div class="is-loading xxsmall-loader">'; 
					html +='<div class="spinner"></div>';		
					html+='<img class="thumbnail" src="'+ val.photo +'">';
					html +='</div>'; 
                    
                  html+='</ons-col>';

                  html+='<ons-col vertical-align="center">';
                     html+='<span class="list-item__title">'+ val.item_name +'</span>';
                     html+='<span class="list-item__subtitle">'+ val.date_added +'</span>';                     
                  html+='</ons-col>';                  
              html+='</ons-row>';
              
                                          
           html+='</div>';
        html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';	    
	});
};	

setCustomePages = function(page_position, element){
	var list = document.getElementById(element);
	html=''; lang = getLangCode();		
	if(settings = AppSettings()){		
		if(settings.custom_pages.length>=1){	
		   custom_pages_position = settings.custom_pages_position;
		   if(page_position==custom_pages_position){	   	  
		   	  $.each( settings.custom_pages, function( key, val ) {
		   	  	  if(!empty(val.icon)){
			        icon = val.icon;
			      } else {
			        icon = "ion-ios-circle-outline";
			      }
			      
			      page_title = val.title;
			      if(!empty(val["title_"+lang])){
			      	page_title = val["title_"+lang];
			      }			      
			      if(!empty(element)){			      	
			      	 html+='<ons-list-item onclick="showCustomPage('+ val.page_id +');"  >';
                       html+='<span class="trn">'+ page_title +'</span>';
                     html+='</ons-list-item>';
                     
			      	 var newItem = ons.createElement(html);
	                 list.appendChild(newItem);	    
	                 html='';	    
			      } else {
			      	  html+='<ons-list-item modifier="chevron"  class="" tappable onclick="showCustomPage('+ val.page_id +');"  >';
				        html+='<div class="left"><ons-icon icon="'+ icon +'" size="22px"></ons-icon></div>';
				        html+='<div class="center trn">'+ page_title +'</div>';
				      html+='</ons-list-item>';		
			      }
			      
		   	  });		   	  
		   }
		}
	}	
	return html;
};

setCustomeFields = function(element, data){
	settings = AppSettings();
	var list = document.getElementById(element);
	html=''; 	
	
	if(!empty(data.custom_field1)){
		
		html+='<ons-list-item>';
	     html+='<ons-input name="custom_field1" required class="full_width custom_field1"';
	     html+='modifier="underbar" placeholder="'+ t(data.custom_field1) +'" float></ons-input>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';
	}
	if(!empty(data.custom_field2)){
				
	    html+='<ons-list-item>';
	     html+='<ons-input name="custom_field2" required class="full_width custom_field2"';
	     html+='modifier="underbar" placeholder="'+ t(data.custom_field2) +'" float></ons-input>';
	    html+='</ons-list-item>';
	    
		var newItem = ons.createElement(html);
	    list.appendChild(newItem);	    
	    html='';
	}
	
	html+='<ons-list-item modifier="nodivider">';
	  html+='<p class="small">'+ t("By creating an account, you agree to receive sms from vendor.") +'</p>';
	html+='</ons-list-item>';
	
	
	var newItem = ons.createElement(html);
    list.appendChild(newItem);	    
    html='';
    
	
    if(settings.terms_customer=="yes"){ 
	html+='<ons-list-item>';
	html+='<label class="left">';
	html+='<ons-checkbox name="check_terms_condition" input-id="check_terms_condition" class="check_terms_condition" value="1"></ons-checkbox>';
	html+='</label>';
	html+='<label for="check_terms_condition" class="center small ">';
	html+='<span class="trn">'+ t("I Agree To The") +'</span>&nbsp;<a href="javascript:;" class="small" onclick="openTerms()">';
	html+='<span class="trn">'+ t("terms_conditions") +'</span>';
	html+='</a>';
	html+='</label>';
	html+='</ons-list-item>';
    
	var newItem = ons.createElement(html);
    list.appendChild(newItem);	    
    html='';
    }
};

setStateList = function(element, data){
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	var html='';
	$.each( data, function( key, val ) {
		
		params =val.state_id+"|";
		params+=val.state_raw+"|";
		params+=val.country_id+"|";
		params+=val.country_name;
		
		html+='<ons-list-item tappable onclick="setStateListVal('+ clickFormat(params) +')">';
       	html+='<div class="left min34">';
		    html+='<ons-col width="34px" vertical-align="center"  >';
	    		html+='<img class="stic-icon-redo" src="lib/icons/pin.svg" onerror="this.src=\'pin.png\'">';
		    html+='</ons-col>';
       	html+='</div>';
	    html+='<div class="center">';
	      html+='<span class="list-item__title">'+ val.state+'</span>';
	      html+='<span class="list-item__subtitle">'+ val.country_name +'</span>';
	    html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
        list.appendChild(newItem);	    
        html='';
    
	});
};

setCityList = function(element, data){
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	var html='';
	$.each( data, function( key, val ) {
		
		params =val.city_id+"|";
		params+=val.city_name_raw;	
		
		html+='<ons-list-item tappable onclick="setCityListVal('+ clickFormat(params) +')">';
       	html+='<div class="left min34">';
		    html+='<ons-col width="34px" vertical-align="center"  >';
	    		html+='<img class="stic-icon-redo" src="lib/icons/pin.svg" onerror="this.src=\'pin.png\'">';
		    html+='</ons-col>';
       	html+='</div>';
	    html+='<div class="center">';
	      html+='<span class="list-item__title">'+ val.city_name+'</span>';
	      html+='<span class="list-item__subtitle">'+ val.state_name +'</span>';
	    html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
        list.appendChild(newItem);	    
        html='';
    
	});
};


setAreaList = function(element, data){
	if (data.length<=0){
		return;
	}	
	
	var list = document.getElementById(element);
	var html='';
	$.each( data, function( key, val ) {
		
		params =val.area_id+"|";
		params+=val.city_name+"|";
		params+=val.area_name_raw;	
		
		html+='<ons-list-item tappable onclick="setAreaListVal('+ clickFormat(params) +')">';
       	html+='<div class="left min34">';
		    html+='<ons-col width="34px" vertical-align="center"  >';
	    		html+='<img class="stic-icon-redo" src="lib/icons/pin.svg" onerror="this.src=\'pin.png\'">';
		    html+='</ons-col>';
       	html+='</div>';
	    html+='<div class="center">';
	      html+='<span class="list-item__title">'+ val.area_name+'</span>';
	      html+='<span class="list-item__subtitle">'+ val.city_name +'</span>';
	    html+='</div>';
	    html+='</ons-list-item>';
		
		var newItem = ons.createElement(html);
        list.appendChild(newItem);	    
        html='';
    
	});
};

setContactUsFields = function(element){
	if (data.length<=0){
		return;
	}
	var list = document.getElementById(element);
	html=''; field_type = ''; on_click='';
	if(settings = AppSettings()){	          
	   if(settings.contact_us.contact_field){
	   	  $.each( settings.contact_us.contact_field, function( key, val ) {
	   	  	key = val;	   	  	
	   	  	on_click='';
	   	  	field_type='';
	   	  	
	   	  	switch(key){

	   	  		case "email":
	   	  		  field_type = 'email';
	   	  		  icon = 'mail';
	   	  		break;

	   	  		case "phone":   	  		
	   	  		   key='contact_phone';
	   	  		   on_click='onfocus="showPage(\'enter_phone.html\')" onclick="showPage(\'enter_phone.html\')"';
	   	  		   icon = 'mobile';
	   	  		break;

	   	  		case "country":
	   	  		   icon = 'mobile';
	   	  		break;

	   	  		case "message":
	   	  			icon = 'edit';
	   	  		break;
	   	  		
	   	  		default:
	   	  		  field_type = 'text';
	   	  		  icon = 'user';
	   	  		break;
	   	  	}
	   	  	
	   	  	html+='<ons-list-item>';
	        html+='<ons-input type="'+ field_type +'" name="'+key+'" id="'+key+'" class="'+key+' full_width capitalize" ' + on_click ;
	        html+=' required modifier="material" placeholder="'+ t(val) +'" float></ons-input>';
	        html+='<img class="stic-icon" src="lib/icons/'+icon+'.svg" onerror="this.src='+icon+'.png">';
	        html+='</ons-list-item>';
			
			var newItem = ons.createElement(html);
	        list.appendChild(newItem);	    
	        html='';  
	   	  	
	   	  });
	   }
	}
};


setDeviceInformation = function(element){
	if (data.length<=0){
		return;
	}
	var list = document.getElementById(element);
	html='';
	
	html+='<ons-list-item tappable modifier="list_style_left longdivider" >';
      html+='<div class="center">';
        html+='<span class="list-item__title">'+ t("Device UUID") +'</span>';
        html+='<span class="list-item__subtitle">'+ device_uiid +'</span>';
      html+='</div>';
    html+='</ons-list-item>';
    
    var newItem = ons.createElement(html);
    list.appendChild(newItem);	    
    html='';  
    
    html+='<ons-list-item tappable modifier="list_style_left longdivider" >';
      html+='<div class="center">';
        html+='<span class="list-item__title">'+ t("Device ID") +'</span>';
        html+='<span class="list-item__subtitle">'+ device_id +'</span>';
      html+='</div>';
    html+='</ons-list-item>';
	
	var newItem = ons.createElement(html);
    list.appendChild(newItem);	    
    html='';  
	
};
