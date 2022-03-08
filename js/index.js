const cart = $("#cart");
const cartBtn = $(".cart-btn");
const checkoutBtn = $(".checkout-btn");
const currentPrice = $(".current-price h2");
var deleteBtn = $(".delete-btn");
const emptyCartText = $(".empty-cart-text");
const menu = $("#menu");
const modal = $("#modal");
const productImageListItem = $("#product-images .other-images li img");
const productImageListItemModal = $("#modal .other-images li img");
const productList = $("#cart .product-list");
var productListItem = $("#cart .product-list .product");
const productName = $("#product-info h1");
const mainImage = $(".main-image");

var imageOrderNumber = 1;
var numberOfItems = 0;
var productNameList = [];


function OpenMenu() {
    menu.addClass("active");
}

function CloseMenu() {
    menu.removeClass("active");
}

function OpenNextImage() {
    imageOrderNumber++;
    if (imageOrderNumber > productImageListItem.length) {
        imageOrderNumber = 1;
    }
    for (let i = 0; i < 2; i++) {
        mainImage.eq(i).attr("src", "./images/image-product-" + imageOrderNumber + ".jpg");
        mainImage.eq(i).attr("alt", "image-product-" + imageOrderNumber);
    }
    productImageListItem.closest("li").removeClass("chosen");
    productImageListItem.closest("li").eq(imageOrderNumber - 1).addClass("chosen");

    productImageListItemModal.closest("li").removeClass("chosen");
    productImageListItemModal.closest("li").eq(imageOrderNumber - 1).addClass("chosen");
}

function OpenPreviousImage() {
    imageOrderNumber--;
    if (imageOrderNumber == 0) {
        imageOrderNumber = productImageListItem.length;
    }
    for (let i = 0; i < 2; i++) {
        mainImage.eq(i).attr("src", "./images/image-product-" + imageOrderNumber + ".jpg");
        mainImage.eq(i).attr("alt", "image-product-" + imageOrderNumber);
    }
    productImageListItem.closest("li").removeClass("chosen");
    productImageListItem.closest("li").eq(imageOrderNumber - 1).addClass("chosen");

    productImageListItemModal.closest("li").removeClass("chosen");
    productImageListItemModal.closest("li").eq(imageOrderNumber - 1).addClass("chosen");
}

function PlusNumber() {
    $(".number-of-items").text(++numberOfItems);
}

function MinusNumber() {
    if (--numberOfItems < 0) {
        numberOfItems = 0;
    }
    $(".number-of-items").text(numberOfItems);
}

function CheckProductInCart() {
    if (productListItem.length < 1) {
        emptyCartText.show();
        checkoutBtn.hide();
        productList.hide();
    }
    else {
        emptyCartText.hide();
        checkoutBtn.show();
        productList.show();
    }
}

function AddProductToCart() {
    const total = parseFloat(currentPrice.text().slice(1, )) * numberOfItems;
    var productScript = "" +
        "<img src=" + mainImage.attr("src") + " alt=" + mainImage.attr("alt") + ">" +
        "<div>" +
            "<p class='product-name'>" + productName.text() + "</p>" +
            "<p class='price'><span class='current-price'>" + currentPrice.text() + "</span> x <span class='amount'>" + numberOfItems + "</span> <span class='total-price'>" + total + "</span></p>" +
        "</div>" +
        "<button class='delete-btn' type='button' aria-label='Delete Product'></button>";

    if (productNameList.includes(productName.text()) === false && numberOfItems !== 0) {
        productNameList.push(productName.text());
        productList.html(productList.html() + "<li class='product'>" + productScript + "</li>");
    }
    else if (productNameList.includes(productName.text()) && numberOfItems !== 0) {
        productListItem.eq(productNameList.indexOf(productName.text())).html(productScript);
    }
    
    productListItem = $("#cart .product-list .product");
    CheckProductInCart();

    deleteBtn = $(".delete-btn");
    deleteBtn.click(function() {
        $(this).closest("li").remove();
        productListItem = $("#cart .product-list .product");
        CheckProductInCart();
    });
}

function CloseModal() {
    modal.removeClass("open");
}

CheckProductInCart();
cart.hide();

$("a").click(function(event) {
	event.preventDefault();
});

$(document).ready(function(){
    cartBtn.on('click', function() {
        if (cart.is(":hidden")) {
            cart.show();
        }
        else {
            cart.hide();
        }
    });

   // Close modal on click outside at anywhere
   $(document).on('click',function(e) {
        if (!(($(e.target).closest("#cart").length > 0 ) || ($(e.target).closest(".cart-btn").length > 0))){
            cart.hide();
        }
   });
});

deleteBtn.click(function() {
    $(this).closest("li").remove();
    productListItem = $("#cart .product-list .product");
    CheckProductInCart();
});

$("#product-images .main-image").click(function() {
    modal.addClass("open");
});

productImageListItem.click(function() {
    productImageListItem.closest("li").removeClass("chosen");
    $(this).closest("li").addClass("chosen");

    productImageListItemModal.closest("li").removeClass("chosen");
    productImageListItemModal.eq(productImageListItem.index($(this))).closest("li").addClass("chosen");

    imageOrderNumber = parseInt($(this).attr("alt").slice($(this).attr("alt").length - 1));

    mainImage.attr("src", "./images/" + $(this).attr("alt") + ".jpg");
});

productImageListItemModal.click(function() {
    productImageListItemModal.closest("li").removeClass("chosen");
    $(this).closest("li").addClass("chosen");

    productImageListItem.closest("li").removeClass("chosen");
    productImageListItem.eq(productImageListItemModal.index($(this))).closest("li").addClass("chosen");

    imageOrderNumber = parseInt($(this).attr("alt").slice($(this).attr("alt").length - 1));

    mainImage.attr("src", "./images/" + $(this).attr("alt") + ".jpg");
});