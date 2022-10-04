# Dead Man UI

The React dApp for Dead Man's Switch.

As this is my first time uploading a README for a front end application, apologies in advance for how the code is structured. I kept it simple for myself to focus
on learning the concepts,

All necessary files to replicate the front end are in the repository. 

- App.js is a basic JS file that mainly handles the wallet connection for the dApp as well as account/chain changes.

- Smartcontract.js is the bread and butter of this dApp. This is where all of the smart function calls reside. There's various input fields which will 
pair what is typed to a specific variable so you can call functions with no issue. As the functions already parse the values via EthersJS, you can rest 
assured that you only need to type easily human-readable numbers rather than worrying about decimals and 'excess zeroes'.

*IMPORTANT: Take special care with the marked setter functions. The wrong value can brick that instance of the contract if an owner is set to an EOA 
you don't have access to or if you randomly set the time far too ahead in the future. Setting the wrong destination address can also end up rugging yourself 
when it comes time to refresh the 'Ping()' time duration.

- `dms_json_abi.js` and `erc20_abi.js` are exports which can be copied exactly to deploy your own version of this contract with ease. 
