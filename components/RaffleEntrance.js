import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
// import {HiOutlineBellAlert}

const RaffleEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [raffleState, setRaffleState] = useState("0")
    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specify the networkID
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specify the networkID
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specify the networkID
        functionName: "getNumOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specify the networkID
        functionName: "getRecentWinner",
        params: {},
    })

    const { runContractFunction: getRaffleState } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specify the networkID
        functionName: "getRaffleState",
        params: {},
    })

    const updateUI = async () => {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        setEntranceFee(entranceFeeFromCall)
        console.log(entranceFee)

        const players = (await getNumOfPlayers()).toString()
        setNumPlayers(players)
        console.log(`The number of players: ${numPlayers.toString()}`)

        const raffleRecentwinner = await getRecentWinner()
        setRecentWinner(raffleRecentwinner)
        console.log(`The latest Raffle winner: ${raffleRecentwinner}`)

        const currentRaffleState = (await getRaffleState()).toString()
        setRaffleState(currentRaffleState)
        console.log(`The current state: ${raffleState}`)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Raffle Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            <p className="text-center text-2xl">Welcome to Decentalized Raffle🙂</p>
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                onError: (error) => console.log(error),
                                onSuccess: handleSuccess,
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching
                            ? // <div className="animate-spin spinner-border h-5 w-5 mr-3 border-b-2 rounded-full">
                              //     {" "}
                              // </div>
                              "Processing..."
                            : "Enter Raffle"}
                    </button>
                </div>
            ) : (
                <div>No Address Detected. Please connect to a supported chain.</div>
            )}
            <div className="my-4">
                <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")}ETH</div>
                <div>Players: {numPlayers.toString()}</div>
                <div>Latest Winner: {recentWinner}</div>
                <div>Raffle State: {raffleState == "0" ? "OPEN" : "CALCULATING"}</div>
            </div>
        </div>
    )
}

export default RaffleEntrance
