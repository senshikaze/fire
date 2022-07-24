<script>
    import { onMount } from "svelte";
    import {onLoad} from "./services.js";
    import FITarget from "./FITarget.svelte";
    import FiCurve from "./FICurve.svelte";

    onMount(_ => {
        onLoad();
    });
</script>

<main>
    <div><FITarget /></div>
    <div><FiCurve /></div>
</main>

<style>
    main {
        padding: 1em;
        margin: 0 auto;
        min-width: 540px;
    }
    main * {
        clear: both;
    }
</style>