// Пакеты
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Типизация
import IVotesChartProps from '../models/IVotesChartProps';

// Redux
import { useAppSelector } from "../store/hooks";
import { selectCurrentChain } from "../store/reducers/currentChainSlice";

// Прочее
import { cutDecimals } from '../utils/formatting';




ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function VotesChart(props: IVotesChartProps) {

  const currentChain = useAppSelector(selectCurrentChain);
  let yes = Number(props.votes.yes);
  let no = Number(props.votes.no);
  let noWithVeto = Number(props.votes.no_with_veto);
  let abstain = Number(props.votes.abstain);

  if (currentChain) {
    yes = Number(cutDecimals(props.votes.yes, currentChain.decimals));
    noWithVeto = Number(cutDecimals(props.votes.no_with_veto, currentChain.decimals));
    no = Number(cutDecimals(props.votes.no, currentChain.decimals));
    abstain = Number(cutDecimals(props.votes.abstain, currentChain.decimals));
  }

  const labels = ['Yes', 'No', 'No with Veto', 'Abstain'];
  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'left' as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: [yes, no, noWithVeto, abstain],
        backgroundColor: [
          'rgba(0, 230, 150, 0.8)',
          'rgba(230, 0, 50, 0.6)',
          'rgba(15, 15, 15, 0.7)',
          'rgba(130, 130, 130, 0.3)',
        ],
        borderColor: [
          'transparent',
          'transparent',
          'transparent',
          'transparent',
        ]
      },
    ],
  };

  return (
    <div className="votes-chart">
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default VotesChart;