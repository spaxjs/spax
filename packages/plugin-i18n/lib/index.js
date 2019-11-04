import { setup } from "@spax/i18n";
export default {
    name: "I18n",
    plug: ({ init }, option) => {
        init.tap(() => {
            setup(option);
        });
    },
};
