import React from 'react'

/* importing from index file. 
When we've index, we just mention folder name
and it goes to find that in the index.js
*/
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import CovidImg from './images/Covid19.png';
/*
function App() {

    let [data, setData] = useState({});
    let [country, setCountry] = useState([]);

    useEffect(() => {
        const data =  async() => {
            setData(await fetchData());
        }
        data();
    }, [])

    let handleCountryChange = async (country) => {
        const countrypick = await fetchData(country);

        setCountry({ data, country: countrypick });
    }

*/
class App extends React.Component {
    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const data = await fetchData();

        this.setState({ data });
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country);

        this.setState({ data, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={CovidImg} alt='Covid-19' />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Cards data={data} />
                <Chart data={data} country={country} />
            </div>
        )
    }
};
export default App;
