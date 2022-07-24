<script>
    import {Chart, registerables} from 'chart.js';
    import {fi_target, total_assets, target_year, monthly_savings, apr, inflation} from './stores.js';
    Chart.register(...registerables);
    var canvas = null;

    let year = new Date().getFullYear();
    let maxYear = year + 200;

    $: if ($total_assets || $target_year || $monthly_savings || $apr || $inflation) {
        let years = Math.max(($target_year - year), 1);
        let compound = {};
        let savings = {};
        let monthly = parseInt($monthly_savings);
        let principal = parseInt($total_assets);
        let interest = parseInt($apr) / 100;
        let yearlySavings = parseInt($total_assets);
        // TODO inflation
        [...Array(years).keys()].forEach(n => {
            compound[`${year + n}`] = principal;
            savings[`${year + n}`] = yearlySavings;
            // P = (P * (1 + i))^n (P = principal, i = interest (in decimal), n = periods)
            principal = principal * (1 + interest);
            principal = principal + (monthly * 12);
            yearlySavings = yearlySavings + (monthly * 12);
        });

        // make the chart
        if (document.getElementById('ficurve') !== null) {
            // destroy old chart
            if (canvas !== null) {
                canvas.destroy();
            }
            let labels = Object.keys(compound);
            let data = Object.values(compound);
            canvas = new Chart("ficurve", {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Savings",
                            data: Object.values(savings),
                            fill: true,
                            backgroundColor: 'rgb(255, 127, 80)',
                            tension: 0.1,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                            pointHoverBorderColor: 'rgb(255, 127, 80)',
                            pointHoverBackgroundColor: 'rgb(255, 127, 80)',
                        },
                        {
                            label: "Assets",
                            data: data,
                            fill: true,
                            backgroundColor: 'rgb(0, 191, 255)',
                            tension: 0.1,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                            pointHoverBorderColor: 'rgb(0, 191, 255)',
                            pointHoverBackgroundColor: 'rgb(0, 191, 255)',

                        }
                    ],
                },
                options: {
                    scales: {
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                callback: (v, inflation, t) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(v)
                            }
                        },
                        x: {

                        }
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    },
                    responsive: false,
                    hover: {
                        mode: 'index',
                        intersect: false
                    },
                    tooltips: {
                        mode: 'line',
                        intersect: false,
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: context => {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                },
                
            });
        }
    }
</script>

<h1>FI Curve</h1>

<canvas id="ficurve"></canvas>

<div class="inputs">
    <label for="starting">Starting Assets</label>
    <input id="starting" bind:value={$total_assets} type="number" min=0 />
</div>

<div class="inputs">
    <label for="saving">Monthly Savings</label>
    <input id="saving" bind:value={$monthly_savings} type="number" min=0 />
</div>

<div class="inputs">
    <label for="ending">Ending Year</label>
    <input id="ending" bind:value={$target_year} type="number" min="{year}" max="{maxYear}" />
</div>

<div class="inputs">
    <label for="compound">Expected Return Annually</label>
    <input id="compound" bind:value={$apr} type="number" min=0 />
</div>

<div class="inputs">
    <label for="inflation">Expected Inflation Annually</label>
    <input id="inflation" bind:value={$inflation} type="number" min=0 />
</div>


<style>
    .inputs {
        float: left;
        padding: 8px;
    }
    #ficurve {
        width: 75%;
        margin: auto;
    }
</style>