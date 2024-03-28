import React, {useState, useEffect} from 'react';
import Sidebar from './Sidebar/Sidebar';
import Sidebar2 from './Sidebar/Sidebar2';
import { useTranslation } from 'react-i18next';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';


Chart.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const Analytics = () => {

  const { t } = useTranslation();
  const [type, setType] = useState(''); 
  const [loading, setLoading] = useState(true);

  const [preferencedata, setPreferenceData] = useState({    labels: [],
    datasets: [
      {
        label: 'Donation Type',
        data: [],
      },
    ],});

  const [totaldonationdata, setTotalDonationData] = useState({    labels: [],
    datasets: [
      {
        label: 'Total Donations',
        data: [],
      },
    ],});

  const [donationratingdata, setDonationRatingData] = useState({    labels: [],
    datasets: [
      {
        label: 'Donation Rating',
        data: [],
      },
    ],});

  const [avgtotalratingdata, setAvgTotalRatingData] = useState({    labels: [],
    datasets: [
      {
        label: 'Total Rating',
        data: [],
      },
    ],});

 const [interactionratingdata, setInteractionRatingData] = useState({    labels: [],
    datasets: [
      {
        label: 'Interaction Rating',
        data: [],
      },
    ],});

 const [interactioncountdata, setInteractionCountData] = useState({    labels: [],
    datasets: [
      {
        label: 'Interaction Count',
        data: [],
      },
    ],});

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/getanalytics`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (data.success) {
            if(data.type === 'Restaurant')
            {
              setType(data.type);

              restaurantDataManipulation(data.donationData, data.avgDonationRatingPerMonth, data.avgInteractionRatingPerMonth, data.avgtotalratingperMonth);
            }
            else
            {
              setType(data.type);

              ngoDataManipulation(data.donationData, data.restaurantInteractions);
            }
          } else {
            console.log('Error fetching donation data:', data.error);
          }

        setLoading(false);
      } catch (error) {
        console.log('Error fetching donation data:', error);
        setLoading(false);
      }
    };

    fetchDonationData();
  }, []);

  const restaurantDataManipulation = (donations, avgdonationRating, avginteractionRating, avgtotalRating) => {

    const donationTypeData = donations.reduce((acc, curr) => {
      acc[curr.amountType] = (acc[curr.amountType] || 0) + 1;
      return acc;
    }, {});

    console.log(donationTypeData);
    console.log(Object.keys(donationTypeData));
      console.log(Object.values(donationTypeData));

  setPreferenceData({
      labels: Object.keys(donationTypeData),
      datasets: [
        {
          label: ' ',
          data: Object.values(donationTypeData),
          backgroundColor: [
              '#e53935',
              '#1ECF5A',
          ],
        },
      ],
  });


  var aggregatedDonationData = aggregateDonationsByMonth(donations);

  setTotalDonationData({ 
    labels: aggregatedDonationData.map(data => data.month),
    datasets: [
      {
        data: aggregatedDonationData.map(data => data.amount),
          label: type === "NGO" ? ` ${t('donationscollectedword')}` : ` ${t('fooddonatedinactivemonths')}`,
          borderColor: '#1ECF5A',
          pointBorderColor: '#1ECF5A',
          backgroundColor: '#1ECF5A',
          tension: 0.1,
          fill: false,
      },
    ],
  });

      // Merge avgdonationRating and avginteractionRating into a single object
      const combinedData = Object.keys(avgdonationRating).reduce((acc, month) => {
        acc[month] = [avgdonationRating[month], avginteractionRating[month]];
        return acc;
      }, {});
    
      // Extract labels and datasets from combinedData
      const labels = Object.keys(combinedData);
      const formattedLabels = labels.map(label => {
        const [month, year] = label.split('/');
        return `${month}/${year.slice(-2)}`;
      });
      // console.log(labels);
      const datasets = [
        {
          data: Object.values(combinedData).map(values => values[0]), // Avg donation rating values
          borderColor: '#1ECF5A', // Green color for donation rating
          pointBorderColor: '#1ECF5A',
          backgroundColor: '#1ECF5A',
          tension: 0.1,
          fill: false,
        },
        {
          data: Object.values(combinedData).map(values => values[1]), // Avg interaction rating values
          borderColor: '#e53935', // Red color for interaction rating
          pointBorderColor: '#e53935',
          backgroundColor: '#e53935',
          tension: 0.1,
          fill: false,
        },
      ];
      
      setDonationRatingData({
        labels: formattedLabels,
        datasets: datasets.map((dataset, index) => ({
          data: dataset.data,
          label: index === 0 ? ` ${t('donationratingword')}` : ` ${t('interactionratingword')}`,
          borderColor: dataset.borderColor,
          pointBorderColor: dataset.pointBorderColor,
          backgroundColor: dataset.backgroundColor,
          tension: dataset.tension,
          fill: dataset.fill,
        })),
      });


      const totalratinglabels = Object.keys(avgtotalRating);
      const formattedtotalratingLabels = totalratinglabels.map(label => {
        const [month, year] = label.split('/');
        return `${month}/${year.slice(-2)}`;
      });
    

      setAvgTotalRatingData({
        labels: formattedtotalratingLabels,
        datasets: [
          {
            data: Object.values(avgtotalRating),
            label: ` ${t('averageratingword')}`,
            borderColor: '#1ECF5A',
            pointBorderColor: '#1ECF5A',
            backgroundColor: '#1ECF5A',
            tension: 0.1,
            fill: false,
          },
        ],
      })
      
    
  };

  const ngoDataManipulation = (donations, interactions) => {

    const donationTypeData = donations.reduce((acc, curr) => {
        acc[curr.amountType] = (acc[curr.amountType] || 0) + 1;
        return acc;
      }, {});

      console.log(donationTypeData);
      console.log(Object.keys(donationTypeData));
        console.log(Object.values(donationTypeData));

    setPreferenceData({
        labels: Object.keys(donationTypeData),
        datasets: [
          {
            label: ' ',
            data: Object.values(donationTypeData),
            backgroundColor: [
                '#e53935',
                '#1ECF5A',
            ],
          },
        ],
    });


    var aggregatedDonationData = aggregateDonationsByMonth(donations);
  
    setTotalDonationData({ 
      labels: aggregatedDonationData.map(data => data.month),
      datasets: [
        {
          data: aggregatedDonationData.map(data => data.amount),
            label: type === "NGO" ? ` ${t('donationscollectedword')}` : ` ${t('fooddonatedinactivemonths')}`,
            borderColor: '#1ECF5A',
            pointBorderColor: '#1ECF5A',
            backgroundColor: '#1ECF5A',
            tension: 0.1,
            fill: false,
        },
      ],
    });

    const restaurantIds = Object.keys(interactions);
    const restaurantNames = restaurantIds.map(id => interactions[id].name);
    const avgRatings = restaurantIds.map(id => interactions[id].avgRating);
    const interactionCounts = restaurantIds.map(id => interactions[id].interactionCount);

    setInteractionRatingData({
        labels: restaurantNames,
        datasets: [
          {
            label: ` ${t('restaurantsandassignedratingsword')}`,
            data: avgRatings,
            borderColor: '#1ECF5A',
            pointBorderColor: '#1ECF5A',
            backgroundColor: '#1ECF5A',
            tension: 0.1,
            fill: false,
          },
        ],
    });

    setInteractionCountData({
        labels: restaurantNames,
        datasets: [
          {
            label: ` ${t('timesinteractedword')}`,
            data: interactionCounts,
            borderColor: '#1ECF5A',
            pointBorderColor: '#1ECF5A',
            backgroundColor: '#1ECF5A',
            tension: 0.1,
            fill: false,
          },
        ],
    });

  };  
  
  
  const aggregateDonationsByMonth = (donations) => {
    const aggregatedData = {};
    donations.forEach(data => {
      const date = new Date(data.createdAt);
      const month = `${date.getMonth() + 1}/${date.getFullYear() % 100}`;
      if (!aggregatedData[month]) {
        aggregatedData[month] = 0;
      }
      aggregatedData[month] += data.amount;
    });
  
    return Object.entries(aggregatedData).map(([month, amount]) => ({
      month,
      amount,
    }));
  };

  const options = {
    maintainAspectRatio: false ,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='flex font-[Inter]'>
          {type === 'NGO' ? (
                <>
      <Sidebar />
      </>
              ) : ( 
                <>
      <Sidebar2 />
                 </>
              )}
        {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-4 mx-auto font-[Inter]">  
        <div style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#1ECF5A',
              marginHorizontal: "5%",
              borderRadius: 16,
              paddingBottom: 10,
              paddingLeft: "5%",
              paddingRight: "5%",
              paddingTop: 10,
              marginTop: "5%",
        }}>{t("visualizeanalyticsword")}</div>
            <div className="grid grid-cols-2 gap-4 mt-4 mx-auto font-[Inter]">  
                {/* Your Chart Components */}
                <div>
                  <Doughnut data={preferencedata} />
                </div>
                <div>
                  <Line data={totaldonationdata} width={"200%"} height={"200%"} options={options} />
                </div>
                {type === 'Restaurant' ? (
                  <>
                    <div>
                      <Line data={donationratingdata} width={"250%"} height={"250%"}  options={options} />
                    </div>

                    <div>
                      <Line data={avgtotalratingdata} width={"250%"} height={"250%"}  options={options} />
                    </div>
                  </>
                ) : type === 'NGO' ? (
                  <>
                    <div>
                      <Line data={interactionratingdata} width={"250%"} height={"250%"}  options={options} />
                    </div>

                    <div>
                      <Line data={interactioncountdata} width={"250%"} height={"250%"} options={options} />
                    </div>
                </>
                ) : null}
            </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
