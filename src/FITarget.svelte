<script>
    import {fi_target, total_assets} from './stores.js';
    let percentComplete = 0;

    $: if ($fi_target || $total_assets) {
        percentComplete = parseInt(($total_assets / $fi_target) * 100);
        if (percentComplete > 100) {
            percentComplete = 100;
        }
        if (percentComplete < 0) {
            percentComplete = 0;
        }
    }
</script>

<h1>FIRE Target</h1>
<div id="canvas">
    <div id="innerCanvas" width="{percentComplete}%"></div>
    <h1 id="canvasPercent">{percentComplete}</h1>
    <h1 id="canvasTotal">{$total_assets}</h1>
</div>

<div class="inputs">
    <label for="fi_target">FI Target</label>
    <input id="fi_target" bind:value={$fi_target} type=number />
</div>

<div class="inputs">
    <label for="total_assets">Total Assets</label>
    <input id="total_assets" bind:value={$total_assets} type=number />
</div>
<style>
    .inputs {
        float: left;
        padding: 8px;
    }
    #canvas {
        border: 1px solid black;
        width: 100%;
        height: 120px;
        position: relative;
    }
    #innerCanvas {
        width:0;
        background-color: deepskyblue;
        height: 100%;
        position: relative;
    }
    #canvasPercent {
        font-size: 2em;
        color: deepskyblue;
        mix-blend-mode: difference;
        margin: 0px;
        padding: 0px;
        position: absolute;
        bottom: 8px;
        left: 8px;
    }
    #canvasTotal {
        font-size: 2em;
        color: deepskyblue;
        mix-blend-mode: difference;
        margin: 0px;
        padding: 0px;
        position: absolute;
        bottom: 8px;
        right: 8px;
    }
</style>