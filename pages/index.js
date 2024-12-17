import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx  = await atm.deposit(1);
      await tx.wait()
      document.getElementById("transaction").innerHTML += "<br></br>" + account + " deposited 1 ETH"; 
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      
      document.getElementById("transaction").innerHTML += "<br></br>" + account + " withdrawed 1 ETH"; 
      getBalance();
    }
  }  
  
  const deposit5 = async() => {
    if (atm) {
      let tx  = await atm.deposit(5);
      await tx.wait()
      document.getElementById("transaction").innerHTML += "<br></br>" + account + " deposited 5 ETH"; 
      getBalance();
    }
  }

  const withdraw5 = async() => {
    if (atm) {
      let tx = await atm.withdraw(5);
      await tx.wait()
      
      document.getElementById("transaction").innerHTML += "<br></br>" + account + " withdrawed 5 ETH"; 
      getBalance();
    }
  }  
  const deposit10 = async() => {
    if (atm) {
      let tx  = await atm.deposit(10);
      await tx.wait()
      document.getElementById("transaction").innerHTML += "<br></br>" + account + " deposited 10 ETH"; 
      getBalance();
    }
  }

  const withdraw10 = async() => {
    if (atm) {
      let tx = await atm.withdraw(10);
      await tx.wait()
      
      document.getElementById("transaction").innerHTML += "<br></br>" + account + " withdrawed 10 ETH"; 
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Current User: <br></br><br></br>{account}</p><br></br><br></br>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <br></br><br></br>
        <button onClick={deposit5}>Deposit 5 ETH</button>
        <button onClick={withdraw5}>Withdraw 5 ETH</button>
        <br></br><br></br>
        <button onClick={deposit10}>Deposit 10 ETH</button>
        <button onClick={withdraw10}>Withdraw 10 ETH</button>
        <br></br><br></br><br></br>
        <div id = "transaction">
          <h2>Older Transactions</h2>
          
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik+Wet+Paint"></link>
      <header>

        <h1 className = "heading">Project</h1></header>
      {initUser()}
      <style jsx>{`
    * {
  background-color: #f4f4f9; /* Light, subtle background */
  color: #333; /* Darker text color for readability */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.heading {
  font-family: 'Rubik Wet Paint', cursive;
  color: #1e90ff; /* Bright blue for attention */
  font-size: 2.5em;
  margin-top: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
}

.container {
  text-align: center;
  padding: 20px;
  border: 2px solid #1e90ff; /* Matching the heading color */
  border-radius: 10px;
  background-color: #ffffff; /* Contrast background for container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Smooth shadow for elevation */
  width: 80%;
  margin: 20px auto; /* Center the container */
}

      `}
      </style>
    </main>
  )
}
