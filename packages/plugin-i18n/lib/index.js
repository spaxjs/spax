import { setup } from "@spax/i18n";
export default [
    "I18n",
    [],
    ({ init }, option) => {
        init.tap(() => {
            setup(option);
        });
    },
];
