import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoin, filecoinHyperspace } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import SelectTemplate from "./components/SelectTemplate";
import TemplateDetails from "./components/TemplateDetails";
import CreateDao from "./components/stepsform/CreateDao";
import Dashboard from "./pages/Dashboard";
import PreExistingDaos from "./components/PreExistingDaos";
import Template from "./components/Template";
import YourDaos from "./components/YourDaos";
import ExistingDaos from "./pages/ExistingDaos";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Meet from "./pages/Meet";
import Home from "./pages/Home";
import DataDaoDetails from "./components/DataDaoDetails";
import AllDataDaos from "./components/AllDataDaos";
import AboutBecomeMember from "./components/aboutPlatform/AboutBecomeMember";

function App() {
  const BTTChain = {
    id: 199,
    name: "BitTorrent Chain Mainnet",
    network: "BitTorrent Chain Mainnet",
    iconUrl: "https://testscan.bt.io/static/media/BTT.e13a6c4e.svg",
    iconBackground: "#fff",
    nativeCurrency: {
      decimals: 18,
      name: "BitTorrent Chain Mainnet",
      symbol: "BTT",
    },
    rpcUrls: {
      default: "https://rpc.bt.io/",
    },
    blockExplorers: {
      default: {
        name: "BitTorrent Chain Mainnet",
        url: "https://testscan.bt.io",
      },
    },
    testnet: true,
  };

  const { chains, provider } = configureChains(
    [BTTChain],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: "https://pre-rpc.bittorrentchain.io/" }),
      }),
      alchemyProvider({ apiKey: "O5NYvtwLMNG0LjAXPQEk0YJT2l3UxTAY" }),
      // publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/create-data-dao/select-template"
                element={<SelectTemplate />}
              />
              <Route
                path="/create-data-dao/select-template/details"
                element={<TemplateDetails />}
              />
              <Route path="/create-data-dao" element={<CreateDao />} />
              <Route path="/template" element={<Template />} />
              <Route path="/your-daos" element={<YourDaos />} />
              <Route
                path="/pre-existing-data-dao"
                element={<PreExistingDaos />}
              />
              <Route path="/all-daos" element={<AllDataDaos />} />

              <Route path="/open-existing-data-dao" element={<Dashboard />} />
              <Route path="/open-existing-data-dao/meet" element={<Meet />} />
              <Route path="/home" element={<Home />} />
              <Route path="/data-dao-details" element={<DataDaoDetails />} />
              <Route
                path="/how-samhitaDAO-works"
                element={<AboutBecomeMember />}
              />

              {/* <Route
                path="/open-existing-data-dao/:id"
                element={<Dashboard />}
              /> */}
            </Routes>
          </Router>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
