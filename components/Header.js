import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                // padding: "20px 20px",
            }}
            className="border-b-4 p-5"
        >
            <h1 className="py-4 px-4 text-3xl font-bold">Decentralized Raffle</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
