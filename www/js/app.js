/* HATAKE THEME for K-Restauarnt Mobile App 2.0 UPDATED*/

var ajax_request;
var ajax_request2;
var ajax_settings;
var ajax_url = krms_config.ApiUrl
var dialog_title = krms_config.DialogDefaultTitle
var timer;
var timer2;
var timer3;

var catStyle = stic_config.CategoryLayout
var itemStyle = stic_config.ItemLayout
var seachStyle = stic_config.EnableSeach
var logoStyle = stic_config.EnableLogoToolbar

var page_category = 1;
var paginate_count = 0;

var cart = [];
var cart_count = 0;

var onsenNavigator;
var toast_handler;

var exit_cout = 0;

var device_id = 'XXX_1234567890_1230187';
var device_platform = 'android';

var push_handle;
var map;
var marker;
var map_bounds = [];

var translator;
var dict = {};

var icon_loader = '<ons-progress-circular indeterminate></ons-progress-circular>';
var trackmap_interval;

jQuery.fn.exists = function () {
   return this.length > 0;
}

var dump = function (data) {
   console.debug(data);
}

var empty = function (data) {
   //if (typeof data === "undefined" || data==null || data=="" ) { 
   if (typeof data === "undefined" || data == null || data == "" || data == "null" || data == "undefined") {
      return true;
   }
   return false;
}

function createMask(string){
  console.log(string)
	return string.replace(/(\d{2})(\d{1})(\d{4})(\d{1})/,"($1) $2 $3-$4");
}

function destroyMask(string){
  console.log(string)
	return string.replace(/(\.|\/|\-|\(|\)|\ )/g,"").substring(0, 11);
}

function formatarCampo(campoTexto) {
	var dadosDigitados = campoTexto.value;
    if (campoTexto.value.length <= 7) {
        campoTexto.value = mascaraPlaca(campoTexto.value);
    } else if (campoTexto.value.length <= 11) {
        campoTexto.value = mascaraCpf(campoTexto.value);
		validaCPF(dadosDigitados);
    } else {
        campoTexto.value = mascaraCnpj(campoTexto.value);
		validaCNPJ(dadosDigitados);
    }
}
function formatarTelefone(campoTexto) {
    if (campoTexto.value.length <= 10) {
        campoTexto.value = mascaraTelefone(campoTexto.value);
    } else {
        campoTexto.value = mascaraCelular(campoTexto.value);
    }
}
function formatarUsuario(campoTexto) {
        campoTexto.value = removeAcento(campoTexto.value);
}
function retirarFormatacao(campoTexto) {
    campoTexto.value = campoTexto.value.replace(/(\.|\/|\-|\(|\)|\ )/g,"");
}
function mascaraCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}
function mascaraCnpj(valor) {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}
function mascaraTelefone(valor) {
    return valor.replace(/(\d{2})(\d{4})(\d{4})/g,"(\$1\) \$2\-\$3");
}
function mascaraCelular(valor) {
    return valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g,"(\$1\) \$2\ \$3\-\$4");
}
function mascaraPlaca(valor) {
	var placa = valor.replace(/([A-Za-z]{3})(\d{4})/g,"$1-$2");
	return placa.toUpperCase();
}
function removeAcento(text) {       
    var usuario = text.toLowerCase();                                                         
    return usuario.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                
}
function validaCPF(campoTexto){
				if(valida_cpf(campoTexto)){
	//toastMsg(getTrans("Seu CPF está correto!","seu_cpf_esta_correto"));
				} else {
	toastMsg(getTrans("Este CPF é Inválido!","este_cpf_e_invalido"));
					$(".cpf").val("");
				}
			}
function valida_cpf(cpf){
				  var numeros, digitos, soma, i, resultado, digitos_iguais;
				  digitos_iguais = 1;
				  if (cpf.length < 11)
						return false;
				  for (i = 0; i < cpf.length - 1; i++)
						if (cpf.charAt(i) != cpf.charAt(i + 1))
							  {
							  digitos_iguais = 0;
							  break;
							  }
				  if (!digitos_iguais)
						{
						numeros = cpf.substring(0,9);
						digitos = cpf.substring(9);
						soma = 0;
						for (i = 10; i > 1; i--)
							  soma += numeros.charAt(10 - i) * i;
						resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
						if (resultado != digitos.charAt(0))
							  return false;
						numeros = cpf.substring(0,10);
						soma = 0;
						for (i = 11; i > 1; i--)
							  soma += numeros.charAt(11 - i) * i;
						resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
						if (resultado != digitos.charAt(1))
							  return false;
						return true;
						}
				  else
						return false;
}

function validaCNPJ(campoTexto){
				if(valida_cnpj(campoTexto)){
	//toastMsg(getTrans("Seu CNPJ está correto!","seu_cnpj_esta_correto"));
				} else {
	toastMsg(getTrans("Este CNPJ é Inválido!","este_cnpj_e_invalido"));
					$(".cnpj").val("");
				}
			}
function valida_cnpj(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

$(document).on("keyup", "input[name='mobile_number']", function() {
		$("input[name='mobile_number_unmask']").val(destroyMask(this.value));
    this.value = createMask($("input[name='mobile_number_unmask']").val());
});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

   try {

      navigator.splashscreen.hide();

      device_platform = device.platform;


      push_handle = PushNotification.init({
         android: {
            sound: "true",
            clearBadge: "true"
         },
         browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         },
         ios: {
            alert: "true",
            badge: "true",
            sound: "true",
            clearBadge: "true"
         },
         windows: {}
      });

      push_handle.on('registration', function (data) {
         device_id = data.registrationId;
      });

      push_handle.on('notification', function (data) {
         //alert(JSON.stringify(data)); 

         if (data.additionalData.foreground) {
            playSound();
         }

         handleNotification(data);

      });

      PushNotification.createChannel(function () {
         //alert('create channel succces');
      }, function () {
         //alert('create channel failed');
      }, {
         id: 'kmrs_singleapp',
         description: 'singleapp app channel',
         importance: 5,
         vibration: true,
         sound: 'beep'
      });

      push_handle.on('error', function (e) {
         alert(e.message);
      });

   } catch (err) {
      alert(err.message);
   }

}

document.addEventListener("offline", function () {
   dialogNoNet();
}, false);


document.addEventListener("online", function () {
   var dialog = document.getElementById('dialog_no_net');
   dialog.hide();
}, false);


ons.platform.select('android');
//ons.platform.select('ios');

ons.ready(function () {

   if (ons.platform.isIPhoneX()) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      $('head').append('<link rel="stylesheet" href="lib/onsen/css/ios.css?ver=1.0" type="text/css" />');
   }
	
   //dialogNoNet();
   //dialogInvalidKey();
   //removeStorage("token");

   //localStorage.clear();
   removeStorage("delivery_time_set");
   removeStorage("delivery_date_set");
   removeStorage("delivery_date_set_pretty");
   removeStorage("push_unregister");
   removeStorage("dialog_error_title");
   removeStorage("dialog_error_msg");
   //removeStorage("customer_number");

   onsenNavigator = document.getElementById('onsenNavigator');
   dump('onsen ready');

   ons.setDefaultDeviceBackButtonListener(function (event) {
      //dump(onsenNavigator.topPage);      
      exit_cout++;
      if (exit_cout <= 1) {
/** Atualização Master Hub (Correção de Tradução) **/
         showToast(t("Press once again to exit!"));
/** Fim da atualização **/
         setTimeout(function () {
            exit_cout = 0;
         }, 3000);
      } else {
         if (navigator.app) {
            navigator.app.exitApp();
         } else if (navigator.device) {
            navigator.device.exitApp();
         } else {
            window.close();
         }
      }
   });

});


function setStorage(key, value) {
   localStorage.setItem(key, value);
}

function getStorage(key) {
   return localStorage.getItem(key);
}

function removeStorage(key) {
   localStorage.removeItem(key);
}


/*INIT*/
document.addEventListener('init', function (event) {
   dump('init page');
   var page = event.target;
   var page_id = event.target.id;
   dump(page_id);

   translatePage();

   switch (page_id) {

      case "map_select":
         checkLocation(2);
         break;

      case "forgot_pass":
         placeholder(".user_email", 'Mobile number or email');
         break;

      case "notification":
         $(".clear_notification").hide();
         paginate_count = 1;
         paginate_result = 0;
         ajaxCall('loadNotification', '');
         break;

      case "page_settings":
         getAppSettings();
         break;

      case "page_home":
         /*var tab='';
            tab+='<ons-tabbar id="tabbar_bottom"  position="bottom">';
          tab+='<ons-tab page="splitter.html" label="'+ translator.get("Food") +'" icon="md-local-dining" ></ons-tab>';
          tab+='<ons-tab page="reviews.html" label="'+ translator.get("Reviews") +'" icon="md-star" ></ons-tab> ';
          tab+='<ons-tab page="orders.html" label="'+ translator.get("Orders") +'" icon="md-reorder" ></ons-tab>';
          tab+='<ons-tab page="profile_menu.html" label="'+ translator.get("You") +'" icon="fa-user" ></ons-tab>';
          tab+='<ons-tab label="'+ translator.get("Cart") +'" icon="md-shopping-cart" onclick="showCart()" class="tabb_cart" badge="" ></ons-tab>';
        tab+='</ons-tabbar>';      
       $(".home_tabbar").html(tab); */
         break;

      case "page_category":
         removeStorage('infinite_category');
         ajaxCall('loadCategory', '');
         ajaxCall('loadPromo', '');
         FillBanner();
/** Atualização Master Hub (Correção de Tradução) **/
		 $("#search").attr("placeholder", t("What are you looking for?"));  
/** Fim da atualização **/
         if (logoStyle == '1') {
            $(".stic-rest-logo").addClass("block_important");
         }

         getProfileSilent();
         break;

      case "page_item":
         paginate_count = 0;
         page.querySelector('ons-toolbar .cat-name').innerHTML = page.data.cat_name;
/** Atualização Master Hub (Correção de Tradução) **/
		 $("#search").attr("placeholder", t("Search for item"));
		 $(".search-input").attr("placeholder", t("Search for item"));
/** Fim da atualização **/
         $(".search-input ").removeClass("search-input--material");

         ajaxCall('loadItemByCategory', "cat_id=" + page.data.cat_id);
         getCartCount();
         break;

      case "page_item_details":
         if (!empty(page.data.row)) {
            params = "item_id=" + page.data.item_id + "&cat_id=" + page.data.cat_id + "&row=" + page.data.row;
         } else {
            params = "item_id=" + page.data.item_id + "&cat_id=" + page.data.cat_id;
         }
         ajaxCall('loadItemDetails', params);
		   clearCartSilent();
		   getCartCount();
         break;

      case "page_cart":
         $(".min_delivery_order").val('');
         /*if(!empty(page.data.min_delivery_order)){                         
            $(".min_delivery_order").val( page.data.min_delivery_order );
         }*/
         loadCart();
         break;


      case "payment_option":
         $(".pay_now_label").html(t("PAY") + " " + $(".cart_total_value").val());
         ajaxCall('loadPaymentList', "transaction_type=" + $(".transaction_type").val());
         break;


      case "cod_forms":
      case "dinein_forms":
         $(".pay_now_label").html(t("PAY") + " " + $(".cart_total_value").val());

         if (settings = AppSettings()) {
            dump(settings);
            if (settings.cod_change_required == "2") {
               $(".order_change").attr("required", 'required');
            }
         }

         customer_number = getStorage("customer_number");
         if (!empty(customer_number)) {
            $(".contact_phone").val(customer_number);
         }


         break;

      case "signup":
         document.getElementById("first_name_field")._input.focus();

         placeholder("#first_name_field", 'First name');
         placeholder(".last_name", 'Last name');
         placeholder(".contact_phone", 'Mobile number');
         placeholder(".email_address", 'Email address');
         placeholder(".password", 'Password');
         placeholder(".cpassword", 'Confirm Password');

         if (settings = AppSettings()) {
            dump(settings);
            if (settings.terms_customer == "yes") {
               $(".terms_condition_wrap").show();
            }
         }

         customer_number = getStorage("customer_number");
         if (!empty(customer_number)) {
            $(".contact_phone").val(customer_number);
         }

         break;

      case "address_form":
         if (isLogin()) {
            $(".show_if_login").show();
         } else {
            $(".show_if_login").hide();
         }
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
		   location_area = $("#address_form .area_name").val();
			if (!empty(location_area)) {
				$("#address_form .area_name").val(location_area);
			}
		   location_city = $("#address_form .city").val();
			if (!empty(location_city)) {
				$("#address_form .city").val(location_city);
			}
		   location_state = $("#address_form .state").val();
			if (!empty(location_state)) {
				$("#address_form .state").val(location_state);
			}
/** Fim da atualização **/
         $(".street").attr("placeholder", t("Street"));
/** Atualização Master Hub (Número e Bairro no Endereço) **/
         $(".numero").attr("placeholder", t("Numero"));
         $(".area_name").attr("placeholder", t("Area Name"));
/** Fim da atualização **/
         $(".city").attr("placeholder", t("City"));
         $(".state").attr("placeholder", t("State"));
         $(".zipcode").attr("placeholder", t("Zip Code"));
         $(".location_name").attr("placeholder", t("Floor/unit/Room #"));
         $(".contact_phone").attr("placeholder", t("Contact number"));
         $(".delivery_instruction").attr("placeholder", t("Delivery instructions"));

         ajaxCall('GetAddressFromCart', '');
         break;

      case "address_coleta_form":
         if (isLogin()) {
            $(".show_if_login").show();
         } else {
            $(".show_if_login").hide();
         }
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
		   location_area = $("#address_coleta_form .area_name").val();
			if (!empty(location_area)) {
				$("#address_coleta_form .area_name").val(location_area);
			}
		   location_city = $("#address_coleta_form .city").val();
			if (!empty(location_city)) {
				$("#address_coleta_form .city").val(location_city);
			}
		   location_state = $("#address_coleta_form .state").val();
			if (!empty(location_state)) {
				$("#address_coleta_form .state").val(location_state);
			}
/** Fim da atualização **/
         $(".street").attr("placeholder", t("Street"));
/** Atualização Master Hub (Número e Bairro no Endereço) **/
         $(".numero").attr("placeholder", t("Numero"));
         $(".area_name").attr("placeholder", t("Area Name"));
/** Fim da atualização **/
         $(".city").attr("placeholder", t("City"));
         $(".state").attr("placeholder", t("State"));
         $(".zipcode").attr("placeholder", t("Zip Code"));
         $(".location_name").attr("placeholder", t("Floor/unit/Room #"));
         $(".contact_phone").attr("placeholder", t("Contact number"));
         $(".delivery_instruction").attr("placeholder", t("Delivery instructions"));

         ajaxCall('GetAddressFromCart', '');
         break;
		   
      case "address_1_coleta_form":
         if (isLogin()) {
            $(".show_if_login").show();
         } else {
            $(".show_if_login").hide();
         }
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
		   location_area = $("#address_1_coleta_form .area_name").val();
			if (!empty(location_area)) {
				$("#address_1_coleta_form .area_name").val(location_area);
			}
		   location_city = $("#address_1_coleta_form .city").val();
			if (!empty(location_city)) {
				$("#address_1_coleta_form .city").val(location_city);
			}
		   location_state = $("#address_1_coleta_form .state").val();
			if (!empty(location_state)) {
				$("#address_1_coleta_form .state").val(location_state);
			}
/** Fim da atualização **/
         $(".street").attr("placeholder", t("Street"));
/** Atualização Master Hub (Número e Bairro no Endereço) **/
         $(".numero").attr("placeholder", t("Numero"));
         $(".area_name").attr("placeholder", t("Area Name"));
/** Fim da atualização **/
         $(".city").attr("placeholder", t("City"));
         $(".state").attr("placeholder", t("State"));
         $(".zipcode").attr("placeholder", t("Zip Code"));
         $(".location_name").attr("placeholder", t("Floor/unit/Room #"));
         $(".contact_phone").attr("placeholder", t("Contact number"));
         $(".delivery_instruction").attr("placeholder", t("Delivery instructions"));

         ajaxCall('GetAddressFromCart', '');
         break;
		   
      case "address_2_coleta_form":
         if (isLogin()) {
            $(".show_if_login").show();
         } else {
            $(".show_if_login").hide();
         }
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
		   location_area = $("#address_2_coleta_form .area_name").val();
			if (!empty(location_area)) {
				$("#address_2_coleta_form .area_name").val(location_area);
			}
		   location_city = $("#address_2_coleta_form .city").val();
			if (!empty(location_city)) {
				$("#address_2_coleta_form .city").val(location_city);
			}
		   location_state = $("#address_2_coleta_form .state").val();
			if (!empty(location_state)) {
				$("#address_2_coleta_form .state").val(location_state);
			}
/** Fim da atualização **/
         $(".street").attr("placeholder", t("Street"));
/** Atualização Master Hub (Número e Bairro no Endereço) **/
         $(".numero").attr("placeholder", t("Numero"));
         $(".area_name").attr("placeholder", t("Area Name"));
/** Fim da atualização **/
         $(".city").attr("placeholder", t("City"));
         $(".state").attr("placeholder", t("State"));
         $(".zipcode").attr("placeholder", t("Zip Code"));
         $(".location_name").attr("placeholder", t("Floor/unit/Room #"));
         $(".contact_phone").attr("placeholder", t("Contact number"));
         $(".delivery_instruction").attr("placeholder", t("Delivery instructions"));

         ajaxCall('GetAddressFromCart', '');
         break;
		   
      case "receipt":
         $(".order_place_label").html(page.data.message);
         var page = onsenNavigator.topPage;
         page.onDeviceBackButton = function (event) {
            backToHome(1);
         };
         break;

      case "customer_profile":
         placeholder(".email_address", 'Email address');
         placeholder(".first_name", 'First name');
         placeholder(".last_name", 'Last name');
         placeholder(".contact_phone", 'Mobile no.');


         $(".loading_wrap").hide();
         ajaxCall('getUserProfile', '');
         break;

      case "page_app-settings":

         try {
            $(".app_version").html(BuildInfo.version);
         } catch (err) {
            $(".app_version").html("v2.0");
         }

         $(".device_id").html(device_id);

         if (isLogin()) {
            $(".show_if_login").show();
            enabled_push = getStorage("enabled_push");
            if (enabled_push == 1) {
               $(".enabled_push").prop('checked', true);
            } else {
               $(".enabled_push").prop('checked', false);
            }
         } else {
            $(".show_if_login").hide();
         }

         if (settings = AppSettings()) {
            if (empty(settings.singleapp_terms_url)) {
               $(".menu_terms_condition").hide();
            }
            if (empty(settings.singleapp_privacy_url)) {
               $(".menu_privacy_policy").hide();
            }
         }

         ajaxCall("getPages", '');

         break;

      case "login":
/** Atualização Master Hub (Correção de Tradução) **/
		   translatePage();
         document.getElementById("username_field")._input.focus();
		 $("#username_field").attr("placeholder", t("Mobile number or email"));
		 $("#password_field").attr("placeholder", t("Password"));  
/** Fim da atualização **/

         $(".social_login_wrap").hide();
         $(".fb_wrap").hide();
         $(".google_wrap").hide();
         if (settings = AppSettings()) {
            if (settings.singleapp_enabled_fblogin == 1 || settings.singleapp_enabled_google == 1) {
               $(".social_login_wrap").show();
            }

            if (settings.singleapp_enabled_fblogin == 1) {
               $(".fb_wrap").show();
            }
            if (settings.singleapp_enabled_google == 1) {
               $(".google_wrap").show();
            }
         }

         break;

/** Atualização Master Hub (Correção de Tradução) **/
      case "change_password":
		   translatePage();
		 $("#current_password").attr("placeholder", t("Enter current password"));  
		 $("#password_field").attr("placeholder", t("Enter new password"));  
		 $("#confirm_password").attr("placeholder", t("Confirm new password"));  
         break;
/** Fim da atualização **/
      case "enter_phone":
         old_phone = $(".contact_phone").val();
         $(".mobile_number").attr("placeholder", t("Mobile no."));
         if (settings = AppSettings()) {
            if (!empty(settings.mobile_prefix)) {
               $(".prefix").val(settings.mobile_prefix);

               if (!empty(old_phone)) {
                  res = old_phone.replace(settings.mobile_prefix, "");
                  $(".mobile_number").val(res);
               }
            }
         }
         break;

      case "creditcard_list":
         removeStorage("next_step");
         ajaxCall2('getCreditCards', '');
         break;

      case "add_creditcards":

         placeholder(".card_name", 'Card name');
         placeholder(".credit_card_number", 'Credit card number');
         placeholder(".billing_address", 'Billing address');
         placeholder(".cvv", 'CVV');

         generateMonth();
         generateYear();
         var cc_id = page.data.id;
         if (!empty(cc_id)) {
            $(".cc_action").html(t('UPDATE'));
            ajaxCall('getCards', 'id=' + cc_id);
         } else {
            $(".cc_action").html(t("SAVE"));
         }

         break;

      case "addressbook_list":
         ajaxCall2('getAddressBookList', '');
         break;

      case "addressbook":
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
		   location_area = $("#addressbook .area_name").val();
			if (!empty(location_area)) {
				$("#addressbook .area_name").val(location_area);
			}
		   location_city = $("#addressbook .city").val();
			if (!empty(location_city)) {
				$("#addressbook .city").val(location_city);
			}
		   location_state = $("#addressbook .state").val();
			if (!empty(location_state)) {
				$("#addressbook .state").val(location_state);
			}
/** Fim da atualização **/

         placeholder(".street", 'Street');
/** Atualização Master Hub (Número e Bairro no Endereço) **/
         placeholder(".numero", 'Numero');
         placeholder(".area_name", 'Area Name');
/** Fim da atualização **/
         placeholder(".city", 'City');
         placeholder(".state", 'State');
         placeholder(".zipcode", 'Zip Code');
         placeholder(".delivery_instruction", 'Delivery instructions');
         placeholder(".location_name", 'Location name');
		 placeholder(".contact_phone", 'Contact number'); 

         var id = page.data.id;
         if (!empty(id)) {
            $(".addressbook_action").html(t("UPDATE"));
            ajaxCall('getAddressBook', 'id=' + id);
         } else {
            ajaxCall('getCountryList', '');
            $(".addressbook_action").html(t("SAVE"));
         }
         break;

      case "order_details":
         var id = page.data.id;
         ajaxCall('getOrderDetails', 'id=' + id);
         break;

      case "edit_review":
         ajaxCall('getReview', 'id=' + page.data.id);
         break;

      case "book":
         document.getElementById("number_guest")._input.focus();

         placeholder(".number_guest", 'Number of guest');
         placeholder(".date_booking", 'Date of booking');
         placeholder(".booking_time", 'Time');
         placeholder(".booking_name", 'Name');
         placeholder(".email", 'Email address');
         placeholder(".contact_phone", 'Contact number');
         placeholder(".booking_notes", 'Special instructions');

         ajaxCall('getUserInfo', '');
         break;

      case "booking_ty":
         $(".booking_message").html(page.data.message);
         var page = onsenNavigator.topPage;
         page.onDeviceBackButton = function (event) {
            backToHome(1);
         };
         break;

      case "info":
         ajaxCall('getMerchantInfo', '');
         break;

      case "photo":
         ajaxCall('getMerchantPhoto', '');
         break;

      case "promos":
         ajaxCall('loadPromo', '');
         break;

      case "booking_history":
         paginate_count = 1;
         paginate_result = 0;
         ajaxCall('loadBooking', '');
         break;

      case "address_form_select":
      case "address_coleta_form_select":
      case "address_1_coleta_form_select":
      case "address_2_coleta_form_select":
         ajaxCall('getAddressBookDropDown', '');

         $(".contact_phone").attr("placeholder", t("Contact number"));

         customer_number = getStorage("customer_number");
         if (!empty(customer_number)) {
            $(".contact_phone").val(customer_number);
         }

         break;

      case "paypal":
         ajaxCall('getPaypal', 'order_id=' + page.data.order_id);
         break;

      case "select_creditcards":
         $(".pay_now_label").html(t("PAY") + " " + $(".cart_total_value").val());
         ajaxCall('selectCreditCards', '');
         break;

      case "stripe":
         $(".order_id").val(page.data.order_id);
         $(".pay_now_label").html(t("PAY") + " " + $(".cart_total_value").val());
         ajaxCall('getStripe', '');
         break;

      case "select_payondelivery":
         $(".pay_now_label").html(t("PAY") + " " + $(".cart_total_value").val());
         ajaxCall('getPayondeliverycards', '');
         break;

      case "map":
         ajaxCall('mapInfo', '');
         break;

      case "braintree_form":
         dump(page.data);

         ///alert(page.data.total_amount);
         $(".pay_now_label").html(t("PAY") + " " + prettyPrice(page.data.total_amount));

         try {

            var button = document.querySelector('#braintee_submit_button');
            braintree.dropin.create({
               authorization: page.data.client_token,
               container: '#dropin-container'
            }, function (createErr, instance) {
               button.addEventListener('click', function () {
                  instance.requestPaymentMethod(function (err, payload) {
                     ajaxCall('braintreePay', 'payment_nonce=' + payload.nonce + '&order_id=' + page.data.order_id);
                  });
               });
            });

         } catch (err) {
            showAlert(err.message);
         }

         break;

      case "verification_mobile":
      case "verification_email":
         $(".token").val(page.data.token);
         $(".next_step").val(page.data.next_step);
         break;

      case "order_sms_page":
         ajaxCall('SendOrderSMSCode', '');
         break;

      case "language":
         ajaxCall('getlanguageList', '');
         break;

      case "device_id":
         $(".device_token").html(device_id);
         break;

      case "points_main":
         ajaxCall("pointsSummary", '');
         break;

      case "points_earn":
         ajaxCall("pointsGetEarn", '');
         break;

      case "points_expenses":
         ajaxCall("pointsExpenses", '');
         break;

      case "points_expired":
         ajaxCall("pointsExpired", '');
         break;

      case "points_earn_merchant":
         ajaxCall("pointsEarnByMerchant", '');
         break;

      case "map_delivery":
         checkLocation(4);
         break;

      case "search_category":

         catStyle = 0;
         removeStorage('infinite_category');
         ajaxCall('loadCategory', '');

         $(".search-input ").removeClass("search-input--material");
         setFocus('input_search_category');
/** Atualização Master Hub (Correção de Tradução) **/
		 $(".search-input").attr("placeholder", t("Search for category"));
		 $("#input_search_category").attr("placeholder", t("Search for category"));
/** Fim da atualização **/

         $("#input_search_category").keyup(function (event) {
            if (event.which == 13) {
               event.preventDefault();
            } else {

               destroyList('search_by_category_result');

               search_field_by_name = $(this).val();
               dump("search_field_by_name=>" + search_field_by_name);
               if (!empty(search_field_by_name)) {
                  data = "category_name=" + search_field_by_name;
                  ajaxCall2('searchByCategory', data);
               } else {
                  if (!empty(ajax_request2)) {
                     ajax_request2.abort();
                  }
               }
            }
         });
         break;

      case "search_item":
         $(".search-input ").removeClass("search-input--material");

         setFocus('input_search_item');
/** Atualização Master Hub (Correção de Tradução) **/
		 $("#input_search_item").attr("placeholder", t("Search for item"));  
/** Fim da atualização **/
         $("#input_search_item").keyup(function (event) {
            if (event.which == 13) {
               event.preventDefault();
            } else {

               destroyList('search_by_item_result');

               search_field_by_name = $(this).val();
               dump("search_field_by_name=>" + search_field_by_name);
               if (!empty(search_field_by_name)) {
                  data = "item_name=" + search_field_by_name;
                  data += "&category_id=" + $(".cat_id").val();
                  ajaxCall2('searchByItem', data);
               } else {
                  if (!empty(ajax_request2)) {
                     ajax_request2.abort();
                  }
               }
            }
         });

         break;

      case "authorize_form":
         generateMonth();
         generateYear();
         ajaxCall('getCountryList', '');
         $('.order_id').val(page.data.order_id);
         break;

      case "track_order":
         ajaxCall('getOrderHistory', "id=" + page.data.order_id);
         break;

      case "tracking_map":
         initImageLoaded();
         ajaxCall('getTrackOrderData', "order_id=" + page.data.order_id);
         break;

      case "custom_page":
         ajaxCall('getPagesByID', "page_id=" + page.data.page_id);
         break;

      case "add_review":
         $(".review_order_id").val(page.data.order_id);
/** Atualização Master Hub (Correção de Tradução) **/
		 $(".review").attr("placeholder", t("Write your comments..."));
		 $(".rating_title").html(t("Please select rating"));
/** Fim da atualização **/
         break;

   } /*end switch*/

});
/* END INIT*/

/*POSTPUSH*/
document.addEventListener('postpush', function (event) {
   dump("prepush");
});

var loader_html = '<div class="make_center" style="margin:20%;"><ons-progress-circular indeterminate></ons-progress-circular></div>';

/*PRESHOW*/
document.addEventListener('preshow', function (event) {
   dump("preshow");
   dump(event);
   var page = event.target;
   var page_id = event.target.id;
   dump("pre show : " + page_id)

   switch (page_id) {
      case "dialog_transaction_type":
         ajaxCall('servicesList', '');
         break;

      case "dialog_delivery_date":
         $(".delivery_date_wrap").html(loader_html);
         ajaxCall('deliveryDateList', '');
         break;

      case "dialog_delivery_time":
         $(".delivery_time_wrap").html(loader_html);
         ajaxCall('deliveryTimeList', 'delivery_date=' + $(".delivery_date").val());
         break;

      case "dialog_order_history":
         ajaxCall('getOrderHistory', 'id=' + $(".order_id").val());
         break;

      case "dialog_mobilecode_list":
         $(".mobilecode_list").html(loader_html);
         ajaxCall('getMobileCodeList', '');
         break;

      case "dialog_error":
         $(".dialog_error_title").html(getStorage("dialog_error_title"));
         $(".dialog_error_msg").html(getStorage("dialog_error_msg"));
         break;
		   
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
      case "dialog_locationState":
         ajaxCall('locationState', '');
         break;
		   
      case "dialog_locationCity":
	var params="state_id="+$(".state_id").val();
         ajaxCall('locationCity', params);
         break;
		   
      case "dialog_locationArea":
	var params="city_id="+$(".city_id").val( );
         ajaxCall('locationArea', params);
         break;
/** Fim da atualização **/
   }
});

/*TAB CHANGE*/
document.addEventListener('prechange', function (event) {
   dump('prechange');
   dump("tab index ->" + event.index);
   switch (event.index) {

      case 0:

         $(".tabbar__content").removeClass("above");

         lang = getStorage("lang");
         old_lang = getStorage("old_lang");

         /*alert("lang : "+ lang);
         alert("old_lang : "+ old_lang);*/

         if (!empty(old_lang)) {
            if (old_lang != lang) {
               removeStorage("old_lang");
               backToHome();
            }
         }

         getCartCount();

         break;

      case 1:
         paginate_count = 1;
         paginate_result = 0;
         disableInfo();
         ajaxCall('loadReviews', 'limit=10');
         $(".tabbar__content").addClass("above");
         $(".stic-back-btn").addClass("inline-block");
         break;

      case 2:
         break;

      case 3:
         setStorage("next_step", 'home_page');
         if (!isLogin()) {
            $(".show_if_login").hide();
            $(".show_if_notlogin").show();
         } else {
            $(".show_if_notlogin").hide();
            $(".show_if_login").show();
            paginate_count = 1;
            paginate_result = 0;
            ajaxCall('getOrders', '');
         }
         break;
   }
   translatePage();
});

document.addEventListener('reactive', function (event) {
   dump("reactive");
   dump(event);
});

document.addEventListener('postpop', function (event) {
   dump("postpop");
   dump(event);
   if (!empty(trackmap_interval)) {
      stopTrackMapInterval();
   }
});

document.addEventListener('preopen', function (event) {
   dump("preopen");

   translatePage();

   if (settings = AppSettings()) {
      if (settings.booking_disabled == "2") {
         $(".menu_book").hide();
      }
      if (settings.gallery_disabled == "yes") {
         $(".menu_photo").hide();
      }
   }

   if (!isLogin()) {
      $(".show_if_login").hide();
      $(".show_if_not_login").show();
   } else {
      $(".show_if_login").show();
      $(".show_if_not_login").hide();

      $(".left_panel h5").html(getStorage("profile_name"));
      $(".left_panel img").attr("src", getStorage("profile_avatar"));
      initImageLoaded();
   }

});

document.addEventListener('postchange', function (event) {
   dump("postchange");
   index = event.activeIndex;
   dump(index);

   $(".dots li").removeClass("active");
   $(".dots li.c" + index).addClass("active");
});

/*SHOW*/
/*document.addEventListener('show', function(event) {
   dump('show page');   
   var page_id = event.target.id;   
   dump(page_id);
   switch(page_id){
        case "signup":                 
          $(".frm_register").validate();
        break;
   }
});*/

var showLoader = function (show) {
   //var modal = document.querySelector('ons-modal');
   var modal = document.querySelector('#default_loader');
   if (show) {
      modal.show();
   } else {
      modal.hide();
   }
};

var openMenu = function () {
   var menu = document.getElementById('menu');
   menu.open();
};

loadPage = function (page) {
   var content = document.getElementById('content');
   var menu = document.getElementById('menu');
   content.load(page).then(menu.close.bind(menu));
};

var infiniteCategory = function (done) {

   var infinite_category = getStorage("infinite_category");
   if (infinite_category == 1) {
      dump("finish");
      return;
   }

   var data = '';
   var ajax_uri = ajax_url + "/loadCategory";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&page=" + page_category;

   data += "&lang=" + getLangCode();

   dump(ajax_uri + "?" + data);

   var ajax_request = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_request != null) {
            dump("request aborted");
            ajax_request.abort();
            clearTimeout(timer);
         } else {
            timer = setTimeout(function () {
               ajax_request.abort();
               showToast(t('Request taking lot of time 1. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request.done(function (data) {
      page_category++;
      dump("done ajax");
      dump(data);
      if (data.code == 1) {
         displayCategory(data.details.data);
         done();
      } else {
         setStorage("infinite_category", 1);
      }
   });

   /*ALWAYS*/
   ajax_request.always(function () {
      dump("ajax always");
      ajax_request = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request.fail(function (jqXHR, textStatus) {
      clearTimeout(timer);
/** Atualização Master Hub (Correção de Tradução) **/
      showToast(t("Failed" + ": " + textStatus));
/** Fim da atualização **/
      setStorage("infinite_category", 1);
   });

};
/*END infiniteCategory*/


/*mycall*/
function ajaxCall(action, data) {

   var ajax_uri = ajax_url + "/" + action;

   data += "&merchant_keys=" + krms_config.MerchantKeys;
   data += "&device_id=" + device_id;
   data += "&device_platform=" + device_platform;

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   transaction_type = $(".transaction_type").val();
   if (!empty(transaction_type)) {
      data += "&transaction_type=" + transaction_type;
   }


   data += "&lang=" + urlencode(getLangCode());

   dump("METHOD=>" + action);
   dump(ajax_uri + "?" + data);

   //alert("params=>"+data);  

   var ajax_request = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 30000,
      crossDomain: true,
      beforeSend: function (xhr) {
         dump("before send ajax");

         clearTimeout(timer);

         if (ajax_request != null) {
            ajax_request.abort();
            clearTimeout(timer);
         } else {
            showLoader(true);

            timer = setTimeout(function () {
               if (ajax_request != null) {
                  ajax_request.abort();
               }
               showLoader(false);
               showToast(t('Request taking lot of time 2. Please try again'));
            }, 30000);
         }
      }
   });

   /*DONE*/
   ajax_request.done(function (data) {
      dump("done ajax");
      dump(data);
      showLoader(false);

      if (data.code == 1) {
         switch (action) {
            case "loadCategory":

               category_is_delayed = getStorage("category_is_delayed");
               if (category_is_delayed == 1) {
                  removeStorage("category_is_delayed");
                  setTimeout(function () {
                     displayCategory(data.details.data);
                  }, 1000);
               } else {
                  displayCategory(data.details.data);
               }

               //initImageLoaded();

               getCartCount();
               break;

            case "loadItemByCategory":
               $(".cat_id").val(data.details.cat_id);
               displayItem(data.details.data, data.details.cat_id);
               paginate_count++;
               //initImageLoaded();
               break;

            case "loadItemDetails":
               $("#page_item_details .center").html(data.details.data.item_name);
               $(".category_id").val(data.details.cat_id);
               tpl = displayItemDetails(data.details.data, data.details.cart_data);
               $(".item_details_wrap").html(tpl);

               if (data.details.ordering_disabled == 1) {
                  showToast(data.details.ordering_msg);
                  $("#page_item_details ons-bottom-toolbar").hide();
               }
               if (settings = AppSettings()) {
                  if (settings.website_hide_foodprice == "yes") {
                     $("#page_item_details ons-bottom-toolbar").hide();
                  }
               }

               break;

            case "editCartItem":
               /*$(".category_id").val(data.details.cat_id);
               tpl = displayItemDetails(data.details.data);
               $(".item_details_wrap").html( tpl ) ;*/
               break;


            case "removeCartItem":
               loadCart();
               break;

            case "applyVoucher":
            case "removeVoucher":
            case "applyTips":
            case "removeTip":
            case "applyRedeemPoints":
            case "removePoints":
               loadCart();
               break;

            case "servicesList":
               tpl = displayList(data.details.data, 'transaction_type');
               $(".services_wrap").html(tpl);
               break;
				 
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
	    case "locationState":
	    tpl = displayStateList(data.details, 'state_list'); 
	    $(".location_state_wrap").html(tpl);
               break;
				 
	    case "locationCity":
	    tpl = displayCityList(data.details, 'city_list'); 
	    $(".location_city_wrap").html(tpl);
               break;
				 
	    case "locationArea":
	    tpl = displayAreaList(data.details, 'area_list'); 
	    $(".location_area_wrap").html(tpl);
               break;
/** Fim da atualização **/

            case "deliveryDateList":
               tpl = displayList(data.details.data, 'delivery_date');
               $(".delivery_date_wrap").html(tpl);
               break;

            case "deliveryTimeList":
               tpl = displayList(data.details.data, 'delivery_time');
               $(".delivery_time_wrap").html(tpl);
               break;

            case "customerRegister":
            case "fbRegister":
            case "LoginGoogle":

               if (!empty(data.details.contact_phone)) {
                  setStorage("customer_number", data.details.contact_phone);
               }

               setStorage("token", data.details.token);
               next_step = data.details.next_step;

               handlePushRegister();

               if (next_step == "delivery_address_option") {
                  showPage('address_form.html');
               } else if (next_step == "payment_option") {
                  showPage('payment_option.html');
               } else if (next_step == "verification_mobile") {

                  removeStorage("token");
                  onsenNavigator.pushPage('verification_mobile.html', {
                     animation: "slide",
                     data: {
                        'token': data.details.token,
                        'next_step': data.details.primary_next_step
                     }
                  });

               } else if (next_step == "verification_email") {

                  removeStorage("token");
                  onsenNavigator.pushPage('verification_email.html', {
                     animation: "slide",
                     data: {
                        'token': data.details.token,
                        'next_step': data.details.primary_next_step
                     }
                  });

               } else if (next_step == "order_sms_page") {
                  showPage('order_sms_page.html');

               } else {
                  backToHome(1);
               }
               break;

            case "setDeliveryAddress":
            case "setAddressBook":
               //popPage();               
               onsenNavigator.resetToPage('cart.html', {
                  animation: "slide"
               });

               $(".delivery_address").val(data.details.complete_address);
               printDeliveryAddress(data.details.complete_address);
               if (data.details.save_address == 1) {
                  setStorage("save_address", 1);
               } else {
                  removeStorage('save_address');
               }
               break;
				 
            case "setColetaAddress":
            case "setColetaAddressBook":
               //popPage();               
               onsenNavigator.resetToPage('cart.html', {
                  animation: "slide"
               });

               $(".coleta_address").val(data.details.complete_coleta_address);
               printColetaAddress(data.details.complete_coleta_address);
               if (data.details.save_address == 1) {
                  setStorage("save_address", 1);
               } else {
                  removeStorage('save_address');
               }
               break;
				 
            case "set1ColetaAddress":
            case "set1ColetaAddressBook":
               //popPage();               
               onsenNavigator.resetToPage('cart.html', {
                  animation: "slide"
               });

               $(".pre_coleta_address").val(data.details.complete_pre_coleta_address);
               print1ColetaAddress(data.details.complete_pre_coleta_address);
               if (data.details.save_address == 1) {
                  setStorage("save_address", 1);
               } else {
                  removeStorage('save_address');
               }
               break;

             case "set2ColetaAddress":
             case "set2ColetaAddressBook":
               //popPage();               
               onsenNavigator.resetToPage('cart.html', {
                  animation: "slide"
               });

               $(".coleta_address").val(data.details.complete_coleta_address);
               print2ColetaAddress(data.details.complete_coleta_address);
               if (data.details.save_address == 1) {
                  setStorage("save_address", 1);
               } else {
                  removeStorage('save_address');
               }
               break;

           case "setAddressBook_OLD":
               /*popPage();
               $(".delivery_address").val( data.details.complete_address );
               printDeliveryAddress(data.details.complete_address);
               if ( data.details.save_address==1){
                     setStorage("save_address",1);
               } else {
                     removeStorage('save_address');
               }*/
               break;

            case "loadPaymentList":
               tpl = displayPaymentList(data.details.data);
               $(".payment_list_wrap").html(tpl);
               break;

            case "payNow":
               payNowNextStep(data);
               break;

            case "GetAddressFromCart":
               $(".street").val(data.details.street);
/** Atualização Master Hub (Número e Bairro no Endereço) **/
               $(".numero").val(data.details.numero);
               $(".area_name").val(data.details.area_name);
/** Fim da atualização **/
               $(".city").val(data.details.city);
               $(".state").val(data.details.state);
               $(".zipcode").val(data.details.zipcode);
               $(".delivery_instruction").val(data.details.delivery_instruction);
               $(".location_name").val(data.details.location_name);
               $(".contact_phone").val(data.details.contact_phone);

               fillCountryList(data.details.country_list, data.details.country_code);

               break;

            case "getUserProfile":
               $(".profile_name").html(data.details.data.first_name + " " + data.details.data.last_name);
               setStorage("enabled_push", data.details.data.enabled_push)

               if ($('#customer_profile').is(':visible')) {
                  $(".email_address").val(data.details.data.email_address);
                  $(".first_name").val(data.details.data.first_name);
                  $(".last_name").val(data.details.data.last_name);
                  $(".contact_phone").val(data.details.data.contact_phone);
               }

               $(".profile_header h5").html(data.details.data.full_name);
               $(".profile_header img").attr("src", data.details.data.avatar);
               initImageLoaded();

               break;

            case "saveChangePassword":
               showAlert(data.msg);
               popPage();
               break;

            case "saveProfile":
               showToast(data.msg);
               setStorage("profile_name", data.details.full_name);
               setStorage("profile_avatar", data.details.avatar);
               break;

            case "savePushSettings":
               setStorage("enabled_push", data.details.enabled_push);
               showToast(data.msg);
               break;

            case "login":
               showToast(data.msg);
               setStorage("customer_number", data.details.mobile_number);
               next_step = getStorage("next_step");
               dump(next_step);
               setStorage("token", data.details.token);

               handlePushRegister();

               if (next_step == "payment_option") {
                  //showPage('payment_option.html');                
                  backToHome(1);
               } else if (next_step == "order_sms_page") {
                  showPage('order_sms_page.html');
               } else {
                  backToHome(1);
               }
               break;


            case "saveCard":
               showToast(data.msg);
               next_step = getStorage("next_step");
               popPage();
               if (next_step == "payment_option") {
                  ajaxCall('selectCreditCards', '');
               } else {
                  ajaxCall2('getCreditCards', '');
               }
               break;

            case "deleteCard":
               ajaxCall2('getCreditCards', '');
               break;

            case "getCards":
               $(".cc_id").val(data.details.cc_id);
               $(".card_name").val(data.details.card_name);
               $(".credit_card_number").val(data.details.credit_card_number);
               $(".expiration_month").val(data.details.expiration_month);
               $(".expiration_yr").val(data.details.expiration_yr);
               $(".cvv").val(data.details.cvv);
               $(".billing_address").val(data.details.billing_address);
               break;

            case "saveAddressBook":
               showToast(data.msg);
               popPage();
               ajaxCall2('getAddressBookList', '');
               break;

            case "deleteAddressBook":
               ajaxCall2('getAddressBookList', '');
               break;

            case "getAddressBook":
               $(".book_id").val(data.details.id);
               $(".street").val(data.details.street);
/** Atualização Master Hub (Número e Bairro no Endereço) **/
               $(".numero").val(data.details.numero);
               $(".area_name").val(data.details.area_name);
/** Fim da atualização **/
               $(".city").val(data.details.city);
               $(".state").val(data.details.state);
               $(".zipcode").val(data.details.zipcode);
               $(".location_name").val(data.details.location_name);
               if (data.details.as_default == 2) {
                  $(".as_default").prop('checked', true);
               } else {
                  $(".as_default").prop('checked', false);
               }

               fillCountryList(data.details.country_list, data.details.country_code);

               break;

            case "getOrders":
               $("#infinite_orders").html('');
               $("#show_if_no_order").hide();
               displayOrders(data.details.data);
               break;

            case "getOrderDetails":
               tpl = formatOrder(data.details.data);
               $(".order_details_wrap").html(tpl);
               $(".order_details_html").html(data.details.html);

               //alert(data.details.apply_food_tax);
               if (data.details.apply_food_tax == 1) {
                  $(".summary-wrap").after(data.details.new_total_html);
                  $(".summary-wrap").remove();
               }

               break;

            case "reOrder":
               showCart();
               break;

            case "loadReviews":
               $("#infinite_reviews").html('');
               displayReviews(data.details.data);
               addButtonReview(data.details.review);
               break;

            case "getReview":
               $(".review").html(data.details.data.review);
               $(".review_id").val(data.details.data.id);
               break;

            case "updateReview":
               popPage();
               paginate_count = 1;
               paginate_result = 0;
               ajaxCall('loadReviews', 'limit=10');
               break;

            case "deleteReview":
               paginate_count = 1;
               paginate_result = 0;
               ajaxCall('loadReviews', 'limit=10');
               break;

            case "getUserInfo":
               $(".booking_name").val(data.details.data.name);
               $(".email").val(data.details.data.email_address);
               $(".mobile").val(data.details.data.contact_phone);
               break;

            case "saveBooking":
               onsenNavigator.pushPage('booking_ty.html', {
                  animation: "slide",
                  data: {
                     'message': data.msg
                  }
               });
               break;

            case "getMerchantInfo":
               info = '<ons-row>';
               info += '<ons-col class="stic-logo-col">';
               info += '<img src="./images/logo.jpg">';
               info += '</ons-col>';
               info += '<ons-col>';
               info += '<h3 class="stic-app-name">' + data.details.data.merchant_name + '</h3>';
               info += '<span class="stic-app-cuisine">' + data.details.data.cuisine + '</span>';
               info += '</ons-col>';
               info += '</ons-row>';

               info += '<ons-list class="stic-info-list" modifier="list_menu">';
               info += '<ons-list-item class="stic-info-menu" modifier="chevron">';
               info += '<div class="left"><ons-icon icon="star" size="20px"></ons-icon></div>';
               info += '<div class="center"><span>' + data.details.data.rating_text + '</span></div>';
               info += '</ons-list-item>';

               info += '<ons-list-item class="stic-info-menu" modifier="chevron" onclick="showPage(\'map.html\')">';
               info += '<div class="left"><ons-icon icon="map-marked-alt" size="20px"></ons-icon></div>';
               info += '<div class="center"><span class="w90">' + data.details.data.address + '</span></div>';
               info += '</ons-list-item>';

               info += '<ons-list-item class="stic-info-menu" modifier="chevron">';
               info += '<div class="left"><ons-icon icon="images" size="20px"></ons-icon></div>';
/** Atualização Master Hub (Correção de Tradução) **/
               info += '<div class="center"><span class="trn">Photos</span></div>';
/** Fim da atualização **/
               info += '</ons-list-item>';

               info += '</ons-list>';
               $(".info_wrap").html(info);

               html = '';
               if ($.isArray(data.details.data.opening_hours)) {
                  html += '<ons-list-title modifier="list_title_grey">' + t('Opening hours') + '</ons-list-title>';
                  html += '<ons-list modifier="list_menu">';
                  $.each(data.details.data.opening_hours, function (hour_key, hour_val) {
                     html += '<ons-list-item >';
                     html += '<div class="stic-capitalize center">' + hour_val.day + '</div>';
                     html += '<div class="right">' + hour_val.hours + '</div>';
                     html += '</ons-list-item>';
                  });
                  html += '</ons-list>';
               }

               if (!empty(data.details.data.payment_list)) {
                  html += '<ons-list-title modifier="list_title_grey">' + t('Payment Methods') + '</ons-list-title>';
                  html += '<ons-list modifier="list_menu">';
                  $.each(data.details.data.payment_list, function (pay_key, pay_val) {
                     dump(pay_val);
                     html += '<ons-list-item >';
                     html += '<div class="left"><ons-icon icon="md-card" size="25px"></ons-icon></div>';
                     html += '<div class="center">' + pay_val + '</div>';
                     html += '</ons-list-item>';
                  });
                  html += '</ons-list>';
               }

               if (!empty(data.details.data.information)) {
                  html += '<div class="wrap" style="border-top:1px solid #eee;">';
                  html += '<p>' + data.details.data.information + '</p>';
                  html += '</div>';
               }

               $(".info_wrap2").html(html);

               break;

            case "getMerchantPhoto":
               tpl = gallery(data.details.data);
               $(".photo_wrap").html(tpl);
               break;

            case "loadPromo":
               tpl = '';
               if (data.details.data.enabled == 2) {
                  tpl = displayPromo(data.details.data);
                  $(".promo_wrap").html(tpl);
               } else {
                  $(".promo_wrap").html('');
                  showToast(data.msg);
               }
/** Atualização Master Hub (Correção de Tradução) **/
				 translatePage();
/** Fim da atualização **/
               break;

            case "loadBooking":
               $("#infinite_bookhistory").html('');
               displayBooking(data.details.data);
               break;


            case "getAddressBookDropDown":
               tpl = fillAddressBook(data.details.data);
               $('.address_book_wrap').html(tpl);
               break;

            case "getPaypal":
               $(".paypal_total_to_pay").html(data.details.total_to_pay);
               initPaypal(data.details);
               break;

            case "selectCreditCards":
               tpl = displaySelectCC(data.details.data);
               $('.select_cc_list').html(tpl);
               break;

            case "getStripe":
               initStripe(data.details);
               break;

            case "payStripe":
            case "payPaypal":
            case "razorPaymentSuccessfull":
            case "braintreePay":
            case "PayAuthorize":
               showReceipt(data);
               break;

            case "getPayondeliverycards":
               tpl = displayCards(data.details.data);
               $('.select_card_type_list').html(tpl);
               break;

            case "mapInfo":
               $(".map_lat").val(data.details.data.latitude);
               $(".map_lng").val(data.details.data.lontitude);
               displayMap('.map_canvas', data, '');
               break;

            case "verificationMobile":
            case "verificationEmail":

               setStorage("token", data.details.token);
               next_step = data.details.next_step;

               if (next_step == "delivery_address_option") {
                  showPage('address_form.html');
               } else if (next_step == "payment_option") {
                  showPage('payment_option.html');
               } else if (next_step == "order_sms_page") {
                  showPage('order_sms_page.html');
               } else {
                  backToHome(1);
               }
               break;

            case "SendOrderSMSCode":
               $(".order_sms_session").val(data.details.sms_order_session);
               break;

            case "verifyOrderSMSCODE":
               next_forms = getStorage("next_forms");
               if (next_forms != "order_sms_page.html") {
                  showPage(next_forms);
               } else {
                  showPage('payment_option.html');
               }
               break;

            case "getOrderHistory":

               $(".track_order_id").val(data.details.order_id);
               displayHistory(data.details.data);
               if (data.details.show_track == 1) {
                  $(".track_bottom_toolbar").show();
               } else {
                  $(".track_bottom_toolbar").hide();
               }
               break;

            case "getlanguageList":
               html = '';
               html += '<ons-list list modifier="list_menu" >';
               $.each(data.details.data, function (key, val) {

                  html += '<ons-list-item>';
                  html += '<label class="left">';
                  html += '<ons-radio name="language_code" input-id="language_code-' + val + '" onclick="setLanguage(' + "'" + val + "'" + ')" ></ons-radio>';
                  html += '</label>';
                  html += '<label for="language_code-' + val + '" class="center">';
                  html += val;
                  html += '</label>';
                  html += '</ons-list-item>';

               });
               html += '</ons-list>';
               $(".language_list").html(html);
               break;

            case "getMobileCodeList":
               fillMobilePrefix(data.details.data);
               break;

            case "loadNotification":
               $("#infinite_notification").html('');
               $(".clear_notification").show();
               displayNotification(data.details.data);
               break;

            case "geoCode":
               onsenNavigator.popPage({
                  animation: "none",
                  callback: function () {
                     $(".street").val(data.details.address);
/** Atualização Master Hub (Número e Bairro no Endereço) **/
                     $(".numero").val(data.details.numero);
                     $(".area_name").val(data.details.area_name);
/** Fim da atualização **/
                     $(".city").val(data.details.city);
                     $(".state").val(data.details.state);
                     $(".zipcode").val(data.details.zip);
                     if (!empty(data.details.country)) {
                     $(".country_code").val(data.details.country);
                     }
                  }
               });
               break;
				 
/*Atualização Master Hub (Preenchimento dos dados no Catálogo de Endereços adquiridos pelo CEP)*/
				case "IdsDoCEP":
					 
					if(!empty(data.details)){
						
				showAlert( t("Preencha o numero da sua residencia ou de onde voce esta!") );		
					//$(".location_area").html(data.details.bairro);
					//$(".location_city").html(data.details.cidade);
					//$(".location_state").html(data.details.estado);
					$(".location_name").val('');
					$(".delivery_instruction").val('');
					$(".state_id").val(data.details.state_id);
					$(".city_id").val(data.details.city_id);
					$(".area_id").val(data.details.area_id);
					$(".state").val(data.details.estado);
					$(".city").val(data.details.cidade);
					$(".area_name").val(data.details.bairro);
					} 
					break;
					
				case "IdsDoBairro":
					if(!empty(data.details)){
					//$(".location_area").html(data.details.area_name);
					//$(".location_city").html(data.details.city);
					//$(".location_state").html(data.details.state);
					$(".location_name").val('');
					$(".delivery_instruction").val('');
					$(".state_id").val(data.details.state_id);
					$(".city_id").val(data.details.city_id);
					$(".area_id").val(data.details.area_id);
					$(".state").val(data.details.state);
					$(".city").val(data.details.city);
					$(".area_name").val(data.details.area_name);
					} 
					break;
/*Fim da atualização*/

            case "pointsSummary":
               $(".pts_total_earn").html(data.details.total_available);
               $(".pts_total_expenses").html(data.details.total_expenses);
               $(".pts_total_expired").html(data.details.total_expiring);
               break;

            case "pointsGetEarn":
               pointsList(data.details.data, '.points_earn_list');
               break;

            case "pointsExpenses":
               pointsList(data.details.data, '.points_expenses_list');
               break;

            case "pointsExpired":
               pointsList(data.details.data, '.points_expired_list');
               break;

            case "pointsEarnByMerchant":
               pointsList(data.details.data, '.points_earn_merchant_list');
               break;

            case "getCountryList":
               fillCountryList(data.details.list, data.details.counry_code);
               break;

            case "clearCart":
               loadCart();
               break;

            case "setDeliveryLocation":
               /*next_forms = getStorage("next_forms");
                   showPage(next_forms);*/
               if (!isLogin()) {
                  showPage('signup.html');
               } else {
                  showPage('payment_option.html');
               }
               break;

            case "CancelOrder":
               ajaxCall('getOrders', '');
               break;

            case "getTrackOrderData":

               $(".driver_avatar img").attr("src", data.details.driver_info.photo);
               $(".driver-name").html(data.details.driver_info.driver_name);

               $(".driver_phone").val(data.details.driver_info.phone);
               $(".driver_id").val(data.details.driver_info.driver_id);

               settings = AppSettings();
               if (settings.map_provider == "mapbox") {

                  mapboxTrack("map_canvas", {
                     lat: data.details.task_info.lat,
                     lng: data.details.task_info.lng,
                     show_info: true,
                     info_html: t("destination"),
                     use_icon: true,
                     icon: data.details.icons.destination,
                     draggable: false
                  }, data.details);

               } else {
                  googleMapTrack(".map_canvas", {
                     lat: data.details.task_info.lat,
                     lng: data.details.task_info.lng,
                  }, data.details);
               }

               trackmap_interval = setInterval(function () {
                  runTrackMap()
               }, 10000);

               break;

            case "getPages":
               fillPages(data.details);
               break;

            case "getPagesByID":
               $(".custom_page_title").html(data.details.data.title);
               $(".custom_page_content").html(data.details.data.content);
               break;

            case "clearNotification":
               paginate_count = 1;
               paginate_result = 0;
               ajaxCall('loadNotification', '');
               break;

            case "addReview":
               onsenNavigator.resetToPage('page_home.html', {
                  animation: "none",
                  callback: function () {

                     tabbar_bottom = document.getElementById('tabbar_bottom');
                     tabbar_bottom.setActiveTab(data.details.tab, {
                        animation: 'none'
                     });

                  }
               });
               break;

            default:
               showAlert(data.msg);
               break;

               /*end mycall*/
         }

      } else if (data.code == 10) {
         // invalid merchant key          
         dialogInvalidKey();
      } else if (data.code == 11) {
         // merchant status not active
         setStorage("dialog_error_title", '');
         setStorage("dialog_error_msg", data.msg);
         dialogError();
      } else {
         /*FAILED RESPONSE*/
         switch (action) {

            case "loadReviews":
               $("#infinite_reviews").html('');
               addButtonReview(data.details.review);
               break;

            case "loadNotification":
               $("#infinite_notification").html('');
               $(".clear_notification").hide();
               break;

            case "getPages":
               //silent
               break;

            case "SendOrderSMSCode":
               showAlert(data.msg);
               $(".verify_order_sms").attr("disabled", "disabled");
               break;

            case "getUserProfile":
               removeStorage("token");
               $('.show_if_login').hide();
               $(".show_if_notlogin").show();
               $(".show_if_has_pts").hide();
               break;

            case "getCreditCards":
               $(".cc_list").html('');
               break;

            case "getOrders":

               $(".infinite_orders").html('');
               if (data.code == 3) {
                  $(".show_if_notlogin").show();
                  $(".show_if_no_order").hide();
                  $(".no_order_wrap").hide();
               } else if (data.code == 4) {
                  $(".show_if_notlogin").hide();
                  $(".show_if_no_order").hide();
                  $(".no_order_wrap").hide();
                  showToast(data.msg);
               } else {
                  $(".show_if_notlogin").hide();
                  $(".show_if_no_order").show();
                  $(".no_order_wrap").show();
               }
               break;

            case "getOrderDetails":
               $(".order_details_wrap").html('');
               showToast(data.msg);
               break;

            case "getUserInfo":
               $(".booking_name").val('');
               $(".email").val('');
               $(".mobile").val('');
               break;

            case "getMerchantPhoto":
            case "loadPromo":
            case "loadItemByCategory":
            case "loadBooking":
               showToast(data.msg);
               break;

            case "getAddressBookDropDown":
               showToast(data.msg);
               $(".address_book_wrap").html('');
               break;

            case "selectCreditCards":
               $('.select_cc_list').html('');
               break;

            case "pointsSummary":
               $(".pts_total_earn").html('');
               $(".pts_total_expenses").html('');
               $(".pts_total_expired").html('');
               break;

            case "pointsGetEarn":
               $(".points_earn_list").html('');
               break;

            case "pointsExpenses":
               $(".points_expenses_list").html('');
               break;

            case "pointsExpired":
               $(".points_expired_list").html('');
               break;

            case "pointsEarnByMerchant":
               $(".points_earn_merchant_list").html('');
               break;

            case "getOrderHistory":
               $(".track_bottom_toolbar").hide();
               showToast(data.msg);
               break;

            default:
               if (!empty(data.msg)) {
                  showAlert(data.msg);
               } else {
                  showAlert("Undefined error");
               }
               break;
         }
      }
   });
   /*END DONE*/

   /*ALWAYS*/
   ajax_request.always(function () {
      dump("ajax always");
      ajax_request = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request.fail(function (jqXHR, textStatus) {
      clearTimeout(timer);
      showLoader(false);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });

}
/*END AJAX*/

var loadItem = function (cat_id, cat_name) {
   onsenNavigator.pushPage('item.html', {
      animation: "slide",
      data: {
         "cat_id": cat_id,
         'cat_name': cat_name
      }
   });
};

var urlencode = function (data) {
   return encodeURIComponent(data);
};

var addslashes = function (str) {
   return (str + '')
      .replace(/[\\"']/g, '\\$&')
      .replace(/\u0000/g, '\\0')
};

var itemDetails = function (item_id, cat_id, row) {
   dump(item_id);
   onsenNavigator.pushPage('item_details.html', {
      animation: "slide",
      data: {
         "item_id": item_id,
         'cat_id': cat_id,
         'row': row
      }
   });
};

var infiniteItem = function (done) {
   var data = '';
   var ajax_uri = ajax_url + "/loadItemByCategory";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&cat_id=" + $(".cat_id").val();
   data += "&page=" + paginate_count;
   data += "&device_id=" + device_id;

   data += "&lang=" + getLangCode();

   dump(ajax_uri + "?" + data);

   var ajax_request = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_request != null) {
            dump("request aborted");
            ajax_request.abort();
            clearTimeout(timer);
            $(".loader_item").hide();
         } else {
            $(".loader_item").show();
            timer = setTimeout(function () {
               ajax_request.abort();
               showToast(t('Request taking lot of time 3. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request.done(function (data) {
      paginate_count++;
      dump("done ajax");
      dump(data);
      if (data.code == 1) {
         displayItem(data.details.data);
         paginate_count++;
         done();
      }
   });

   /*ALWAYS*/
   ajax_request.always(function () {
      dump("ajax always");
      $(".loader_item").hide();
      ajax_request = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request.fail(function (jqXHR, textStatus) {
      ajax_request = null;
      clearTimeout(timer);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });

};


ons.ready(function () {

   $(document).on("keyup", ".numeric_only", function () {
      this.value = this.value.replace(/[^0-9\.]/g, '');
   });
		
/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
	var typingTimer; //identificador de tempo
	var doneTypingInterval = 1000; //o tempo está em ms, 1 segundo por exemplo

		//no keyup, inicie o contador
	$(document).on("keyup", ".search_area", function() {
		 clearTimeout(typingTimer);
		 if (this.value) {
		typingTimer = setTimeout(searchArea, doneTypingInterval);
		 }
	});	
/** Fim da atualização **/

   $(document).on("click", ".subitem_custom", function () {
      object = $(this);
      var limited = object.data("limited");
      dump("limited: " + limited);
      var total_check = 0;

      var id = $(this).data("id");
      dump("id: " + id);

      $('.subitem_custom input:checked').each(function () {
         dump($(this));
         if ($(this).parent().data("id") == id) {
            total_check++;
         }
      });
      dump("total_check=>" + total_check);

      if (limited < total_check) {
         dump(object);
         showAlert(t('Sorry but you can select only') + " " + limited + " " + t("addon"));
         dump(object.find("input"));
         object.prop('checked', false);
      }

   });

}); /*end onsen ready*/


var showToast = function (data) {

   if (empty(data)) {
      data = '';
   }

   toast_handler = ons.notification.toast(data, {
      timeout: 2000
   });

};


var showAlert = function (data) {
   if (empty(data)) {
      data = '';
   }
   ons.notification.alert({
      message: t(data),
      title: krms_config.DialogDefaultTitle
   });
};

var addQty = function (obj) {
   var parent = obj.parent().parent();
   var ons_input = parent.find("ons-input");
   var value = ons_input.val();
   if (empty(value)) {
      value = 0;
   }
   if (isNaN(value)) {
      value = 0;
   }
   ons_input.val(parseInt(value) + 1);
};

var minusQty = function (obj) {
   var parent = obj.parent().parent();
   var ons_input = parent.find("ons-input");
   var value = ons_input.val();
   if (isNaN(ons_input.val())) {
      value = 0;
   }
   if (empty(value)) {
      value = 0;
   }
   value = parseInt(value) - 1;
   if (value >= 1) {
      ons_input.val(value);
   } else {
      ons_input.val(1);
   }
};

var addToCart = function () {
   dump('addToCart');

   merchant_two_flavor_option = '';
   if (settings = AppSettings()) {
      var merchant_two_flavor_option = settings.merchant_two_flavor_option;
   }


   /*CHECK IF HAS SELECTED PRICE*/
   var found_price = false;
   var params_price = $(".frm_item").serializeArray();
   $.each(params_price, function (params_pricekey, params_priceval) {
      dump(params_priceval.name);
      if (params_priceval.name == "price") {
         found_price = true;
      }
   });

   is_two_flavors = $(".two_flavors").val();

   if (is_two_flavors == 2 || is_two_flavors == "2") {
      /*CHECK IF HAS SELECT LEFT AND RIGHT FLAVOR*/
      left_flavor = $(".two_flavor_position_left  input:checked").length;
      right_flavor = $(".two_flavor_position_right  input:checked").length;

      if (left_flavor <= 0) {
         showToast(t("Please select left flavor"));
         return;
      }
      if (right_flavor <= 0) {
         showToast(t("Please select right flavor"));
         return;
      }

      temp_left_flavor_price = $(".two_flavor_position_left  input:checked").val();
      temp_left_flavor_price = temp_left_flavor_price.split("|");
      left_flavor_price = 0;
      if (!empty(temp_left_flavor_price[1])) {
         left_flavor_price = temp_left_flavor_price[1];
      }

      dump("left_flavor_price : " + left_flavor_price);

      temp_right_flavor_price = $(".two_flavor_position_right  input:checked").val();
      temp_right_flavor_price = temp_right_flavor_price.split("|");
      right_flavor_price = 0;
      if (!empty(temp_right_flavor_price[1])) {
         right_flavor_price = temp_right_flavor_price[1];
      }

      dump("right_flavor_price : " + right_flavor_price);

      final_flavor_price = 0;


      if (merchant_two_flavor_option == 2) {
         sumup = parseFloat(left_flavor_price) + parseFloat(right_flavor_price);
         dump("sum up : " + sumup);
         if (sumup > 0.0001) {
            final_flavor_price = sumup / 2;
         }
      } else {
         if (left_flavor_price > right_flavor_price) {
            final_flavor_price = left_flavor_price;
         } else {
            final_flavor_price = right_flavor_price;
         }
      }

      dump("final_flavor_price : " + final_flavor_price);
      $(".two_flavors").after('<input type="hidden" name="price" value="' + final_flavor_price + '" >');

      found_price = true;
   }


   if (!found_price) {
      showToast(t("Please select price"));
      return;
   }
   /*END CHECK IF HAS SELECTED PRICE*/

   /*CHECK ADDONS IF REQUIRED*/
   if ($(".require_addons").exists()) {
      $(".required_addon").remove();
      var addon_required_msg = '';
      $.each($(".require_addons"), function (addonkey, addonval) {
         dump(addonval);
         r_subcat_id = $(this).data("subcat_id");
         r_subcat_name = $(this).data("subcat_name");
         r_multi_option = $(this).data("multi_option");
         r_multi_option_val = $(this).data("multi_option_val");

         dump("r_subcat_id :" + r_subcat_id);
         dump("r_subcat_name :" + r_subcat_name);
         dump("r_multi_option :" + r_multi_option);
         dump("r_multi_option_val :" + r_multi_option_val);

         if (r_multi_option == "one" || r_multi_option == "multiple" || r_multi_option == "custom") {
            addon_total_selected = $(".item_addon_" + r_subcat_id + " input:checked").length;
            dump("addon_total_selected :" + addon_total_selected);
            if (addon_total_selected <= 0) {
               addon_err = t("You must select at least one addon for") + " " + r_subcat_name;
               $(this).before('<p class="required_addon">' + addon_err + '</p>');
               addon_required_msg += addon_err + "\n";
            }
         } else {
            //
         }

      });

      if (!empty(addon_required_msg)) {
         showToast(addon_required_msg);
         return;
      }

   }
   /*END CHECK ADDONS IF REQUIRED*/


   var params = $(".frm_item").serializeArray();
   params[params.length] = {
      name: "qty",
      value: $(".item_qty").val()
   };
   dump(params);

   /*alert('ok');
   return;  */

   var ajax_uri = ajax_url + "/addToCart/?merchant_keys=" + krms_config.MerchantKeys + "&device_id=" + device_id + "&json=1&device_platform=" + device_platform + "&lang=" + getLangCode();
   /*var ajax_cart = $.post(ajax_uri, params , function(data){
      dump(data);
      if ( data.code==1){
         showToast(data.msg);
      } else {
         showAlert(data.msg);
      }
   }, "jsonp")*/

   var ajax_cart = $.ajax({
      type: "POST",
      url: ajax_uri,
      data: params,
      dataType: "json",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         clearTimeout(timer);

         if (ajax_cart != null) {
            ajax_cart.abort();
            clearTimeout(timer);
         } else {
            showLoader(true);

            timer = setTimeout(function () {
               if (ajax_cart != null) {
                  ajax_cart.abort();
               }
               showLoader(false);
               showToast(t('Request taking lot of time 4. Please try again'));
            }, 20000);
         }

      }
   });

   ajax_cart.done(function (data) {
      dump(data);
	   showCart();
      if (data.code == 1) {

         showToast(data.msg);

        /* onsenNavigator.popPage({
            animation: "none"
         });*/
         //getCartCount();
         /*REFRESH CARD*/
         if (data.details.refresh == 1) {
            loadCart();
         }
      } else {
         showAlert(data.msg);
      }
   });

   ajax_cart.always(function (data) {
      showLoader(false);
      dump("always")
   });

   ajax_cart.fail(function (jqXHR, textStatus) {
      dump("failed ajax " + textStatus);
      showToast(t("Failed") + ": " + textStatus);
   });

};

var getCartCount = function () {

   var ajax_uri = ajax_url + "/getCartCount/?merchant_keys=" + krms_config.MerchantKeys + "&device_id=" + device_id;
   params = '';

   var ajax_cart_count = $.post(ajax_uri, params, function (data) {
      dump(data);
      if (data.code == 1) {
         $(".cart_count").html(data.details.count);
         $(".tabbar__badge").html(data.details.count);
      } else {
         $(".cart_count").html('0');
         $(".tabbar__badge").html('');
      }
   }, "jsonp")

   ajax_cart_count.done(function (data) {});

   ajax_cart_count.always(function (data) {
      dump("always")
   });
   ajax_cart_count.fail(function (jqXHR, textStatus) {
      dump("failed ajax " + textStatus);
   });
};

var showCart = function () {
   onsenNavigator.pushPage('cart.html', {
      animation: "lift"
   });
   document.getElementById("stic-kakashi").style["display"] = "none";
};


function number_format(number, decimals, dec_point, thousands_sep) {
   number = (number + '')
      .replace(/[^0-9+\-Ee.]/g, '');
   var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
         var k = Math.pow(10, prec);
         return '' + (Math.round(n * k) / k)
            .toFixed(prec);
      };
   // Fix for IE parseFloat(0.55).toFixed(0) = 0;
   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
      .split('.');
   if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
   }
   if ((s[1] || '')
      .length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1)
         .join('0');
   }
   return s.join(dec);
}

function prettyPrice(price) {

   if (settings = AppSettings()) {
      var decimal_place = settings.currency_decimal_place;
      var currency_position = settings.currency_position;
      var currency_symbol = settings.currency_symbol;
      var thousand_separator = settings.currency_thousand_separator;
      var decimal_separator = settings.currency_decimal_separator;
      var currency_space = settings.currency_space;
   } else {
      var decimal_place = 2;
      var currency_position = "left";
      var currency_symbol = "$";
      var thousand_separator = ",";
      var decimal_separator = ".";
      var currency_space = '';
   }

   /*alert(decimal_place);
   alert(decimal_separator);*/

   dump("decimal_place=>" + decimal_place);
   dump("currency_symbol=>" + currency_symbol);
   dump("thousand_separator=>" + thousand_separator);
   dump("decimal_separator=>" + decimal_separator);
   dump("currency_position=>" + currency_position);

   price = number_format(price, decimal_place, decimal_separator, thousand_separator);
   spacer = "";
   if (currency_space == 1) {
      spacer = " ";
   }

   if (currency_position == "left") {
      return currency_symbol + spacer + price;
   } else {
      return price + spacer + currency_symbol;
   }
}

var popPage = function () {
   try {
      onsenNavigator.popPage({
         animation: "none"
      });
   } catch (err) {
      dump(err.message);
   }
};

var removeCartItem = function (row) {
   ajaxCall('removeCartItem', 'row=' + row);
};

var setPageMenu = function () {
   try {

      popPage();
      tabbar_bottom = document.getElementById('tabbar_bottom');
      tabbar_bottom.setActiveTab(0, {
         animation: 'none'
      });
      if ($('.cart_count, .tabb_cart').is(':visible')) {
         getCartCount();
      }

   } catch (err) {
      backToHome();

      if ($('.cart_count, .tabb_cart').is(':visible')) {
         getCartCount();
      }

   }
};

var applyVoucher = function () {
   ajaxCall('applyVoucher', 'voucher_name=' + $(".voucher_name").val());
};

var removeVoucher = function () {
   ajaxCall('removeVoucher', '');
};

var showTransactionList = function () {
   var dialog = document.getElementById('dialog_transaction_type');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_transaction_type.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
var showState = function () {
   var dialog = document.getElementById('dialog_locationState');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_locationState.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

var showCity = function () {
   var dialog = document.getElementById('dialog_locationCity');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_locationCity.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

var showArea = function () {
   var dialog = document.getElementById('dialog_locationArea');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_locationArea.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};
/** Fim da atualização **/
var showDeliveryDateList = function () {
   var dialog = document.getElementById('dialog_delivery_date');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_delivery_date.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
}

var showDeliveryTime = function () {
   var dialog = document.getElementById('dialog_delivery_time');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_delivery_time.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
}


var setFieldValue = function (class_name, value, label) {

   $("." + class_name).val(value);

   switch (class_name) {
      case "transaction_type":
         setStorage("transaction_type", value);
         $(".transaction_type_label").html(label);
         var dialog = document.getElementById('dialog_transaction_type');
         dialog.hide();
         loadCart(value);
         break;

/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
      case "state_list":
		   $(".state_id").val( value );
		   $(".state").val( label );
		   
         var dialog = document.getElementById('dialog_locationState');
         dialog.hide();
         break;
		   
      case "city_list":
		   $(".city_id").val( value );
		   $(".city").val( label );
		   
         var dialog = document.getElementById('dialog_locationCity');
         dialog.hide();
         break;
/** Fim da atualização **/
      case "delivery_date":
         setStorage("delivery_date_set", value);
         setStorage("delivery_date_set_pretty", label);
         $(".delivery_date_label").html(label);
         var dialog = document.getElementById('dialog_delivery_date');
         dialog.hide();
         $(".delivery_time_label").html('');
         $(".delivery_time").val('');
         break;

      case "delivery_time":
         setStorage("delivery_time_set", value);
         $(".delivery_time_label").html(label);
         var dialog = document.getElementById('dialog_delivery_time');
         dialog.hide();

         var delivery_asap = document.getElementById('delivery_asap');
         if (!empty(delivery_asap)) {
            delivery_asap.checked = false;
         }

         break;
   }
};

/** Atualização Master Hub (Endereço por Localização Bairro e Cidade) **/
var setFieldValueBairro = function (class_name, value_area, label_area, value_city, label_city, value_state, label_state) {

   $("." + class_name).val(value_area);

   switch (class_name) {
		   
      case "area_list":
		   $(".area_id").val( value_area );
		   $(".area_name").val( label_area );
		   $(".city_id").val( value_city );
		   $(".city").val( label_city );
		   $(".state_id").val( value_state );
		   $(".state").val( label_state );
		   
         var dialog = document.getElementById('dialog_locationArea');
         dialog.hide();
         break;
   }
};
/** Fim da atualização **/
var loadCart = function (transaction_type) {
   if (!empty(transaction_type)) {
      ajaxCall2('loadCart', 'transaction_type=' + transaction_type);
   } else {
      transaction_type_set = getStorage("transaction_type");
      if (!empty(transaction_type_set)) {
         ajaxCall2('loadCart', 'transaction_type=' + transaction_type_set);
      } else {
         ajaxCall2('loadCart', '');
      }
   }
};

/*mycall2*/
var ajaxCall2 = function (action, data) {

   var ajax_uri = ajax_url + "/" + action;

   data += "&merchant_keys=" + krms_config.MerchantKeys;
   data += "&device_id=" + device_id;
   data += "&device_platform=" + device_platform;

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   transaction_type = $(".transaction_type").val();
   if (!empty(transaction_type)) {
      data += "&transaction_type=" + transaction_type;
   }

   data += "&lang=" + getLangCode();

   dump("ajaxCall2 METHOD=>" + action);
   dump(ajax_uri + "?" + data);


   ajax_request2 = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         dump("before send ajax");
         if (ajax_request2 != null) {
            ajax_request2.abort();
            clearTimeout(timer);
         } else {

            if (action == "searchByCategory") {
               showLoaderDiv(true, 'search_by_category_result');
            } else if (action == "searchByItem") {
               showLoaderDiv(true, 'search_by_item_result');
            } else {
               showLoader(true);
            }
            timer2 = setTimeout(function () {
               if (ajax_request2 != null) {
                  ajax_request2.abort();
               }
               showLoader(false);
               showToast(t('Request taking lot of time 5. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request2.done(function (data) {
      dump("done ajax");
      dump(data);
      showLoader(false);

      if (data.code == 1) {
         switch (action) {
            case "loadCart":

               setStorage("next_step", 'payment_option');

               if (data.details.required_delivery_time == "yes") {
                  $(".required_delivery_time").val(1);
               } else {
                  $(".required_delivery_time").val('');
               }

               $(".has_addressbook").val(data.details.has_addressbook);
               $(".sms_order_session").val(data.details.sms_order_session);

               $(".no_order_wrap").hide();
               $(".bottom_toolbar_checkout").show();
               tpl = displayCartDetails(data.details);
               $(".cart_details").html(tpl);

               if (data.details.cart_error.length > 0) {
                  $('.bottom_toolbar_checkout ons-button').attr("disabled", true);
                  cart_error = '';
                  $.each(data.details.cart_error, function (cart_error_key, cart_error_val) {
                     cart_error += cart_error_val + "\n";
                  });
                  showAlert(cart_error);
               } else {
                  $('.bottom_toolbar_checkout ons-button').attr("disabled", false);
               }

               verifyCustomerToken();

               break;

            case "getCreditCards":
               tpl = ccLIst(data.details.data);
               $(".cc_list").html(tpl);
               break;

            case "getAddressBookList":
               tpl = addressList(data.details.data);
               $(".address_list_wrap").html(tpl);
               break;

            case "searchByCategory":
               showLoaderDiv(false, 'search_by_category_result');
               CategoryListSmall(data.details.list, 'search_by_category_result');
               break;

            case "searchByItem":
               showLoaderDiv(false, 'search_by_item_result');
               ItemListSmall(data.details.list, 'search_by_item_result');
               break;

         }
      } else if (data.code == 4) {

         switch (action) {
            case "loadCart":
               $(".no_order_wrap").hide();
               $(".bottom_toolbar_checkout").hide();
               showAlert(data.msg);
               break;
         }

      } else {
         /*FAILED RESPONSE*/
         switch (action) {
            case "loadCart":
               $(".no_order_wrap").show();
               $(".cart_details").html('');
               $(".cart_total").html('');
               $(".bottom_toolbar_checkout").hide();
               break;

            case "getAddressBookList":
               //showToast( data.msg );
               $(".address_list_wrap").html('');
               break;

            case "getCreditCards":
               $(".cc_list").html('');
               break;

            case "searchByCategory":
               showLoaderDiv(false, 'search_by_category_result');
               $(".search_by_category_result").html(data.msg);
               break;

            case "searchByItem":
               showLoaderDiv(false, 'search_by_item_result');
               $(".search_by_item_result").html(data.msg);
               break;

         }
      }
   });
   /*END DONE*/

   /*ALWAYS*/
   ajax_request2.always(function () {
      dump("ajax always");
      ajax_request2 = null;
      clearTimeout(timer2);
   });

   /*FAIL*/
   ajax_request2.fail(function (jqXHR, textStatus) {
      showLoader(false);
      clearTimeout(timer2);
      if (textStatus != "abort") {
         showToast(t("Failed") + ": " + textStatus);
         dump("failed ajax " + textStatus);
      }
   });

};

var checkout = function () {

   removeStorage("next_forms");

   transaction_type = $(".transaction_type").val();

   switch (transaction_type) {
      case "delivery":
		   
         var street = $(".delivery_address").val();
         if (empty(street)) {
            showAlert(t("Please enter delivery address"));
            return;
         }

         var delivery_asap_val = false;
         var delivery_asap = document.getElementById('delivery_asap');
         if (!empty(delivery_asap)) {
            delivery_asap_val = delivery_asap.checked;
         }

         //alert(delivery_asap_val);

         required_delivery_time = $(".required_delivery_time").val();
         if (required_delivery_time == 1 && delivery_asap_val == false) {
            delivery_time_set = getStorage("delivery_time_set");
            if (empty(delivery_time_set)) {
               showAlert(t("Delivery time is required"));
               return;
            }
         }

         /*CHECK MINIMUM ORDER TABLE*/
         min_delivery_order = parseFloat($(".min_delivery_order").val());
         //alert(min_delivery_order);
         if (min_delivery_order > 0.0001) {
            cart_sub_total = parseFloat($(".cart_sub_total").val());
            // alert(cart_sub_total);
            if (min_delivery_order > cart_sub_total) {
               showAlert(t("Sorry but Minimum order is") + " " + prettyPrice(min_delivery_order));
               return;
            }
         }

         break;
		   
      case "coleta":
		   
         var coleta = $(".coleta_address").val();
         if (empty(coleta)) {
            showAlert(t("Please enter 2 coleta address"));
            return;
         }
		   
         var street = $(".delivery_address").val();
         if (empty(street)) {
            showAlert(t("Please enter delivery address"));
            return;
         }

         required_delivery_time = $(".required_delivery_time").val();
         if (required_delivery_time == 1 && delivery_asap_val == false) {
            delivery_time_set = getStorage("delivery_time_set");
            if (empty(delivery_time_set)) {
               showAlert(t("Delivery time is required"));
               return;
            }
         }

         /*CHECK MINIMUM ORDER TABLE*/
         min_delivery_order = parseFloat($(".min_delivery_order").val());
         //alert(min_delivery_order);
         if (min_delivery_order > 0.0001) {
            cart_sub_total = parseFloat($(".cart_sub_total").val());
            // alert(cart_sub_total);
            if (min_delivery_order > cart_sub_total) {
               showAlert(t("Sorry but Minimum order is") + " " + prettyPrice(min_delivery_order));
               return;
            }
         }

         break;

      case "coleta_retorno":
		   
         var coleta = $(".coleta_address").val();
         if (empty(coleta)) {
            showAlert(t("Please enter 2 coleta address"));
            return;
         }
		   
         var street = $(".delivery_address").val();
         if (empty(street)) {
            showAlert(t("Please enter delivery address"));
            return;
         }

         required_delivery_time = $(".required_delivery_time").val();
         if (required_delivery_time == 1 && delivery_asap_val == false) {
            delivery_time_set = getStorage("delivery_time_set");
            if (empty(delivery_time_set)) {
               showAlert(t("Delivery time is required"));
               return;
            }
         }

         /*CHECK MINIMUM ORDER TABLE*/
         min_delivery_order = parseFloat($(".min_delivery_order").val());
         //alert(min_delivery_order);
         if (min_delivery_order > 0.0001) {
            cart_sub_total = parseFloat($(".cart_sub_total").val());
            // alert(cart_sub_total);
            if (min_delivery_order > cart_sub_total) {
               showAlert(t("Sorry but Minimum order is") + " " + prettyPrice(min_delivery_order));
               return;
            }
         }

         break;
		   
      case "pre_coleta":
		   
         var pre_coleta = $(".pre_coleta_address").val();
         if (empty(pre_coleta)) {
            showAlert(t("Please enter 1 coleta address"));
            return;
         }
		   
         var coleta = $(".coleta_address").val();
         if (empty(coleta)) {
            showAlert(t("Please enter 2 coleta address"));
            return;
         }
		   
         var street = $(".delivery_address").val();
         if (empty(street)) {
            showAlert(t("Please enter delivery address"));
            return;
         }

         required_delivery_time = $(".required_delivery_time").val();
         if (required_delivery_time == 1 && delivery_asap_val == false) {
            delivery_time_set = getStorage("delivery_time_set");
            if (empty(delivery_time_set)) {
               showAlert(t("Delivery time is required"));
               return;
            }
         }

         /*CHECK MINIMUM ORDER TABLE*/
         min_delivery_order = parseFloat($(".min_delivery_order").val());
         //alert(min_delivery_order);
         if (min_delivery_order > 0.0001) {
            cart_sub_total = parseFloat($(".cart_sub_total").val());
            // alert(cart_sub_total);
            if (min_delivery_order > cart_sub_total) {
               showAlert(t("Sorry but Minimum order is") + " " + prettyPrice(min_delivery_order));
               return;
            }
         }

         break;
		   
      case "pre_coleta_retorno":
		   
         var pre_coleta = $(".pre_coleta_address").val();
         if (empty(pre_coleta)) {
            showAlert(t("Please enter 1 coleta address"));
            return;
         }
		   
         var coleta = $(".coleta_address").val();
         if (empty(coleta)) {
            showAlert(t("Please enter 2 coleta address"));
            return;
         }
		   
         var street = $(".delivery_address").val();
         if (empty(street)) {
            showAlert(t("Please enter delivery address"));
            return;
         }

         required_delivery_time = $(".required_delivery_time").val();
         if (required_delivery_time == 1 && delivery_asap_val == false) {
            delivery_time_set = getStorage("delivery_time_set");
            if (empty(delivery_time_set)) {
               showAlert(t("Delivery time is required"));
               return;
            }
         }

         /*CHECK MINIMUM ORDER TABLE*/
         min_delivery_order = parseFloat($(".min_delivery_order").val());
         //alert(min_delivery_order);
         if (min_delivery_order > 0.0001) {
            cart_sub_total = parseFloat($(".cart_sub_total").val());
            // alert(cart_sub_total);
            if (min_delivery_order > cart_sub_total) {
               showAlert(t("Sorry but Minimum order is") + " " + prettyPrice(min_delivery_order));
               return;
            }
         }

         break;
		   
      case "prestacao_servico":
		   
         var street = $(".delivery_address").val();
         if (empty(street)) {
            showAlert(t("Please enter servico address"));
            return;
         }


         required_delivery_time = $(".required_delivery_time").val();
         if (required_delivery_time == 1 && delivery_asap_val == false) {
            delivery_time_set = getStorage("delivery_time_set");
            if (empty(delivery_time_set)) {
               showAlert(t("Delivery time is required"));
               return;
            }
         }

         /*CHECK MINIMUM ORDER TABLE*/
         min_delivery_order = parseFloat($(".min_delivery_order").val());
         //alert(min_delivery_order);
         if (min_delivery_order > 0.0001) {
            cart_sub_total = parseFloat($(".cart_sub_total").val());
            // alert(cart_sub_total);
            if (min_delivery_order > cart_sub_total) {
               showAlert(t("Sorry but Minimum order is") + " " + prettyPrice(min_delivery_order));
               return;
            }
         }

         break;
		   
      case "pickup":
         delivery_time_set = getStorage("delivery_time_set");
         if (empty(delivery_time_set)) {
            showAlert(t("Pickup time is required"));
            return;
         }
         break;

      case "dinein":
         delivery_time_set = getStorage("delivery_time_set");
         if (empty(delivery_time_set)) {
            showAlert(t("Dine in time is required"));
            return;
         }
         break;
   }

   if (!isLogin()) {
      /*not login*/
      if (transaction_type == "dinein") {
         if (settings = AppSettings()) {
            if (settings.order_verification == "2") {
               setStorage("next_step", 'order_sms_page');
               setStorage("next_forms", 'order_sms_page.html');
               showPage("dinein_forms.html");
            }
         }
         setStorage("next_forms", 'signup.html');
         showPage("dinein_forms.html");
      } else {

         if (settings.enabled_map_selection_delivery == 1 && transaction_type == "delivery") {
            showPage('map_delivery.html');
            return;
         }

         setStorage("next_step", 'payment_option');
         if (settings = AppSettings()) {
            if (settings.order_verification == "2") {
               setStorage("next_step", 'order_sms_page');
            }
         }
         showPage('signup.html');
      }
   } else {
      /*already login*/
      if (transaction_type == "dinein") {
         if (settings = AppSettings()) {
            if (settings.order_verification == "2") {
               setStorage("next_forms", 'order_sms_page.html');
               showPage("dinein_forms.html");
               return;
            }
         }
         setStorage("next_forms", 'payment_option.html');
         showPage("dinein_forms.html");
      } else {
         if (settings = AppSettings()) {
            if (settings.order_verification == "2") {
               setStorage("next_forms", 'payment_option.html');
               showPage("order_sms_page.html");
               if (settings.enabled_map_selection_delivery == 1 && transaction_type == "delivery") {
                  setStorage("next_forms", 'map_delivery.html');
               }
				
               if (settings.enabled_map_selection_delivery == 1 && transaction_type == "coleta") {
                  setStorage("next_forms", 'map_delivery.html');
               }
				
               if (settings.enabled_map_selection_delivery == 1 && transaction_type == "coleta_retorno") {
                  setStorage("next_forms", 'map_delivery.html');
               }
				
               if (settings.enabled_map_selection_delivery == 1 && transaction_type == "pre_coleta") {
                  setStorage("next_forms", 'map_delivery.html');
               }
				
               if (settings.enabled_map_selection_delivery == 1 && transaction_type == "pre_coleta_retorno") {
                  setStorage("next_forms", 'map_delivery.html');
               }
				
               if (settings.enabled_map_selection_delivery == 1 && transaction_type == "prestacao_servico") {
                  setStorage("next_forms", 'map_delivery.html');
               }
				
               return;
            }

            if (settings.enabled_map_selection_delivery == 1 && transaction_type == "delivery") {
               showPage('map_delivery.html');
               setStorage("next_forms", 'payment_option.html');
               return;
            }
			 
            if (settings.enabled_map_selection_delivery == 1 && transaction_type == "coleta") {
               showPage('map_delivery.html');
               setStorage("next_forms", 'payment_option.html');
               return;
            }
			 
            if (settings.enabled_map_selection_delivery == 1 && transaction_type == "coleta_retorno") {
               showPage('map_delivery.html');
               setStorage("next_forms", 'payment_option.html');
               return;
            }
			 
            if (settings.enabled_map_selection_delivery == 1 && transaction_type == "pre_coleta") {
               showPage('map_delivery.html');
               setStorage("next_forms", 'payment_option.html');
               return;
            }
			 
            if (settings.enabled_map_selection_delivery == 1 && transaction_type == "pre_coleta_retorno") {
               showPage('map_delivery.html');
               setStorage("next_forms", 'payment_option.html');
               return;
            }
			 
            if (settings.enabled_map_selection_delivery == 1 && transaction_type == "prestacao_servico") {
               showPage('map_delivery.html');
               setStorage("next_forms", 'payment_option.html');
               return;
            }
			 
			 
         }
         showPage('payment_option.html');
      }
   }
};

var isLogin = function () {
   var token = getStorage("token");
   if (!empty(token)) {
      return token;
   }
   return false;
};

var showPage = function (page_id) {
   onsenNavigator.pushPage(page_id, {
      animation: "slide",
   });
};

var showPageNormal = function (page_id) {
   onsenNavigator.pushPage(page_id, {
      animation: "none",
   });
};

var customerRegister = function () {

   if ($('#check_terms_condition').is(':visible')) {
      check_terms_condition = $("input[name=check_terms_condition]:checked").val();
      if (empty(check_terms_condition)) {
         showAlert(t("You must agree to terms and condition"));
         return false;
      }
   }

   $(".frm_register").validate({
      submitHandler: function (form) {
         var params = $(".frm_register").serialize();
         params += "&next_step=" + getStorage("next_step");
         ajaxCall('customerRegister', params);
      }
   });
   $(".frm_register").submit();
};

var showPaymentForm = function () {};

var setDeliveryAddress = function () {
   $(".frm_address").validate({
      submitHandler: function (form) {
         var params = $(".frm_address").serialize();
         ajaxCall('setDeliveryAddress', params);
      }
   });
   $(".frm_address").submit();
};

var printDeliveryAddress = function (address) {
   $(".delivery_address_label").html(address);
};

var setColetaAddress = function () {
   $(".frm_address_coleta").validate({
      submitHandler: function (form) {
         var params = $(".frm_address_coleta").serialize();
         ajaxCall('setColetaAddress', params);
      }
   });
   $(".frm_address_coleta").submit();
};

var printColetaAddress = function (address) {
   $(".coleta_address_label").html(address);
};

var set1ColetaAddress = function () {
   $(".frm_address_1_coleta").validate({
      submitHandler: function (form) {
         var params = $(".frm_address_1_coleta").serialize();
         ajaxCall('set1ColetaAddress', params);
      }
   });
   $(".frm_address_1_coleta").submit();
};

var print1ColetaAddress = function (address) {
   $(".1_coleta_address_label").html(address);
};

var set2ColetaAddress = function () {
   $(".frm_address_2_coleta").validate({
      submitHandler: function (form) {
         var params = $(".frm_address_2_coleta").serialize();
         ajaxCall('set2ColetaAddress', params);
      }
   });
   $(".frm_address_2_coleta").submit();
};

var print2ColetaAddress = function (address) {
   $(".2_coleta_address_label").html(address);
};

var verifyCustomerToken = function () {

   var token = getStorage("token");

   //alert("verify token =>" + token);

   /*if(empty(token)){
      dump("token is empty");
      return;
   }*/

   var ajax_uri = ajax_url + "/verifyCustomerToken/?merchant_keys=" + krms_config.MerchantKeys + "&device_id=" + device_id + "&token=" + token;

   dump(ajax_uri);

   showLoader(true);

   var ajax_token = $.post(ajax_uri, params, function (data) {}, "jsonp")

   ajax_token.done(function (data) {
      dump(data);
      if (data.code == 2) {
         removeStorage("token");
         removeStorage("customer_number");
      }
   });

   ajax_token.always(function (data) {
      showLoader(false);
      dump("always")
   });

   ajax_token.fail(function (jqXHR, textStatus) {
      showLoader(false);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });
};

var initPayment = function () {
   transaction_type = $(".transaction_type").val();
   var payment_provider = $("input[name=payment_provider]:checked").val();
   dump("payment_provider=>" + payment_provider);

   if (empty(payment_provider)) {
      showToast(t("Please select payment"));
      return;
   }

   switch (payment_provider) {
      case "cod":
         /*if (transaction_type=="delivery"){
            showPage("cod_forms.html");
         } else if ( transaction_type=="pickup" ) {
              payNow();
         } else if ( transaction_type=="dinein" ) {
            showPage("dinein_forms.html");
         }*/
         if (transaction_type == "delivery" || transaction_type == "coleta" || transaction_type == "coleta_retorno" || transaction_type == "pre_coleta" || transaction_type == "pre_coleta_retorno" || transaction_type == "prestacao_servico") {
            showPage("cod_forms.html");
         } else {
            payNow();
         }
         break;

         /*case "pyp":             
         case "stp":          
         case "obd":    
           payNow();
         break;*/

      case "ocr":
         showPage("select_creditcards.html");
         break;

      case "pyr":
         showPage("select_payondelivery.html");
         break;

      default:
         //showToast("Please select payment");
         payNow();
         break;
   }
};

var payNow = function (payment_params) {
   transaction_type = $(".transaction_type").val();
   var payment_provider = $("input[name=payment_provider]:checked").val();


   var params = '';
   params = "transaction_type=" + transaction_type;
   params += "&payment_provider=" + payment_provider;

   delivery_date_set = getStorage("delivery_date_set");
   if (!empty(delivery_date_set)) {
      params += '&delivery_date=' + delivery_date_set;
   }

   delivery_time_set = getStorage("delivery_time_set");
   if (!empty(delivery_time_set)) {
      params += '&delivery_time=' + delivery_time_set;
   }

   save_address = getStorage("save_address");
   if (!empty(save_address)) {
      params += '&save_address=1';
   }

   if (!empty(payment_params)) {
      params += "&payment_params=" + payment_params;
   }

   switch (payment_provider) {
      case "cod":
      case "obd":
         if (transaction_type == "delivery" || transaction_type == "coleta" || transaction_type == "coleta_retorno" || transaction_type == "pre_coleta" || transaction_type == "pre_coleta_retorno" || transaction_type == "prestacao_servico") {
            params += '&order_change=' + $("#order_change").val();
         }
         /*if (transaction_type=="dinein"){
            params+= "&"+$( ".frm_dinein").serialize();
         }*/
         break;

      case "ocr":
         var selected_cc = $('.select_cc_list input:checked').val();
         params += "&cc_id=" + selected_cc;
         break;

         /*default:
           showToast("Please select payment");
           return;
         break;*/
   }

   switch (transaction_type) {
      case "dinein":
         params += "&" + $(".frm_dinein").serialize();
         break;

      case "delivery":
         var delivery_asap = document.getElementById('delivery_asap');
         if (!empty(delivery_asap)) {
            params += "&delivery_asap=" + delivery_asap.checked;
         }
         break;
   }

   ajaxCall('payNow', params);

};

var backToHome = function (action) {


   /*setStorage("category_is_delayed",1);
   page_category=1;
   removeStorage('infinite_category');
   
   if(empty(action)){      
      loadPage('splitter.html');
   } else {       
      onsenNavigator.resetToPage('page_home.html',{
         animation : "lift",  
         callback : function(){
         
         }
      });  
   }*/


   page_category = 1;
   setStorage("category_is_delayed", 1);
   onsenNavigator.resetToPage('page_home.html', {
      animation: "lift",
      callback: function () {

         fillUser();

         tabbar_bottom = document.getElementById('tabbar_bottom');
         tabbar_bottom.setActiveTab(0, {
            animation: 'none'
         });

      }
   });


};

var saveChangePassword = function () {
   $(".frm_changepassword").validate({
      submitHandler: function (form) {
         var params = $(".frm_changepassword").serialize();
         ajaxCall('saveChangePassword', params);
      }
   });
   $(".frm_changepassword").submit();
};

var saveProfile = function () {
   $(".frm_profile").validate({
      submitHandler: function (form) {
         var params = $(".frm_profile").serialize();
         ajaxCall('saveProfile', params);
      }
   });
   $(".frm_profile").submit();
};

var receivePush = function () {
   var enabled_push = $("input[name=enabled_push]:checked").val();
   if (empty(enabled_push)) {
      enabled_push = '';
   }
   ajaxCall('savePushSettings', "enabled_push=" + enabled_push);
};

var logout = function () {

   ons.notification.confirm(t("Are you sure?"), {
      title: dialog_title,
      buttonLabels: [t("Cancel"), t("Ok")]
   }).then(function (input) {
      if (input == 1) {
         fbLogout();
         removeStorage("token");
         pushUnregister();

         onsenNavigator.replacePage('login.html', {
            animation: "slide",
         });
      }
   });

};

var initSignup = function (destroy) {
   if (!empty(destroy)) {
      onsenNavigator.replacePage('signup.html', {
         animation: "slide",
      });
   } else {
      removeStorage('next_step');
      showPage('signup.html');
   }
};

var initLogin = function (destroy) {
   if (!empty(destroy)) {
      onsenNavigator.replacePage('login.html', {
         animation: "slide",
      });
   } else {
      removeStorage('next_step');
      showPage('login.html');
   }
};

var login = function () {

   $(".frm_login").validate({
      submitHandler: function (form) {
         var params = $(".frm_login").serialize();
         ajaxCall('login', params);
      },
      messages: {
         email: "x",
         required: "x",
      }
   });
   $(".frm_login").submit();
};

var setMobileNuber = function () {
   $(".frm_setphone").validate({
      submitHandler: function (form) {
         //prefix = $(".prefix").val();
         phone = $(".mobile_number_unmask").val();
         complete_phone = phone;
         popPage();
         $(".contact_phone").val(complete_phone);
      }
   });
   $(".frm_setphone").submit();
};


var cardsAction = function (id, sheet_action) {

   var action = '';
   var page_id = '';

   switch (sheet_action) {
      case "cc":
         action = 'deleteCard';
         page_id = 'creditcards.html';
         break;

      case "address":
         action = 'deleteAddressBook';
         page_id = 'addressbook.html';
         break;
   }

   ons.openActionSheet({
      title: t('What do you want to do?'),
      cancelable: true,
      buttons: [{
            label: t('Edit'),
            icon: 'md-edit'
         },
         {
            label: t('Delete'),
            icon: 'md-delete'
         }
      ]
   }).then(function (index) {
      if (index == 0) {

         onsenNavigator.pushPage(page_id, {
            animation: "slide",
            data: {
               "id": id,
            }
         });

      } else if (index == 1) {
         ons.notification.confirm(t("Are you sure?"), {
            title: dialog_title,
            buttonLabels: [t("Cancel"), t("Ok")]
         }).then(function (input) {
            if (input == 1) {
               ajaxCall(action, "id=" + id);
            }
         });
      }
   });
};

function str_pad(input, pad_length, pad_string, pad_type) {
   var half = '',
      pad_to_go;

   var str_pad_repeater = function (s, len) {
      var collect = '',
         i;

      while (collect.length < len) {
         collect += s;
      }
      collect = collect.substr(0, len);

      return collect;
   };

   input += '';
   pad_string = pad_string !== undefined ? pad_string : ' ';

   if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
      pad_type = 'STR_PAD_RIGHT';
   }
   if ((pad_to_go = pad_length - input.length) > 0) {
      if (pad_type == 'STR_PAD_LEFT') {
         input = str_pad_repeater(pad_string, pad_to_go) + input;
      } else if (pad_type == 'STR_PAD_RIGHT') {
         input = input + str_pad_repeater(pad_string, pad_to_go);
      } else if (pad_type == 'STR_PAD_BOTH') {
         half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
         input = half + input + half;
         input = input.substr(0, pad_length);
      }
   }
   return input;
}

var generateMonth = function () {
   var x;
   html = '<ons-select name="expiration_month" id="expiration_month" class="expiration_month full_width" >';
   for (x = 1; x < 13; x++) {
      month = str_pad(x, 2, "0", 'STR_PAD_LEFT');
      html += '<option value="' + month + '">' + month + '</option>';
   }
   html += '</ons-select>';
   $(".expiration_month_wrap").html(html);
};

var generateYear = function () {
   var x;
   var d = new Date();
   var n = d.getFullYear();
   html = '<ons-select name="expiration_yr" id="expiration_yr" class="expiration_yr full_width" >';
   for (x = 0; x < 13; x++) {
      year = n + x;
      html += '<option value="' + year + '">' + year + '</option>';
   }
   html += '</ons-select>';
   $(".expiration_yr_wrap").html(html);
};

var saveCard = function () {
   $(".frm_creditcard").validate({
      submitHandler: function (form) {
         var params = $(".frm_creditcard").serialize();
         ajaxCall('saveCard', params);
      }
   });
   $(".frm_creditcard").submit();
};

var saveAddressBook = function () {
   $(".frm_addressbook").validate({
      submitHandler: function (form) {
         var params = $(".frm_addressbook").serialize();
         ajaxCall('saveAddressBook', params);
      }
   });
   $(".frm_addressbook").submit();
};


var ajax_request_orders;
var paginate_result = 0;

var infiniteOrders = function (done) {

   dump('infiniteOrders');
   var data = '';
   var ajax_uri = ajax_url + "/getOrders";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&page=" + paginate_count;
   data += "&device_id=" + device_id;

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   dump("paginate_result=>" + paginate_result);
   if (paginate_result == 1) {
      done();
      return;
   }

   data += "&lang=" + getLangCode();

   dump(ajax_uri + "?" + data);

   var ajax_request_orders = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_request_orders != null) {
            dump("request aborted");
            ajax_request_orders.abort();
            clearTimeout(timer);
         } else {
            $(".loader_orders").show();
            timer = setTimeout(function () {
               ajax_request_orders.abort();
               showToast(t('Request taking lot of time 6. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request_orders.done(function (data) {
      paginate_count++;
      dump("done ajax");
      dump(data);
      if (data.code == 1) {
         displayOrders(data.details.data);
         paginate_count++;
         done();
         paginate_result = 0;
      } else {
         done();
         paginate_result = 1;
      }
   });

   /*ALWAYS*/
   ajax_request_orders.always(function () {
      dump("ajax always");
      $(".loader_orders").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request_orders.fail(function (jqXHR, textStatus) {
      $(".loader_orders").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });


};


var orderAction = function (order_id, show_cancel_order, add_review) {
   dump("order_id=>" + order_id);
   dump("show_cancel_order=>" + show_cancel_order);
   dump("add_review=>" + add_review);

   var buttons_actions = [{
         label: t('View Order'),
         icon: 'md-file'
      },
      {
         label: t('Re-order'),
         icon: 'md-time-restore-setting'
      }, {
         label: t('Track order'),
         icon: 'ion-android-bicycle'
      },
      {
         label: t('Cancel this order'),
         icon: 'ion-android-cancel',
         modifier: 'action_sheet_cancel_order'
      },
      {
         label: t('Add review'),
         icon: 'ion-ios-star',
         modifier: 'action_sheet_add_review'
      }
   ];

   ons.openActionSheet({
      title: t('What do you want to do?'),
      cancelable: true,
      buttons: buttons_actions
   }).then(function (index) {
      dump("index =>" + index);

      switch (index) {
         case 0:
            onsenNavigator.pushPage("order_details.html", {
               animation: "slide",
               data: {
                  "id": order_id,
               }
            });
            break;

         case 1:
            ajaxCall('reOrder', "id=" + order_id);
            break;

         case 2:
            onsenNavigator.pushPage("track_order.html", {
               animation: "none",
               data: {
                  "order_id": order_id,
               }
            });
            break;

         case 3:
            ons.notification.confirm(t("Are you sure?"), {
               title: dialog_title,
               buttonLabels: [t("Cancel"), t("Ok")]
            }).then(function (input) {
               if (input == 1) {
                  ajaxCall("CancelOrder", "order_id=" + order_id);
               }
            });
            break;

         case 4:
            onsenNavigator.pushPage("add_review.html", {
               animation: "none",
               data: {
                  "order_id": order_id,
               }
            });
            break;
      }
      /*end switch*/

   });

   if (!show_cancel_order) {
      $(".action-sheet-button--action_sheet_cancel_order").hide();
   }
   if (!add_review) {
      $(".action-sheet-button--action_sheet_add_review").hide();
   }
};

infiniteReview = function (done) {
   dump("infiniteReview");

   var data = '';
   var ajax_uri = ajax_url + "/loadReviews";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&page=" + paginate_count;
   data += "&device_id=" + device_id;
   data += "&limit=10";

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   dump("paginate_result=>" + paginate_result);
   if (paginate_result == 1) {
      done();
      return;
   }

   data += "&lang=" + getLangCode();

   dump(ajax_uri + "?" + data);

   var ajax_request_orders = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_request_orders != null) {
            dump("request aborted");
            ajax_request_orders.abort();
            clearTimeout(timer);
         } else {
            $(".loader_orders").show();
            timer = setTimeout(function () {
               ajax_request_orders.abort();
               showToast(t('Request taking lot of time 7. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request_orders.done(function (data) {
      paginate_count++;
      dump("done ajax");
      dump(data);
      if (data.code == 1) {
         displayReviews(data.details.data);
         paginate_count++;
         done();
         paginate_result = 0;
      } else {
         done();
         paginate_result = 1;
      }
   });

   /*ALWAYS*/
   ajax_request_orders.always(function () {
      dump("ajax always");
      $(".loader_orders").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request_orders.fail(function (jqXHR, textStatus) {
      $(".loader_orders").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });

};


reviewConfirmDelete = function (id) {
   ons.notification.confirm(t("Are you sure?"), {
      title: dialog_title,
      buttonLabels: [t("Cancel"), t("Ok")]
   }).then(function (input) {
      if (input == 1) {
         ajaxCall("deleteReview", "id=" + id);
      }
   });
};

showEditForm = function (id) {

   onsenNavigator.pushPage("edit_review.html", {
      animation: "slide",
      data: {
         "id": id,
      }
   });

};


var updateReview = function () {
   $(".frm_review").validate({
      submitHandler: function (form) {
         var params = $(".frm_review").serialize();
         ajaxCall('updateReview', params);
      }
   });
   $(".frm_review").submit();
};

saveBooking = function () {
   $(".frm_book").validate({
      submitHandler: function (form) {
         var params = $(".frm_book").serialize();
         ajaxCall('saveBooking', params);
      }
   });
   $(".frm_book").submit();
};


var infiniteBooking = function (done) {

   dump('infiniteBooking');
   var data = '';
   var ajax_uri = ajax_url + "/loadBooking";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&page=" + paginate_count;
   data += "&device_id=" + device_id;

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   data += "&lang=" + getLangCode();

   dump("paginate_result=>" + paginate_result);
   if (paginate_result == 1) {
      done();
      return;
   }


   dump(ajax_uri + "?" + data);

   var ajax_request_orders = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_request_orders != null) {
            dump("request aborted");
            ajax_request_orders.abort();
            clearTimeout(timer);
         } else {
            $(".loader_booking").show();
            timer = setTimeout(function () {
               ajax_request_orders.abort();
               showToast(t('Request taking lot of time 8. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request_orders.done(function (data) {
      paginate_count++;
      dump("done ajax");
      dump(data);
      if (data.code == 1) {
         displayBooking(data.details.data);
         paginate_count++;
         done();
         paginate_result = 0;
      } else {
         done();
         paginate_result = 1;
      }
   });

   /*ALWAYS*/
   ajax_request_orders.always(function () {
      dump("ajax always");
      $(".loader_booking").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request_orders.fail(function (jqXHR, textStatus) {
      $(".loader_booking").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });


};

vDinein = function () {
   $(".frm_dinein").validate({
      submitHandler: function (form) {
         //payNow();
         setStorage("customer_number", $(".contact_phone").val());
         next_forms = getStorage("next_forms");
         showPage(next_forms);
      }
   });
   $(".frm_dinein").submit();

};


initAddress = function () {
   has_addressbook = $(".has_addressbook").val();
   if (has_addressbook == 1) {
      showPage('address_form_select.html');
   } else {
      showPage('address_form.html');
   }
};

initColetaAddress = function () {
   has_addressbook = $(".has_addressbook").val();
   if (has_addressbook == 1) {
      showPage('address_coleta_form_select.html');
   } else {
      showPage('address_coleta_form.html');
   }
};

init1ColetaAddress = function () {
   has_addressbook = $(".has_addressbook").val();
   if (has_addressbook == 1) {
      showPage('address_1_coleta_form_select.html');
   } else {
      showPage('address_1_coleta_form.html');
   }
};

init2ColetaAddress = function () {
   has_addressbook = $(".has_addressbook").val();
   if (has_addressbook == 1) {
      showPage('address_2_coleta_form_select.html');
   } else {
      showPage('address_2_coleta_form.html');
   }
};

setAddressBook = function () {
   $(".frm_address_form_select").validate({
      submitHandler: function (form) {

         setStorage("customer_number", $(".contact_phone").val());

         var params = $(".frm_address_form_select").serialize();
         ajaxCall('setAddressBook', params);
      }
   });
   $(".frm_address_form_select").submit();
};

setColetaAddressBook = function () {
   $(".frm_address_coleta_form_select").validate({
      submitHandler: function (form) {

         setStorage("customer_number", $(".contact_phone").val());

         var params = $(".frm_address_coleta_form_select").serialize();
         ajaxCall('setColetaAddressBook', params);
      }
   });
   $(".frm_address_coleta_form_select").submit();
};

set1ColetaAddressBook = function () {
   $(".frm_address_1_coleta_form_select").validate({
      submitHandler: function (form) {

         setStorage("customer_number", $(".contact_phone").val());

         var params = $(".frm_address_1_coleta_form_select").serialize();
         ajaxCall('set1ColetaAddressBook', params);
      }
   });
   $(".frm_address_1_coleta_form_select").submit();
};

set2ColetaAddressBook = function () {
   $(".frm_address_2_coleta_form_select").validate({
      submitHandler: function (form) {

         setStorage("customer_number", $(".contact_phone").val());

         var params = $(".frm_address_2_coleta_form_select").serialize();
         ajaxCall('set2ColetaAddressBook', params);
      }
   });
   $(".frm_address_2_coleta_form_select").submit();
};

initPaypal = function (resp) {

   try {

      var mode = resp.data.mode;
      var total = resp.data.total;
      var client_id = resp.data.client_id;
      var currency = resp.currency;
      var order_id = resp.order_id;

      paypal.Button.render({

         env: mode, // sandbox | production

         locale: 'en_US',

         style: {
            size: 'responsive'
         },

         // PayPal Client IDs - replace with your own
         // Create a PayPal app: https://developer.paypal.com/developer/applications/create
         client: {
            sandbox: client_id,
            production: client_id
         },

         // Show the buyer a 'Pay Now' button in the checkout flow
         commit: true,

         // payment() is called when the button is clicked
         payment: function (data, actions) {

            // Make a call to the REST api to create the payment
            return actions.payment.create({
               payment: {
                  transactions: [{
                     amount: {
                        total: total,
                        currency: currency
                     }
                  }]
               }
            });
         },

         // onAuthorize() is called when the buyer approves the payment
         onAuthorize: function (data, actions) {

            dump(data);
            params = "&intent=" + data.intent;
            //params+= "&orderID="+ data.orderID;
            params += "&payerID=" + data.payerID;
            params += "&paymentID=" + data.paymentID;
            params += "&paymentToken=" + data.paymentToken;
            params += "&order_id=" + order_id;
            params += "&total=" + total;

            // Make a call to the REST api to execute the payment
            return actions.payment.execute().then(function () {
               //payNow(params);
               ajaxCall("payPaypal", params);
            });
         },

         onError: function (err) {
            showAlert("Payment error" + JSON.stringify(err));
         }

      }, '#paypal-button-container');

   } catch (err) {
      showAlert(err.message);
   }
};

setSelectedCC = function () {
   var selected_cc = $('.select_cc_list input:checked').val();
   if (!empty(selected_cc)) {
      payNow();
   } else {
      showToast(t("Please select your credit card"));
   }
};

var stripe;
var stripe_card;

initStripe = function (data) {

   stripe = Stripe(data.credentials.publish_key);
   var elements = stripe.elements();

   var style = {
      base: {
         color: '#32325d',
         lineHeight: '18px',
         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
         fontSmoothing: 'antialiased',
         fontSize: '16px',
         '::placeholder': {
            color: '#aab7c4'
         }
      },
      invalid: {
         color: '#fa755a',
         iconColor: '#fa755a'
      }
   };

   stripe_card = elements.create('cardNumber', {
      style: style
   });
   stripe_card.mount('#card-element');

   var expirydate = elements.create('cardExpiry', {
      style: style
   });
   expirydate.mount('#card-expirydate');

   var card_cvc = elements.create('cardCvc', {
      style: style
   });
   card_cvc.mount('#card-cvc');

};

payStripe = function () {
   $("#card-errors").html('');
   showLoader(true);
   stripe.createToken(stripe_card).then(function (result) {
      showLoader(false);
      if (result.error) {
         // Inform the user if there was an error.
         var errorElement = document.getElementById('card-errors');
         errorElement.textContent = result.error.message;
      } else {
         // Send the token to your server.        
         //alert(result.token.id);
         //payNow('&stripe_token=' + result.token.id );
         ajaxCall("payStripe", 'order_id=' + $('.order_id').val() + "&stripe_token=" + result.token.id);
      }
   });
};


/*PAYMENT NEXT STEP*/
payNowNextStep = function (data) {

   var options = {
      "order_id": data.details.order_id,
      "total_amount": data.details.total_amount,
      'message': data.msg
   };

   switch (data.details.next_step) {
      case "receipt":
         onsenNavigator.pushPage('receipt.html', {
            animation: "slide",
            data: options
         });
         break;

      case "init_stp":
         onsenNavigator.pushPage('stripe.html', {
            animation: "slide",
            data: options
         });
         break;

      case "init_pyp":
         onsenNavigator.pushPage('paypal.html', {
            animation: "slide",
            data: options
         });
         break;

      case "init_rzr":

         var options = {
            description: data.details.payment_description,
            //image: 'https://i.imgur.com/3g7nmJC.png',
            currency: data.details.currency_code,
            key: data.details.provider_credentials.key_id,
            //order_id: data.details.order_id,
            amount: data.details.total_amount_by_100,
            name: data.details.merchant_name,
            prefill: {
               email: data.details.client_info.email_address,
               contact: data.details.client_info.contact_phone,
               name: data.details.client_info.first_name + " " + data.details.client_info.last_name
            },
            theme: {
               color: '#F37254'
            }
         };

         //alert(JSON.stringify(options));  

         if (krms_config.debug) {
            ajaxCall('razorPaymentSuccessfull', 'payment_id=pay_debug_1234566&order_id=' + data.details.order_id);
         } else {
            try {
               RazorpayCheckout.on('payment.success', function (success) {
                  //alert('payment_id: ' + success.razorpay_payment_id);
                  //var orderId = success.razorpay_order_id;
                  /*var signature = success.razorpay_signature;
                  alert('orderId: ' + orderId);*/
                  ajaxCall('razorPaymentSuccessfull', 'payment_id=' + success.razorpay_payment_id + '&order_id=' + data.details.order_id);
               });

               RazorpayCheckout.on('payment.cancel', function (error) {
                  if (error.code != 2 || error.code != 0) {
                     showAlert(error.description + ' (Error ' + error.code + ')');
                  }
               });
               RazorpayCheckout.open(options);
            } catch (err) {
               showAlert(err.message);
            }
         }
         break;

      case "init_webview":
         setStorage("global_receipt_order_id", data.details.order_id);
         setStorage("global_receipt_amount_pay", data.details.total_amount);
         setStorage("global_receipt_message", data.msg);

         payWebview(data.details.redirect_url);
         break;

      case "init_atz":
         onsenNavigator.pushPage('authorize_form.html', {
            animation: "slide",
            data: {
               order_id: data.details.order_id
            }
         });
         break;

      default:
         showAlert(t("The payment method that you choose is not available in mobileapp"));
         break;
   }
};

showReceipt = function (data) {
   var options = {
      "order_id": data.details.order_id,
      "total_amount": data.details.total_amount,
      'message': data.msg
   };
   onsenNavigator.pushPage('receipt.html', {
      animation: "slide",
      data: options
   });
};


setSelectedCards = function () {
   var selected_card = $('.select_card_type_list input:checked').val();
   if (!empty(selected_card)) {
      payNow("&selected_card=" + selected_card);
   } else {
      showToast(t("Please select your credit card type"));
   }
};

getPhoneGapPath = function () {
   var path = window.location.pathname;
   path = path.substr(path, path.length - 10);
   return path;
};

playSound = function () {
   //showToast("playsound");   
   try {
      url = 'file:///android_asset/www/beep.wav';
      if (device_platform == "iOS") {
         url = "beep.wav";
      }
      //alert(url);
      my_media = new Media(url,
         function () {
            dump("playAudio():Audio Success");
            my_media.stop();
            my_media.release();
         },
         function (err) {
            dump("playAudio():Audio Error: " + err);
         }
      );
      my_media.play({
         playAudioWhenScreenIsLocked: true
      });
      my_media.setVolume('1.0');

   } catch (err) {
      alert(err.message);
   }
};


var displayMap = function (div, data, map_type) {

   dump('display_map');
   dump(data);
   dump("map_type=>" + map_type);

   settings = AppSettings();

   if (settings.map_provider == "mapbox") {
      switch (map_type) {
         case "map_select":
            mapboxLocationMap(div, {
               lat: data.details.data.latitude,
               lng: data.details.data.lontitude,
               show_info: true,
               info_html: data.details.data.info_window,
               use_icon: true,
               icon: settings.map_icon_pin,
               draggable: true
            });
            break;

         default:
            mapboxLocationMap(div, {
               lat: data.details.data.latitude,
               lng: data.details.data.lontitude,
               show_info: true,
               info_html: data.details.data.info_window,
               use_icon: true,
               icon: settings.map_icon_pin,
               draggable: false
            });
            break;
      }
      return;
   }

   try {

      options = {
         div: div,
         lat: data.details.data.latitude,
         lng: data.details.data.lontitude,
         disableDefaultUI: true,
         styles: [{
            stylers: [{
               "saturation": -100
            }, {
               "lightness": 0
            }, {
               "gamma": 1
            }]
         }],
      };

      if (map_type == "map_select") {
         options['dragend'] = function (e) {
            var location = map.getCenter();

            $(".selected_lat").val(location.lat());
            $(".selected_lng").val(location.lng());

            map.removeMarkers();
            marker = map.addMarker({
               lat: location.lat(),
               lng: location.lng(),
               infoWindow: infoWindow,
               icon: settings.map_icon_pin
            });

         };
      }

      dump(options);

      map = new GMaps(options);

      info_html = data.details.data.info_window;

      var infoWindow = new google.maps.InfoWindow({
         content: info_html
      });

      marker = map.addMarker({
         lat: data.details.data.latitude,
         lng: data.details.data.lontitude,
         infoWindow: infoWindow,
         icon: settings.map_icon_pin
      });

      infoWindow.open(map, marker);

      var latlng = new google.maps.LatLng(data.details.data.latitude, data.details.data.lontitude);
      map_bounds.push(latlng);

   } catch (err) {
      dump(err.message);
   }
};

checkLocation = function (action) {
   if (krms_config.debug) {
      if (action == "1") {
         getRoute();
      } else if (action == "2") {
         initMaptSelect('.map_canvas2');
      } else if (action == "3") {
         getRoute2();
      } else if (action == "4") {
         initMaptSelect('.map_delivery');
      }
      return;
   }

   try {
      cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
         if (authorized) {
            cordova.plugins.locationAccuracy.request(function (success) {
               switch (action) {
                  case 1:
                  case "1":
                     getRoute();
                     break;

                  case 3:
                  case "3":
                     getRoute2();
                     break;

                  case 2:
                  case "2":
                     initMaptSelect('.map_canvas2');
                     break;

                  case 4:
                  case "4":
                     initMaptSelect('.map_delivery');
                     break;
               }
            }, function (error) {
               if (error.code == 4) {
                  checkLocation(action);
               } else {
                  showAlert(error.message);
               }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_BALANCED_POWER_ACCURACY);

         } else {

            cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {

               if (device_platform == "iOS") {
                  switch (status) {
                     case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                        showAlert(t("Permission not requested"));
                        break;
                     case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        showAlert(t("Permission denied"));
                        break;
                     case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        //showAlert("Permission granted always");
                        checkLocation(action);
                        break;
                     case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                        //console.log("Permission granted only when in use");
                        checkLocation(action);
                        break;
                  }
               } else {
                  switch (status) {
                     case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                        showAlert(t("Permission not requested"));
                        break;
                     case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        //console.log("Permission granted");
                        checkLocation(action);
                        break;
                     case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        showAlert(t("Permission denied"));
                        break;
                     case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        showAlert(t("Permission permanently denied"));
                        break;
                  }
               }

            }, function (error) {
               showAlert(error);
            }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
         }
      }, function (error) {
         showAlert(t("The following error occurred") + ": " + error);
      });
   } catch (err) {
      showAlert(err.message);
   }
};

getRoute = function () {

   showLoader(true);
   var speed_dial = document.querySelector('ons-speed-dial');
   speed_dial.hideItems();

   settings = AppSettings();
   if (settings.map_provider == "mapbox") {
      mapboxRoute();
      return;
   }

   navigator.geolocation.getCurrentPosition(function (position) {
         lat = position.coords.latitude;
         lng = position.coords.longitude;

         var latlng = new google.maps.LatLng(lat, lng);
         map_bounds.push(latlng);

         marker = map.addMarker({
            lat: lat,
            lng: lng,
            infoWindow: {
               content: t("You are here")
            }
         });

         var origin_lat = $(".map_lat").val();
         var origin_lng = $(".map_lng").val();

         map.cleanRoute();

         map.travelRoute({
            origin: [lat, lng],
            destination: [origin_lat, origin_lng],
            travelMode: 'driving',
            step: function (e) {
               $('#map_instructions').append('<li>' + e.instructions + '</li>');
               $('#map_instructions li:eq(' + e.step_number + ')').delay(350 * e.step_number).fadeIn(200, function () {
                  map.setCenter(e.end_location.lat(), e.end_location.lng());
                  map.drawPolyline({
                     path: e.path,
                     strokeColor: '#131540',
                     strokeOpacity: 0.6,
                     strokeWeight: 6
                  });
               });
            }

         });

         showLoader(false);
      },
      function (error) {
         showLoader(false);
         showToast(error.message);
      }, {
         enableHighAccuracy: getLocationAccuracy(),
         maximumAge: Infinity,
         timeout: 60000
      });
};

setMapCenter = function () {

   var speed_dial = document.querySelector('ons-speed-dial');
   speed_dial.hideItems();

   settings = AppSettings();
   switch (settings.map_provider) {
      case "mapbox":
         centerMapbox();
         break;

      default:
         map.fitLatLngBounds(map_bounds);
         break;
   }
};

fbInit = function () {
   try {
      facebookConnectPlugin.getLoginStatus(function (status) {
         //alert(JSON.stringify(status)); 
         if (status.status == "connected") {
            fbRegister(status.authResponse.userID);
         } else {
            fbLogin();
         }
      }, function (error) {
         showAlert(t("an error has occured") + " " + JSON.stringify(error));
      });
   } catch (err) {
      showAlert(err.message);
   }
};

fbLogin = function () {
   facebookConnectPlugin.login(["public_profile", "email"], function (data) {
      //alert(JSON.stringify(data));      
      fbRegister(data.authResponse.userID);
   }, function (error) {
      showAlert(t("an error has occured") + " " + JSON.stringify(error));
   });
};

fbRegister = function (userID) {
   facebookConnectPlugin.api(userID + "/?fields=id,email,first_name,last_name", ["public_profile", "email"],
      function (data) {
         //alert(JSON.stringify(data)); 

         params = "email_address=" + data.email;
         params += "&first_name=" + data.first_name;
         params += "&last_name=" + data.last_name;
         params += "&fb_id=" + data.id;
         params += "&next_step=" + getStorage("next_step");

         ajaxCall('fbRegister', params);

      },
      function (error) {
         //showToast("an error has occured") + " "+ alert(JSON.stringify(error));
         showAlert(t("an error has occured") + " " + JSON.stringify(error));
      });
};

fbLogout = function () {

   try {
      facebookConnectPlugin.getLoginStatus(function (status) {
         //alert(JSON.stringify(status)); 
         if (status.status == "connected") {
            facebookConnectPlugin.logout(function (success) {
               //alert(JSON.stringify(success)); 
            }, function (error) {});
         }
      }, function (error) {});

   } catch (err) {
      //alert(err.message);
   }
};

var verificationMobile = function () {
   $(".frm_verification_mobile").validate({
      submitHandler: function (form) {
         var params = $(".frm_verification_mobile").serialize();
         ajaxCall('verificationMobile', params);
      }
   });
   $(".frm_verification_mobile").submit();
};


var verificationEmail = function () {
   $(".frm_verification_email").validate({
      submitHandler: function (form) {
         var params = $(".frm_verification_email").serialize();
         ajaxCall('verificationEmail', params);
      }
   });
   $(".frm_verification_email").submit();
};

getAppSettings = function () {

   var modal = document.querySelector('#settings_loader');
   var data = '';
   var ajax_uri = ajax_url + "/getAppSettings";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&device_id=" + device_id;
   data += "&device_platform=" + device_platform;

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   data += "&lang=" + getLangCode();

   dump(ajax_uri + "?" + data);

   var ajax_settings = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_settings != null) {
            dump("request aborted");
            ajax_settings.abort();
            clearTimeout(timer3);
         } else {
            modal.show();
            timer3 = setTimeout(function () {
               $("#settings_error").show();
               ajax_settings.abort();
               showToast(t('Request taking lot of time 9. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_settings.done(function (data) {
      dump(data);
      if (data.code == 1) {
         setStorage("app_settings", JSON.stringify(data.details));
         dict = data.details.dict;
      } else {
         setStorage("app_settings", '');
      }

      setTimeout(function () {
         isUserLoggedIn();
      }, 1000);

      ajax_settings = null;
      clearTimeout(timer3);
   });

   ajax_settings.always(function () {
      dump("ajax_settings always");
      modal.hide();
      ajax_settings = null;
   });

   ajax_settings.fail(function (jqXHR, textStatus) {
      $("#settings_error").show();
      ajax_settings = null;
      clearTimeout(timer3);
      showToast(t("Failed") + ": " + textStatus);
   });

};

AppSettings = function () {
   app_settings = getStorage("app_settings");
   if (!empty(app_settings)) {
      app_settings = JSON.parse(app_settings);
      return app_settings;
   }
   return false;
};

openTerms = function () {
   if (settings = AppSettings()) {
      url = settings.terms_customer_url;
      if (!empty(url)) {
         openUrl(url);
      }
   }
};

openUrl = function (data) {
   try {
      var iab = cordova.InAppBrowser;
      iab.open(data, '_system');
   } catch (err) {
      window.open(data);
   }
};

submitCOD = function () {
   $(".frm_cod_forms").validate({
      submitHandler: function (form) {
         payNow();
      }
   });
   $(".frm_cod_forms").submit();
};

getSMSCode = function () {
   ajaxCall("requestSMScode", "sms_order_session=" + $(".sms_order_session").val());
};

verifyOrderSMSCODE = function () {
   $(".frm_order_sms").validate({
      submitHandler: function (form) {
         var params = $(".frm_order_sms").serialize();
         ajaxCall('verifyOrderSMSCODE', params);
      }
   });
   $(".frm_order_sms").submit();
};

applyTips = function () {
   ajaxCall('applyTips', 'tips=' + $(".tips").val());
};

removeTip = function () {
   ajaxCall('removeTip', '');
};

isHidePrice = function () {
   website_hide_foodprice = false;
   if (settings = AppSettings()) {
      if (settings.website_hide_foodprice == "yes") {
         website_hide_foodprice = true;
      }
   }
   return website_hide_foodprice;
};

showSearchBar = function () {
   $("#search_order_value").attr("placeholder", translator.get("Enter Order ID"));
   $("#orders .tohide").hide();
   $("#orders .search_toolbar").show();
};

hideSearchBar = function () {
   $("#orders .tohide").show();
   $("#orders .search_toolbar").hide();
   ajaxCall('getOrders', '');
};

searchOrder = function () {
   search_order_value = $("#search_order_value").val();
   if (!empty(search_order_value)) {
      ajaxCall('getOrders', 'order_id=' + search_order_value);
   } else {
      showToast(t("Order id is required"));
   }
};

showOrderHistory = function (order_id) {
   var dialog = document.getElementById('dialog_order_history');
   if (dialog) {
      $(".order_id").val(order_id);
      dialog.show();
   } else {
      ons.createElement('dialog_order_history.html', {
         append: true
      }).then(function (dialog) {
         $(".order_id").val(order_id);
         dialog.show();
      });
   }
};


setLanguage = function (language_code) {
   dump(language_code);

   old_lang = getStorage("lang");
   if (!empty(old_lang)) {
      setStorage("old_lang", old_lang);
   }

   setStorage("lang", language_code);
   translator.lang(language_code);
   /*var tab='';
         tab+='<ons-tabbar id="tabbar_bottom"  position="bottom">';
       tab+='<ons-tab page="splitter.html" label="'+ translator.get("Food") +'" icon="md-local-dining" ></ons-tab>';
       tab+='<ons-tab page="reviews.html" label="'+ translator.get("Reviews") +'" icon="md-star" ></ons-tab> ';
       tab+='<ons-tab page="orders.html" label="'+ translator.get("Orders") +'" icon="md-reorder" ></ons-tab>';
       tab+='<ons-tab page="profile_menu.html" label="'+ translator.get("You") +'" icon="fa-user" ></ons-tab>';
       tab+='<ons-tab label="'+ translator.get("Cart") +'" icon="md-shopping-cart" onclick="showCart()" class="tabb_cart" badge="" ></ons-tab>';
     tab+='</ons-tabbar>';      
   $(".home_tabbar").html(tab);*/
};

translatePage = function () {

   lang = getLangCode();
   dump("translatePage=>" + lang);
   //dump(dict);


   translator = $('body').translate({
      lang: lang,
      t: dict
   });

   jQuery.extend(jQuery.validator.messages, {
      required: t("This field is required."),
      email: t("Please enter a valid email address."),
      number: t("Please enter a valid number")
   });
};

getLangCode = function () {
   lang = '';
   if (settings = AppSettings()) {
      if (!empty(settings.lang)) {
         lang = settings.lang;
      }
   }
   lang_storage = getStorage("lang");
   if (!empty(lang_storage)) {
      lang = lang_storage;
   }
   return lang;
};

/*function t*/
t = function (data) {
   return translator.get(data);
};


showMobileCode = function () {
   var dialog = document.getElementById('dialog_mobilecode_list');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_mobilecode_list.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

setPrefix = function (data) {
   $(".prefix").val(data);
   var dialog = document.getElementById('dialog_mobilecode_list');
   dialog.hide();
};

placeholder = function (field, value) {
   $(field).attr("placeholder", t(value));
};


dialogInvalidKey = function (data) {
   var dialog = document.getElementById('dialog_invalidkey');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_invalidkey.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

dialogNoNet = function (data) {
   var dialog = document.getElementById('dialog_no_net');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_no_net.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

getLocationAccuracy = function () {
   if (settings = AppSettings()) {
      if (!empty(settings.singleapp_location_accuracy)) {
         return settings.singleapp_location_accuracy;
      }
   }
   return false;
};

openLink = function (data) {
   switch (data) {
      case 1:
         if (settings = AppSettings()) {
            url = settings.singleapp_help_url;
            openUrl(url);
         }
         break;

      case 2:
         if (settings = AppSettings()) {
            url = settings.singleapp_terms_url;
            openUrl(url);
         }
         break;

      case 3:
         if (settings = AppSettings()) {
            url = settings.singleapp_privacy_url;
            openUrl(url);
         }
         break;
   }
};

requestForgotPass = function () {
   $(".frm_forgot_pass").validate({
      submitHandler: function (form) {
         var params = $(".frm_forgot_pass").serialize();
         ajaxCall('requestForgotPass', params);
      }
   });
   $(".frm_forgot_pass").submit();
};


var infiniteNotification = function (done) {

   dump('infiniteNotification');
   var data = '';
   var ajax_uri = ajax_url + "/loadNotification";
   data += "merchant_keys=" + krms_config.MerchantKeys;
   data += "&page=" + paginate_count;
   data += "&device_id=" + device_id;

   token = getStorage("token");
   if (!empty(token)) {
      data += "&token=" + token;
   }

   data += "&lang=" + getLangCode();

   dump("paginate_result=>" + paginate_result);
   if (paginate_result == 1) {
      done();
      return;
   }


   dump(ajax_uri + "?" + data);

   var ajax_request_orders = $.ajax({
      url: ajax_uri,
      method: "GET",
      data: data,
      dataType: "jsonp",
      timeout: 20000,
      crossDomain: true,
      beforeSend: function (xhr) {
         if (ajax_request_orders != null) {
            dump("request aborted");
            ajax_request_orders.abort();
            clearTimeout(timer);
         } else {
            $(".loader_notification").show();
            timer = setTimeout(function () {
               ajax_request_orders.abort();
               showToast(t('Request taking lot of time 10. Please try again'));
            }, 20000);
         }
      }
   });

   ajax_request_orders.done(function (data) {
      paginate_count++;
      dump("done ajax");
      dump(data);
      if (data.code == 1) {
         displayNotification(data.details.data);
         paginate_count++;
         done();
         paginate_result = 0;
      } else {
         done();
         paginate_result = 1;
      }
   });

   /*ALWAYS*/
   ajax_request_orders.always(function () {
      dump("ajax always");
      $(".loader_notification").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
   });

   /*FAIL*/
   ajax_request_orders.fail(function (jqXHR, textStatus) {
      $(".loader_notification").hide();
      ajax_request_orders = null;
      clearTimeout(timer);
      showToast(t("Failed") + ": " + textStatus);
      dump("failed ajax " + textStatus);
   });


};

closeapp = function () {
   if (navigator.app) {
      navigator.app.exitApp();
   } else if (navigator.device) {
      navigator.device.exitApp();
   } else {
      window.close();
   }
};

handleNotification = function (data) {
   //alert(JSON.stringify(data));
   var push_type = data.additionalData.push_type;

   notification_count = 0;
   var count = getStorage("notification_count");
   if (!empty(count)) {
      notification_count = parseInt(count) + 1;
   } else {
      notification_count = 1;
   }

   setStorage("notification_count", notification_count);
   $(".notification_count").html(notification_count);

   showToast(data.title + "\n" + data.message);
};

showNotificationPage = function () {
   showPage('notification.html');
   removeStorage('notification_count');
   $(".notification_count").html('');
};

showDeviceID = function () {
   showPage("device_id.html");
};

initMaptSelect = function (map_div) {

   navigator.geolocation.getCurrentPosition(function (position) {
         lat = position.coords.latitude;
         lng = position.coords.longitude;

         data = {
            details: {
               data: {
                  latitude: lat,
                  lontitude: lng,
                  info_window: t("You are here")
               }
            }
         };

         $(".selected_lat").val(lat);
         $(".selected_lng").val(lng);

         dump(data);
         //displayMap('.map_canvas2', data ,'map_select');
         displayMap(map_div, data, 'map_select');

      },
      function (error) {
         showLoader(false);
         showToast(error.message);
      }, {
         enableHighAccuracy: getLocationAccuracy(),
         maximumAge: Infinity,
         timeout: 60000
      });
};

geoCode = function () {
   ajaxCall("geoCode", "lat=" + $(".selected_lat").val() + "&lng=" + $(".selected_lng").val());
};

initImageLoaded = function () {

   $('.loaded').removeClass('loaded');

   $('.image_loaded').imagesLoaded()
      .always(function (instance) {
         //dump('always loaded');
      })
      .done(function (instance) {
         console.log('all images successfully loaded');
      })
      .fail(function () {
         //console.log('all images loaded, at least one is broken');
      })
      .progress(function (instance, image) {
         var result = image.isLoaded ? 'loaded' : 'broken';
         //console.log( 'image is ' + result + ' for ' + image.img.src );
         image.img.parentNode.className = image.isLoaded ? 'loaded' : 'is_broken';
      });
};


pushUnregister = function () {

   try {
      push_handle.unregister(function () {
         //alert('unregister ok');
         setStorage("push_unregister", 1);
      }, function (error) {
         //alert('unregister error');
      });

   } catch (err) {
      //alert(err.message);
   }
};

handlePushRegister = function () {
   push_unregister = getStorage("push_unregister");
   //alert("push_unregister =>" + push_unregister);
   if (push_unregister == 1 || push_unregister == "1") {

      //alert('register again');    
      removeStorage("push_unregister");

      try {

         var old_device_id = device_id;

         push_handle = PushNotification.init({
            android: {
               sound: "true",
               clearBadge: "true"
            },
            browser: {
               pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
               alert: "true",
               badge: "true",
               sound: "true",
               clearBadge: "true"
            },
            windows: {}
         });

         push_handle.on('registration', function (data) {
            device_id = data.registrationId;
            ajaxCall2('updateDeviceID', 'device_id=' + device_id + "&old_device_id=" + old_device_id);
         });

         push_handle.on('notification', function (data) {
            //alert(JSON.stringify(data)); 

            if (data.additionalData.foreground) {
               playSound();
            }

            handleNotification(data);

         });

         PushNotification.createChannel(function () {
            //alert('create channel succces');
         }, function () {
            //alert('create channel failed');
         }, {
            id: 'kmrs_singleapp',
            description: 'singleapp app channel',
            importance: 5,
            vibration: true,
            sound: 'beep'
         });

         push_handle.on('error', function (e) {
            alert(e.message);
         });

      } catch (err) {
         alert(err.message);
      }

   }
};


translateTab = function () {
   dump('translateTab');
   $.each($(".tabbar__item"), function (key, val) {
      object = $(this).find(".tabbar__label");
      new_label = translator.get(object.html());
      object.html(new_label);
   });
   dump('end translateTab');
};

/*
VERSION 1.1
*/


getRoute2 = function () {

   var origin_lat = $(".map_lat").val();
   var origin_lng = $(".map_lng").val();

   try {

      launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function (isAvailable) {
         var app;
         if (isAvailable) {
            app = launchnavigator.APP.GOOGLE_MAPS;
         } else {
            //console.warn("Google Maps not available - falling back to user selection");
            app = launchnavigator.APP.USER_SELECT;
         }
         launchnavigator.navigate([origin_lat, origin_lng], {
            app: app
         });
      });

   } catch (err) {
      dump(err);
   }
};


/*VERSION 1.1*/

setAsap = function () {
   var delivery_asap = document.getElementById('delivery_asap');
   is_selected = delivery_asap.checked;
   if (is_selected == "true" || is_selected == true) {
      $(".delivery_time").val('');
      $(".delivery_time_label").html('');
   } else {

   }
};

redeemPoints = function () {
   redeem_points = $(".redeem_points").val();
   if (!empty(redeem_points)) {
      ajaxCall("applyRedeemPoints", "points=" + redeem_points);
   } else {
      showToast(t("Please enter points"));
   }
};

removePoints = function () {
   ajaxCall("removePoints", '');
};

/*END VERSION 1.1*/


/*VERSION 1.2*/

dialogError = function (data) {
   var dialog = document.getElementById('dialog_error');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('dialog_error.html', {
         append: true
      }).then(function (dialog) {
         dialog.show();
      });
   }
};

fillCountryList = function (data, country_code) {
   if (!empty(data)) {
      var html = '';
      html += '<ons-icon class="stic-drop-down" icon="caret-down" size="20px"></ons-icon>';
      html += '<ons-select id="country_code" class="country_code" name="country_code" >';
      $.each(data, function (key, val) {
         selected = '';
         if (key == country_code) {
            selected = 'selected';
         }
         html += '<option value="' + key + '" ' + selected + '>' + val + '</option>';
      });
      html += '</ons-select>';
      $(".country_list_wrap").html(html);
   }
};

/*END VERSION 1.2*/


var inapp;

payWebview = function (url) {
   if (!krms_config.debug) {
      inapp = cordova.InAppBrowser.open(url, '_blank', 'location=no');
      inapp.addEventListener('loadstop', function (event) {
         url = event.url;
         var res = url.match(/success/gi);
         if (!empty(res)) {
            inapp.executeScript({
               code: "document.documentElement.innerText"
            }, function (html) {
               //alert(html);
               inapp.close();

               setTimeout(function () {

                  var options = {
                     "order_id": getStorage("global_receipt_order_id"),
                     "total_amount": getStorage("global_receipt_amount_pay"),
                     'message': getStorage("global_receipt_message")
                  };
                  onsenNavigator.pushPage('receipt.html', {
                     animation: "slide",
                     data: options
                  });

               }, 1);

            });
         }

         var error = url.match(/error/gi);
         if (!empty(error)) {
            inapp.executeScript({
               code: "document.documentElement.innerText"
            }, function (html) {
               inapp.close();
               showAlert(html);
            });
         }

         var cancel = url.match(/cancel/gi);
         if (!empty(cancel)) {
            inapp.close();
         }

      });
   } else {
      window.open(url);
   }
};

confirmClearCart = function () {
   var dialog = document.getElementById('clear_cart_dialog');
   if (dialog) {
      dialog.show();
   } else {
      ons.createElement('clear_cart_dialog.html', {
         append: true
      }).then(function (dialog) {
/** Atualização Master Hub (Correção de Tradução) **/
		  $(".clear_cart").html(t("Clear cart?"));
		  $(".are_you_sure").html(t("Are you sure you want to remove all items in your cart?"));
		  $(".yes_cart").html(t("Yes"));
		  $(".cancel_cart").html(t("Cancel"));		  
/** Fim da atualização **/
         dialog.show();
      });
   }
};

hideDialog = function (id) {
   document.getElementById(id).hide();
};

clearCart = function () {
   hideDialog('clear_cart_dialog');
   ajaxCall("clearCart", '');
};

clearCartSilent = function () {
   ajaxCall("clearCart", '');
};

setDeliveryLocation = function () {
   $(".frm_delivery_location").validate({
      submitHandler: function (form) {
         var params = $(".frm_delivery_location").serialize();
         ajaxCall('setDeliveryLocation', params);
      }
   });
   $(".frm_delivery_location").submit();
};

FillBanner = function () {
   if (settings = AppSettings()) {
      if (settings.singleapp_enabled_banner == 1) {

         html = '';

         if (seachStyle == '1') {
            html += '<div class="search_wrapper">';
            html += '<ons-row class="stic-grey-bg">';
            html += '<ons-col class="stic-icon-col" vertical-align="center" >';
            html += '<ons-icon icon="fa-search" class="hatake"></ons-icon>';
            html += '</ons-col>';
            html += '<ons-col vertical-align="center" >';
            html += '<ons-search-input id="search" placeholder="What are you looking for?" onclick="showPageNormal(\'search_category.html\');" ></ons-search-input>';
            html += '</ons-col>';
            html += '</ons-row>';
            html += '</div>';
         }

         html += '<div class="stic-title">';
         html += '<span class="trn">Special offers for you</span>';
         html += '<span class="stic-book stic-uppercase trn" onclick="showPage(\'book.html\')">Book a Table</span>';
         html += '</div>';

         html += '<div class="stic-carousel-margin">';
         html += '<ons-carousel swipeable auto-scroll auto-scroll-ratio="0.1" overscrollable id="stic-carousel" class="stic-carousel">';

         $.each(settings.singleapp_banner, function (key, val) {
/** Atualização Master Hub (Correção de Layout) **/
            html += '<ons-carousel-item class="stic-carousel-item" style="width: 100%;">';
/** Fim da atualização **/
            html += '<div class="stic-carousel-img" style="background-image: url(' + "'" + val + "'" + ')" no-repeat center center;">';
            html += '</div>';
            html += '</ons-carousel-item>';
         });

         html += '</ons-carousel>';
         html += '</div>';

         $(".banner_wrap").html(html);

      } else {

         html += '<div class="inner_wrap">';
         html += '<ons-row class="stic-grey-bg">';
         html += '<ons-col class="stic-icon-col" vertical-align="center" >';
         html += '<ons-icon icon="fa-search" class="hatake"></ons-icon>';
         html += '</ons-col>';
         html += '<ons-col vertical-align="center" >';
         html += '<ons-search-input id="search" placeholder="Search for category" onclick="showPageNormal(\'search_category.html\');" ></ons-search-input>';
         html += '</ons-col>';
         html += '</ons-row>';
         html += '</div>';

         $(".search_wrapper").html(html);

      }
/** Atualização Master Hub (Correção de Tradução) **/
	   translatePage();
/** Fim da atualização **/
   }

   setTimeout(function () {
      $(".search-input ").removeClass("search-input--material");
   }, 100);
};

setFocus = function (element) {
   document.getElementById(element)._input.focus();
}

destroyList = function (element) {
   dump("destroyList");
   dump(element);
   $("#" + element + " ons-list-item").remove();
};

showLoaderDiv = function (show, target) {
   if (show) {
      $("." + target).html(icon_loader);
   } else {
      $("." + target).html('');
   }
};


var PayAuthorize = function () {

   $(".frm_authorize").validate({
      submitHandler: function (form) {
         var params = $(".frm_authorize").serialize();
         ajaxCall('PayAuthorize', params);
      }
   });
   $(".frm_authorize").submit();
};

LoginGoogle = function () {

   if (krms_config.debug) {

      var params = "email=test@google.com";
      params += "&userid=123";
/** Atualização Master Hub (Correção de Tradução) **/
      params += "&fullname=Robson";
      params += "&lastname=Gonçalves";
/** Fim da atualização **/
      params += "&imageurl=";
      params += "&next_step=" + getStorage("next_step");

      ajaxCall('LoginGoogle', params);

   } else {

      try {

         window.plugins.googleplus.login({},
            function (obj) {
               // SUCCESS
               var params = "email=" + encodeURIComponent(obj.email);
               params += "&userid=" + encodeURIComponent(obj.userId);
               if (!empty(obj.givenName)) {
                  params += "&fullname=" + encodeURIComponent(obj.givenName);
               } else {
                  params += "&fullname=" + encodeURIComponent(obj.displayName);
               }
               params += "&lastname=" + encodeURIComponent(obj.familyName);
               params += "&imageurl=" + encodeURIComponent(obj.imageUrl);
               params += "&next_step=" + getStorage("next_step");

               ajaxCall("LoginGoogle", params);
            },
            function (msg) {
               // FAILED
               switch (msg) {
                  case "10":
                  case 10:
                  case "16":
                  case 16:
                     err_msg = t("error has occured. android keystore not valid")
                     err_msg += ". " + t("error code:") + msg;
                     showToast(err_msg);
                     break;

                  default:
                     showToast(t('error has occured. error number') + ' : ' + msg);
                     break;
               }
            });

      } catch (err) {
         alert(err.message);
      }
   }
};

browseCamera = function () {
   if (krms_config.debug) {
      showToast("debug mode");
      $(".loading_wrap").show();
      loaded = 0;

      $(".btn_profile").attr("disabled", true);

      test_loader = setInterval(function () {
         loaded++;
         percent = loaded * 10;
         dump(percent);
         document.querySelector('ons-progress-bar').setAttribute('value', percent);

         if (percent >= 100) {
            clearInterval(test_loader);
            dump("stop");
            $(".loading_wrap").hide();
            $(".btn_profile").attr("disabled", false);

         }

      }, 1000);
   } else {

      try {

         navigator.camera.getPicture(uploadPhoto, function () {
            //
         }, {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
         });

      } catch (err) {
         alert(err.message);
      }
   }
};

uploadPhoto = function (imageURI) {

   try {


      $(".loading_wrap").show();
      $(".btn_profile").attr("disabled", true);

      document.querySelector('ons-progress-bar').setAttribute('value', 0);

      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";

      var params = {};
      params.token = getStorage("token");
      params.merchant_keys = krms_config.MerchantKeys;
      params.device_id = device_id;
      params.device_platform = device_platform;
      params.lang = urlencode(getLangCode());

      options.params = params;

      options.chunkedMode = false;

      var headers = {
         'headerParam': 'headerValue'
      };
      options.headers = headers;

      var ft = new FileTransfer();

      ft.onprogress = function (progressEvent) {
         if (progressEvent.lengthComputable) {
            //toastMsg( "progressEvent=>"+progressEvent.loaded + " - " + progressEvent.total );           
            var loaded_bytes = parseInt(progressEvent.loaded);
            var total_bytes = parseInt(progressEvent.total);

            var loaded_percent = (loaded_bytes / total_bytes) * 100;
            loaded_percent = Math.ceil(loaded_percent);

            //$(".profile_title").html( getTrans("Uploading files",'upload_files') + "... " + loaded_percent+"%" );  
            //$(".toolbar_center").html( loaded_percent );
            document.querySelector('ons-progress-bar').setAttribute('value', loaded_percent);

         } else {
            //loadingStatus.increment();
         }
      };

      ft.upload(imageURI, ajax_url + "/UploadProfile?post=true", function (result) {
         //alert(JSON.stringify(result));

         setTimeout(function () {
            $(".loading_wrap").hide();
            $(".btn_profile").attr("disabled", false);
         }, 2000);

         if (result.responseCode == "200" || result.responseCode == 200) {

            var response = explode("|", result.response);
            showToast(response[1]);

            if (response[0] == "1" || response[0] == 1) {
               $(".profile_header img").attr("src", response[2]);
               setStorage("profile_avatar", response[2]);
               initImageLoaded();
            }

         } else {
            showToast(t("upload error :") + result.responseCode);
         }

      }, function (error) {
         $(".loading_wrap").hide();
         $(".btn_profile").attr("disabled", false);
         showToast(t("An error has occurred: Code") + " " + error.code);
      }, options);

   } catch (err) {
      $(".loading_wrap").hide();
      $(".btn_profile").attr("disabled", false);
      alert(err.message);
   }
};

function explode(sep, string) {
   var res = string.split(sep);
   return res;
}

closePanel = function () {
   var menu = document.getElementById('menu');
   menu.close();
};

var ajax_profile;

getProfileSilent = function () {

   removeStorage("profile_name");
   removeStorage("profile_avatar");

   if (isLogin()) {

      dump("==>getProfileSilent");
      var ajax_uri = ajax_url + "/getUserProfile/?merchant_keys=" + krms_config.MerchantKeys;
      ajax_uri += "&device_id=" + device_id + "&token=" + token + "&device_platform=" + device_platform;

      dump(ajax_uri);

      params = '';

      ajax_profile = $.post(ajax_uri, params, function (data) {}, "jsonp")

      ajax_profile.done(function (data) {
         dump(data);
         if (data.code == 1) {
            setStorage("profile_name", data.details.data.full_name);
            setStorage("profile_avatar", data.details.data.avatar);
            setStorage("stic_username", data.details.data.first_name);
            document.getElementById("stic-username").textContent = data.details.data.first_name;
         } else {
            removeStorage("token");
         }
      });

      ajax_profile.always(function (data) {
         dump("always")
      });

      ajax_profile.fail(function (jqXHR, textStatus) {
         dump("failed ajax " + textStatus);
      });

   }
};

isUserLoggedIn = function () {

   if (isLogin()) {

      onsenNavigator.replacePage('page_home.html', {
         animation: "none",
      });
   } else {
      onsenNavigator.replacePage('login.html', {
         animation: "slide",
      });
   }
}

showTrackinMap = function () {
   onsenNavigator.pushPage('tracking_map.html', {
      animation: "none",
      data: {
         'order_id': $('.track_order_id').val()
      }
   });
};

callDriver = function () {
   window.location.href = "tel://" + $(".driver_phone").val();
};

var ajax_track;

runTrackMap = function () {

   stopTrackMapInterval();

   dump("==>runTrackMap");
   var ajax_uri = ajax_url + "/trackDriver/?merchant_keys=" + krms_config.MerchantKeys;
   ajax_uri += "&device_id=" + device_id + "&token=" + token;
   //ajax_uri+="&driver_id="+ $(".driver_id").val() ;

   params = "driver_id=" + $(".driver_id").val();

   showLoaderDiv(true, 'track_loader');

   ajax_track = $.post(ajax_uri, params, function (data) {}, "jsonp")

   ajax_track.done(function (data) {
      dump(data);
      if (data.code == 1) {
         settings = AppSettings();
         if (settings.map_provider == "mapbox") {
            mapboxDriverMove(data.details.data.location_lat, data.details.data.location_lng);
         } else {
            //google
            google_marker_track[2].setPosition(new google.maps.LatLng(data.details.data.location_lat, data.details.data.location_lng));
         }
      }
   });

   ajax_track.always(function (data) {
      dump("always")
      trackmap_interval = setInterval(function () {
         runTrackMap()
      }, 10000);
      showLoaderDiv(false, 'track_loader');
   });

   ajax_track.fail(function (jqXHR, textStatus) {
      dump("failed ajax " + textStatus);
      showLoaderDiv(false, 'track_loader');
   });

};

stopTrackMapInterval = function () {
   clearInterval(trackmap_interval);
   trackmap_interval = null;
}

centerTrackMap = function () {
   settings = AppSettings();
   if (settings.map_provider == "mapbox") {
      centerMapbox();
   } else {
      map.fitLatLngBounds(map_bounds);
   }
};

showCustomPage = function (page_id) {
   dump("page_id=>" + page_id);

   onsenNavigator.pushPage("custom_page.html", {
      animation: "slide",
      data: {
         page_id: page_id,
      }
   });

};

var google_marker_track = [];

googleMapTrack = function (div, data, full_data) {
   options = {
      div: div,
      lat: data.lat,
      lng: data.lng,
      disableDefaultUI: true,
      styles: [{
         stylers: [{
            "saturation": -100
         }, {
            "lightness": 0
         }, {
            "gamma": 1
         }]
      }],
   };
   map = new GMaps(options);

   info_html = t("destination");

   var infoWindow = new google.maps.InfoWindow({
      content: info_html
   });

   google_marker_track[0] = map.addMarker({
      lat: data.lat,
      lng: data.lng,
      icon: full_data.icons.destination,
      infoWindow: infoWindow,
   });

   infoWindow.open(map, google_marker_track[0]);

   var latlng = new google.maps.LatLng(data.lat, data.lng);
   map_bounds.push(latlng);


   /*DROP OFF*/
   if (!empty(full_data.dropoff_info.lat)) {

      info_html = t("drop off");

      var infoWindow = new google.maps.InfoWindow({
         content: info_html
      });

      google_marker_track[1] = map.addMarker({
         lat: full_data.dropoff_info.lat,
         lng: full_data.dropoff_info.lng,
         icon: full_data.icons.dropoff,
         infoWindow: infoWindow,
      });

      infoWindow.open(map, google_marker_track[1]);

      var latlng = new google.maps.LatLng(full_data.dropoff_info.lat, full_data.dropoff_info.lng);
      map_bounds.push(latlng);

   }

   /*DRIVER*/
   if (!empty(full_data.driver_info.lat)) {

      google_marker_track[2] = map.addMarker({
         lat: full_data.driver_info.lat,
         lng: full_data.driver_info.lng,
         icon: full_data.icons.driver
      });

      var latlng = new google.maps.LatLng(full_data.driver_info.lat, full_data.driver_info.lng);
      map_bounds.push(latlng);
   }

   map.fitLatLngBounds(map_bounds);

};


var addReview = function () {
   $(".frm_add_review").validate({
      submitHandler: function (form) {
         var params = $(".frm_add_review").serialize();
         ajaxCall('addReview', params);
      }
   });
   $(".frm_add_review").submit();
};

var enableInfo = function () {
   document.getElementById("stic-kakashi").style["display"] = "unset";
}

var disableInfo = function () {
   document.getElementById("stic-kakashi").style["display"] = "none";
}

var fillUser = function () {
   var stic_username = getStorage("stic_username")
   document.getElementById("stic-username").innerHTML = stic_username;
}