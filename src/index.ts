import "./styles.css";
/// You can use either one of the following imports:
import Web3 from "web3";
//import { ethers } from "ethers";

/// Contains needed settings, as nodeUrl, contractAddress, and abi
import { settings } from "./settings";

/// This is a definition of the type of object returned by the contract
/// and is what the addProposalToList function expects as input parameter
import { Proposal } from "./Proposal";

/// Allows to add a proposal to the list
import { addProposalToList } from "./utils";

/// Empties the list
import { resetList } from "./utils";

/// Set the app loading status to true or false
import { setLoading } from "./utils";

const main = async () => {
  setLoading(true);
  resetList();
  // Write your code here
  const web3 = new Web3(settings.nodeUrl);
  const proposalContract = new web3.eth.Contract(
    settings.contractAbi,
    settings.contractAddress
  );

  const proposalsCount = await proposalContract.methods
    .getProposalsCount()
    .call();

  for (var i = 0; i <= proposalsCount - 1; i++) {
    let proposal: Proposal = await proposalContract.methods.proposals(i).call();
    addProposalToList(proposal);
  }

  setLoading(false);
};

main();
