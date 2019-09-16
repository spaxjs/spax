import { setup } from "@spax/i18n";
export default {
    name: "I18n",
    deps: [],
    plug: ({ init }, option) => {
        init.tap(() => {
            setup(option);
        });
    },
};
