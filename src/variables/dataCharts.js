import { vnd } from 'Helpers/Index.js';
var colors = {
    gray: {
        100: '#f6f9fc',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#8898aa',
        700: '#525f7f',
        800: '#32325d',
        900: '#212529',
    },
    theme: {
        default: '#172b4d',
        primary: '#5e72e4',
        secondary: '#f4f5f7',
        info: '#11cdef',
        success: '#2dce89',
        danger: '#f5365c',
        warning: '#fb6340',
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
};

const chartData = {
    options: {
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: colors.gray[900],
                        zeroLineColor: colors.gray[900],
                    },
                    ticks: {
                        callback: function (value) {
                            if (!(value % 10)) {
                                return vnd.format(value);
                            }
                        },
                    },
                },
            ],
        },
        tooltips: {
            callbacks: {
                label: function (item, data) {
                    var label = data.datasets[item.datasetIndex].label || '';
                    var yLabel = item.yLabel;
                    var content = '';

                    if (data.datasets.length > 1) {
                        content += label;
                    }

                    content += yLabel;
                    return vnd.format(content);
                },
            },
        },
    },
    data1: (canvas) => {
        return {
            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
            datasets: [
                {
                    label: 'Performance',
                    data: [0, 20, 10, 30, 15, 40, 20],
                },
            ],
        };
    },
    data2: (canvas) => {
        return {
            labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
            datasets: [
                {
                    label: 'Performance',
                    data: [0, 20, 5, 25, 10, 30, 15],
                },
            ],
        };
    },
};

export { chartData };
