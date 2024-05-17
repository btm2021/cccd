import { extend, configure } from "vee-validate";
import Vue from 'vue'
import * as rules from "vee-validate/dist/rules";
import { VeeValidate } from 'vee-validate';


import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, { name: '$_', lodash })

// install rules and localization
Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

configure({
    classes: {
        valid: " ",
        invalid: "is-error",
        changed: " ",
        touched: " ",
        untouched: " ",
        pristine: " ",
        dirty: " ",
        pending: " ",
        required: " ",
        validated: " ",
        passed: " ",
        failed: " "
    }
});
