import {fi_target, total_assets, target_year, monthly_savings, apr, inflation} from './stores.js';

export const onLoad = _ => {
    // load up the store info from local store
    fi_target.set(window.localStorage.getItem("fi_target") ?? 0);
    total_assets.set(window.localStorage.getItem("total_assets") ?? 0);
    target_year.set(window.localStorage.getItem("target_year") ?? new Date().getFullYear());
    monthly_savings.set(window.localStorage.getItem("monthly_savings") ?? 0);
    apr.set(window.localStorage.getItem("apr") ?? 0);
    inflation.set(window.localStorage.getItem("inflation") ?? 2);

    // Subscribe to the stores so we can write back changes
    // to the local storage

    fi_target.subscribe(value => {
        window.localStorage.setItem('fi_target', value);
    });

    total_assets.subscribe(value => {
        window.localStorage.setItem('total_assets', value);
    });

    target_year.subscribe(value => {
        window.localStorage.setItem('target_year', value);
    });

    monthly_savings.subscribe(value => {
        window.localStorage.setItem('monthly_savings', value);
    });

    apr.subscribe(value => {
        window.localStorage.setItem('apr', value);
    });

    inflation.subscribe(value => {
        window.localStorage.setItem('inflation', value);
    });
};
