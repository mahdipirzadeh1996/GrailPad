import React, { useState, useContext, useEffect } from 'react';
// import { EventNote, Cloud, ShowChart } from "@material-ui/icons";
import {
    BarGauge, Label, Tooltip, Size
} from 'devextreme-react/bar-gauge';

import './home.scss';

import { TokenContext } from '../../context/tokenContext/TokenContext';

// import eth from '../../images/ethereum.png';
// import btc from '../../images/bitcoin.png';
// import ltc from '../../images/litecoin.png';
// import mnr from '../../images/monero.png';

// const options = [
//     { value: 1, label: 'Medan, IDN' },
//     { value: 2, label: 'Jakarta, IDN' },
//     { value: 3, label: 'Surabaya, IDN' },
// ];

const values = [0, 0, 0, 0, 0];
const labels = ['BSC', 'Polygon', 'Solana', 'Ethereum', 'Avalanche'];
const colors = ['#F0B90B', '#8247e5', 'linear-gradient(#00ffa3 , #dc1fff)', '#8c8c8c', '#e84142'];
const barColors = ['#F0B90B', '#8247e5', '#00ffa3', '#8c8c8c', '#e84142'];


const Home = ({ open }) => {
    const [clabel, setClabel] = useState({});
    const [nets, setNets] = useState([0, 0, 0, 0, 0]);
    const [total, setTotal] = useState(null);

    let { token } = useContext(TokenContext);

    function customizeTooltip(arg) {
        return {
            text: getText(arg, arg.valueText),
        };
    }

    function getText(item, text) {
        setClabel({ label: labels[item.index], color: barColors[item.index] });
        return ` `;
    }

    function hidden() {
        setClabel({});
    }

    useEffect(() => {
        let sum = 0;
        let temp = [0, 0, 0, 0, 0];

        if (token !== null) {
            for (let i = 0; i < token.length; i++) {
                sum += (token[i].balance);

                switch (token[i].network) {
                    case '97':
                        temp[0] = temp[0] + token[i].balance;
                        break;
                    case '137':
                        temp[1] = temp[1] + token[i].balance;
                        break;
                    case '1':
                        temp[3] = temp[3] + token[i].balance;
                        break;
                    case '43114':
                        temp[4] = temp[4] + token[i].balance;
                        break;
                }
            }
        }

        setTotal(sum);
        setNets(temp);
    }, [token]);

    return (
        <div className='home' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='header'>
                <div className='hLeft'>
                    <h2>Dashboard</h2>
                </div>
                <div className='hRight'>
                </div>
            </div>

            <div className='grlBlnc'>
                <div className='grlHldBlnc' style={{ marginRight: '30px' }}>
                    <div className='grlBlncLabel'>
                        <h4>GRAIL Holding Balance</h4>
                    </div>
                    <div className='grlBlncChrt'>
                        <BarGauge
                            id="gauge"
                            startValue={0}
                            endValue={total ? total : 1}
                            defaultValues={values}
                            values={nets}
                            geometry={{ startAngle: 180, endAngle: 360 }}
                            relativeInnerRadius={0.6}
                            palette={barColors}
                            onTooltipHidden={hidden}
                        >
                            <Size width={300} height={250} />
                            <Label visible={false} />
                            <Tooltip enabled={true} customizeTooltip={customizeTooltip} opacity={0} >
                                <div>
                                    OK
                                </div>
                            </Tooltip>
                        </BarGauge>
                        <div className='labeContain'>
                            <h1
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    color: clabel !== {} ? clabel.color : null
                                }}>{clabel !== {} ? clabel.label : ''}</h1>
                        </div>
                    </div>
                    <div className='tknBlnc'>
                        <div className='bLeft'>
                            <div className='coinContain' style={{ marginRight: '10px' }}>
                                {colors.map((item, index) => (
                                    <div key={index} className='coinLabel'>
                                        <div
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                borderRadius: '7.5px',
                                                background: item
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='coinContain'>
                                {labels.map((item, index) => (
                                    <div key={index} className='coinLabel'>
                                        <span>{(index === 0 ? 'Bainance Smart Chain (' : '') + item + (index === 0 ? ')' : '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='bRight'>
                            {nets.map((item, index) => (
                                <div key={index} className='coinBlnc'>
                                    <span>{item === 0 ? '-' : item.toLocaleString() + ' GRAIL'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='grlHldBlnc'>
                    <div className='grlBlncLabel'>
                        <h4>xGRAIL Holding Balance</h4>
                    </div>
                    <div className='tknBlnc'>
                        <div className='bLeft'>
                            <div className='coinContain' style={{ marginRight: '10px' }}>
                                {colors.map((item, index) => (
                                    <div key={index} className='coinLabel'>
                                        <div
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                borderRadius: '7.5px',
                                                background: item
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='coinContain'>
                                {labels.map((item, index) => (
                                    <div key={index} className='coinLabel'>
                                        <span>{(index === 0 ? 'Bainance Smart Chain (' : '') + item + (index === 0 ? ')' : '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='bRight'>
                            {values.map((item, index) => (
                                <div key={index} className='coinBlnc'>
                                    <span>{item === 0 ? '-' : '$' + item.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='tknPrc'>
                <div className='prcCard'>
                    <div className='coinLogo'>
                        <img src={eth} alt='' />
                    </div>
                    <h1>${16833.1.toLocaleString()}</h1>
                    <div className='profit'>
                        <ShowChart className='icon' />
                        <span>45%</span>
                        <span className='week'>This week</span>
                    </div>
                </div>
                <div className='prcCard'>
                    <div className='coinLogo'>
                        <img src={btc} alt='' />
                    </div>
                    <h1>${24098.0.toLocaleString()}</h1>
                    <div className='profit'>
                        <ShowChart className='icon' />
                        <span>45%</span>
                        <span className='week'>This week</span>
                    </div>
                </div>
                <div className='prcCard'>
                    <div className='coinLogo'>
                        <img src={ltc} alt='' />
                    </div>
                    <h1>${667224.0.toLocaleString()}</h1>
                    <div className='profit'>
                        <ShowChart className='icon' style={{ transform: 'scaleX(-1) rotate(180deg)', color: '#ff2e2e'}} />
                        <span style={{color: '#ff2e2e'}}>45%</span>
                        <span className='week'>This week</span>
                    </div>
                </div>
                <div className='prcCard'>
                    <div className='coinLogo'>
                        <img src={mnr} alt='' />
                    </div>
                    <h1>${667224.0.toLocaleString()}</h1>
                    <div className='profit'>
                        <ShowChart className='icon' />
                        <span>45%</span>
                        <span className='week'>This week</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;