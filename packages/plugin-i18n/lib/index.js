import { setup } from "@spax/i18n";
export default ({ init }) => {
    init.tap("I18n", [], (option, options) => {
        setup(option);
    });
};
