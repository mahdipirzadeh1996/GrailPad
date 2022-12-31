import React from 'react';
import ReactDOM from 'react-dom';

import App2 from './App2';
import { getWeb3 } from './web3-config';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { InvestorContextProvider } from './context/investorContext/InvestorContext';
import { TokenContextProvider } from './context/tokenContext/TokenContext';
import { TransactionContextProvider } from './context/transactionContext/TransactionContext';
import { IdoContextProvider } from './context/idoContext/IdoContext';
import { AdminIdoContextProvider } from './context/adminIdoContext/AdminIdoContext';

//inject web3 into the App.js
// getWeb3(0).then(web3 => {
//     ReactDOM.render(
//         <AuthContextProvider>
//             <InvestorContextProvider>
//                 <TokenContextProvider>
//                     <TransactionContextProvider>
//                         {/* <App web3={web3} /> */}
//                         <App2 web3={web3} />
//                     </TransactionContextProvider>
//                 </TokenContextProvider>
//             </InvestorContextProvider>
//         </AuthContextProvider>,
//         document.getElementById('root')
//     );
// });

ReactDOM.render(
    <AuthContextProvider>
        <InvestorContextProvider>
            <TokenContextProvider>
                <TransactionContextProvider>
                    <IdoContextProvider>
                        <AdminIdoContextProvider>
                            {/* <App web3={web3} /> */}
                            <App2 />
                        </AdminIdoContextProvider>
                    </IdoContextProvider>
                </TransactionContextProvider>
            </TokenContextProvider>
        </InvestorContextProvider>
    </AuthContextProvider>,
    document.getElementById('root')
);