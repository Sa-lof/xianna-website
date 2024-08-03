import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import getBlogRatingsPerUsers from '../../supabase/InsightServices/getBlogRatingsPerUsers';

interface ChartData {
  series: { name: string; data: number[] }[];
  categories: string[];
  blogNames: { [key: string]: string };
}

const BlogRatingChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    series: [
      { name: 'Usuarios Registrados', data: [] },
      { name: 'Usuarios No Registrados', data: [] },
      { name: 'Promedio General', data: [] }
    ],
    categories: [],
    blogNames: {}
  });

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const averageRatings = await getBlogRatingsPerUsers();

      const blogNames: { [key: string]: string } = {};
      averageRatings.forEach(r => {
        blogNames[`Blog ${r.blog}`] = r.blogName;
      });

      setChartData({
        series: [
          { name: 'Usuarios Registrados', data: averageRatings.map(r => r.registeredAvg) },
          { name: 'Usuarios No Registrados', data: averageRatings.map(r => r.unregisteredAvg) },
          { name: 'Promedio General', data: averageRatings.map(r => r.overallAvg) }
        ],
        categories: averageRatings.map(r => `Blog ${r.blog}`),
        blogNames: blogNames
      });
    };

    fetchAndProcessData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar' as const
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: chartData.categories
    },
    yaxis: {
      title: {
        text: 'Promedio de Calificaciones'
      },
      min: 0,
      max: 5,
      tickAmount: 5,
      labels: {
        formatter: (val: number) => val.toFixed(0)
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const blogId = w.globals.labels[dataPointIndex];
        const blogName = chartData.blogNames[blogId];
        return `
          <div style="padding: 10px;">
            <span><strong>${w.globals.seriesNames[seriesIndex]}:</strong> ${series[seriesIndex][dataPointIndex].toFixed(2)}</span><br>
            <span>${blogName}</span>
          </div>
        `;
      }
    }
  };

  return (
    <div>
      <Chart
        options={options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BlogRatingChart;
