document.addEventListener("DOMContentLoaded", function () {
  const barOptions = {
    type: 'bar',
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
          ticks: { display: false },
          grid: { color: '#400000' }
        },
        y: {
          ticks: {
            color: '#fff',
            font: {
              size: 14, 
              weight: 'bold'
            }
          },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  };

  // Diseño & Edición
  new Chart(document.getElementById('disenoChart').getContext('2d'), {
    ...barOptions,
    data: {
      labels: ['Photoshop', 'Illustrator', 'Lightroom', 'After Effects', 'Premiere', 'Figma', 'Reaper', 'Blender'],
      datasets: [{
        data: [100, 90, 100, 60, 90, 95, 50, 30],
        backgroundColor: '#56000080',
        borderRadius: 6
      }]
    }
  });

  // Desarrollo web
  new Chart(document.getElementById('devChart').getContext('2d'), {
    ...barOptions,
    data: {
      labels: ['HTML & CSS', 'JavaScript', 'Tailwind CSS', 'p5.js', 'VS Code', 'Git & GitHub', 'Node.js', 'TypeScript'],
      datasets: [{
        data: [100, 85, 95, 95, 100, 90, 50, 40],
        backgroundColor: '#bd1c1c80',
        borderRadius: 6
      }]
    }
  });
});

// MARKETING DIGITAL
const marketingCtx = document.getElementById('marketingChart');
if (marketingCtx) {
  if (Chart.getChart(marketingCtx)) {
    Chart.getChart(marketingCtx).destroy();
  }

  new Chart(marketingCtx, {
    type: 'radar',
    data: {
      labels: [
        'Google Ads',
        'Google Analytics',
        'Tag Manager',
        'Hotjar',
        'Search Console',
        'Hootsuite',
        'Meta Ads',
      ],
      datasets: [{
        label: 'Nivel',
        data: [90, 90, 100, 60, 70, 80, 80],
        backgroundColor: 'rgba(86, 0, 0, 0.35)',
        borderColor: '#bd1c1c',
        pointBackgroundColor: '#bd1c1c',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 10
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            display: false,
            stepSize: 10 
          },
          angleLines: { color: '#400000' },
          grid: { color: '#400000' },
          pointLabels: {
            color: '#fff',
            font: { size: 14 },
            padding: 10
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// INTELIGENCIA ARTIFICIAL
const iaCtx = document.getElementById('iaChart');
if (iaCtx) {
  if (Chart.getChart(iaCtx)) {
    Chart.getChart(iaCtx).destroy();
  }

  new Chart(iaCtx, {
    type: 'radar',
    data: {
      labels: [
        'ChatGPT & API',
        'Adobe Firefly',
        'Stable Diffusion',
        'DALL·E',
        'Runway',
        'Whisper',
        'Midjourney'
        
      ],
      datasets: [{
        label: 'Nivel',
        data: [100, 100, 70, 90, 50, 90, 90],
        backgroundColor: 'rgba(189, 28, 28, 0.3)',
        borderColor: '#bd1c1c',
        pointBackgroundColor: '#bd1c1c',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 10
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            display: false,
            stepSize: 10
          },
          angleLines: { color: '#400000' },
          grid: { color: '#400000' },
          pointLabels: {
            color: '#fff',
            font: { size: 14 },
            padding: 10
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

