/** @odoo-module */

import * as PaymentScreen from "@point_of_sale/../tests/tours/utils/payment_screen_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as ReceiptScreen from "@point_of_sale/../tests/tours/utils/receipt_screen_util";
import { registry } from "@web/core/registry";
import * as Order from "@point_of_sale/../tests/tours/utils/generic_components/order_widget_util";
import { inLeftSide } from "@point_of_sale/../tests/tours/utils/common";
import * as ProductConfiguratorPopup from "@point_of_sale/../tests/tours/utils/product_configurator_util";

registry.category("web_tour.tours").add("ProductScreenTour", {
    test: true,
    steps: () =>
        [
            // Go by default to home category
            ProductScreen.clickShowProductsMobile(),
            // Clicking product multiple times should increment quantity
            ProductScreen.clickDisplayedProduct("Desk Organizer"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "1.0", "5.10"),
            ProductScreen.clickDisplayedProduct("Desk Organizer"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "2.0", "10.20"),

            // Clicking product should add new orderline and select the orderline
            // If orderline exists, increment the quantity
            ProductScreen.clickDisplayedProduct("Letter Tray"),
            ProductScreen.selectedOrderlineHas("Letter Tray", "1.0", "5.28"),
            ProductScreen.clickDisplayedProduct("Desk Organizer"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "3.0", "15.30"),

            // Check effects of clicking numpad buttons
            ProductScreen.clickOrderline("Letter Tray", "1"),
            ProductScreen.selectedOrderlineHas("Letter Tray", "1.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Letter Tray", "0.0", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "3", "15.30"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "0.0", "0.0"),
            ProductScreen.pressNumpad("1"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "1.0", "5.1"),
            ProductScreen.pressNumpad("2"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "12.0", "61.2"),
            ProductScreen.pressNumpad("3"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "123.0", "627.3"),
            ProductScreen.pressNumpad(".", "5"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "123.5", "629.85"),
            ProductScreen.pressNumpad("Price"),
            ProductScreen.modeIsActive("Price"),
            ProductScreen.pressNumpad("1"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "123.5", "123.5"),
            ProductScreen.pressNumpad("1", "."),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "123.5", "1,358.5"),
            ProductScreen.pressNumpad("% Disc"),
            ProductScreen.modeIsActive("% Disc"),
            ProductScreen.pressNumpad("5", "."),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "123.5", "1,290.58"),
            ProductScreen.pressNumpad("Qty"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.orderIsEmpty(),

            // Check different subcategories
            ProductScreen.goBackToMainScreen(),
            ProductScreen.clickSubcategory("Desk test"),
            ProductScreen.productIsDisplayed("Desk Pad"),
            ProductScreen.goBackToMainScreen(),
            ProductScreen.clickSubcategory("Misc test"),
            ProductScreen.productIsDisplayed("Whiteboard Pen"),
            ProductScreen.goBackToMainScreen(),
            ProductScreen.clickSubcategory("Chair test"),
            ProductScreen.productIsDisplayed("Letter Tray"),
            ProductScreen.goBackToMainScreen(),
            ProductScreen.clickSubcategory("Chair test"),
            ProductScreen.goBackToMainScreen(),

            // Add two orderlines and update quantity
            ProductScreen.clickShowProductsMobile(),
            ProductScreen.clickDisplayedProduct("Whiteboard Pen"),
            ProductScreen.clickDisplayedProduct("Wall Shelf Unit"),
            ProductScreen.clickOrderline("Whiteboard Pen", "1.0"),
            ProductScreen.pressNumpad("2"),
            ProductScreen.selectedOrderlineHas("Whiteboard Pen", "2.0"),
            ProductScreen.clickOrderline("Wall Shelf Unit", "1.0"),
            ProductScreen.pressNumpad("2"),
            ProductScreen.selectedOrderlineHas("Wall Shelf Unit", "2.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Wall Shelf Unit", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Whiteboard Pen", "2.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Whiteboard Pen", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.orderIsEmpty(),

            // Add multiple orderlines then delete each of them until empty
            ProductScreen.clickDisplayedProduct("Whiteboard Pen"),
            ProductScreen.clickDisplayedProduct("Wall Shelf Unit"),
            ProductScreen.clickDisplayedProduct("Small Shelf"),
            ProductScreen.clickDisplayedProduct("Magnetic Board"),
            ProductScreen.clickDisplayedProduct("Monitor Stand"),
            ProductScreen.clickOrderline("Whiteboard Pen", "1.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Whiteboard Pen", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Monitor Stand", "1.0"),
            ProductScreen.clickOrderline("Wall Shelf Unit", "1.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Wall Shelf Unit", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Monitor Stand", "1.0"),
            ProductScreen.clickOrderline("Small Shelf", "1.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Small Shelf", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Monitor Stand", "1.0"),
            ProductScreen.clickOrderline("Magnetic Board", "1.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Magnetic Board", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Monitor Stand", "1.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Monitor Stand", "0.0"),
            ProductScreen.pressNumpad("⌫"),
            ProductScreen.orderIsEmpty(),

            // Test OrderlineCustomerNoteButton
            ProductScreen.clickDisplayedProduct("Desk Organizer"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "1.0"),
            ProductScreen.addCustomerNote("Test customer note"),
            inLeftSide(
                Order.hasLine({
                    productName: "Desk Organizer",
                    quantity: "1.0",
                    customerNote: "Test customer note",
                    withClass: ".selected",
                })
            ),
            ProductScreen.isShown(),
        ].flat(),
});

registry.category("web_tour.tours").add("FiscalPositionNoTax", {
    test: true,
    steps: () =>
        [
            Dialog.confirm("Open session"),
            ProductScreen.clickShowProductsMobile(),
            ProductScreen.clickDisplayedProduct("Test Product"),
            ProductScreen.totalAmountIs("100.00"),
            ProductScreen.changeFiscalPosition("No Tax"),
            ProductScreen.noDiscountApplied("100.00"),
            ProductScreen.totalAmountIs("86.96"),
            ProductScreen.clickPayButton(),
            PaymentScreen.clickPaymentMethod("Bank"),
            PaymentScreen.remainingIs("0.00"),
            PaymentScreen.clickValidate(),
            ReceiptScreen.isShown(),
            Order.doesNotHaveLine({ discount: "" }),
        ].flat(),
});

registry.category("web_tour.tours").add("CashClosingDetails", {
    test: true,
    steps: () =>
        [
            ProductScreen.enterOpeningAmount("90"),
            Dialog.confirm("Open session"),
            ProductScreen.checkSecondCashClosingDetailsLineAmount("10.00", "-"),
        ].flat(),
});

registry.category("web_tour.tours").add("ShowTaxExcludedTour", {
    test: true,
    steps: () =>
        [
            Dialog.confirm("Open session"),

            ProductScreen.clickShowProductsMobile(),
            ProductScreen.clickDisplayedProduct("Test Product"),
            ProductScreen.selectedOrderlineHas("Test Product", "1.0", "100.0"),
            ProductScreen.totalAmountIs("110.0"),
            Chrome.endTour(),
        ].flat(),
});

registry.category("web_tour.tours").add("limitedProductPricelistLoading", {
    test: true,
    steps: () =>
        [
            Dialog.confirm("Open session"),

            ProductScreen.scan_barcode("0100100"),
            ProductScreen.selectedOrderlineHas("Test Product 1", "1.0", "80.0"),

            ProductScreen.scan_barcode("0100200"),
            ProductScreen.selectedOrderlineHas("Test Product 2", "1.0", "100.0"),

            ProductScreen.scan_barcode("0100300"),
            ProductScreen.selectedOrderlineHas("Test Product 3", "1.0", "50.0"),
            Chrome.endTour(),
        ].flat(),
});

registry.category("web_tour.tours").add("MultiProductOptionsTour", {
    test: true,
    steps: () =>
        [
            Dialog.confirm("Open session"),

            ProductScreen.clickShowProductsMobile(),
            ProductScreen.clickDisplayedProduct("Product A"),
            ProductConfiguratorPopup.isOptionShown("Value 1"),
            ProductConfiguratorPopup.isOptionShown("Value 2"),
            Dialog.confirm("Ok"),

            Chrome.endTour(),
        ].flat(),
});

registry.category("web_tour.tours").add("TranslateProductNameTour", {
    test: true,
    steps: () =>
        [
            Dialog.confirm("Ouvrir la session"),

            ProductScreen.clickShowProductsMobile(),

            ProductScreen.clickDisplayedProduct("Testez le produit"),

            Chrome.endTour(),
        ].flat(),
});