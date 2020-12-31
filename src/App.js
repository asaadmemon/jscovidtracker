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

    let handleCountryChange = async (country) => {
        const data = await fetchData(country);
        setData({data});
        setCountry({country});
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
        console.log(country)
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={CovidImg} alt='Covid-19' />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}
export default App;
